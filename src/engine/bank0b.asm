SECTION "Bank b@4000", ROMX[$4000], BANK[$b]

; writes n items of text each given in the following format in hl:
; x coord, y coord, text id
; $ff-terminated
; register b is used for a horizontal offset
PlaceTextItemsWithOffset::
	ld d, [hl] ; x coord
	inc hl
	bit 7, d
	ret nz ; return if no more items of text

	ld a, d
	sub a, e
	ld d, a

	ld e, [hl] ; y coord
	inc hl ; hl = text id
	call InitTextPrinting
	push hl
	call ProcessTextFromPointerToID
	pop hl
	inc hl
	inc hl
	jr PlaceTextItemsWithOffset ; do next item

GetTextLength::
	ld b, 0
.loop:
	ld a, [hl]
	cp $FF
	jr z, .done
	inc b
	inc hl
	jr .loop
.done:
	ret

CardPageRetWeakResistDarkText::
	; On a Pokemon's stats screen, draw the
	; label for Retreat, Weakness, and Resistance.
	; Also draw "Dark Pokemon" if it is Dark.
	ld hl, CardPageRetWeakResistTextData
	call PlaceTextItems
	ld hl, wLoadedCard1Dark
	ld a, [hl]
	cp 0
	jr z, .done
	ld hl, EffectTargetDarkPokemonText
	call GetTextLength
	ld e, b
	ld hl, CardPageDarkTextData
	call PlaceTextItemsWithOffset
.done
	ret

CardPageDarkTextData:
	textitem 19, 14, EffectTargetDarkPokemonText
	db $ff

CardPageRetWeakResistTextData:
	textitem 1, 14, RetreatText
	textitem 1, 15, WeaknessText
	textitem 1, 16, ResistanceText
	db $ff


PCPrinterAction::
	farcall Func_1022a
	farcall SetFadePalsFrameFunc
	farcall PrinterMenu
	farcall StartFadeToWhite
	farcall WaitPalFading_Bank07
	farcall UnsetFadePalsFrameFunc
	farcall Func_10252
	ret

PCCreditsAction::
	farcall Func_1022a
	farcall SetFadePalsFrameFunc
	farcall _PlayCredits
	farcall StartFadeToWhite
	farcall WaitPalFading_Bank07
	farcall UnsetFadePalsFrameFunc
	farcall Func_10252
	ret

PCGift10Cards::
	farcall Func_1022a
	farcall SetFadePalsFrameFunc
	call Gift10Cards
	farcall StartFadeToWhite
	farcall WaitPalFading_Bank07
	farcall UnsetFadePalsFrameFunc
	farcall Func_10252
	ret

PCDeckDiagnosis::
	call Func_1022a
	call SetFadePalsFrameFunc
	farcall DeckDiagnosis
	farcall StartFadeToWhite
	farcall WaitPalFading_Bank07
	call UnsetFadePalsFrameFunc
	call Func_10252
	ret

Gift10Cards::
	bank1call CreateTempCardCollection

	call EnableSRAM
	ld de, NUM_CARDS

.add_loop
	ld c, 10

	ld hl, wTempCardCollection
	add hl, de

	ld a, MAX_AMOUNT_OF_CARD
	sub [hl]

	cp c
	jr nc, .can_add_full

	ld c, a

.can_add_full
	ld hl, sCardCollection
	add hl, de
	ld a, [hl]
	and CARD_COUNT_MASK
	add c
	ld [hl], a

	dec de
	ld a, d
	or e
	jr nz, .add_loop

	call DisableSRAM
	ret