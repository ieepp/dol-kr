/* eslint-disable no-undef */

// eslint-disable-next-line no-unused-vars
function masturbationeffects() {
	const fragment = document.createDocumentFragment();
	const br = () => document.createElement("br");
	const span = (text, colour) => {
		if (T.noMasturbationOutput) return "";
		const element = document.createElement("span");
		if (colour) element.classList.add(colour);
		element.textContent = text;
		return element;
	};
	const sWikifier = text => {
		if (T.noMasturbationOutput) return;
		fragment.append(Wikifier.wikifyEval(text));
	};
	const otherElement = (tag, text, colour) => {
		if (T.noMasturbationOutput) return "";
		const element = document.createElement(tag);
		if (colour) element.classList.add(colour);
		element.textContent = text;
		return element;
	};
	const genitalsExposed = () => V.worn.over_lower.vagina_exposed >= 1 && V.worn.lower.vagina_exposed >= 1 && V.worn.under_lower.vagina_exposed >= 1;
	const breastsExposed = () => V.worn.over_upper.exposed >= 1 && V.worn.upper.exposed >= 1 && V.worn.under_upper.exposed >= 1;

	const playerToys = listUniqueCarriedSextoys().filter(
		toy => (V.player.penisExist && !playerChastity("penis") && toy.type.includesAny("stroker")) || toy.type.includesAny("dildo", "breastpump")
	);
	const selectedToy = (location, update) => {
		if (update === true) V["currentToy" + location.toLocaleUpperFirst()] = V["selectedToy" + location.toLocaleUpperFirst()];
		const toy = clone(playerToys[V["currentToy" + location.toLocaleUpperFirst()]]);
		if (update === false) V["currentToy" + location.toLocaleUpperFirst()] = "none";
		return toy;
	};
	const toyDisplay = (toy1, toy2, post, sep) => { if(typeof(toy2) === "string") { sep = post; post = toy2; toy2 = undefined; }
		if (toy1 && toy2) return (toy1.colour ? trColourJS(toy1.colour) + " " : "") + sextoyPost(toy1.name, "과") + " " + (toy2.colour ? trColourJS(toy2.colour) + " " : "") + sextoyPost(toy2.name, post, sep);
		if (toy1) return (toy1.colour ? trColourJS(toy1.colour) + " " : "") + sextoyPost(toy1.name, post, sep);
		return "";
	};

	const earSlimeDefy = () => V.earSlime.growth >= 100 && V.earSlime.defyCooldown && V.pain < V.earSlime.defyCooldown * 5;

	const otherVariables = {
		br,
		span,
		otherElement,
		genitalsExposed,
		breastsExposed,
		selectedToy,
		toyDisplay,
		earSlimeDefy,
		additionalEffect: { earSlimeDefy: [] },
	};

	if (V.player.vaginaExist) {
		otherVariables.hymenIntact = V.player.virginity.vaginal === true && V.sexStats.vagina.pregnancy.totalBirthEvents === 0;
		wikifier("vaginaWetnessCalculate");
	}
	if (V.corruptionMasturbation) {
		if (V.leftarm === "bound" && V.rightarm === "bound") {
			sWikifier(
				'슬라임이 당신에게 당신의 팔을 묶은 것을 풀라고 한다. 당신은 어떤 진척도 내지 못하고, <span class="blue">녀석은 포기한다.</span><<arousal 600 "masturbation">><<stress 6>><<gstress>><<garousal>>'
			);
			fragment.append(" ");
			V.rightaction = "mrest";
			V.leftaction = "mrest";
			V.corruptionMasturbation = false;
			delete V.corruptionMasturbationCount;
		} else if (
			playerHeatMinArousal() + playerRutMinArousal() >= 3000 ||
			(playerHeatMinArousal() + playerRutMinArousal() >= 1000 && V.earSlime.growth >= 100 && V.earSlime.defyCooldown)
		) {
			sWikifier(
				'	귓속의 슬라임은 현재 상태에서 당신에게 자위를 강제로 시키는 것은 가치가 없다고 느끼고, <span class="blue">당신을 풀어준다.</span>'
			);
			fragment.append(" ");
			V.corruptionMasturbation = false;
			delete V.corruptionMasturbationCount;
		} else {
			if (V.orgasmdown >= 2) {
				if (V.corruptionMasturbationCount === undefined || V.corruptionMasturbationCount === null) V.corruptionMasturbationCount = random(2, 6);
				V.corruptionMasturbationCount--;
				if (V.corruptionMasturbationCount === 0) {
					V.corruptionMasturbation = false;
					delete V.corruptionMasturbationCount;
					if (V.awareness < 200) {
						// Prevents the PC from continuing actions that they normally are unable to do yet
						if (V.mouth === "mpenis") {
							sWikifier(
								'<span class="green">당신 귓속의 슬라임이 통제력을 잃어버림에 따라, 당신은 <<penis_ rul>> 입에서 빼서 치운다.</span>'
							);
							fragment.append(" ");
							V.mouthactiondefault = "rest";
							V.mouthaction = 0;
							V.mouth = 0;
							V.penisuse = 0;
						} else if (V.mouth === "mpenisentrance") {
							sWikifier('<span class="green">당신 귓속의 슬라임이 통제력을 잃어버림에 따라, 당신은 <<penis_ rul>> 치운다.</span>');
							fragment.append(" ");
							V.mouthactiondefault = "rest";
							V.mouthaction = 0;
							V.mouth = 0;
							V.penisuse = 0;
						} else if (V.mouth === "mchastityparasiteentrance") {
							sWikifier(
								'<span class="green">당신 귓속의 슬라임이 통제력을 잃어버림에 따라, 당신은 기생충 정조대 자지를 치운다.</span>'
							);
							fragment.append(" ");
							V.mouthactiondefault = "rest";
							V.mouthaction = 0;
							V.mouth = 0;
							V.penisuse = 0;
						} else if (V.mouth === "mvaginaentrance") {
							sWikifier('<span class="green">당신 귓속의 슬라임이 통제력을 잃어버림에 따라, 당신은 <<pussy_ rul>> 치운다.</span>');
							fragment.append(" ");
							V.mouthactiondefault = "rest";
							V.mouthaction = 0;
							V.mouth = 0;
						}
					}
				}
			}
			if (V.corruptionMasturbation) fragment.append(masturbationSlimeControl());
		}
	}

	if (V.possessed) {
		sWikifier("<<dynamicblock id=control-caption>><<controlcaption>><</dynamicblock>>");
		fragment.append(possessedMasturbation(span, br, sWikifier));
	}

	fragment.append(masturbationeffectsVaginaAnus(otherVariables));

	fragment.append(masturbationeffectsArms("left", V.leftaction === V.rightaction, otherVariables));
	fragment.append(masturbationeffectsArms("right", false, otherVariables));

	fragment.append(masturbationeffectsMouth(otherVariables));

	if (otherVariables.additionalEffect.hands === "ballplayeffects" && V.worn.genitals.name !== "chastity parasite") {
		if (V.arousal >= V.arousalmax * (4 / 5) || (V.earSlime.focus === "impregnation" && V.earSlime.growth >= 100)) {
			if (genitalsExposed()) {
				sWikifier('당신의 <<penis_ ga>> 격렬하게 움직이며, <span class="pink">쿠퍼액이 끝에서 튀어오른다.</span>');
			} else {
				sWikifier('당신의 <<penis_ ga>> 격렬하게 움직이며, <span class="pink">쿠퍼액이 당신의 <<exposedlower_ rul>> 통해 새어나온다.</span>');
			}
		} else if (V.arousal >= V.arousalmax * (3 / 5)) {
			if (genitalsExposed()) {
				sWikifier('당신의 <<penis_ ga>> 격렬하게 움직이며, <span class="pink">쿠퍼액이 귀두에서 방울진다.</span>');
			} else {
				sWikifier('당신의 <<penis_ ga>> 격렬하게 움직이며, <span class="pink">쿠퍼액이 당신의 <<exposedlowerPost>> 위에 짙은 자국을 만든다.</span>');
			}
		} else if (V.arousal >= V.arousalmax * (2 / 5)) {
			sWikifier("그 압력이 당신의 <<penis_ rul>> 고동치게 한다.");
		} else {
			sWikifier("그 압력이 당신의 <<penis_ rul>> 씰룩거리게 한다.");
		}
		fragment.append(" ");
	}

	if (
		V.player.penisExist &&
		otherVariables.additionalEffect.hands !== "ballplayeffects" &&
		V.arousal >= V.arousalmax * (3 / 5) &&
		V.mouth !== "mpenis" &&
		V.worn.genitals.name !== "chastity parasite"
	) {
		if (V.arousal >= V.arousalmax * (4 / 5) || (V.earSlime.focus === "impregnation" && V.earSlime.growth >= 100)) {
			if (genitalsExposed()) {
				sWikifier('당신의 <<penis_ ga "strap-on">> 격렬하게 움직이며, <span class="pink">쿠퍼액이 끝에서 튀어오른다.</span>');
			} else {
				sWikifier('당신의 <<penis_ ga "strap-on">> 격렬하게 움직이며, 쿠퍼액이 당신의 <<exposedlower_ rul>> 통해 새어나온다.</span>');
			}
		} else {
			if (genitalsExposed()) {
				sWikifier('당신의 <<penis_ ga "strap-on">> 격렬하게 움직이며, <span class="pink">쿠퍼액이 귀두에서 방울진다.</span>');
			} else {
				sWikifier('당신의 <<penis_ ga "strap-on">> 격렬하게 움직이며, <span class="pink">쿠퍼액이 당신의 <<exposedlowerPost>> 위에 짙은 자국을 만든다.</span>');
			}
		}
		fragment.append(" ");
	}

	if (otherVariables.additionalEffect.earSlimeDefy.length) {
		sWikifier(
			`쾌감을 느끼기 위해 당신이 한 모든 시도는 당신의 ${formatList(
				otherVariables.additionalEffect.earSlimeDefy,
				"그리고",
				true
			)}에 직접적으로 <span class="lewd">쾌감</span>과 <span class="red">고통</span>이 교차하는 결과로 이어진다. <<gpain>>`
		);
		fragment.append(" ");
	}

	if (V.worn.genitals.name === "chastity parasite" && V.earSlime.vibration > 0) {
		if (V.earSlime.vibration > 1) wikifier("arousal", Math.clamp(25 * V.earSlime.vibration, 0, 1000), "masturbationGenital");
		if (V.earSlime.corruption < 100 && V.earSlime.vibration > 20) {
			V.earSlime.vibration = 20;
		} else if (V.earSlime.vibration > 60) {
			V.earSlime.vibration = 60;
		}

		if (V.earSlime.vibration === 1) {
			// Prevents a double message
			V.earSlime.vibration++;
		} else if (V.earSlime.vibration <= 10) {
			sWikifier('<span class="lewd">당신의 기생충 정조대가 <<penisPost>> 주위에서 부드럽게 진동한다.</span>');
		} else if (V.earSlime.vibration <= 20) {
			sWikifier('<span class="lewd">당신의 기생충 정조대가 <<penisPost>> 주위에서 진동한다.</span>');
		} else if (V.earSlime.vibration <= 30) {
			sWikifier(
				`<span class="lewd">당신의 기생충 정조대가 <<penis_ wa 'sep'>>${V.mouth === "mchastityparasiteentrance" ? "_trPost 혓바닥" : ""} 위에서 진동한다.</span>`
			);
		} else {
			sWikifier(
				`<span class="lewd">당신의 기생충 정조대가 <<penis_ wa 'sep'>>${
					V.mouth === "mchastityparasiteentrance" ? "_trPost 혓바닥" : ""
				} 위에서 강하게 진동한다.</span>`
			);
		}
		if (V.earSlime.vibration > 1) fragment.append(" ");
	}

	if (V.player.vaginaExist && V.vaginaArousalWetness >= 60) {
		if (V.worn.under_lower.vagina_exposed && V.worn.lower.vagina_exposed) {
			wikifier("vaginaFluidPassive");
			if (T.lube_released) {
				sWikifier('<span class="pink">애액이 당신의 <<pussyPost>>에서 새어나온다.</span>');
			}
		} else if (V.worn.under_lower.vagina_exposed === 0 && V.underlowerwetstage < 3) {
			sWikifier(`<span class="pink">애액이 당신의 <<pussyPost>>에서 새어나와 당신의 <<worn_under_lower_name_ ul>> 적신다.</span>`);
			wikifier("underlowerwet", 1);
		} else if (V.worn.lower.vagina_exposed === 0) {
			sWikifier(
				`<span class="pink">애액이 당신의 <<pussyPost>>에서 새어나와<<if V.underlowerwet gte 60>>, 당신의 <<worn_under_lower_name_ ul>> 흠뻑 적시고 배어나와,<</if>> 당신의 <<worn_lower_name_ ul>> 적신다.</span>`
			);
		} else {
			sWikifier('<span class="pink">애액이 당신의 <<pussyPost>>에서 새어나와 당신의 옷을 적신다.</span>');
		}
		fragment.append(" ");
	}

	if (
		random(0, 100) >= Math.clamp(135 - V.earSlime.corruption / 2, 80, 98) &&
		V.earSlime.corruption > currentSkillValue("willpower") / 10 &&
		V.corruptionMasturbation === undefined
	) {
		V.corruptionMasturbation = true;
		V.corruptionMasturbationCount = random(1, 4);
		fragment.append(span("귓속의 슬라임은 당신에게 더 재미를 보게 해주기를 원한다.", "red"));
		fragment.append(" ");
	}

	fragment.append(br());
	fragment.append(br());

	return fragment;
}

function masturbationeffectsArms(
	arm,
	doubleAction,
	{ span, otherElement, additionalEffect, selectedToy, toyDisplay, genitalsExposed, breastsExposed, hymenIntact, earSlimeDefy }
) {
	const fragment = document.createDocumentFragment();

	const sWikifier = text => {
		if (T.noMasturbationOutput) return;
		fragment.append(Wikifier.wikifyEval(text));
	};

	const armAction = arm + "action";
	const armActionDefault = armAction + "default";
	const otherArm = arm === "left" ? "right" : "left";
	const otherArmAction = otherArm + "action";

	const clearAction = defaultAction => {
		V[armActionDefault] = defaultAction !== undefined ? defaultAction : V[armAction];
		V[armAction] = 0;
		if (doubleAction) {
			V[otherArmAction + "default"] = defaultAction !== undefined ? defaultAction : V[otherArmAction];
			V[otherArmAction] = 0;
		}
	};

	if (V[armAction] === 0) return fragment;

	if (V[armAction] === "mrest") {
		if (random(0, 100) >= 91 && V.earSlime.corruption > currentSkillValue("willpower") / 10 && V.corruptionMasturbation === undefined) {
			V.corruptionMasturbation = true;
			V.corruptionMasturbationCount = random(2, 6);
			fragment.append(span("귓속의 슬라임은 당신이 계속해야 한다고 결정한다.", "red"));
			fragment.append(" ");
			clearAction(0);
		} else {
			clearAction();
		}
		return fragment;
	}

	// Dealing with the players clothes, needs work; what if layer above is not exposed?
	switch (V[armAction]) {
		case "moverupper":
			clearAction("mrest");
			V.worn.over_upper.exposed = 2;
			if (V.worn.over_upper.open) {
				V.worn.over_upper.state_top = "midriff";
				sWikifier(`당신은 <<worn_over_upper_name_ ul>> 끌어내려, <span class="lewd">당신의 <<breastsaside_ rul>> 노출시킨다.</span>`);
			} else {
				V.worn.over_upper.state = "chest";
				sWikifier(`당신은 <<worn_over_upper_name_ ul>> 끌어올려, <span class="lewd">당신의 <<breastsaside_ rul>> 노출시킨다.</span>`);
			}
			fragment.append(" ");
			break;
		case "mupper":
			clearAction("mrest");
			V.worn.upper.exposed = 2;
			if (V.worn.upper.open) {
				V.worn.upper.state_top = "midriff";
				sWikifier(`당신은 <<worn_upper_name_ ul>> 끌어내려, <span class="lewd">당신의 <<breastsaside_ rul>> 노출시킨다.</span>`);
			} else {
				V.worn.upper.state = "chest";
				sWikifier(`당신은 <<worn_upper_name_ ul>> 끌어올려, <span class="lewd">당신의 <<breastsaside_ rul>> 노출시킨다.</span>`);
			}
			fragment.append(" ");
			break;
		case "munder_upper":
			clearAction("mrest");
			V.worn.under_upper.exposed = 2;
			if (V.worn.under_upper.open) {
				V.worn.under_upper.state_top = "midriff";
				if (V.player.breastsize >= 3) {
					sWikifier(`당신이 <<worn_under_upper_name_ ul>> 끌어내리자 <span class="lewd">당신의 <<breasts_ ga>> 털썩 튀어나온다.</span>`);
				} else {
					sWikifier(`당신은 <<worn_under_upper_name_ ul>> 끌어내려, <span class="lewd">당신의 <<breasts_ rul>> 노출시킨다.</span>`);
				}
			} else {
				V.worn.under_upper.state = "chest";
				if (V.player.breastsize >= 3) {
					sWikifier(`당신이 <<worn_under_upper_name_ ul>> 끌어올리자 <span class="lewd">당신의 <<breasts_ ga>> 털썩 튀어나온다.</span>`);
				} else {
					sWikifier(`당신은 <<worn_under_upper_name_ ul>> 끌어올려, <span class="lewd">당신의 <<breasts_ rul>> 노출시킨다.</span>`);
				}
			}
			fragment.append(" ");
			break;
		case "moverlower":
			clearAction("mrest");
			V.worn.over_lower.anus_exposed = 1;
			V.worn.over_lower.vagina_exposed = 1;
			V.worn.over_lower.exposed = 2;
			if (setup.clothes.over_lower[clothesIndex("over_lower", V.worn.over_lower)].skirt) {
				V.worn.over_lower.skirt_down = 0;
				sWikifier(`당신은 <<worn_over_lower_name_ ul>> 잡아올려, <span class="lewd">당신의 <<exposedlower_ rul>> 노출시킨다.</span>`);
			} else {
				V.worn.over_lower.state = "thighs";
				sWikifier(`당신은 <<worn_over_lower_name_ ul>> 끌어내려, <span class="lewd">당신의 <<exposedlower_ rul>> 노출시킨다.</span>`);
			}
			fragment.append(" ");
			break;
		case "mlower":
			clearAction("mrest");
			V.worn.lower.anus_exposed = 1;
			V.worn.lower.vagina_exposed = 1;
			V.worn.lower.exposed = 2;
			if (setup.clothes.lower[clothesIndex("lower", V.worn.lower)].skirt) {
				V.worn.lower.skirt_down = 0;
				sWikifier(`당신은 <<worn_lower_name_ ul>> 잡아올려, <span class="lewd">당신의 <<undies_ rul>> 노출시킨다.</span>`);
			} else {
				V.worn.lower.state = "thighs";
				sWikifier(`당신은 <<worn_lower_name_ ul>> 끌어내려, <span class="lewd">당신의 <<undies_ rul>> 노출시킨다.</span>`);
			}
			fragment.append(" ");
			break;
		case "munder":
			clearAction("mrest");
			V.worn.under_lower.anus_exposed = 1;
			V.worn.under_lower.vagina_exposed = 1;
			V.worn.under_lower.state = "thighs";
			V.worn.under_lower.exposed = 2;
			sWikifier(`당신은 <<worn_under_lower_name_ ul>> 끌어내려, <span class="lewd">당신의 <<genitals_ rul>> 노출시킨다.</span>`);
			fragment.append(" ");
			break;
	}
	if (V[armAction] === 0) return fragment;

	// Action Corrections
	if (V.mouth === "mpenis" || V.mouthaction === "mpenistakein" || V.mouthaction === "mpenissuck") {
		// If your mouth is on your penis, your hands should not have access to your glans
		if (V[armAction] === "mpenisglans") {
			V[armAction] = "mpenisshaft";
			if (doubleAction) V[otherArmAction] = "mpenisshaft";
		}
	}
	if (V.vaginaaction === "mpenisflowerpenetrate" || V.vaginause === "mpenisflowerpenetrate") {
		// If the player vaginally penetrates the phallus flower
		if (V[armAction] === "mvagina") {
			if (V.player.penisExist || V.parasite.clit.name) {
				V[armAction] = "mvaginarub";
				if (doubleAction) V[otherArmAction] = "mvaginarub";
			} else {
				V[armAction] = "mvaginaclit";
				if (doubleAction) V[otherArmAction] = "mvaginaclit";
			}
		}
		if (V.mouthaction === "mvaginaentrance") {
			V.mouthactiondefault = "mrest";
			V.mouthaction = 0;
		}
		if (V.mouth === "mvaginaentrance") {
			V.mouthactiondefault = "mrest";
			V.mouthaction = 0;
			V.mouth = 0;
			fragment.append(span("당신은 당신의 보지에서 입을 치운다."));
		}
		if (V[armAction] === "mvaginatease") {
			clearAction("mrest");
			V[arm + "arm"] = 0;
			if (doubleAction) {
				V[otherArm + "arm"] = 0;
				fragment.append(span("당신은 당신의 보지에서 손가락들을 치운다."));
			} else {
				fragment.append(span("당신은 당신의 보지에서 손가락을 치운다."));
			}
			fragment.append(" ");
		}
	}
	if (V.anusaction === "mpenisflowerpenetrate" || V.anususe === "mpenisflowerpenetrate") {
		// If the player anally penetrates the phallus flower
		if (V[armAction] === "manus") {
			V[armAction] = "manusrub";
			if (doubleAction) V[otherArmAction] = "manusrub";
		}
		if (V[armAction] === "manustease" || V[armAction] === "manusprostate") {
			clearAction("mrest");
			V[arm + "arm"] = 0;
			if (doubleAction) {
				V[otherArm + "arm"] = 0;
				fragment.append(span("당신은 당신의 항문에서 손가락들을 치운다."));
			} else {
				fragment.append(span("당신은 당신의 항문에서 손가락을 치운다."));
			}
			fragment.append(" ");
		}
	}
	if (V.ballssize <= 0 && ((V[arm + "arm"] === "mballs" && V[otherArm + "arm"] === "mballs") || (doubleAction && V[armAction] === "mballsentrance"))) {
		// Tiny balls are too small for both hands
		V.rightactiondefault = "mrest";
		V.rightaction = 0;
		V.rightarm = 0;
		doubleAction = false;
	}
	if (V[armAction] === "mpickupdildo") {
		const currentlySelectedToy = V["selectedToy" + (arm === "left" ? "Left" : "Right")];
		if (
			currentlySelectedToy === V["currentToy" + (arm === "left" ? "Right" : "Left")] ||
			currentlySelectedToy === V.currentToyVagina ||
			currentlySelectedToy === V.currentToyAnus
		) {
			// The player can only a toy in one type of action
			V[armAction] = 0;
			doubleAction = false;
		}
	}
	if (V[armAction] === "mpickupdildo" && V[otherArmAction] === "mpickupdildo" && V.selectedToyLeft === V.selectedToyRight) {
		// The player can only pick up a toy with one hand
		V.rightaction = 0;
		doubleAction = false;
	}
	if (V[armAction] === "mvagina" && doubleAction) {
		// The player can only finger themself with one hand
		V.rightaction = "mvaginarub";
		doubleAction = false;
	}

	// The player can decided to put in more than 1 finger at once
	if (["mvaginafingerstarttwo", "mvaginafingeraddtwo"].includes(V[armAction])) {
		V.mVaginaFingerAdd = 2;
		V[armAction] = V[armAction] === "mvaginafingeraddtwo" ? "mvaginafingeradd" : "mvagina";
	} else if (["mvaginafingeradd", "mvagina"].includes(V[armAction])) {
		V.mVaginaFingerAdd = 1;
	}

	// The player is unable to ride multiple dildo's in their vagina or anus at once
	if (doubleAction && V[armAction] === "mvaginaentrancedildofloor") {
		V.rightactiondefault = "mrest";
		V.rightaction = "mrest";
		doubleAction = false;
	}
	if (doubleAction && V[armAction] === "manusentrancedildofloor") {
		V.rightactiondefault = "mrest";
		V.rightaction = "mrest";
		doubleAction = false;
	}

	// The player is unable to use a dildo on their vagina/anus when using a dildo on the floor
	if (
		["mvaginaentrancedildofloor", "manusentrancedildofloor"].includes(V.leftaction) ||
		["mvaginaentrancedildofloor", "manusentrancedildofloor"].includes(V.rightaction)
	) {
		if (["mvaginaentrancedildo", "manusentrancedildo"].includes(V.leftaction)) {
			V.leftaction = "mrest";
			V.leftactiondefault = "mrest";
		}
		if (["mvaginaentrancedildo", "manusentrancedildo"].includes(V.rightaction)) {
			V.rightaction = "mrest";
			V.rightactiondefault = "mrest";
		}
	}
	if (V.vaginause === "mdildopenetrate" || V.anususe === "mdildopenetrate") {
		if (["mvaginaentrancedildo", "mvaginadildo", "manusentrancedildo", "manusdildo"].includes(V.leftarm)) {
			if (V.leftarm.includes("vagina")) {
				fragment.append(span(`당신은 그것이 닿기 어렵다는 것을 알아차리고 ${toyDisplay(selectedToy("left"), '을')} 보지에서 치운다.`, "red"));
			} else {
				fragment.append(span(`당신은 그것이 닿기 어렵다는 것을 알아차리고 ${toyDisplay(selectedToy("left"), '을')} 항문에서 치운다.`, "red"));
			}
			fragment.append(" ");
			V.leftarm = "mpickupdildo";
			V.leftaction = "mrest";
			V.leftactiondefault = "mrest";
		}
		if (["mvaginaentrancedildo", "mvaginadildo", "manusentrancedildo", "manusdildo"].includes(V.rightarm)) {
			if (V.rightarm.includes("vagina")) {
				fragment.append(span(`당신은 그것이 닿기 어렵다는 것을 알아차리고 ${toyDisplay(selectedToy("right"), '을')} 보지에서 치운다.`, "red"));
			} else {
				fragment.append(span(`당신은 그것이 닿기 어렵다는 것을 알아차리고 ${toyDisplay(selectedToy("right"), '을')} 항문에서 치운다.`, "red"));
			}
			fragment.append(" ");
			V.rightarm = "mpickupdildo";
			V.rightaction = "mrest";
			V.rightactiondefault = "mrest";
		}
	}

	if (V[armAction] === "mrest") return fragment;
	// End of Action Corrections

	// Action setup
	const handsOn = doubleAction ? 2 : 1;
	const altText = {};

	wikifier("ballsize");
	let balls = T.text_output + " ";
	wikifier("testiclesPost", "을");
	balls += T.trResult;

	// Dealing with the players actions
	switch (V[armAction]) {
		case "msemencover":
			clearAction("mrest");
			fragment.append(span("당신은 당신의 정액을 약간 모아 손가락 사이로 비빈다."));
			V[arm + "FingersSemen"] = 1;
			if (doubleAction) V[otherArm + "FingersSemen"] = 1;
			wikifier("arousal", 100, "masturbation");
			break;
		case "mchest":
			wikifier("playWithBreasts", handsOn);
			wikifier("milkvolume", handsOn);
			wikifier("arousal", 100 * handsOn, "masturbationBreasts");

			// The text output currently does not care which hand is used or if both hands are used
			if (V.worn.over_upper.exposed >= 2 && V.worn.upper.exposed >= 2 && V.worn.under_upper.exposed >= 1) {
				wikifier("arousal", 100 * handsOn, "masturbationBreasts");
				if (V.player.breastsize <= 2) {
					if (V.arousal >= (V.arousalmax / 5) * 4) {
						fragment.append(
							span(
								"당신이 당신의 민감한 젖꼭지를 견딜수 있는 한 많이 희롱하자, 손가락이 스칠 때 마다 흥분의 충격이 당신의 몸을 타고 달린다."
							)
						);
					} else if (V.arousal >= (V.arousalmax / 5) * 3) {
						sWikifier(
							"당신은 당신의 <<breasts_ rul>> 애무하며 손가락으로 유륜 주위를 둥글게 문지르면서, 가끔씩 젖꼭지를 살짝 꼬집는다."
						);
					} else {
						sWikifier("당신은 당신의 <<breasts_ rul>> 쓰다듬으며 손가락 사이로 젖꼭지를 비비면서, 음란한 따뜻함이 점점 커지는 것을 느낀다.");
					}
				} else if (V.player.breastsize <= 5) {
					if (V.arousal >= (V.arousalmax / 5) * 4) {
						sWikifier(
							"당신이 <<breasts_ rul>> 감싸고 당신의 민감한 젖꼭지를 견딜수 있는 한 많이 희롱하자, 손가락이 스칠 때 마다 흥분의 충격이 당신의 몸을 타고 달린다."
						);
					} else if (V.arousal >= (V.arousalmax / 5) * 3) {
						sWikifier(
							"당신은 당신의 <<breasts_ rul>> 애무하며 손가락으로 유륜 주위를 둥글게 문지르면서, 가끔씩 젖꼭지를 살짝 꼬집는다."
						);
					} else {
						sWikifier("당신은 당신의 <<breasts_ rul>> 쓰다듬으며 손가락 사이로 젖꼭지를 비비면서, 음란한 따뜻함이 점점 커지는 것을 느낀다.");
					}
				} else {
					if (V.arousal >= (V.arousalmax / 5) * 4) {
						sWikifier(
							"당신은 <<breasts_ rul>> 감싸고 당신의 민감한 젖꼭지를 견딜수 있는 한 많이 희롱한다. 손가락이 스칠 때 마다 흥분의 충격이 당신의 몸을 타고 달린다."
						);
					} else if (V.arousal >= (V.arousalmax / 5) * 3) {
						sWikifier(
							"당신은 당신의 <<breasts_ rul>> 애무하며 손가락으로 유륜 주위를 둥글게 문지르면서, 가끔씩 젖꼭지를 살짝 꼬집는다."
						);
					} else {
						sWikifier("당신은 당신의 <<breasts_ rul>> 쓰다듬으며 손가락 사이로 젖꼭지를 비비면서, 음란한 따뜻함이 점점 커지는 것을 느낀다.");
					}
				}
			} else {
				if (V.player.breastsize <= 2) {
					if (V.arousal >= (V.arousalmax / 5) * 4) {
						sWikifier(
							"당신의 <<nipples_ ga>> 자극에 대한 반응으로 긴장하여, 당신의 <<topPost>> 안에서 발기한 채로 서 있다. 당신은 그것을 견딜 수 있는 한 많이 희롱하고 꼬집는다."
						);
					} else if (V.arousal >= (V.arousalmax / 5) * 3) {
						sWikifier("당신은 당신의 <<breasts_ rul>> 애무하며 <<top_ ul>> 통해 당신의 젖꼭지를 꼬집는다.");
					} else {
						sWikifier(
							"당신은 당신의 <<breasts_ rul>> 쓰다듬으며 손가락 사이로 당신의 젖꼭지를 비빈다. 비록 당신의 <<topaside_ ga>> 사이에 있지만, 좋은 기분이 든다."
						);
					}
				} else if (V.player.breastsize <= 5) {
					if (V.arousal >= (V.arousalmax / 5) * 4) {
						sWikifier(
							"당신의 <<nipples_ ga>> 자극에 대한 반응으로 긴장하여, 당신의 <<topPost>> 안에서 발기한 채로 서 있다. 당신은 당신의 <<breasts_ rul>> 감싸고 당신의 민감한 젖꼭지를 견딜수 있는 한 많이 가지고 논다."
						);
					} else if (V.arousal >= (V.arousalmax / 5) * 3) {
						sWikifier("당신은 당신의 <<breasts_ rul>> 애무하며 <<top_ ul>> 통해 당신의 젖꼭지를 꼬집는다.");
					} else {
						sWikifier(
							"당신은 당신의 <<breasts_ rul>> 쓰다듬으며 손가락 사이로 당신의 젖꼭지를 비빈다. 비록 당신의 <<topaside_ ga>> 사이에 있지만, 좋은 기분이 든다."
						);
					}
				} else {
					if (V.arousal >= (V.arousalmax / 5) * 4) {
						sWikifier(
							"당신의 <<nipples_ ga>> 자극에 대한 반응으로 긴장하여, 당신의 <<topPost>> 안에서 발기한 채로 서 있다. 당신은 당신의 <<breasts_ rul>> 감싸고 당신의 민감한 젖꼭지를 견딜수 있는 한 많이 가지고 논다."
						);
					} else if (V.arousal >= (V.arousalmax / 5) * 3) {
						sWikifier("당신은 당신의 <<breasts_ rul>> 애무하며 <<top_ ul>> 통해 당신의 젖꼭지를 꼬집는다.");
					} else {
						sWikifier(
							"당신은 당신의 <<breasts_ rul>> 쓰다듬으며 손가락 사이로 당신의 젖꼭지를 비빈다. 비록 당신의 <<topaside_ ga>> 사이에 있지만, 좋은 기분이 든다."
						);
					}
				}
			}
			fragment.append(" ");
			if (V.lactating === 1 && V.breastfeedingdisable === "f" && handsOn > 0) {
				if (V.milk_amount >= 1) {
					if (V.worn.over_upper.exposed === 0 || V.worn.upper.exposed === 0 || V.worn.under_upper.exposed === 0) {
						fragment.append(span("모유가 당신의 유두에서 흘러나와, 당신의 웃옷 안으로 흘러내린다.", "lewd"));
						if (V.masturbation_bowl === 1) fragment.append(otherElement("i", " 모유를 모으기를 원한다면 웃옷을 벗어야 한다."));
					} else {
						fragment.append(span("모유가 당신의 유두에서 흘러나온다.", "lewd"));
					}
					fragment.append(" ");
					fragment.append(wikifier("breastfeed", handsOn));
				} else {
					fragment.append(span("모유가 당신의 유두에서 흘러나오지 않는다. 다 말라버린 듯 하다."));
				}
			}
			clearAction(); // Needs to run after any breastfeed widget
			break;
		case "mchastity":
			clearAction();
			sWikifier(
				`당신은 손가락을 당신의 <<worn_genitals_name>> 아래로 집어넣으려 하지만, 실패한다. 당신의 <<genitals_ nun 1>> 당신의 손길을 갈망하지만, 당신이 할 수 있는 것은 아무것도 없다.<<gstress>>`
			);
			wikifier("stress", handsOn);
			break;
		case "mpenisentrance":
			clearAction("mpenisglans");
			V[arm + "arm"] = "mpenisentrance";
			if (doubleAction) V[otherArm + "arm"] = "mpenisentrance";

			if (earSlimeDefy()) {
				// The text output currently does not care which hand is used or if both hands are used
				if (!V.worn.over_lower.vagina_exposed) {
					sWikifier(`당신은 손가락을 당신의 <<penisPost>> 위에서 움직이며${calculatePenisBulge() ? ", <<exposedlowerPost>> 아래의 툭 튀어나온 부분을 느낀다" : ""}.`);
				} else if (!V.worn.lower.vagina_exposed) {
					sWikifier(`당신은 손가락을 당신의 <<penisPost>> 위에서 움직이며${calculatePenisBulge() ? ", <<exposedlowerPost>> 아래의 툭 튀어나온 부분을 느낀다" : ""}.`);
				} else if (!V.worn.under_lower.vagina_exposed) {
					sWikifier(`당신은 손가락을 당신의 <<penisPost>> 위에서 움직이며${calculatePenisBulge() ? ", <<exposedlowerPost>> 아래의 툭 튀어나온 부분을 느낀다" : ""}.`);
				} else {
					sWikifier(`당신은 손가락을 당신의 <<penisPost>> 위에서 움직이다 잠시 움직임을 멈춘다. <span class="red">당신은 아무것도 느낄 수가 없었다.</span>`);
				}
			} else {
				wikifier("arousal", 100 * handsOn, "masturbationGenital");
				// The text output currently does not care which hand is used or if both hands are used
				if (!V.worn.over_lower.vagina_exposed) {
					sWikifier(
						`<span class="blue">당신은 손가락을 당신의 <<penisPost>> 위에서 움직이며${
							calculatePenisBulge() ? ", <<exposedlowerPost>> 아래의 툭 튀어나온 부분을 느낀다" : ""
						}.</span>`
					);
				} else if (!V.worn.lower.vagina_exposed) {
					sWikifier(
						`<span class="blue">당신은 손가락을 당신의 <<penisPost>> 위에서 움직이며${
							calculatePenisBulge() ? ", <<exposedlowerPost>> 아래의 툭 튀어나온 부분을 느낀다" : ""
						}.</span>`
					);
				} else if (!V.worn.under_lower.vagina_exposed) {
					sWikifier(
						`<span class="blue">당신은 손가락을 당신의 <<penisPost>> 위에서 움직이며${
							calculatePenisBulge() ? ", <<exposedlowerPost>> 아래의 툭 튀어나온 부분을 느낀다" : ""
						}.</span>`
					);
				} else {
					sWikifier('<span class="blue">당신은 손가락을 당신의 <<penisPost>> 위에서 움직이며 기대감에 몸을 떤다.</span>');
				}
			}
			break;
		case "mchastityparasiteentrance":
			clearAction("mchastityparasiterub");
			V[arm + "arm"] = "mchastityparasiteentrance";
			if (doubleAction) V[otherArm + "arm"] = "mchastityparasiteentrance";
			if (V.earSlime.defyCooldown) {
				// The text output currently does not care which hand is used or if both hands are used
				if (!V.worn.over_lower.vagina_exposed) {
					sWikifier(
						`<span class="blue">당신은 손가락을 기생충 정조대 자지 위에서 움직이며${
							calculatePenisBulge() ? ", <<exposedlowerPost>> 아래의 툭 튀어나온 부분을 느낀다" : ""
						}.</span>`
					);
				} else if (!V.worn.lower.vagina_exposed) {
					sWikifier(
						`<span class="blue">당신은 손가락을 기생충 정조대 자지 위에서 움직이며${
							calculatePenisBulge() ? ", <<exposedlowerPost>> 아래의 툭 튀어나온 부분을 느낀다" : ""
						}.</span>`
					);
				} else if (!V.worn.under_lower.vagina_exposed) {
					sWikifier(
						`<span class="blue">당신은 손가락을 기생충 정조대 자지 위에서 움직이며${
							calculatePenisBulge() ? ", <<exposedlowerPost>> 아래의 툭 튀어나온 부분을 느낀다" : ""
						}.</span>`
					);
				} else {
					sWikifier(`당신은 손가락을 기생충 정조대 자지 위에서 움직이다 잠시 움직임을 멈춘다. <span class="red">당신은 아무것도 느낄 수가 없었다.</span>`);
				}
			} else {
				wikifier("arousal", 200 * handsOn, "masturbationGenital");
				// The text output currently does not care which hand is used or if both hands are used
				if (!V.worn.over_lower.vagina_exposed) {
					sWikifier(
						`<span class="blue">당신은 손가락을 기생충 정조대 자지 위에서 움직이며${
							calculatePenisBulge() ? ", <<exposedlowerPost>> 아래의 툭 튀어나온 부분을 느낀다" : ""
						}.</span>`
					);
				} else if (!V.worn.lower.vagina_exposed) {
					sWikifier(
						`<span class="blue">당신은 손가락을 기생충 정조대 자지 위에서 움직이며${
							calculatePenisBulge() ? ", <<exposedlowerPost>> 아래의 툭 튀어나온 부분을 느낀다" : ""
						}.</span>`
					);
				} else if (!V.worn.under_lower.vagina_exposed) {
					sWikifier(
						`<span class="blue">당신은 손가락을 기생충 정조대 자지 위에서 움직이며${
							calculatePenisBulge() ? ", <<exposedlowerPost>> 아래의 툭 튀어나온 부분을 느낀다" : ""
						}.</span>`
					);
				} else {
					sWikifier('<span class="blue">당신은 손가락을 기생충 정조대 자지 위에서 움직이며 기대감에 몸을 떤다.</span>');
				}
				if (!V.earSlime.vibration) {
					V.earSlime.vibration = 1;
					wikifier("arousal", 50, "masturbationGenital");
					sWikifier(' <span class="lewd">그것은 당신의 <<penisPost>> 주위에서 부드럽게 고동치기 시작한다.</span>');
				}
			}
			break;
		case "mpenisglans":
			clearAction();
			if (earSlimeDefy()) {
				wikifier("arousal", 100 * handsOn, "masturbationPenis");
				wikifier("pain", 1);
				additionalEffect.earSlimeDefy.pushUnique(V.player.virginity.penile === true ? "동정 자지" : "자지");
				sWikifier(`무언가 느끼도록 당신은 당신의 포피를 거칠게 비비라고 강요된다.`);
			} else if (V.earSlime.corruption >= 100 && V.earSlime.growth >= 100 && V.earSlime.focus === "impregnation") {
				wikifier("arousal", 400 * handsOn, "masturbationPenis");
				if (V.player.virginity.penile === true) {
					if (V.arousal >= (V.arousalmax / 5) * 4) {
						fragment.append(
							span(
								"당신은 쿠퍼액으로 뒤덮인 동정 포피를 열정적으로 점점 빠르게 비벼댄다. 이상한 느낌이 그 끝에서 온몸을 통해 퍼진다."
							)
						);
					} else if (V.arousal >= (V.arousalmax / 5) * 3) {
						fragment.append(
							span(
								"당신은 쿠퍼액으로 뒤덮인 동정 포피를 당신의 엄지손가락으로 비비며 열정적으로 그 끝을 만지작거린다. 당신이 잡아당길 수는 없어도 그것은 예민하다."
							)
						);
					} else {
						fragment.append(
							span("당신은 동정 자지의 끝부분을 손바닥 안에 잡고 당신의 엄지손가락으로 쿠퍼액으로 덮인 포피를 열정적으로 비벼댄다.")
						);
					}
				} else {
					if (V.arousal >= (V.arousalmax / 5) * 4) {
						fragment.append(
							span(
								"당신은 쿠퍼액으로 뒤덮인 포피를 열정적으로 잡아당겼다 놓았다 하면서, 당신의 귀두 위로 계속 계속 비벼댄다. 쾌감이 그 끝에서 온몸을 통해 퍼진다."
							)
						);
					} else if (V.arousal >= (V.arousalmax / 5) * 3) {
						fragment.append(span("당신은 쿠퍼액으로 뒤덮인 포피를 당신의 귀두에 대고 열정적으로 비비면서 그 사이의 소대를 희롱한다."));
					} else {
						sWikifier("당신은 쿠퍼액으로 뒤덮인 <<penis_ rul>> 당신의 손바닥 안에 잡고 포피를 당신의 귀두에 대고 비빈다.");
					}
				}
			} else {
				wikifier("arousal", 200 * handsOn, "masturbationPenis");
				if (handsOn === 2) {
					if (V.player.virginity.penile === true) {
						if (V.arousal >= (V.arousalmax / 5) * 4) {
							fragment.append(
								span("당신은 동정 포피를 점점 빠르게 비벼댄다. 이상한 느낌이 그 끝에서 온몸을 통해 퍼진다.")
							);
						} else if (V.arousal >= (V.arousalmax / 5) * 3) {
							fragment.append(
								span("당신은 동정 포피를 당신의 엄지손가락으로 비비며 그 끝을 만지작거린다. 당신이 잡아당길 수는 없어도 그것은 예민하다.")
							);
						} else {
							fragment.append(span("당신은 동정 자지의 끝부분을 손바닥 안에 잡고 당신의 엄지손가락으로 포피를 부드럽게 비빈다."));
						}
					} else {
						if (V.arousal >= (V.arousalmax / 5) * 4) {
							fragment.append(span("당신은 포피를 잡아당겼다 놓았다 하면서, 당신의 귀두 위로 계속 계속 비벼댄다."));
						} else if (V.arousal >= (V.arousalmax / 5) * 3) {
							fragment.append(span("당신은 포피를 당신의 귀두에 대고 비비면서 그 사이의 소대를 희롱한다."));
						} else {
							sWikifier("당신은 <<penis_ rul>> 당신의 손바닥 안에 잡고 포피를 당신의 귀두에 대고 비빈다.");
						}
					}
				} else {
					if (V.player.virginity.penile === true) {
						if (V.arousal >= (V.arousalmax / 5) * 4) {
							fragment.append(
								span("당신은 동정 포피를 점점 빠르게 비벼댄다. 이상한 느낌이 그 끝에서 온몸을 통해 퍼진다.")
							);
						} else if (V.arousal >= (V.arousalmax / 5) * 3) {
							fragment.append(
								span("당신은 동정 포피를 당신의 엄지손가락으로 비비며 그 끝을 만지작거린다. 당신이 잡아당길 수는 없어도 그것은 예민하다.")
							);
						} else {
							fragment.append(span("당신은 동정 자지의 끝부분을 손바닥 안에 잡고 당신의 엄지손가락으로 포피를 부드럽게 비빈다."));
						}
					} else {
						if (V.arousal >= (V.arousalmax / 5) * 4) {
							fragment.append(span("당신은 포피를 잡아당겼다 놓았다 하면서, 당신의 귀두 위로 계속 계속 비벼댄다."));
						} else if (V.arousal >= (V.arousalmax / 5) * 3) {
							fragment.append(span("당신은 포피를 당신의 귀두에 대고 비비면서 그 사이의 소대를 희롱한다."));
						} else {
							sWikifier("당신은 <<penis_ rul>> 당신의 손바닥 안에 잡고 포피를 당신의 귀두에 대고 비빈다.");
						}
					}
				}
			}
			break;
		case "mpenisshaft":
			clearAction();
			if (earSlimeDefy()) {
				wikifier("arousal", 100 * handsOn, "masturbationPenis");
				wikifier("pain", 1);
				additionalEffect.earSlimeDefy.pushUnique(V.player.virginity.penile === true ? "동정 자지" : "자지");
				sWikifier(`무언가 느끼도록 당신은 당신의 손가락들로 거칠게 위아래로 비비라고 강요된다.`);
			} else if (V.earSlime.corruption >= 100 && V.earSlime.growth >= 100 && V.earSlime.focus === "impregnation") {
				wikifier("arousal", 400 * handsOn, "masturbationPenis");
				if (V.player.virginity.penile === true) {
					if (V.arousal >= (V.arousalmax / 5) * 4) {
						fragment.append(
							span("당신이 쿠퍼액으로 뒤덮인 동정 자지를 손가락들로 거칠게 비벼대자, 음란한 따뜻함이 몸 전체에서 생겨난다.")
						);
					} else if (V.arousal >= (V.arousalmax / 5) * 3) {
						fragment.append(span("당신은 손가락들로 당신의 쿠퍼액으로 뒤덮인 동정 자지를 육봉 끝에서 끝까지 열정적으로 위아래로 비벼댄다."));
					} else {
						sWikifier("당신은 손가락들을 당신의 <<penisPost>> 아래쪽으로 움직이며, 음란한 따뜻함을 즐긴다.");
					}
				} else {
					if (V.arousal >= (V.arousalmax / 5) * 4) {
						sWikifier("당신이 당신의 <<penis_ rul>> 육봉 끝에서 끝까지 거칠게 위아래로 펌프질하자, 넘쳐나는 쿠퍼액이 그 끝에서 튀어 날아간다.");
					} else if (V.arousal >= (V.arousalmax / 5) * 3) {
						fragment.append(
							span("당신이 손가락들을 쿠퍼액으로 뒤덮인 육봉의 위아래로 열정적으로 움직이자, 음란한 따뜻함이 몸 전체에서 생겨난다.")
						);
					} else {
						sWikifier("당신이 당신의 <<penis_ rul>> 육봉 끝에서 끝까지 애무하자, 음란한 따뜻함이 생겨난다.");
					}
				}
			} else {
				wikifier("arousal", 200 * handsOn, "masturbationPenis");
				if (handsOn === 2) {
					if (V.player.virginity.penile === true) {
						if (V.arousal >= (V.arousalmax / 5) * 4) {
							fragment.append(span("당신은 손가락들로 당신의 동정 자지를 포피가 허용하는 한 거칠게 비벼댄다."));
						} else if (V.arousal >= (V.arousalmax / 5) * 3) {
							fragment.append(span("당신은 손가락들로 당신의 동정 자지를 육봉 끝에서 끝까지 위아래로 비벼댄다."));
						} else {
							sWikifier("당신은 손가락들을 당신의 <<penisPost>> 아래쪽으로 움직이며, 그 느낌을 즐긴다.");
						}
					} else {
						if (V.arousal >= (V.arousalmax / 5) * 4) {
							sWikifier("당신은 당신의 <<penis_ rul>> 육봉 끝에서 끝까지 위아래로 펌프질한다.");
						} else if (V.arousal >= (V.arousalmax / 5) * 3) {
							fragment.append(span("당신이 손가락들을 당신의 육봉 위아래로 움직이면서, 살짝 자극하자 음란한 따뜻함이 생겨난다."));
						} else {
							sWikifier("당신은 천천히 당신의 <<penis_ rul>> 육봉 끝에서 끝까지 애무한다.");
						}
					}
				} else {
					if (V.player.virginity.penile === true) {
						if (V.arousal >= (V.arousalmax / 5) * 4) {
							fragment.append(span("당신은 손가락들로 당신의 동정 자지를 포피가 허용하는 한 거칠게 비벼댄다."));
						} else if (V.arousal >= (V.arousalmax / 5) * 3) {
							fragment.append(span("당신은 손가락들로 당신의 동정 자지를 육봉 끝에서 끝까지 위아래로 비벼댄다."));
						} else {
							sWikifier("당신은 손가락들을 당신의 <<penisPost>> 아래쪽으로 움직이며, 그 느낌을 즐긴다.");
						}
					} else {
						if (V.arousal >= (V.arousalmax / 5) * 4) {
							sWikifier("당신은 당신의 <<penis_ rul>> 육봉 끝에서 끝까지 위아래로 펌프질한다.");
						} else if (V.arousal >= (V.arousalmax / 5) * 3) {
							fragment.append(span("당신이 손가락들을 당신의 육봉 위아래로 움직이면서, 살짝 자극하자 음란한 따뜻함이 생겨난다."));
						} else {
							sWikifier("당신은 천천히 당신의 <<penis_ rul>> 육봉 끝에서 끝까지 애무한다.");
						}
					}
				}
			}
			break;
		case "mpenisstop":
			clearAction("mrest");
			V[arm + "arm"] = 0;
			if (doubleAction) {
				V[otherArm + "arm"] = 0;
				sWikifier('<span class="lblue">당신은 양손을 당신의 <<penisPost>>에서 치운다.</span>');
			} else {
				sWikifier(`<span class="lblue">당신은 <<hand_ rul '${arm}'>> 당신의 <<penisPost>>에서 치운다.</span>`);
			}
			break;
		case "mchastityparasiterub":
			clearAction();
			if (earSlimeDefy()) {
				wikifier("arousal", 100 * handsOn, "masturbationPenis");
				wikifier("pain", 1 * handsOn);
				additionalEffect.earSlimeDefy.pushUnique(V.player.virginity.penile === true ? "동정 자지" : "자지");
				sWikifier(`당신은 부드럽게 기생충 자지를 애무한다.`);
			} else if (!V.canSelfSuckPenis && playerIsPregnant() && playerPregnancyProgress() >= 10 && V.earSlime.corruption >= 100) {
				altText.eagerly = V.arousal >= V.arousalmax * (1 / 5) ? "열정적으로" : "천천히";
				wikifier("arousal", 500, "masturbationPenis");
				V.earSlime.vibration += handsOn * 4;
				if (V.arousal >= (V.arousalmax / 5) * 3) {
					wikifier("arousal", 500, "masturbationPenis");
					sWikifier(
						`당신이 기생충 자지를 희롱하려 애쓰자, 각각, <span class="lewd">기생충이 쾌감의 물결을 당신의 몸 전체로 보내고</span>, 당신은 그것을 거의 참기가 어렵다.`
					);
				} else {
					sWikifier(
						`당신이 ${altText.eagerly} 기생충 자지를 애무하자, 각각, <span class="lewd">기생충이 쾌감의 물결을 당신의 몸 전체로 보낸다.</span>`
					);
				}
			} else {
				wikifier("arousal", 200 * handsOn, "masturbationPenis");
				if (V.arousal >= (V.arousalmax / 5) * 4) {
					V.earSlime.vibration += handsOn * 2;
					fragment.append(
						span(
							`당신은 가능한 거칠게 기생충 자지를 희롱하며, 당신의 ${
								V.player.virginity.penile === true ? "동정 자지" : "자지"
							}에 직접적으로 느껴지는 쾌감을 즐긴다.`
						)
					);
				} else if (V.arousal >= (V.arousalmax / 5) * 3) {
					fragment.append(
						span(
							`당신은 기생충 자지를 여러 방법으로 비벼대며, 당신의 ${
								V.player.virginity.penile === true ? "동정 자지" : "자지"
							}에 직접적으로 교차하는 느낌을 즐긴다.`
						)
					);
				} else {
					fragment.append(
						span(
							`당신이 부드럽게 기생충 자지를 애무하자, 그것은 당신의 ${
								V.player.virginity.penile === true ? "동정 자지" : "자지"
							}에 직접적으로 쾌감을 전해준다.`
						)
					);
				}
			}
			break;
		case "mchastityparasitesqueeze":
			clearAction();
			if (earSlimeDefy()) {
				wikifier("arousal", 100 * handsOn, "masturbationPenis");
				wikifier("pain", 1 * handsOn);
				additionalEffect.earSlimeDefy.pushUnique(V.player.virginity.penile === true ? "동정 자지" : "자지");
				sWikifier(`당신은 부드럽게 기생충 자지를 쥐어짠다.`);
			} else if (!V.canSelfSuckPenis && playerIsPregnant() && playerPregnancyProgress() >= 0.1 && V.earSlime.corruption >= 100) {
				altText.eagerly = V.arousal >= V.arousalmax * (1 / 5) ? "열정적으로" : "천천히";
				wikifier("arousal", 500 * handsOn, "masturbationGenital");
				V.earSlime.vibration += 4;
				if (V.arousal >= (V.arousalmax / 5) * 3) {
					wikifier("arousal", 500, "masturbationPenis");
					sWikifier(
						`당신이 기생충 자지를 쥐어짜려 애쓰자, 각각, <span class="lewd">기생충이 쾌감의 물결을 당신의 몸 전체로 보내고</span>, 당신은 그것을 거의 참기가 어렵다.`
					);
				} else {
					sWikifier(
						`당신이 ${altText.eagerly} 기생충 자지를 쥐어짜자, 각각, <span class="lewd">기생충이 쾌감의 물결을 당신의 몸 전체로 보낸다.</span>`
					);
				}
			} else {
				wikifier("arousal", 200 * handsOn, "masturbationPenis");
				if (V.arousal >= (V.arousalmax / 5) * 4) {
					V.earSlime.vibration += handsOn * 2;
					fragment.append(
						span(
							`당신은 반복적으로 기생충 자지와 당신의 ${
								V.player.virginity.penile === true ? "동정 자지" : "자지"
							}를 쥐어짜며, 당신이 줄 수 있는 제한적인 관심을 즐긴다.`
						)
					);
				} else if (V.arousal >= (V.arousalmax / 5) * 3) {
					fragment.append(
						span(`당신은 기생충 자지를 쥐어짜며, 당신의 ${V.player.virginity.penile === true ? "동정 자지" : "자지"}도 동시에 쥐어짠다.`)
					);
				} else {
					fragment.append(
						span(
							`당신은 부드럽게 기생충 자지를 쥐어짜며, 그것이 둘러싸고 있는 ${V.player.virginity.penile === true ? "동정 자지" : "자지"}를 느낀다.`
						)
					);
				}
			}
			// Help shrink the penis only when both pregnant and with a penis size of mini, had trouble reaching micro without additional help
			if (
				playerIsPregnant() &&
				playerPregnancyProgress() >= 0.1 &&
				V.player.penissize === -1 &&
				random(0, 100) >= 75 &&
				(!V.daily.chastityParasizeSizeReduction || V.daily.chastityParasizeSizeReduction < 400)
			) {
				V.penisgrowthtimer++;
				V.daily.chastityParasizeSizeReduction = (V.daily.chastityParasizeSizeReduction || 0) + 1;
			}
			break;
		case "mchastityparasitestop":
			clearAction("mrest");
			V[arm + "arm"] = 0;
			if (doubleAction) {
				V[otherArm + "arm"] = 0;
				sWikifier('<span class="lblue">당신은 양손을 기생충 정조대에서 치운다.</span>');
			} else {
				sWikifier(`<span class="lblue">당신은 <<hand_ rul '${arm}'>> 기생충 정조대에서 치운다.</span>`);
			}
			break;
		case "mballsstop":
			clearAction("mrest");
			V[arm + "arm"] = 0;
			if (doubleAction) {
				V[otherArm + "arm"] = 0;
				fragment.append(span("당신은 양손을 당신의 고환에서 치운다.", "lblue"));
			} else {
				fragment.append(span(`당신은 ${handPost(arm, '을')} 당신의 고환에서 치운다.`, "lblue"));
			}
			break;
		case "mballsfondle":
			clearAction();
			if (earSlimeDefy()) {
				wikifier("arousal", 50 * handsOn, "masturbationPenis");
				wikifier("pain", 1);
				additionalEffect.earSlimeDefy.pushUnique("balls");
				sWikifier(`무언가 느끼도록 당신은 거칠게 ${balls} 더듬으라고 강요된다.`);
			} else {
				wikifier("arousal", 100 * handsOn, "masturbationPenis");
				additionalEffect.hands = "ballplayeffects";
				if (handsOn === 2) {
					if (V.arousal >= V.arousalmax * (4 / 5)) {
						fragment.append(
							span(
								`당신은 양손으로 당신의 ${balls} 더듬으며 그것이 당신의 자지 밑둥에서 긴장하며 꽉 조이는 느낌을 즐긴다.`
							)
						);
					} else if (V.arousal >= V.arousalmax * (3 / 5)) {
						fragment.append(span(`당신은 양손으로 당신의 ${balls} 애무하며 그 간지러운 느낌을 즐긴다.`));
					} else if (V.arousal >= V.arousalmax * (2 / 5)) {
						fragment.append(span(`당신은 양손 안의 ${balls} 이리저리 움직이며 그 무게감을 즐긴다.`));
					} else {
						fragment.append(span(`당신은 양손 안의 ${balls} 이리저리 굴린다.`));
					}
				} else {
					altText.oneOfYour = V.ballssize <= 0 ? `당신의 양쪽 ${balls}` : additionalEffect.hands ? "다른쪽을" : `당신의 한쪽 ${balls}`;
					if (V.arousal >= V.arousalmax * (4 / 5)) {
						sWikifier(
							`당신은 <<hand_ ro '${arm}'>> ${altText.oneOfYour} 더듬으며 그것이 당신의 <<penisPost>> 밑둥에서 긴장하며 꽉 조이는 느낌을 즐긴다.`
						);
					} else if (V.arousal >= V.arousalmax * (3 / 5)) {
						fragment.append(span(`당신은 ${handPost(arm, '으로')} ${altText.oneOfYour} 애무하며 그 간지러운 느낌을 즐긴다.`));
					} else if (V.arousal >= V.arousalmax * (2 / 5)) {
						fragment.append(span(`당신은 ${handPost(arm)} 안의 ${altText.oneOfYour} 이리저리 움직이며 그 무게감을 즐긴다.`));
					} else {
						fragment.append(span(`당신은 ${handPost(arm, '으로')} ${altText.oneOfYour} 쓰다듬는다.`));
					}
				}
			}
			break;
		case "mballssqueeze":
			clearAction();
			if (earSlimeDefy()) {
				wikifier("arousal", 100 * handsOn, "masturbationPenis");
				wikifier("pain", 1);
				additionalEffect.earSlimeDefy.pushUnique("balls");
				sWikifier(`무언가 느끼도록 당신은 거칠게 ${balls} 쥐어짜라고 강요된다.`);
			} else {
				wikifier("arousal", 200 * handsOn, "masturbationPenis");
				additionalEffect.hands = "ballplayeffects";
				altText.gently = V.arousal >= V.arousalmax * (4 / 5) ? "절박하게" : V.arousal >= V.arousalmax * (3 / 5) ? "" : "부드럽게";
				if (handsOn === 2) {
					switch (V.ballssize) {
						case 1:
						case 2:
							fragment.append(span(`당신은 양손으로 당신의 ${balls} 감싸고 ${altText.gently} 쥐어짠다.`));
							break;
						case 3:
							fragment.append(span(`당신은 양손으로 당신의 ${balls} 감싸고 ${altText.gently} 쥐어짠다.`));
							break;
						case 4:
							fragment.append(span(`당신은 양손으로 ${altText.gently} 당신의 ${balls} 쥐어짠다.`));
							break;
						default:
							fragment.append(span("이 문장은 나오지 말아야 합니다.", "red"));
							break;
					}
				} else {
					altText.oneOfYour = V.ballssize <= 0 ? `당신의 양쪽 ${balls}` : additionalEffect.hands ? "다른쪽을" : `당신의 한쪽 ${balls}`;
					switch (V.ballssize) {
						case 1:
						case 2:
							fragment.append(span(`당신은 ${handPost(arm, '으로')} ${altText.oneOfYour} 감싸고 ${altText.gently} 쥐어짠다.`));
							break;
						case 3:
							fragment.append(span(`당신은 ${handPost(arm, '으로')} ${altText.oneOfYour} 감싸고 ${altText.gently} 쥐어짠다.`));
							break;
						case 4:
							fragment.append(span(`당신은 ${handPost(arm, '으로')} ${altText.oneOfYour} 감싸고 ${altText.gently} 쥐어짠다.`));
							break;
						default:
							fragment.append(span(`당신은 ${handPost(arm, '으로')} 당신의 ${balls} 감싸고 ${altText.gently} 쥐어짠다.`));
							break;
					}
				}
			}
			break;
		case "mballsentrance":
			clearAction("mballsfondle");
			V[arm + "arm"] = "mballs";
			if (doubleAction) V[otherArm + "arm"] = "mballs";
			if (V.earSlime.defyCooldown && V.earSlime.growth >= 100) {
				if (handsOn === 2) {
					switch (V.ballssize) {
						case 1:
						case 2:
							fragment.append(span(`당신은 ${balls} 각각의 손에 한쪽씩 나눠잡는다`));
							break;
						case 3:
							fragment.append(span(`당신은 ${balls} 각각의 손에 한쪽씩 나눠잡는다. 그것들은 당신의 손바닥에 딱 들어온다`));
							break;
						case 4:
							fragment.append(span(`당신은 ${balls} 각각의 손에 한쪽씩 나눠잡는다. 당신은 간신히 그것들을 양손으로 감싼다`));
							break;
						default:
							fragment.append(span("이 문장은 나오지 말아야 합니다.", "red"));
							break;
					}
				} else {
					altText.oneOfYour = V.ballssize <= 0 ? `당신의 양쪽 ${balls}` : additionalEffect.hands ? "다른쪽을" : `당신의 한쪽 ${balls}`;
					switch (V.ballssize) {
						case 1:
						case 2:
							fragment.append(span(`당신은 ${handPost(arm, '으로')} ${altText.oneOfYour} 잡는다`));
							break;
						case 3:
							fragment.append(span(`당신은 ${handPost(arm, '으로')} ${altText.oneOfYour} 잡는다. 그것은 당신의 손바닥에 딱 들어온다`));
							break;
						case 4:
							fragment.append(span(`당신은 ${handPost(arm, '으로')} ${altText.oneOfYour} 잡는다. 당신은 간신히 그것을 손으로 감싼다`));
							break;
						default:
							fragment.append(span(`당신은 ${handPost(arm, '으로')} 당신의 양쪽 ${balls} 가뿐하게 잡는다`));
							break;
					}
				}
				fragment.append(span(`. 당신은 잠시 움직임을 멈춘다. `));
				fragment.append(span(`당신은 아무것도 느낄 수가 없었다.`, "red"));
			} else {
				additionalEffect.hands = "ballplayeffects";
				wikifier("arousal", 100 * handsOn, "masturbationPenis");
				if (handsOn === 2) {
					switch (V.ballssize) {
						case 1:
						case 2:
							fragment.append(span(`당신은 ${balls} 각각의 손에 한쪽씩 나눠잡는다.`, "blue"));
							break;
						case 3:
							fragment.append(span(`당신은 ${balls} 각각의 손에 한쪽씩 나눠잡는다. 그것들은 당신의 손바닥에 딱 들어온다.`, "blue"));
							break;
						case 4:
							fragment.append(span(`당신은 ${balls} 각각의 손에 한쪽씩 나눠잡는다. 당신은 간신히 그것들을 양손으로 감싼다.`, "blue"));
							break;
						default:
							fragment.append(span("이 문장은 나오지 말아야 합니다.", "red"));
							break;
					}
				} else {
					altText.oneOfYour = V.ballssize <= 0 ? `당신의 양쪽 ${balls}` : additionalEffect.hands ? "다른쪽을" : `당신의 한쪽 ${balls}`;
					switch (V.ballssize) {
						case 1:
						case 2:
							fragment.append(span(`당신은 ${handPost(arm, '으로')} ${altText.oneOfYour} 잡는다.`, "blue"));
							break;
						case 3:
							fragment.append(span(`당신은 ${handPost(arm, '으로')} ${altText.oneOfYour} 잡는다. 그것은 당신의 손바닥에 딱 들어온다.`, "blue"));
							break;
						case 4:
							fragment.append(span(`당신은 ${handPost(arm, '으로')} ${altText.oneOfYour} 잡는다. 당신은 간신히 그것을 손으로 감싼다.`, "blue"));
							break;
						default:
							fragment.append(span(`당신은 ${handPost(arm, '으로')} 당신의 양쪽 ${balls} 가뿐하게 잡는다`, "blue"));
							break;
					}
				}
			}
			break;
		case "mpenisW":
			clearAction();
			wikifier("arousal", 200 * handsOn, "masturbationPenis");
			if (doubleAction) {
				altText.hands = "hands";
			} else {
				altText.hands = arm + " hand";
			}
			if (V.worn.genitals.name === "chastity parasite") {
				if (V.arousal >= (V.arousalmax / 5) * 4) {
					fragment.append(
						span(
							`당신은 가능한 거칠게 기생충 자지를 희롱하며, 당신의 ${
								V.player.virginity.penile === true ? "동정 자지" : "자지"
							}에 직접적으로 느껴지는 쾌감을 즐긴다.`
						)
					);
				} else if (V.arousal >= (V.arousalmax / 5) * 3) {
					fragment.append(
						span(
							`당신은 기생충 자지를 여러 방법으로 비벼대며, 당신의 ${
								V.player.virginity.penile === true ? "동정 자지" : "자지"
							}에 직접적으로 교차하는 느낌을 즐긴다.`
						)
					);
				} else {
					fragment.append(
						span(
							`당신이 부드럽게 기생충 자지를 애무하자, 그것은 당신의 ${
								V.player.virginity.penile === true ? "동정 자지" : "자지"
							}에 직접적으로 쾌감을 전해준다.`
						)
					);
				}
			} else {
				if (V.arousal >= (V.arousalmax / 5) * 4) {
					sWikifier(`당신의 <<hand_ ga '${altText.hands}'>> 당신의 <<penis_ rul>> 육봉 끝에서 끝까지 위아래로 거칠게 펌프질한다.`);
				} else if (V.arousal >= (V.arousalmax / 5) * 3) {
					fragment.append(span(`당신의 <<hand_ ga '${altText.hands}'>> 손가락들을 당신의 육봉 위아래로 움직이면서, 살짝 자극하자 음란한 따뜻함이 생겨난다.`));
				} else {
					sWikifier(`당신의 <<hand_ ga '${altText.hands}'>> 부자연스러운 움직임으로 당신의 <<penis_ rul>> 육봉 끝에서 끝까지 애무한다.`);
				}
			}
			break;
		case "mbreastW":
			wikifier("arousal", 200 * handsOn, "masturbationBreasts");
			if (doubleAction) {
				altText.hands = "hands";
			} else {
				altText.hands = arm + " hand";
			}
			if (V.player.breastsize < 2) {
				if (V.arousal >= (V.arousalmax / 5) * 4) {
					sWikifier(
						`당신의 <<hand_ ga '${altText.hands}'>> 당신의 민감한 젖꼭지를 견디지 못할 정도로 희롱하자, 손가락이 스칠 때 마다 흥분의 충격이 당신의 몸을 타고 달린다.`
					);
				} else if (V.arousal >= (V.arousalmax / 5) * 3) {
					sWikifier(
						`당신의 <<hand_ ga '${altText.hands}'>> 당신의 <<breasts_ rul>> 애무하며 손가락으로 유륜 주위를 둥글게 문지르면서, 가끔씩 젖꼭지를 살짝 꼬집는다.`
					);
				} else {
					sWikifier(`당신의 <<hand_ ga '${altText.hands}'>> 당신의 <<breasts_ rul>> 쓰다듬으며 손가락 사이로 젖꼭지를 비비면서, 음란한 따뜻함을 점점 커지게 한다.`);
				}
			} else if (V.player.breastsize < 5) {
				if (V.arousal >= (V.arousalmax / 5) * 4) {
					sWikifier(
						`당신의 <<hand_ ga '${altText.hands}'>> <<breasts_ rul>> 감싸고 당신의 민감한 젖꼭지를 견디지 못할 정도로 희롱하자, 손가락이 스칠 때 마다 흥분의 충격이 당신의 몸을 타고 달린다.`
					);
				} else if (V.arousal >= (V.arousalmax / 5) * 3) {
					sWikifier(
						`당신의 <<hand_ ga '${altText.hands}'>> 당신의 <<breasts_ rul>> 애무하며 손가락으로 유륜 주위를 둥글게 문지르면서, 가끔씩 젖꼭지를 살짝 꼬집는다.`
					);
				} else {
					sWikifier(`당신의 <<hand_ ga '${altText.hands}'>> 당신의 <<breasts_ rul>> 쓰다듬으며 손가락 사이로 젖꼭지를 비비면서, 음란한 따뜻함을 점점 커지게 한다.`);
				}
			} else {
				if (V.arousal >= (V.arousalmax / 5) * 4) {
					sWikifier(
						`당신의 <<hand_ ga '${altText.hands}'>> <<breasts_ rul>> 감싸고 당신의 민감한 젖꼭지를 견디지 못할 정도로 희롱한다. 손가락이 스칠 때 마다 흥분의 충격이 당신의 몸을 타고 달린다.`
					);
				} else if (V.arousal >= (V.arousalmax / 5) * 3) {
					sWikifier(
						`당신의 <<hand_ ga '${altText.hands}'>> 당신의 <<breasts_ rul>> 애무하며 손가락으로 유륜 주위를 둥글게 문지르면서, 가끔씩 젖꼭지를 살짝 꼬집는다.`
					);
				} else {
					sWikifier(`당신의 <<hand_ ga '${altText.hands}'>> 당신의 <<breasts_ rul>> 쓰다듬으며 손가락 사이로 젖꼭지를 비비면서, 당신은 음란한 따뜻함이 점점 커지는 것을 느낀다.`);
				}
			}
			if (V.milk_amount >= 1) {
				fragment.append(" ");
				fragment.append(span("모유가 당신의 유두에서 흘러나온다.", "lewd"));
				fragment.append(wikifier("breastfeed", handsOn));
			}
			clearAction(); // Needs to run after any breastfeed widget
			break;
		case "mvaginaW":
			clearAction();
			wikifier("arousal", 200 * handsOn, "masturbationVagina");
			if (doubleAction) {
				altText.hands = "hands";
			} else {
				altText.hands = arm + " hand";
			}
			if (V.arousal >= (V.arousalmax / 5) * 4) {
				switch (random(1, 3)) {
					case 1:
						sWikifier(`당신의 손가락들이 <<pussyPost>>에 꿈틀거리면서 들락날락하며, 갑작스럽게 날카로운 찌르기로 당신을 범한다.`);
						break;
					case 2:
						sWikifier(`당신의 클리토리스가 손가락들 사이에서 까질 듯이 비벼지며, 한 순간도 회복할 틈을 주기를 거부한다.`);
						break;
					case 3:
						sWikifier(`당신의 손가락들이 <<pussyPost>> 안에서 전율하며, 당신의 온몸을 음란한 진동으로 고문한다.`);
						break;
				}
			} else if (V.arousal >= (V.arousalmax / 5) * 3) {
				switch (random(1, 3)) {
					case 1:
						sWikifier(`당신의 <<hand_ ga '${altText.hands}'>> <<pussy_ rul>> 탐색하며, 안으로 들어가기 위해 서로를 향해 갑자기 움직인다.`);
						break;
					case 2:
						sWikifier(`당신의 <<hand_ ga '${altText.hands}'>> 거칠게 <<pussy_ rul>> 손으로 쥐고, 한 손이 다른 손 위에서 떨린다.`);
						break;
					case 3:
						sWikifier(`당신의 <<hand_ ga '${altText.hands}'>> 번갈아가며 클리토리스를 찌른다.`);
						break;
				}
			} else {
				switch (random(1, 3)) {
					case 1:
						sWikifier(`당신의 손가락들이 <<pussy_ rul>> 희롱하며, 하나씩 연속으로 당신의 틈을 횡단한다.`);
						break;
					case 2:
						sWikifier(`당신의 <<hand_ ga '${altText.hands}'>> 음순을 주무르며, 손가락들은 당신의 보지 입구에서 씰룩거린다.`);
						break;
					case 3:
						sWikifier(`당신의 <<hand_ ga '${altText.hands}'>> 허벅지를 애무하며, 천천히 비틀어 연다.`);
						break;
				}
			}
			break;
		case "mpenisstopW":
			clearAction();
			if (V.worn.genitals.name === "chastity parasite") {
				altText.penis = "기생충 정조대 자지";
			} else {
				altText.penis = "<<penisPost>>";
			}
			if (doubleAction) {
				sWikifier(`당신은 양손을 당신의 ${altText.penis}에서 치운다. 양손이 떨린다.`);
			} else {
				sWikifier(`당신은 <<hand_ rul '${arm}'>> 당신의 ${altText.penis}에서 치운다. 그 손이 떨린다.`);
			}
			break;
		case "mbreaststopW":
			clearAction();
			if (doubleAction) {
				sWikifier(`당신은 양손을 당신의 <<breastsPost>>에서 치운다. 양손이 떨린다.`);
			} else {
				sWikifier(`당신은 <<hand_ rul '${arm}'>> 당신의 <<breastsPost>>에서 치운다. 그 손이 떨린다.`);
			}
			break;
		case "mvaginastopW":
			clearAction();
			if (doubleAction) {
				sWikifier(`당신은 양손을 당신의 <<pussyPost>>에서 치운다. 양손이 떨린다.`);
			} else {
				sWikifier(`당신은 <<hand_ rul '${arm}'>> 당신의 <<pussyPost>>에서 치운다. 그 손이 떨린다.`);
			}
			break;
		case "mpickupdildo":
			// Should not use clearAction()
			V[armAction] = 0;
			V[arm + "arm"] = "mpickupdildo";
			wikifier("arousal", 100, "masturbation");

			// Set the current toy
			altText.selectedToy = selectedToy(arm, true);
			altText.toyType = altText.selectedToy.type;
			altText.toy = `${altText.selectedToy.colour ? trColourJS(altText.selectedToy.colour) : ""} ${sextoyPost(altText.selectedToy.name, '을')}`;
			// Set the default action
			if (altText.toyType.includes("stroker")) {
				V[armActionDefault] = "mpenisentrancestroker";
			} else if (altText.toyType.includes("breastpump")) {
				V[armActionDefault] = "mbreastpump";
			} else {
				V[armActionDefault] = V.player.vaginaExist ? "mvaginaentrancedildo" : "manusentrancedildo";
			}

			fragment.append(span(`당신은 ${handPost(arm, '으로')} ${altText.toy} 잡는다.`));
			break;
		case "mdildostop":
			clearAction("mrest");
			altText.selectedToy = selectedToy(arm, false);
			V[arm + "arm"] = 0;
			if (doubleAction) {
				V[otherArm + "arm"] = 0;
				altText.selectedOtherToy = selectedToy(otherArm, false);
				fragment.append(span(`당신은 ${toyDisplay(altText.selectedToy, altText.selectedOtherToy, '을')} 내려놓는다.`, "lblue"));
			} else {
				fragment.append(span(`당신은 ${handPost(arm, '의')} ${toyDisplay(altText.selectedToy, '을')} 내려놓는다.`, "lblue"));
			}
			break;
		case "mpenisentrancestroker":
			if (V.penisuse === 0 || V.penisuse === "stroker") {
				clearAction("mpenisstrokertease");
				V.penisuse = "stroker";
				V[arm + "arm"] = "mpenisentrancestroker";
				altText.selectedToy = selectedToy(arm);
				if (V.earSlime.defyCooldown && V.earSlime.growth >= 100) {
					if (doubleAction) {
						V[arm + "arm"] = "mpenisentrancestroker";
						altText.selectedOtherToy = selectedToy(otherArm);
						if (genitalsExposed()) {
							sWikifier(
								`당신은 노출된 <<penisPost>>에 당신의 ${toyDisplay(
									altText.selectedToy,
									altText.selectedOtherToy, '을'
								)} 앞뒤로 문지르다, 움직임을 멈춘다. <span class="red">당신은 아무것도 느낄 수가 없었다.</span>`
							);
						} else {
							sWikifier(
								`<span class="blue">당신은 <<penisPost>>에 당신의 ${toyDisplay(
									altText.selectedToy,
									altText.selectedOtherToy, '을'
								)} 앞뒤로 문지르며, <<exposedlowerPost>> 아래의 그 모양을 느낀다.</span>`
							);
						}
					} else {
						if (genitalsExposed()) {
							sWikifier(
								`당신은 당신의 ${toyDisplay(
									altText.selectedToy, '을'
								)} 잡고 당신의 <<penisPost>>에 문지르다, 움직임을 멈춘다. <span class="red">당신은 아무것도 느낄 수가 없었다.</span>`
							);
						} else {
							sWikifier(
								`<span class="blue">당신은 당신의 ${toyDisplay(
									altText.selectedToy, '을'
								)} 잡고 당신의 <<penisPost>>에 문지르며, <<exposedlowerPost>> 아래의 그 모양을 느낀다.</span>`
							);
						}
					}
				} else {
					wikifier("arousal", 50 * handsOn, "masturbationPenis");
					if (doubleAction) {
						V[arm + "arm"] = "mpenisentrancestroker";
						altText.selectedOtherToy = selectedToy(otherArm);
						if (genitalsExposed()) {
							sWikifier(
								`<span class="blue">당신은 노출된 <<penisPost>>에 당신의 ${toyDisplay(
									altText.selectedToy,
									altText.selectedOtherToy, '을'
								)} 앞뒤로 문지르며 기대감에 몸을 떤다.</span>`
							);
						} else {
							sWikifier(
								`<span class="blue">당신은 <<penisPost>>에 당신의 ${toyDisplay(
									altText.selectedToy,
									altText.selectedOtherToy, '을'
								)} 앞뒤로 문지르며, <<exposedlowerPost>> 아래의 그 모양을 느낀다.</span>`
							);
						}
					} else {
						if (genitalsExposed()) {
							sWikifier(
								`<span class="blue">당신은 당신의 ${toyDisplay(
									altText.selectedToy, '을'
								)} 잡고 당신의 <<penisPost>>에 문지르며, 기대감에 몸을 떤다.</span>`
							);
						} else {
							sWikifier(
								`<span class="blue">당신은 당신의 ${toyDisplay(
									altText.selectedToy, '을'
								)} 잡고 당신의 <<penisPost>>에 문지르며, <<exposedlowerPost>> 아래의 그 모양을 느낀다.</span>`
							);
						}
					}
				}
			} else {
				clearAction("mrest");
			}
			break;
		case "mpenisstrokertease":
			clearAction("mpenisentrancestroker");
			V[arm + "arm"] = "mpenisentrancestroker";
			altText.selectedToy = selectedToy(arm);
			if (doubleAction) {
				altText.selectedOtherToy = selectedToy(otherArm);
			}
			if (V.earSlime.defyCooldown && V.earSlime.growth >= 100) {
				if (genitalsExposed()) {
					sWikifier(
						`당신은 당신의 ${toyDisplay(
							altText.selectedToy,
							altText.selectedOtherToy, '을'
						)} 당신의 <<penisPost>>에 문지르지만, 얼굴을 찌푸린다. <span class="red">당신은 아직까지 아무것도 느낄 수가 없었다.</span>.`
					);
				} else {
					sWikifier(
						`당신은 당신의 ${toyDisplay(
							altText.selectedToy,
							altText.selectedOtherToy, '을'
						)} 당신의 <<penisPost>>에 문지르며, <<exposedlowerPost>> 아래의 그 모양을 느낀다.`
					);
				}
			} else {
				wikifier("arousal", 100 * handsOn, "masturbationPenis");
				if (genitalsExposed()) {
					sWikifier(`당신은 당신의 ${toyDisplay(altText.selectedToy, altText.selectedOtherToy, '을')} 당신의 <<penisPost>>에 문지르며, 기대감에 몸을 떤다.`);
				} else {
					sWikifier(
						`당신은 당신의 ${toyDisplay(
							altText.selectedToy,
							altText.selectedOtherToy, '을'
						)} 당신의 <<penisPost>>에 문지르며, <<exposedlowerPost>> 아래의 그 모양을 느낀다.`
					);
				}
			}
			break;
		case "mpenisstroker":
			clearAction();
			V[arm + "arm"] = "mpenisstroker";
			V.penisuse = "stroker";
			altText.selectedToy = selectedToy(arm);
			if (earSlimeDefy()) {
				wikifier("arousal", 200 * handsOn, "masturbationPenis");
				wikifier("pain", 1);
				additionalEffect.earSlimeDefy.pushUnique(V.player.virginity.penile === true ? "동정 자지" : "자지");
				if (doubleAction) {
					V[otherArm + "arm"] = "mpenisstroker";
					wikifier("arousal", 25, "masturbationPenis");
					altText.selectedOtherToy = selectedToy(otherArm);
					sWikifier(
						`무언가 느끼도록 당신은 ${toyDisplay(altText.selectedToy, altText.selectedOtherToy, '으로')} 당신의 <<penis_ rul>> 범하라고 강요된다.`
					);
				} else {
					sWikifier(`무언가 느끼도록 당신은 ${toyDisplay(altText.selectedToy, '으로')} 당신의 <<penis_ rul>> 범하라고 강요된다.`);
				}
			} else if (V.earSlime.corruption >= 100 && V.earSlime.growth >= 100 && V.earSlime.focus === "impregnation") {
				wikifier("arousal", 600, "masturbationPenis");
				if (doubleAction) {
					V[otherArm + "arm"] = "mpenisstroker";
					wikifier("arousal", 100, "masturbationPenis");
					altText.selectedOtherToy = selectedToy(otherArm);
					sWikifier(
						`<span class="purple">당신이 ${toyDisplay(
							altText.selectedToy,
							altText.selectedOtherToy, '으로'
						)} 쿠퍼액으로 뒤덮인 <<penis_ rul>> 거칠게 범하자,</span> <span class="lewd">넘쳐나는 쿠퍼액이 그 끝에서 튀어 날아간다.</span>`
					);
				} else {
					sWikifier(
						`<span class="purple">당신이 ${toyDisplay(
							altText.selectedToy, '으로'
						)} 쿠퍼액으로 뒤덮인 <<penis_ rul>> 거칠게 범하자,</span> <span class="lewd">음란한 따뜻함이 몸 전체에서 생겨난다.</span>`
					);
				}
			} else {
				wikifier("arousal", 400, "masturbationPenis");
				if (doubleAction) {
					V[otherArm + "arm"] = "mpenisstroker";
					wikifier("arousal", 50, "masturbationPenis");
					altText.selectedOtherToy = selectedToy(otherArm);
					sWikifier(`<span class="purple">당신은 ${toyDisplay(altText.selectedToy, altText.selectedOtherToy, '으로')} 당신의 <<penis_ rul>> 범한다.</span>`);
				} else {
					sWikifier(`<span class="purple">당신은 ${toyDisplay(altText.selectedToy, '으로')} 당신의 <<penis_ rul>> 범한다.</span>`);
				}
			}
			break;
		case "mpenisstopstroker":
			clearAction("mrest");
			altText.selectedToy = selectedToy(arm, false);
			V[arm + "arm"] = 0;
			if (!doubleAction && !["mpenisstroker", "mpenisentrancestroker"].includes(V[otherArm + "arm"])) V.penisuse = 0;
			if (doubleAction) {
				V[otherArm + "arm"] = 0;
				altText.selectedOtherToy = selectedToy(otherArm, false);
				V.penisuse = 0;
				altText.selectedOtherToy = selectedToy(otherArm);
				sWikifier(`<span class="purple">당신은 ${toyDisplay(altText.selectedToy, altText.selectedOtherToy, '을')} 당신의 <<penisPost>>에서 치운다.</span>`);
			} else {
				sWikifier(`<span class="purple">당신은 <<hand_ yi '${arm}'>> <${toyDisplay(altText.selectedToy, '을')} 당신의 <<penisPost>>에서 치운다.</span>`);
			}
			break;
		case "mbreastpump":
			clearAction("mbreastpumppump");
			V[arm + "arm"] = "mbreastpump";
			altText.selectedToy = selectedToy(arm);
			if (doubleAction) {
				V[otherArm + "arm"] = "mbreastpump";
				altText.selectedOtherToy = selectedToy(otherArm);
				sWikifier(
					`<span class="blue">당신은 당신의 ${toyDisplay(
						altText.selectedToy,
						altText.selectedOtherToy, '을'
					)} <<breastsPost>> 위에 씌워, 모유를 짜 낼 준비를 한다.</span>`
				);
			} else {
				sWikifier(`<span class="blue">당신은 당신의 ${toyDisplay(altText.selectedToy, '을')} <<breastsPost>> 위에 씌워, 모유를 짜 낼 준비를 한다.</span>`);
			}
			break;
		case "mbreastpumppump":
			wikifier("arousal", 75 * handsOn, "masturbationNipples");
			wikifier("playWithBreasts", 3 * handsOn);
			altText.selectedToy = selectedToy(arm);
			if (doubleAction) {
				altText.selectedOtherToy = selectedToy(otherArm);
				altText.toys = `당신은 <<breastsPost>>에 있는 ${toyDisplay(altText.selectedToy, altText.selectedOtherToy, '을')} 사용`;
			} else {
				altText.toys = `당신은 <<breastsPost>>에 있는 ${toyDisplay(altText.selectedToy, '을')} 사용`;
			}
			if (V.lactating === 1 && V.breastfeedingdisable === "f") {
				if (V.milk_amount >= 1 && V.earSlime.focus === "pregnancy" && V.earSlime.growth >= 100 && !V.earSlime.defyCooldown) {
					wikifier("arousal", 100 * handsOn, "masturbationNipples");
					sWikifier(`${altText.toys}하고, <span class="lewd">모유가 젖꼭지에서 터져나와, 빠르게 병을 채운다.</span>`);
					fragment.append(wikifier("breastfeed", Math.floor(handsOn * 4.5), "pump"));
				} else if (V.milk_amount >= 1) {
					sWikifier(`${altText.toys}하고, <span class="lewd">모유가 젖꼭지에서 병 속으로 흘러나온다.</span>`);
					fragment.append(wikifier("breastfeed", Math.floor(handsOn * 3.5), "pump"));
				} else {
					sWikifier(`${altText.toys}하지만, 젖꼭지에서는 모유가 나오지 않는다. 모유가 다 말라버린게 분명하다.`);
				}
			} else {
				sWikifier(`${altText.toys}하지만, 젖꼭지에서는 모유가 나오지 않는다. 당신에게서는 아직 모유가 나오지 않는 것이 분명하다.`);
				if ((!V.daily.lactatingPressure || V.daily.lactatingPressure <= 5) && random(0, 100) >= 90) {
					if (!V.daily.lactatingPressure) V.daily.lactatingPressure = 0;
					V.daily.lactatingPressure++;
					wikifier("milkvolume", handsOn);
				}
			}
			clearAction(); // Needs to run after any breastfeed widget
			break;
		case "mstopbreastpump":
			clearAction("mrest");
			altText.selectedToy = selectedToy(arm, false);
			V[arm + "arm"] = 0;
			if (doubleAction) {
				V[otherArm + "arm"] = 0;
				altText.selectedOtherToy = selectedToy(otherArm, false);
				sWikifier(`<span class="purple">당신은 ${toyDisplay(altText.selectedToy, altText.selectedOtherToy, '을')} 당신의 <<breastsPost>>에서 치운다.</span>`);
			} else {
				sWikifier(`<span class="purple">당신은 <<hand_ yi '${arm}'>> ${toyDisplay(altText.selectedToy, '을')} 당신의 <<breastsPost>>에서 치운다.</span>`);
			}
			break;
		case "mchestvibrate":
			clearAction();
			wikifier("arousal", 200 * handsOn, "masturbationNipples");
			wikifier("playWithBreasts", 2 * handsOn);
			altText.selectedToy = selectedToy(arm);
			if (doubleAction) {
				altText.selectedOtherToy = selectedToy(otherArm);
				altText.toyDisplay = toyDisplay(altText.selectedToy, altText.selectedOtherToy, '으로');
				altText.hands = "양손의";
			} else {
				altText.toyDisplay = toyDisplay(altText.selectedToy, '으로');
				altText.hands = `<<hand_ yi '${arm}'>>`;
			}
			if (breastsExposed()) {
				wikifier("arousal", 200 * handsOn, "masturbationNipples");
				if (V.arousal >= (V.arousalmax / 5) * 4) {
					fragment.append(
						span(
							`당신의 젖꼭지는 ${altText.toyDisplay} 당신이 견딜 수 있는 한 가장 세게 비비는데도 불구하고 계속 발기하면서, 그 진동으로 당신에게 끊임없는 쾌감을 주고 있다.`
						)
					);
				} else if (V.arousal >= (V.arousalmax / 5) * 3) {
					fragment.append(span(`당신은  ${altText.hands} ${altText.toyDisplay} 점점 단단해지는 젖꼭지를 비벼댄다.`));
				} else {
					fragment.append(
						span(
							`당신은 ${altText.hands} ${altText.toyDisplay} 젖꼭지를 누르며, 그 진동이 계속되면서 음란한 따뜻함이 점점 커지는 것을 느낀다.`
						)
					);
				}
			} else {
				if (V.arousal >= (V.arousalmax / 5) * 4) {
					sWikifier(
						`당신의 젖꼭지는 옷감을 통해 ${altText.toyDisplay} 비벼대는데도 불구하고, 당신의 <<topasidePost>> 아래에서 발기해 있다.`
					);
				} else if (V.arousal >= (V.arousalmax / 5) * 3) {
					sWikifier(`당신은 <<topaside_ rul>> 통해 ${altText.hands} ${altText.toyDisplay} 점점 단단해지는 젖꼭지를 비벼댄다.`);
				} else {
					sWikifier(
						`당신은 ${altText.hands} ${altText.toyDisplay} 젖꼭지를 누른다. 당신의 <<topaside_ ga>> 사이에 있음에도 불구하고, 좋은 느낌이 든다.`
					);
				}
			}
			fragment.append(" ");
			if (V.lactating === 1 && V.breastfeedingdisable === "f" && handsOn > 0) {
				if (V.milk_amount >= 1) {
					if (V.worn.over_upper.exposed === 0 || V.worn.upper.exposed === 0 || V.worn.under_upper.exposed === 0) {
						fragment.append(span("모유가 당신의 유두에서 흘러나와, 당신의 웃옷 안으로 흘러내린다.", "lewd"));
						if (V.masturbation_bowl === 1) fragment.append(otherElement("i", " 모유를 모으기를 원한다면 웃옷을 벗어야 한다."));
					} else {
						fragment.append(span("모유가 당신의 유두에서 흘러나와, 장난감을 모유로 뒤덮는다.", "lewd"));
					}
					fragment.append(" ");
					fragment.append(wikifier("breastfeed", Math.floor(handsOn * 1.5)));
				} else {
					fragment.append(span("모유가 당신의 유두에서 흘러나오지 않는다. 다 말라버린 듯 하다."));
				}
			}
			break;
		case "mpenisvibrate":
			clearAction();
			wikifier("arousal", 200 * handsOn, "masturbationPenis");
			altText.selectedToy = selectedToy(arm);
			if (doubleAction) {
				altText.selectedOtherToy = selectedToy(otherArm);
				altText.toyDisplay = toyDisplay(altText.selectedToy, altText.selectedOtherToy, '으로');
			} else {
				altText.toyDisplay = toyDisplay(altText.selectedToy, '으로');
			}
			if (genitalsExposed()) {
				wikifier("arousal", 200 * handsOn, "masturbationPenis");
				if (V.player.virginity.penile === true) {
					if (V.arousal >= (V.arousalmax / 5) * 4) {
						fragment.append(
							span(`당신은 진동하는 ${altText.toyDisplay} 당신의 동정 자지를 당신의 포피가 허용하는 한 거칠게 위아래로 비벼댄다.`)
						);
					} else if (V.arousal >= (V.arousalmax / 5) * 3) {
						fragment.append(span(`당신은 ${altText.toyDisplay} 당신의 동정 자지를 위아래로 비벼대고, 그 진동은 당신을 빠르게 흥분시킨다.`));
					} else {
						sWikifier(`당신은 부드럽게 <<trChangePost '${altText.toyDisplay}' '을'>><<print _trResult>> <<penisPost>> 아래에 갖다대면서, 그 느낌을 즐긴다.`);
					}
				} else {
					if (V.arousal >= (V.arousalmax / 5) * 4) {
						sWikifier(`당신은 진동하는 ${altText.toyDisplay} 당신의 <<penis_ rul>> 위아래로 비벼댄다.`);
					} else if (V.arousal >= (V.arousalmax / 5) * 3) {
						sWikifier(`당신은 ${altText.toyDisplay} 당신의 <<penis_ rul>> 위아래로 비벼대고, 그 진동은 빠르게 강해지는 음란한 따뜻함을 만들어낸다.`);
					} else {
						sWikifier(`당신은 부드럽게 <<trChangePost '${altText.toyDisplay}' '을'>><<print _trResult>> <<penisPost>> 아래에 갖다대면서, 그 느낌을 즐긴다.`);
					}
				}
			} else {
				if (V.arousal >= (V.arousalmax / 5) * 4) {
					sWikifier(`당신은 <<bottomaside_ rul>> 통해 ${altText.toyDisplay} 당신의 <<penis_ rul>> 위아래로 비벼댄다.`);
				} else if (V.arousal >= (V.arousalmax / 5) * 3) {
					sWikifier(
						`당신은 ${altText.toyDisplay} 당신의 <<penis_ rul>> 위아래로 비벼대고, 그 진동은 <<bottomaside_ rul>> 통하는데도 불구하고 당신을 빠르게 흥분시킨다.`
					);
				} else {
					sWikifier(
						`당신은 부드럽게 <<trChangePost '${altText.toyDisplay}' '을'>><<print _trResult>> <<penisPost>> 아래에 갖다대면서, <<bottomaside_ ga>> 사이에 있음에도 불구하고 그 느낌을 즐긴다.`
					);
				}
			}
			break;
		case "mvaginaclitvibrate":
			clearAction();
			wikifier("arousal", 250 * handsOn, "masturbationVagina");
			altText.selectedToy = selectedToy(arm);
			if (doubleAction) {
				altText.selectedOtherToy = selectedToy(otherArm);
				altText.toyDisplay = toyDisplay(altText.selectedToy, altText.selectedOtherToy, '으로');
			} else {
				altText.toyDisplay = toyDisplay(altText.selectedToy, '으로');
			}
			if (genitalsExposed() && V.bugsinside === 1) {
				wikifier("arousal", 200 * handsOn, "masturbationVagina");
				wikifier("addVaginalWetness", 2 * handsOn);
				sWikifier(
					`<span class="blue">당신은 부드럽게 ${altText.toyDisplay} <<clit_ ul>> 누르고, 그 진동은 당신 안의 벌레들이 기어다니는 느낌과 합쳐져 당신의 발가락을 움츠러들게 한다.</span>`
				);
			} else if (genitalsExposed()) {
				wikifier("arousal", 200 * handsOn, "masturbationVagina");
				wikifier("addVaginalWetness", 2 * handsOn);
				altText.start = `당신은 부드럽게 ${altText.toyDisplay} <<clit_ ul>> 누르고,`;
				if (V.mouth === "mdildomouth") {
					if (V.worn.face.type.includes("gag")) {
						wikifier("trClothes", "face", V.worn.face.name, "name"); altText.gag = T.trResult;
					} else if (V.leftarm === "mdildomouth") {
						altText.gag = sextoyPost(selectedToy("left").name);
					} else {
						altText.gag = sextoyPost(selectedToy("right").name);
					}
					sWikifier(`${altText.start} 그 느낌 때문에 나오는 부드러운 신음소리가 당신의 입을 막고 있는 ${altText.gag}에 묻혀 나온다.`);
				} else {
					sWikifier(`${altText.start} 그 느낌 때문에 부드럽게 신음소리를 낸다.`);
				}
			} else {
				if (V.worn.lower.vagina_exposed && V.worn.over_lower.vagina_exposed) wikifier("addVaginalWetness", 1 * handsOn);
				sWikifier(
					`<span class="blue">당신은 <<exposedlower_ rul>> 통해 ${altText.toyDisplay} <<clit_ ul>> 누르며, 옷감이 사이에 있음에도 불구하고 그 느낌을 즐긴다.</span>`
				);
			}
			break;
		case "mvaginaclitvibrateparasite":
			clearAction();
			wikifier("arousal", 300 * handsOn, "masturbationVagina");
			altText.selectedToy = selectedToy(arm);
			if (doubleAction) {
				altText.selectedOtherToy = selectedToy(otherArm);
				altText.toyDisplay = toyDisplay(altText.selectedToy, altText.selectedOtherToy);
			} else {
				altText.toyDisplay = toyDisplay(altText.selectedToy);
			}
			if (genitalsExposed() && V.bugsinside === 1) {
				wikifier("arousal", 200 * handsOn, "masturbationVagina");
				wikifier("addVaginalWetness", 2 * handsOn);
				sWikifier(
					`<span class="blue">당신은 부드럽게 ${altText.toyDisplay} <<clitPost>> 위의 <<trParasite '${V.parasite.clit.name}' '을'>><<print _trResult>> 누르고, 그 진동은 빨리는 느낌과 당신 안의 벌레들이 기어다니는 느낌과 모두 합쳐져 당신의 발가락을 움츠러들게 한다.</span>`
				);
			} else if (genitalsExposed()) {
				wikifier("arousal", 200 * handsOn, "masturbationVagina");
				wikifier("addVaginalWetness", 2 * handsOn);
				altText.start = `당신은 부드럽게 ${altText.toyDisplay} <<clitPost>> 위의 <<trParasite '${V.parasite.clit.name}' '을'>><<print _trResult>> 누르고,`;
				if (V.mouth === "mdildomouth") {
					if (V.worn.face.type.includes("gag")) {
						wikifier("trClothes", "face", V.worn.face.name, "name"); altText.gag = T.trResult;
					} else if (V.leftarm === "mdildomouth") {
						altText.gag = sextoyPost(selectedToy("left").name);
					} else {
						altText.gag = sextoyPost(selectedToy("right").name);
					}
					sWikifier(`${altText.start} 그 느낌 때문에 나오는 부드러운 신음소리가 당신의 입을 막고 있는 ${altText.gag}에 묻혀 나온다.`);
				} else {
					sWikifier(`${altText.start} 그 빨리는 느낌 때문에 부드럽게 신음소리를 낸다.`);
				}
			} else {
				if (V.worn.lower.vagina_exposed && V.worn.over_lower.vagina_exposed) wikifier("addVaginalWetness", 1 * handsOn);
				sWikifier(
					`<span class="blue">당신은 <<exposedlower_ rul>> 통해 ${altText.toyDisplay} <<clitPost>> 위의 <<trParasite '${V.parasite.clit.name}' '을'>><<print _trResult>> 누르며, 그 반응으로 그것이 당신을 더 빨려고 하는 느낌을 즐긴다.</span>`
				);
			}
			break;
		case "mdildomouthentrance":
			if (V.mouth === 0 && (otherArmAction !== "mdildomouthentrance" || random(0, 100) > 50)) {
				clearAction("mdildomouth");
				V[arm + "arm"] = "mdildomouthentrance";
				V.mouth = "mdildomouthentrance";
				V.mouthactiondefault = "mdildolick";
				wikifier("arousal", 100, "masturbationMouth");
				altText.selectedToy = selectedToy(arm);
				altText.toys = `당신은 ${toyDisplay(altText.selectedToy, '을')} 당신의 입까지 가져오며,`;
				if (currentSkillValue("oralskill") < 100) {
					fragment.append(span(`${altText.toys} 연습을 해 보기를 갈망한다.`));
				} else {
					fragment.append(span(`${altText.toys} 그것이 입술에 닿는 느낌을 즐긴다.`));
				}
			} else {
				clearAction("mrest");
			}
			break;
		case "mdildopiston":
			clearAction();
			wikifier("arousal", 100, "masturbationOral");
			altText.selectedToy = selectedToy(arm);
			altText.toyDisplay = toyDisplay(altText.selectedToy, '을');
			if (currentSkillValue("oralskill") < 100) {
				altText.beginner = altText.selectedToy.name.includes("small")
					? "그 적당한 크기가 당신 같은 초보자에게는 딱 맞다고 느낀다."
					: "너무 깊숙이 밀어넣지 않도록 조심한다.";
				fragment.append(span(`당신은 조심스럽게 ${altText.toyDisplay} 입 속에서 앞뒤로 움직이고, ${altText.beginner}`));
			} else if (currentSkillValue("oralskill") < 200) {
				wikifier("arousal", 100, "masturbationOral");
				fragment.append(
					span(`당신은 ${altText.toyDisplay} 입에 넣은 머리를 앞뒤로 재빠르게 움직이며, 그것이 당신의 입술과 혀를 비벼대며 주는 느낌을 즐긴다.`)
				);
			} else {
				wikifier("arousal", 200, "masturbationOral");
				fragment.append(
					span(
						`당신은 머리를 앞뒤로 재빠르게 움직이면서 솜씨좋게 ${altText.toyDisplay} 핥고 희롱하며, 그것이 주는 음란한 느낌을 한껏 즐긴다.`
					)
				);
			}
			break;
		case "mdildomouth":
			clearAction("mdildopiston");
			wikifier("arousal", 200, "masturbationOral");
			V[arm + "arm"] = "mdildomouth";
			V.mouth = "mdildomouth";
			if (V.mouthactiondefault === "mdildokiss") V.mouthactiondefault = "mdildosuck";
			if (V.mouthaction === "mdildokiss") V.mouthaction = "mdildosuck";
			altText.selectedToy = selectedToy(arm);
			fragment.append(
				span(
					`당신은 ${toyDisplay(altText.selectedToy, '을')} 입 속에 넣으며, 그것을 입술 사이로 찔러넣을 때 혀로 그것을 살짝 핥는다.`
				)
			);
			break;
		case "mvaginaentrance":
			clearAction(V.player.penisExist || V.parasite.clit.name ? "mvaginarub" : "mvaginaclit");
			wikifier("arousal", 200 * handsOn, "masturbationVagina");
			V[arm + "arm"] = "mvaginaentrance";
			if (doubleAction) {
				V[otherArm + "arm"] = "mvaginaentrance";
			}
			altText.fingers = handsOn === 2 ? "손가락들을" : "손가락을";
			if (genitalsExposed() && V.bugsinside) {
				sWikifier(`<span class="blue">당신은 ${altText.fingers} 당신의 노출된 <<pussyPost>> 위로 문지르면서, 벌레들이 돌아다니는 것을 느낀다.</span>`);
				wikifier("addVaginalWetness", 2 * handsOn);
			} else if (genitalsExposed()) {
				sWikifier(`<span class="blue">당신은 ${altText.fingers} 당신의 노출된 <<pussyPost>> 위로 문지르면서 기대감에 몸을 떤다.</span>`);
				wikifier("addVaginalWetness", 2 * handsOn);
			} else {
				sWikifier(`<span class="blue">당신은 ${altText.fingers} 당신의 노출된 <<pussyPost>> 위로 문지르면서, <<exposedlowerPost>> 아래의 그 모양을 느낀다.</span>`);
				if (V.worn.lower.vagina_exposed && V.worn.over_lower.vagina_exposed) wikifier("addVaginalWetness", 1 * handsOn);
			}
			break;
		case "mvagina":
			if (V.vaginause === 0) {
				V.fingersInVagina += V.mVaginaFingerAdd;
				clearAction(
					V.mVaginaFingerAdd === 2 && V.fingersInVagina < V.vaginaFingerLimit - 1 && V.fingersInVagina < 4
						? "mvaginafingeraddtwo"
						: "mvaginafingeradd"
				);
				V[arm + "arm"] = "mvagina";
				V.vaginause = "mfingers";
				wikifier("arousal", V.mVaginaFingerAdd === 2 ? 250 : 200, "masturbationVagina");
				wikifier("addVaginalWetness", 1);
				altText.lubricated = (arm === "left" && V.leftFingersSemen >= 1) || (arm === "right" && V.rightFingersSemen >= 1) ? "정액으로 번들거리는 " : "";
				altText.finger = V.mVaginaFingerAdd === 2 ? `${altText.lubricated}손가락 두 개를` : `${altText.lubricated}손가락을`;
				if (altText.lubricated.includes("semen")) V.semenInVagina = true;
				if (hymenIntact) {
					sWikifier(`<span class="purple">당신은 당신의 온전한 처녀막에 닿을 때까지 ${altText.finger} 당신의 <<pussy_>>에 밀어넣는다.</span>`);
				} else if (V.bugsinside) {
					sWikifier(`<span class="purple">당신은 ${altText.finger} 당신의 <<pussy_>>에 밀어넣는다. 벌레들이 안에서 기어다니는 것이 느껴진다.</span>`);
				} else {
					sWikifier(`<span class="purple">당신은 당신의 <<pussy_ rul>> 벌리면서 ${altText.finger} 밀어넣는다.</span>`);
				}
				fragment.append(fingersEffect(span, hymenIntact));
			} else {
				clearAction("mvaginaclit");
			}
			break;
		case "mvaginafingeradd":
			V.fingersInVagina += V.mVaginaFingerAdd;
			if (V.fingersInVagina === 4 && V.vaginaFingerLimit === 5) {
				clearAction("mvaginafistadd");
			} else if (V.fingersInVagina === V.vaginaFingerLimit) {
				clearAction("mvaginatease");
			} else {
				clearAction(V.mVaginaFingerAdd === 2 && V.fingersInVagina + 2 <= Math.min(4, V.vaginaFingerLimit) ? "mvaginafistadd2" : "mvaginafistadd");
			}
			wikifier("addVaginalWetness", V.fingersInVagina);
			wikifier("arousal", 200 + 50 * V.fingersInVagina, "masturbationVagina");
			altText.lubricated = (arm === "left" && V.leftFingersSemen >= 1) || (arm === "right" && V.rightFingersSemen >= 1) ? "정액으로 번들거리는 " : "";
			altText.finger = V.mVaginaFingerAdd === 2 ? `${altText.lubricated}손가락 두 개를 더` : `${altText.lubricated}손가락 하나를 더`;

			if (V.bugsinside === 1) {
				if (V.fingersInVagina === V.vaginaFingerLimit) {
					sWikifier(
						`<span class="lblue">${altText.lubricated}마지막 남은 손가락을 당신 자신 안에 집어넣으며 당신은 헉 하고 숨을 들이쉰다. 벌레들이 안에서 기어다니는 것이 느껴진다.</span>`
					);
				} else {
					sWikifier(
						`<span class="lblue">당신은 당신의 <<pussy_>>에 ${altText.finger} 밀어넣으며 <<pussy_ rul>> 더욱 확장한다. 벌레들이 안에서 기어다니는 것이 느껴진다.</span>`
					);
				}
			} else {
				if (V.fingersInVagina === V.vaginaFingerLimit) {
					sWikifier(`<span class="lblue">${altText.lubricated}마지막 남은 손가락을 당신 자신 안에 집어넣으며 당신은 헉 하고 숨을 들이쉰다.</span>`);
				} else {
					sWikifier(`<span class="lblue">당신은 당신의 <<pussy_>>에 ${altText.finger} 밀어넣으며 <<pussy_ rul>> 더욱 확장한다.</span>`);
				}
			}
			fragment.append(fingersEffect(span, hymenIntact));
			break;
		case "mvaginafistadd":
			clearAction("mvaginafist");
			V.fingersInVagina = 5;
			V[arm + "arm"] = "mvaginafist";
			V.vaginause = "mvaginafist";
			wikifier("arousal", 650, "masturbationVagina");
			sWikifier(
				`<span class="lblue">마지막으로 힘을 주어, 당신은 다섯 손가락 모두를 당신의 보지에 밀어넣는다.</span> 당신은 당신의 근육이 삽입에 맞춰 벌어져 당신의 손을 감싸고 고동치는 것이 느껴진다.`
			);
			break;
		case "mvaginatease":
			clearAction();
			wikifier("arousal", 300 + 50 * V.fingersInVagina, "masturbationVagina");
			altText.fingers = V.fingersInVagina === 1 ? "손가락으로" : "손가락으로";
			wikifier("addVaginalWetness", V.fingersInVagina);
			if (V.bugsinside) {
				if (V.arousal >= (V.arousalmax / 5) * 4) {
					if (V.vaginaArousalWetness >= 60) {
						wikifier("vaginaFluidActive");
						sWikifier(
							`당신이 <<trNumber $fingersInVagina>> ${altText.fingers} 당신의 <<pussy_ rul>> 안팎으로 쑤시자, 애액이 곤충과 벌레들과 섞여서, 함께 흘러나온다.`
						);
					} else {
						sWikifier(`당신이 <<trNumber $fingersInVagina>> ${altText.fingers} 당신의 <<pussy_ rul>> 안팎으로 쑤시자, 곤충과 벌레들이 흘러나온다.`);
					}
				} else if (V.arousal >= (V.arousalmax / 5) * 2) {
					sWikifier(
						`당신은 <<trNumber $fingersInVagina>> ${altText.fingers} 당신의 <<pussy_ rul>> 안팎으로 쑤시며, 그 안의 곤충과 벌레들을 느낀다.`
					);
				} else {
					sWikifier(
						`당신은 주변의 벌레 몇 마리를 같이 눌러대며, 당신의 <<pussy_>> 입구를 <<trNumber $fingersInVagina>> ${altText.fingers} 부드럽게 쑤신다.`
					);
				}
			} else {
				if (V.arousal >= (V.arousalmax / 5) * 4) {
					if (V.vaginaArousalWetness >= 60) {
						wikifier("vaginaFluidActive");
						sWikifier(`당신이 <<trNumber $fingersInVagina>> ${altText.fingers} 당신의 <<pussy_ rul>> 안팎으로 쑤시자, 애액이 흘러나온다.`);
					} else {
						sWikifier(`당신은 닿을 수 있는 가장 깊숙한 곳까지 밀어넣으며, <<trNumber $fingersInVagina>> ${altText.fingers} 당신의 <<pussy_ rul>> 안팎으로 쑤신다.`);
					}
				} else if (V.arousal >= (V.arousalmax / 5) * 2) {
					sWikifier(
						`당신은 그리 깊게 넣지 않음에도 스릴을 느끼며, <<trNumber $fingersInVagina>> ${altText.fingers} 당신의 <<pussy_ rul>> 안팎으로 쑤신다.`
					);
				} else {
					sWikifier(`당신은 당신의 <<pussy_>> 입구를 <<trNumber $fingersInVagina>> ${altText.fingers} 부드럽게 쑤신다.`);
				}
			}
			break;
		case "mvaginafist":
			clearAction();
			wikifier("arousal", 500, "masturbationVagina");
			wikifier("addVaginalWetness", 5);
			if (V.arousal >= (V.arousalmax / 5) * 4) {
				if (V.vaginaArousalWetness >= 60) {
					wikifier("vaginaFluidActive");
					sWikifier(`당신은 당신의 욱신거리는 <<pussyPost>>에 손 전체를 억지로 밀어넣는다. 애액이 당신의 손목을 타고 흘러내린다.`);
				} else {
					sWikifier(`당신은 당신의 욱신거리는 <<pussyPost>>에 손 전체를 억지로 밀어넣는다.`);
				}
			} else if (V.arousal >= (V.arousalmax / 5) * 2) {
				sWikifier(`당신은 당신의 <<pussy_ rul>> 손 전체로 찔러댄다. 당신의 내벽이 손을 감싸며 움찔거린다.`);
			} else {
				sWikifier(`당신은 당신의 근육이 반복적으로 늘어나는 것을 느끼며, 당신의 <<pussyPost>> 안에서 주먹을 부드럽게 움직인다.`);
			}
			break;
		case "mvaginaclit":
			clearAction();
			wikifier("arousal", 250 * handsOn, "masturbationVagina");
			wikifier("addVaginalWetness", 2 * handsOn);
			altText.fingers = handsOn === 2 ? "fingers" : "finger";
			if (V.arousal >= (V.arousalmax / 5) * 4) {
				fragment.append(span(`You press down on your clit with your thumb and rub it in a circular motion, feeling your arousal build.`));
			} else if (V.arousal >= (V.arousalmax / 5) * 3) {
				fragment.append(span(`You tease the tip of your clit with your ${altText.fingers}.`));
			} else {
				fragment.append(span(`You rub your clit with your ${altText.fingers}, developing a lewd feeling.`));
			}
			break;
		case "mvaginarub":
			clearAction();
			wikifier("arousal", 200 * handsOn, "masturbationVagina");
			altText.fingers = handsOn === 2 ? "fingers" : "finger";
			if (genitalsExposed() && V.bugsinside) {
				sWikifier(`You run your ${altText.fingers} over your exposed <<pussy>>, and feel some bugs running around.`);
				wikifier("addVaginalWetness", 2 * handsOn);
			} else if (genitalsExposed()) {
				sWikifier(`You run your ${altText.fingers} over your exposed <<pussy>> 기대감에 몸을 떤다.`);
				wikifier("addVaginalWetness", 2 * handsOn);
			} else {
				sWikifier(`You run your ${altText.fingers} over your <<pussy>>, feeling its shape beneath your <<exposedlower>>.`);
				if (V.worn.lower.vagina_exposed && V.worn.over_lower.vagina_exposed) wikifier("addVaginalWetness", 1 * handsOn);
			}
			break;
		case "mvaginaclitparasite":
			clearAction();
			wikifier("arousal", 300 * handsOn, "masturbationVagina");
			wikifier("addVaginalWetness", 2 * handsOn);
			altText.fingers = handsOn === 2 ? "fingers" : "finger";
			if (V.arousal >= (V.arousalmax / 5) * 4) {
				fragment.append(
					span(`You squeeze the ${V.parasite.clit.name} on your clit, feeling your arousal build as it more aggressively pleasures you.`)
				);
			} else if (V.arousal >= (V.arousalmax / 5) * 3) {
				fragment.append(span(`You tease the ${V.parasite.clit.name} on your clit with your ${altText.fingers}.`));
			} else {
				fragment.append(span(`You rub the ${V.parasite.clit.name} with your ${altText.fingers}, developing a lewd feeling as it responds in kind.`));
			}
			break;
		case "mvaginastop":
			clearAction("mrest");
			V[arm + "arm"] = 0;
			V.fingersInVagina = 0;
			if (doubleAction) {
				V[otherArm + "arm"] = 0;
				if (V.vaginause === "mfingers") V.vaginause = 0;
				sWikifier('<span class="lblue">You move your hands away from your <<pussy>>.</span>');
			} else {
				sWikifier(`<span class="lblue">You move your ${arm} hand away from your <<pussy>>.</span>`);
			}
			break;
		case "mvaginafingerremove":
			V.fingersInVagina -= 1;
			if (V.fingersInVagina >= 1) {
				clearAction();
				V[arm + "arm"] = "mvagina";
				if (V.vaginause === "mvaginafist") V.vaginause = "mfingers";
				sWikifier('<span class="lblue">You take one finger out of your <<pussy>>.</span>');
			} else {
				clearAction("mvaginarub");
				V[arm + "arm"] = "mvaginaentrance";
				if (V.vaginause === "mfingers") V.vaginause = 0;
				sWikifier('<span class="lblue">You take your finger out of your <<pussy>>.</span>');
			}
			break;
		case "mvaginafistremove":
			clearAction("mvaginarub");
			V[arm + "arm"] = "mvaginaentrance";
			V.fingersInVagina = 0;
			V.vaginause = 0;
			wikifier("arousal", 1000, "masturbationVagina");
			if (V.arousal >= (V.arousalmax / 5) * 4) {
				sWikifier(
					'<span class="lblue">You slide your whole hand out of your <<pussy>>. You feel your muscles twitching in protest as fluids drip out.</span>'
				);
			} else if (V.arousal >= (V.arousalmax / 5) * 2) {
				sWikifier('<span class="lblue">You slide your whole hand out of your <<pussy>>, leaving you feeling empty.</span>');
			} else {
				sWikifier('<span class="lblue">You slide your whole hand out of your <<pussy>>. You feel your muscles relax.</span>');
			}
			break;
		case "mvaginaentrancedildo":
			clearAction(V.player.penisExist || V.parasite.clit.name ? "mvaginarubdildo" : "mvaginaclitdildo");
			V[arm + "arm"] = "mvaginaentrancedildo";
			wikifier("arousal", 200 * handsOn, "masturbationVagina");
			altText.selectedToy = selectedToy(arm);
			if (doubleAction) {
				V[otherArm + "arm"] = "mvaginaentrancedildo";
				altText.selectedOtherToy = selectedToy(otherArm);
			}
			altText.toyDisplay = toyDisplay(altText.selectedToy, altText.selectedOtherToy);
			if (genitalsExposed()) {
				wikifier("addVaginalWetness", 2 * handsOn);
				sWikifier(`<span class="blue">You run your ${altText.toyDisplay} over your exposed <<pussy>> 기대감에 몸을 떤다.</span>`);
			} else {
				if (V.worn.lower.vagina_exposed && V.worn.over_lower.vagina_exposed) wikifier("addVaginalWetness", 1 * handsOn);
				sWikifier(`<span class="blue">You run your ${altText.toyDisplay} over your <<pussy>>, feeling its shape beneath your <<exposedlower>>.</span>`);
			}
			break;
		case "mvaginadildo":
			clearAction("mvaginateasedildo");
			V[arm + "arm"] = "mvaginadildo";
			altText.selectedToy = selectedToy(arm);
			if (doubleAction) {
				V[otherArm + "arm"] = "mvaginadildo";
				altText.selectedOtherToy = selectedToy(otherArm);
				altText.lubricated = V.leftFingersSemen >= 1 || V.rightFingersSemen >= 1 ? "semen-lubricated" : "";
			} else {
				altText.lubricated = V[arm + "FingersSemen"] >= 1 ? "semen-lubricated" : "";
			}
			if (altText.lubricated.includes("semen")) V.semenInVagina = true;
			wikifier("arousal", 150 * handsOn, "masturbationVagina");
			wikifier("addVaginalWetness", 1);
			altText.toyDisplay = toyDisplay(altText.selectedToy, altText.selectedOtherToy);

			if (hymenIntact) {
				sWikifier(
					`<span class="purple">You push the ${altText.lubricated} ${altText.toyDisplay} into your <<pussy>> until you poke your unblemished hymen.</span>`
				);
			} else if (V.bugsinside) {
				sWikifier(
					`<span class="purple">You push the ${altText.lubricated} ${altText.toyDisplay} into your <<pussy>>. You feel insects crawling inside.</span>`
				);
			} else {
				sWikifier(
					`<span class="purple">You push the ${altText.lubricated} ${altText.toyDisplay} into your <<pussy>> which parts to allow the intrusion.</span>`
				);
			}
			break;
		case "mvaginateasedildo":
			clearAction();
			altText.selectedToy = selectedToy(arm);
			altText.toyPleasure = 2 + (altText.selectedToy.type.includes("vibrator") ? 5 : 3);
			if (doubleAction) {
				altText.selectedOtherToy = selectedToy(otherArm);
				altText.toyPleasure += altText.selectedOtherToy.type.includes("vibrator") ? 5 : 3;
			}
			wikifier("arousal", 300 + 50 * altText.toyPleasure, "masturbationVagina");
			wikifier("addVaginalWetness", altText.toyPleasure);

			altText.wet = "";
			if (V.vaginaArousalWetness >= 40) {
				altText.wet = "wet ";
			} else if (V.vaginaArousalWetness >= 20) {
				altText.wet = "slick ";
			}
			altText.toyDisplay = toyDisplay(altText.selectedToy, altText.selectedOtherToy);
			if (V.arousal >= (V.arousalmax / 5) * 4) {
				if (V.vaginaArousalWetness >= 60) {
					sWikifier(`You pump your ${altText.toyDisplay} in and out of your ${altText.wet} <<pussy>>, coaxing out lewd fluid.`);
				} else {
					sWikifier(`You pump your ${altText.toyDisplay} in and out of your ${altText.wet} <<pussy>>, pushing as deep as you can reach.`);
				}
			} else if (V.arousal >= (V.arousalmax / 5) * 2) {
				sWikifier(`You push your ${altText.toyDisplay} in and out of your ${altText.wet} <<pussy>>, feeling a thrill even without going too deep.`);
			} else {
				sWikifier(`You gently fuck the entrance of your ${altText.wet} <<pussy>> with your ${altText.toyDisplay}.`);
			}
			break;
		case "mvaginaclitdildo":
			clearAction();
			wikifier("arousal", 250 * handsOn, "masturbationVagina");
			altText.selectedToy = selectedToy(arm);
			if (altText.selectedToy.type.includes("vibrator")) wikifier("arousal", 50, "masturbationVagina");
			if (doubleAction) {
				altText.selectedOtherToy = selectedToy(otherArm);
				if (altText.selectedOtherToy.type.includes("vibrator")) wikifier("arousal", 50, "masturbationVagina");
				altText.toyDisplay = toyDisplay(altText.selectedToy, altText.selectedOtherToy);
				if (V.arousal >= (V.arousalmax / 5) * 4) {
					fragment.append(
						span(`You gently brush the top of your clit with your ${altText.toyDisplay}, but it becomes harder to do as you become more sensitive.`)
					);
				} else if (V.arousal >= (V.arousalmax / 5) * 3) {
					fragment.append(span(`You tease the tip of your clit with your ${altText.toyDisplay}.`));
				} else {
					fragment.append(span(`You rub your clit with your ${altText.toyDisplay}, developing a lewd feeling.`));
				}
			} else {
				if (V.arousal >= (V.arousalmax / 5) * 4) {
					fragment.append(
						span(
							`You press down on your clit with your ${toyDisplay(
								altText.selectedToy
							)} and rub it in a circular motion, feeling your arousal build.`
						)
					);
				} else if (V.arousal >= (V.arousalmax / 5) * 3) {
					fragment.append(span(`You tease the tip of your clit with your ${toyDisplay(altText.selectedToy)}y.`));
				} else {
					fragment.append(span(`You rub your clit with your ${toyDisplay(altText.selectedToy)}, developing a lewd feeling.`));
				}
			}
			break;
		case "mvaginarubdildo":
			clearAction();
			wikifier("arousal", 200 * handsOn, "masturbationVagina");
			altText.selectedToy = selectedToy(arm);
			if (altText.selectedToy.type.includes("vibrator")) wikifier("arousal", 50, "masturbationVagina");
			if (doubleAction) {
				altText.selectedOtherToy = selectedToy(otherArm);
				if (altText.selectedOtherToy.type.includes("vibrator")) wikifier("arousal", 50, "masturbationVagina");
				altText.toyDisplay = toyDisplay(altText.selectedToy, altText.selectedOtherToy);
				sWikifier(`You run your ${altText.toyDisplay} over your exposed <<pussy>> 기대감에 몸을 떤다, developing a lewd feeling.`);
			} else {
				sWikifier(`You rub your ${toyDisplay(altText.selectedToy)} over your exposed <<pussy>>, developing a lewd feeling.`);
			}
			break;
		case "mvaginastopdildo":
			clearAction("mrest");
			V[arm + "arm"] = 0;
			altText.selectedToy = selectedToy(arm, false);
			if (doubleAction) {
				V[otherArm + "arm"] = 0;
				altText.selectedOtherToy = selectedToy(otherArm);
				sWikifier(`<span class="lblue">You move the ${toyDisplay(altText.selectedToy, altText.selectedOtherToy)} away from your <<pussy>>.</span>`);
			} else {
				sWikifier(`<span class="lblue">You move the ${toyDisplay(altText.selectedToy)} in your ${arm} hand away from your <<pussy>>.</span>`);
			}
			break;
		case "mvaginaentrancedildofloor":
			clearAction("mrest");
			if (V.vaginause === 0) {
				V[arm + "arm"] = 0;
				V.vaginause = "mdildopenetrate";
				V.vaginaactiondefault = "mdildopenetratebounce";
				V.currentToyVagina = V["currentToy" + arm.toLocaleUpperFirst()];
				altText.selectedToy = selectedToy(arm, false);
				sWikifier(`<span class="purple">You place your ${toyDisplay(altText.selectedToy)} in your ${arm} hand on the floor by your <<pussy>>.</span>`);
			}
			break;
		case "manusentrance":
			clearAction("manusrub");
			wikifier("arousal", 100 * handsOn, "masturbationAss");
			V[arm + "arm"] = "manusentrance";
			if (doubleAction) V[otherArm + "arm"] = "manusentrance";
			altText.fingers = handsOn === 2 ? "fingers" : "finger";
			if (genitalsExposed()) {
				sWikifier(`<span class="blue">You reach down to your exposed <<bottom>> and gently press a ${altText.fingers} against your anus.</span>`);
			} else {
				sWikifier(
					`<span class="blue">You reach down to your <<bottom>> and gently press a ${altText.fingers} against your anus through your <<exposedlower>>.</span>`
				);
			}
			break;
		case "manus":
			if ([0, "manus"].includes(V.anususe)) {
				clearAction("manustease");
				wikifier("arousal", 100 * handsOn, "masturbationAnal");
				V[arm + "arm"] = "manus";
				V.anususe = "manus";
				if (doubleAction) {
					altText.lubricated = V.leftFingersSemen >= 1 || V.rightFingersSemen >= 1 ? "semen-lubricated" : "";
					V[otherArm + "arm"] = "manus";
					sWikifier(`<span class="purple">You push two ${altText.lubricated} fingers into your <<bottom>>.</span>`);
				} else {
					altText.lubricated =
						(arm === "left" && V.leftFingersSemen >= 1) || (arm === "right" && V.rightFingersSemen >= 1) ? " semen-lubricated" : "";
					sWikifier(`<span class="purple">You push a ${altText.lubricated} finger into your <<bottom>>.</span>`);
				}
				if (altText.lubricated.includes("semen")) V.semenInAnus = true;
			} else {
				clearAction("manusrub");
			}
			break;
		case "manusrub":
			clearAction();
			wikifier("arousal", 200 * handsOn, "masturbationAnal");
			altText.fingers = handsOn === 2 ? "fingers" : "finger";
			switch (random(0, 2)) {
				case 0:
					sWikifier(`You keep your ${altText.fingers} pressed between your <<bottom>> cheeks and gently prod your anus.`);
					break;
				case 1:
					fragment.append(span(`You rub your anus in a circular motion.`));
					break;
				case 2:
					fragment.append(span(`You push your ${altText.fingers} against your anus. You feel it open a little bit.`));
					break;
			}
			break;
		case "manustease":
			clearAction();
			wikifier("arousal", 200 * handsOn, "masturbationAnal");
			altText.fingers = handsOn === 2 ? "fingers" : "finger";
			switch (random(0, 2)) {
				case 0:
					sWikifier(`You gently explore inside your <<bottom>> with your ${altText.fingers}.`);
					break;
				case 1:
					fragment.append(span(`You slowly push your ${altText.fingers} into and out of your anus.`));
					break;
				case 2:
					sWikifier(`You fuck your <<bottom>> with your ${altText.fingers}. You feel naughty about playing with such a place.`);
					break;
			}
			break;
		case "manusprostate":
			clearAction();
			wikifier("arousal", 300 * handsOn, "masturbationAnal");
			if (V.arousal >= (V.arousalmax / 5) * 4) {
				fragment.append(span("You stroke your prostate, milking it of semen and making you shudder."));
			} else if (V.arousal >= (V.arousalmax / 5) * 3) {
				fragment.append(span("You press against your prostate, causing an almost unbearably pleasurable feeling of vulnerability."));
			} else {
				fragment.append(span("You gently prod your prostate, each poke sending a wave of pleasure through your body."));
			}
			break;
		case "manusstop":
			clearAction("mrest");
			V[arm + "arm"] = 0;
			if (V[otherArm + "arm"] !== "manus") V.anususe = 0;
			if (doubleAction) {
				V[otherArm + "arm"] = 0;
				V.anususe = 0;
				sWikifier(`<span class="purple">You move your hands away from your <<bottom>>.</span>`);
			} else {
				sWikifier(`<span class="purple">You move your ${arm} hand away from your <<bottom>>.</span>`);
			}
			break;
		case "manusentrancedildo":
			clearAction("manusrubdildo");
			wikifier("arousal", 200 * handsOn, "masturbationAnal");
			V[arm + "arm"] = "manusentrancedildo";
			altText.selectedToy = selectedToy(arm);
			if (doubleAction) {
				V[otherArm + "arm"] = "manusentrancedildo";
				altText.selectedOtherToy = selectedToy(otherArm);
				altText.toyDisplay = toyDisplay(altText.selectedToy, altText.selectedOtherToy);
				if (genitalsExposed()) {
					sWikifier(
						`<span class="blue">You reach down to your exposed <<bottom>> and gently press your ${altText.toyDisplay} against your anus.</span>`
					);
				} else {
					sWikifier(
						`<span class="blue">You reach down to your <<bottom>> and gently press your ${altText.toyDisplay} against your anus through your <<exposedlower>>.</span>`
					);
				}
			} else {
				if (genitalsExposed()) {
					sWikifier(
						`<span class="blue">You reach down to your exposed <<bottom>> and gently press your ${toyDisplay(
							altText.selectedToy
						)} against your anus.</span>`
					);
				} else {
					sWikifier(
						`<span class="blue">You reach down to your <<bottom>> and gently press your ${toyDisplay(
							altText.selectedToy
						)} against your anus through your <<exposedlower>>.</span>`
					);
				}
			}
			break;
		case "manusdildo":
			clearAction("manusteasedildo");
			wikifier("arousal", 250 * handsOn, "masturbationAnal");
			V[arm + "arm"] = "manusdildo";
			altText.selectedToy = selectedToy(arm);
			if (doubleAction) {
				altText.lubricated = V.leftFingersSemen >= 1 || V.rightFingersSemen >= 1 ? " semen-lubricated" : "";
				V[otherArm + "arm"] = "manusdildo";
				altText.selectedOtherToy = selectedToy(otherArm);
				sWikifier(
					`<span class="purple">You push your ${altText.lubricated} ${toyDisplay(
						altText.selectedToy,
						altText.selectedOtherToy
					)} into your <<bottom>>.</span>`
				);
			} else {
				altText.lubricated = (arm === "left" && V.leftFingersSemen >= 1) || (arm === "right" && V.rightFingersSemen >= 1) ? " semen-lubricated" : "";
				sWikifier(`<span class="purple">You push your${altText.lubricated} ${toyDisplay(altText.selectedToy)} into your <<bottom>>.</span>`);
			}
			if (altText.lubricated.includes("semen")) V.semenInAnus = true;
			break;
		case "manusrubdildo":
			clearAction();
			wikifier("arousal", 250 * handsOn, "masturbationAnal");
			altText.selectedToy = selectedToy(arm);
			if (doubleAction) {
				altText.selectedOtherToy = selectedToy(otherArm);
				altText.toyDisplay = toyDisplay(altText.selectedToy, altText.selectedOtherToy);
				switch (random(0, 2)) {
					case 0:
						sWikifier(`You keep your ${altText.toyDisplay} between your <<bottom>> cheeks and gently prod your anus.`);
						break;
					case 1:
						sWikifier(`You rub your anus in a circular motion with your ${altText.toyDisplay}.`);
						break;
					case 2:
						sWikifier(`You push your ${altText.toyDisplay} against your anus. You feel it open a little bit.`);
						break;
				}
			} else {
				altText.toyDisplay = toyDisplay(altText.selectedToy);
				switch (random(0, 2)) {
					case 0:
						sWikifier(`You keep your ${toyDisplay(altText.selectedToy)} pressed between your <<bottom>> cheeks and gently prod your anus.`);
						break;
					case 1:
						sWikifier(`You rub your anus in a circular motion with your ${toyDisplay(altText.selectedToy)}.`);
						break;
					case 2:
						sWikifier(`You push your ${toyDisplay(altText.selectedToy)} against your anus. You feel it open a little bit.`);
						break;
				}
			}
			break;
		case "manusteasedildo":
			clearAction();
			wikifier("arousal", 250 * handsOn, "masturbationAnal");
			altText.selectedToy = selectedToy(arm);
			if (doubleAction) {
				altText.selectedOtherToy = selectedToy(otherArm);
				altText.toyDisplay = toyDisplay(altText.selectedToy, altText.selectedOtherToy);
				switch (random(0, 2)) {
					case 0:
						sWikifier(`You gently explore inside your <<bottom>> with your ${altText.toyDisplay}.`);
						break;
					case 1:
						sWikifier(`You slowly push your ${altText.toyDisplay} into and out of your anus.`);
						break;
					case 2:
						sWikifier(`You fuck your <<bottom>> with your ${altText.toyDisplay}. You feel naughty about playing with such a place.`);
						break;
				}
			} else {
				switch (random(0, 2)) {
					case 0:
						sWikifier(`You gently explore inside your <<bottom>> with your ${toyDisplay(altText.selectedToy)}.`);
						break;
					case 1:
						sWikifier(`You slowly push your ${toyDisplay(altText.selectedToy)} into and out of your <<bottom>>.`);
						break;
					case 2:
						sWikifier(`You fuck your <<bottom>> with your ${toyDisplay(altText.selectedToy)}. You feel naughty about playing with such a place.`);
						break;
				}
			}
			break;
		case "manusprostatedildo":
			clearAction();
			wikifier("arousal", 350 * handsOn, "masturbationAnal");
			altText.selectedToy = selectedToy(arm);
			if (doubleAction) {
				altText.selectedOtherToy = selectedToy(otherArm);
				altText.toyDisplay = toyDisplay(altText.selectedToy, altText.selectedOtherToy);
				if (V.arousal >= (V.arousalmax / 5) * 4) {
					fragment.append(span(`You stroke your prostate with your ${altText.toyDisplay}, milking it of semen and making you shudder.`));
				} else if (V.arousal >= (V.arousalmax / 5) * 3) {
					fragment.append(
						span(
							`You press against your prostate with your ${altText.toyDisplay}, causing an almost unbearably pleasurable feeling of vulnerability.`
						)
					);
				} else {
					fragment.append(
						span(`You gently prod your prostate with your ${altText.toyDisplay}, each poke sending a wave of pleasure through your body.`)
					);
				}
			} else {
				if (V.arousal >= (V.arousalmax / 5) * 4) {
					fragment.append(span(`You stroke your prostate with your ${toyDisplay(altText.selectedToy)}, milking it of semen and making you shudder.`));
				} else if (V.arousal >= (V.arousalmax / 5) * 3) {
					fragment.append(
						span(
							`You press against your prostate with your ${toyDisplay(
								altText.selectedToy
							)}, causing an almost unbearably pleasurable feeling of vulnerability.`
						)
					);
				} else {
					fragment.append(
						span(
							`You gently prod your prostate with your ${toyDisplay(
								altText.selectedToy
							)}, each poke sending a wave of pleasure through your body.`
						)
					);
				}
			}
			break;
		case "manusstopdildo":
			clearAction("mrest");
			V[arm + "arm"] = 0;
			altText.selectedToy = selectedToy(arm, false);
			if (doubleAction) {
				V[otherArm + "arm"] = 0;
				altText.selectedOtherToy = selectedToy(otherArm);
				sWikifier(`<span class="purple">You move your ${toyDisplay(altText.selectedToy, altText.selectedOtherToy)} away from your <<bottom>>.</span>`);
			} else {
				sWikifier(`<span class="purple">You move your ${toyDisplay(altText.selectedToy)} in your ${arm} hand away from your <<bottom>>.</span>`);
			}
			break;
		case "manusentrancedildofloor":
			clearAction("mrest");
			if (V.anususe === 0) {
				V[arm + "arm"] = 0;
				V.anususe = "mdildopenetrate";
				V.anusactiondefault = "mdildopenetratebounce";
				V.currentToyAnus = V["currentToy" + arm.toLocaleUpperFirst()];
				altText.selectedToy = selectedToy(arm, false);
				fragment.append(span(`You place your ${toyDisplay(altText.selectedToy)} in your ${arm} hand on the floor by your anus.`, "purple"));
			}
			break;
		case "mmouthstopdildo":
			clearAction("mrest");
			V[arm + "arm"] = 0;
			V.mouth = 0;
			altText.selectedToy = selectedToy(arm, false);
			fragment.append(span(`You move your ${toyDisplay(altText.selectedToy)} in your ${arm} hand away from your mouth.`, "purple"));
			break;
		default:
			clearAction("mrest");
			break;
	}
	fragment.append(" ");
	return fragment;
}

function fingersEffect(span, hymenIntact) {
	const fragment = document.createDocumentFragment();
	if (V.fingersInVagina === V.vaginaFingerLimit - 1) {
		fragment.append(" ");
		fragment.append(span("It's a tight fit.", "purple"));
	} else if (V.fingersInVagina === V.vaginaFingerLimit) {
		if (hymenIntact) {
			fragment.append(" ");
			fragment.append(span("You can't fit any more without tearing your hymen.", "pink"));
		} else {
			fragment.append(" ");
			fragment.append(span("You've reached your limit.", "pink"));
		}
	}
	return fragment;
}

function possessedMasturbation(span, br) {
	const fragment = document.createDocumentFragment();

	const sWikifier = text => {
		if (T.noMasturbationOutput) return;
		fragment.append(Wikifier.wikifyEval(text));
	};

	if (!V.combatBegun) {
		V.combatBegun = 1;
		return fragment;
	}

	let resist = 0;

	if (["mpenisstopW", "mbreaststopW", "mvaginastopW"].includes(V.leftaction)) resist += 2;
	if (["mpenisstopW", "mbreaststopW", "mvaginastopW"].includes(V.rightaction)) resist += 2;

	if (resist === 0) {
		fragment.append(span("You let it take you.", "pink"));
		sWikifier("<<pain -2>><<stress -12>><<sub 2>><<lpain>><<llstress>><<set V.wraith.will += 30>>");
	} else {
		wikifier("willpowerdifficulty", 1, Math.floor(1 + V.wraith.will), true);
		if (V.willpowerSuccess) {
			T.resistSuccess = 1;
			fragment.append(span(`You fight for control. Your ${resist === 4 ? "arms" : "arm"} locks up.`, "green"));
			wikifier("pain", resist);
			wikifier("stress", resist);
			wikifier("trauma", resist);
			wikifier("def", 2);
			wikifier("control", (Math.floor(currentSkillValue("willpower") / 24) * resist) / 10);
			V.wraith.will -= Math.floor(currentSkillValue("willpower") / 24) * resist;
			sWikifier(`<<gpain>><<gtrauma>><<gstress>><<${resist === 4 ? "gg" : "g"}control>>`);
		} else {
			fragment.append(span("Your body does not obey.", "red"));
			["leftaction", "rightaction"].forEach(action => {
				switch (V[action]) {
					case "mbreastW":
					case "mbreaststopW":
						V[action] = "mbreastW";
						break;
					case "mvaginaW":
					case "mvaginastopW":
						V[action] = "mvaginaW";
						break;
					case "mpenisW":
					case "mpenisstopW":
						V[action] = "mpenisW";
						break;
				}
				wikifier("stress", 6);
				wikifier("trauma", 6);
				wikifier("willpower", 1);
				wikifier("def", 1);
				V.wraith.will -= Math.floor(currentSkillValue("willpower") / 40) * resist;
				sWikifier("<<gtrauma>><<gstress>><<gwillpower>>");
			});
		}
		fragment.append(br());
		fragment.append(br());
	}

	return fragment;
}

function masturbationeffectsMouth({
	span,
	otherElement,
	additionalEffect,
	selectedToy,
	toyDisplay,
	genitalsExposed,
	breastsExposed,
	hymenIntact,
	earSlimeDefy,
}) {
	const fragment = document.createDocumentFragment();

	const sWikifier = text => {
		if (T.noMasturbationOutput) return;
		fragment.append(Wikifier.wikifyEval(text));
	};

	const clearAction = defaultAction => {
		V.mouthactiondefault = defaultAction !== undefined ? defaultAction : V.mouthaction;
		V.mouthaction = 0;
	};

	if (V.mouthaction === 0 || V.mouthaction === "mrest") return fragment;

	const altText = {};

	// Dealing with the players actions
	switch (V.mouthaction) {
		case "mpenisentrance":
			if (V.penisuse === 0) {
				clearAction("mpenislick");
				V.penisuse = "mouth";
				V.mouth = "mpenisentrance";
				if (V.awareness < 200 && V.corruptionMasturbation) {
					wikifier("awareness", 1);
					sWikifier(
						`<span class="red">The slime in your ear forces you to bend down. You're not sure if you're going to like what's coming.</span><<gawareness>>`
					);
					fragment.append(" ");
				}
				if (genitalsExposed()) {
					wikifier("arousal", 100, "masturbationGenital");
					sWikifier(`<span class="blue">You get close enough to your <<penis>> to reach out and lick the tip with your tongue.</span>`);
				} else {
					sWikifier(
						`<span class="blue">You run your tongue over your <<penis>>${
							calculatePenisBulge() ? ", <<exposedlowerPost>> 아래의 툭 튀어나온 부분을 느낀다" : ""
						}.</span>`
					);
				}
			} else {
				clearAction("mrest");
			}
			break;
		case "mchastityparasiteentrance":
			if (V.penisuse === 0) {
				clearAction("mchastityparasitelick");
				V.penisuse = "mouth";
				V.mouth = "mchastityparasiteentrance";
				if (V.awareness < 200 && V.corruptionMasturbation) {
					wikifier("awareness", 1);
					sWikifier(
						`<span class="red">The slime in your ear forces you to bend down. You're not sure if you're going to like what's coming.</span><<gawareness>>`
					);
					fragment.append(" ");
				}
				if (genitalsExposed()) {
					wikifier("arousal", 100, "masturbationGenital");
					sWikifier(`<span class="blue">You get close enough to your chasitity parasite to reach out and it with your tongue.</span>`);
				} else {
					sWikifier(
						`<span class="blue">You run your tongue over your chasitity parasite${
							calculatePenisBulge() ? ", <<exposedlowerPost>> 아래의 툭 튀어나온 부분을 느낀다" : ""
						}.</span>`
					);
				}
				if (V.earSlime.defyCooldown) {
					// Do Nothing
				} else if (!V.earSlime.vibration) {
					V.earSlime.vibration = 1;
					wikifier("arousal", 50, "masturbationGenital");
					sWikifier(' <span class="lewd">그것은 당신의 <<penisPost>> 주위에서 부드럽게 고동치기 시작한다.</span>');
				} else {
					V.earSlime.vibration += 2;
				}
			} else {
				clearAction("mrest");
			}
			break;
		case "mpenislick":
			clearAction("mpenislick");
			if (genitalsExposed()) {
				if (earSlimeDefy()) {
					wikifier("arousal", 100, "masturbationGenital");
					wikifier("pain", 1);
					additionalEffect.earSlimeDefy.pushUnique(V.player.virginity.penile === true ? "동정 자지" : "자지");
					sWikifier(`Your forced to roughtly lick your <<penis>> to feel something.`);
				} else if (V.earSlime.corruption >= 100 && V.earSlime.growth >= 100 && V.earSlime.focus === "impregnation") {
					wikifier("arousal", 400, "masturbationGenital");
					if (V.arousal >= V.arousalmax * (4 / 5)) {
						sWikifier("Your <<penis>> releases excessive precum every time you lick, you have to swallow it, but you don't stop.");
					} else if (V.arousal >= V.arousalmax * (3 / 5)) {
						sWikifier("You run your tongue over your <<penis>> head, swallowing your precum as you do.");
					} else {
						sWikifier("You run your tongue over your <<penis>> head, spreading your precum all over your sensitive spots and mouth.");
					}
				} else {
					wikifier("arousal", 200, "masturbationGenital");
					if (V.arousal >= V.arousalmax * (4 / 5)) {
						sWikifier("Your <<penis>> twitches every time you lick it, but you don't stop.");
					} else if (V.arousal >= V.arousalmax * (3 / 5)) {
						sWikifier("You run your tongue over your <<penis>> head, mixing your saliva with your precum.");
					} else {
						sWikifier("You run your tongue over your <<penis>> head, focusing on your sensitive spots.");
					}
				}
			} else {
				sWikifier(
					`<span class="blue">You run your tongue over your <<penis>>${
						calculatePenisBulge() ? ", <<exposedlowerPost>> 아래의 툭 튀어나온 부분을 느낀다" : ""
					}.</span>`
				);
			}
			break;
		case "mpenistakein":
			clearAction(V.penisHeight === 0 ? "mpenissuck" : "mpenisdeepthroat");
			V.mouth = "mpenis";
			V.mouthstate = "penetrated";
			V.selfsuckDepth = 0;
			wikifier("arousal", 200, "masturbationGenital");
			if (V.penisHeight === 0) {
				sWikifier(`<span class="blue">You take your <<penis>> into your mouth, sending a lewd tingle up your spine.</span>`);
			} else {
				sWikifier(`<span class="blue">You take the head of your <<penis>> into your mouth, sending a lewd tingle up your spine.</span>`);
			}
			break;
		case "mpenisdeepthroat":
			clearAction(V.selfsuckDepth < V.selfsuckLimit ? "mpenisdeepthroat" : "mpenissuck");
			V.selfsuckDepth++;
			wikifier("arousal", 200 + 50 * V.selfsuckDepth, "masturbationGenital");
			sWikifier(`You push your <<penis>> deeper into your mouth. `);
			if (V.selfsuckDepth === V.penisHeight) {
				if (V.leftarm === "mpenisentrance" && V.rightarm === "mpenisentrance") {
					altText.hands = "hands";
					V.leftarm = 0;
					V.leftarmaction = "mrest";
					V.rightarm = 0;
					V.rightarmaction = "mrest";
				} else if (V.leftarm === "mpenisentrance") {
					altText.hands = "left hand";
					V.leftarm = 0;
					V.leftarmaction = "mrest";
				} else if (V.rightarm === "mpenisentrance") {
					altText.hands = "right hand";
					V.rightarm = 0;
					V.rightarmaction = "mrest";
				}
				if (altText.hands) sWikifier(`<span class="lblue">You move your ${altText.hands} away from your <<penis>> to make room.</span> `);
				fragment.append(deepthroateffects(span));
			}
			break;
		case "mpenispullback":
			V.selfsuckDepth -= 1;
			wikifier("arousal", 200 + 50 * V.selfsuckDepth, "masturbationGenital");
			if (V.selfsuckDepth >= 2) {
				clearAction();
				sWikifier('<span class="lblue">You pull back hard on your <<penis>> and extract some of it from your throat.</span>');
				fragment.append(" ");
				fragment.append(deepthroateffects(span));
			} else if (V.selfsuckDepth === 1) {
				clearAction();
				sWikifier('<span class="lblue">You pull back on your <<penis>> and free it from your throat.</span>');
				fragment.append(" ");
				fragment.append(deepthroateffects(span));
			} else {
				clearAction("mpenisstop");
				sWikifier('<span class="lblue">You pull back until only the head of your <<penis>> remains in your mouth.</span>');
			}
			break;
		case "mpenismouthoff":
			clearAction("mrest");
			V.mouth = "mpenisentrance";
			V.mouthstate = 0;
			sWikifier('<span class="lblue">You take your mouth off of your <<penis>>.</span>');
			break;
		case "mpenissuck":
			clearAction();
			if (earSlimeDefy()) {
				wikifier("arousal", 100, "masturbationGenital");
				wikifier("pain", 1);
				additionalEffect.earSlimeDefy.pushUnique(V.player.virginity.penile === true ? "동정 자지" : "자지");
				sWikifier(`Your forced to roughtly suck on your <<penis>> to feel something.`);
			} else if (V.earSlime.corruption >= 100 && V.earSlime.growth >= 100 && V.earSlime.focus === "impregnation") {
				wikifier("arousal", 400 + 50 * V.selfsuckDepth, "masturbationGenital");
				altText.eagerly = V.arousal >= V.arousalmax * (2 / 5) ? "열정적으로" : "천천히";
				if (V.arousal >= (V.arousalmax / 5) * 4) {
					if (V.selfsuckDepth <= 1) {
						sWikifier(
							"You constantly swallow precum as it streams into your mouth while you move your head back and forth on your <<penis>>. A satisfying warmth fills your stomach."
						);
					} else {
						sWikifier(
							"A waterfall of precum streams down your throat as you move your head back and forth on your <<penis>>. A satisfying warmth fills your stomach."
						);
					}
				} else {
					if (V.penisHeight === V.selfsuckDepth) {
						if (V.selfsuckDepth >= 2) {
							sWikifier(`You lick the base of your <<penis>> while your throat massages the shaft.`);
						} else {
							sWikifier(`You ${altText.eagerly} suck on your <<penis>> while licking the base.`);
						}
					} else if (V.selfsuckDepth >= 1) {
						sWikifier(`You ${altText.eagerly} suck on your <<penis>> while licking along the shaft.`);
					} else {
						sWikifier(`You ${altText.eagerly} suck on your <<penis>> while licking around the tip.`);
					}
				}
			} else {
				wikifier("arousal", 200 + 50 * V.selfsuckDepth, "masturbationGenital");
				altText.eagerly = V.arousal >= V.arousalmax * (2 / 5) ? "열정적으로" : "천천히";
				if (V.arousal >= (V.arousalmax / 5) * 4) {
					if (V.selfsuckDepth <= 1) {
						sWikifier("You drink down precum as it flows into your mouth while you move your head back and forth on your <<penis>>.");
					} else {
						sWikifier("Precum flows down your throat as you move your head back and forth on your <<penis>>.");
					}
				} else {
					if (V.penisHeight === V.selfsuckDepth) {
						if (V.selfsuckDepth >= 2) {
							sWikifier(`You lick the base of your <<penis>> while your throat massages the shaft.`);
						} else {
							sWikifier(`You ${altText.eagerly} suck on your <<penis>> while licking the base.`);
						}
					} else if (V.selfsuckDepth >= 1) {
						sWikifier(`You ${altText.eagerly} suck on your <<penis>> while licking along the shaft.`);
					} else {
						sWikifier(`You ${altText.eagerly} suck on your <<penis>> while licking around the tip.`);
					}
				}
			}
			break;
		case "mpenisstop":
			clearAction("mrest");
			V.mouth = 0;
			V.penisuse = 0;
			sWikifier(`<span class="lblue">You move your mouth away from your <<penis>>.</span>`);
			break;
		case "mchastityparasitelick":
			clearAction();
			if (V.earSlime.defyCooldown) {
				wikifier("arousal", 100, "masturbationGenital");
				wikifier("pain", 4);
				sWikifier(
					`You lick the parasite, for each one, the parasite sends alternating waves of <span class="lewd">pleasure</span> and <span class="red">pain</span>.<<gpain>>`
				);
			} else if (V.earSlime.corruption < 100) {
				wikifier("arousal", 200, "masturbationGenital");
				V.earSlime.vibration += 2;
				altText.eagerly = V.arousal >= V.arousalmax * (2 / 5) ? "열정적으로" : "천천히";
				if (V.arousal >= (V.arousalmax / 5) * 4) {
					sWikifier(
						`You ${altText.eagerly} to lick the parasite, for each one, <span class="lewd">the parasite sends a wave of pleasure through your <<penis>>.</span>`
					);
				} else {
					sWikifier(
						`You ${altText.eagerly} to lick the parasite, for each one, <span class="lewd">the parasite sends a small wave of pleasure through your <<penis>>.</span>`
					);
				}
			} else {
				wikifier("arousal", 500, "masturbationGenital");
				V.earSlime.vibration += 4;
				altText.eagerly = V.arousal >= V.arousalmax * (1 / 5) ? "열정적으로" : "천천히";
				if (V.arousal >= (V.arousalmax / 5) * 3) {
					wikifier("arousal", 500, "masturbationGenital");
					sWikifier(
						`You struggle to lick the parasite, for each one, <span class="lewd">the parasite sends a wave of pleasure through your body</span>, they are almost too much for you.`
					);
				} else {
					sWikifier(
						`You ${altText.eagerly} lick the parasite, for each one, <span class="lewd">the parasite sends a wave of pleasure through your body.</span>`
					);
				}
			}
			break;
		case "mchastityparasitestop":
			clearAction("mrest");
			V.mouth = 0;
			V.penisuse = 0;
			sWikifier(`<span class="lblue">You move your mouth away from your chastity parasite.</span>`);
			break;
		case "mvaginaentrance":
			if (V.vaginause === 0) {
				clearAction("mvaginalick");
				V.mouth = "mvaginaentrance";
				V.vaginause = "mouth";
				wikifier("arousal", 100, "masturbationGenital");
				if (V.awareness < 200 && V.corruptionMasturbation) {
					wikifier("awareness", 1);
					sWikifier(
						`<span class="red">The slime in your ear forces you to bend down. You're not sure if you're going to like what's coming.</span><<gawareness>>`
					);
					fragment.append(" ");
				}
				if (genitalsExposed()) {
					fragment.append(span(`You run your tongue over your exposed clit 기대감에 몸을 떤다.`, "blue"));
				} else {
					sWikifier(`<span class="blue">You run your tongue over your <<pussy>>, feeling it beneath your <<exposedlower>>.</span>`);
				}
			} else {
				clearAction("mrest");
			}
			break;
		case "mvaginalick":
			clearAction();
			wikifier("arousal", 100, "masturbationGenital");
			if (V.arousal >= (V.arousalmax / 5) * 4) {
				sWikifier("You shiver in anticipation as you lick up the fluid coming from your <<pussy>>.");
			} else if (V.arousal >= (V.arousalmax / 5) * 3) {
				sWikifier("You lick your <<pussy>>, trying to reach the more difficult spots.");
			} else {
				sWikifier("You lick your <<pussy>>.");
			}
			break;
		case "mvaginaclit":
			clearAction();
			wikifier("arousal", 250, "masturbationGenital");
			if (V.arousal >= (V.arousalmax / 5) * 4) {
				fragment.append(span("You shiver in anticipation as you suck and gently rub your clit against your teeth."));
			} else if (V.arousal >= (V.arousalmax / 5) * 3) {
				fragment.append(span("You lick and suck your clit."));
			} else {
				fragment.append(span("You lick your clit."));
			}
			break;
		case "mvaginaclitparasite":
			clearAction();
			wikifier("arousal", 300, "masturbationGenital");
			if (V.arousal >= (V.arousalmax / 5) * 4) {
				fragment.append(
					span(
						`You shiver in anticipation as you suck and gently rub the ${V.parasite.clit.name} on your clit against your teeth, enjoying how it sucks on you in response.`
					)
				);
			} else if (V.arousal >= (V.arousalmax / 5) * 3) {
				fragment.append(span(`You lick and suck on the ${V.parasite.clit.name} on your clit, enjoying how it pleasures you in kind.`));
			} else {
				fragment.append(span(`You lick the ${V.parasite.clit.name} on your clit.`));
			}
			break;
		case "mvaginastop":
			clearAction("mrest");
			V.mouth = 0;
			V.vaginause = 0;
			sWikifier('<span class="lblue">You move your mouth away from your <<pussy>>.</span>');
			break;
		case "maphropill":
			clearAction("mrest");
			if (V.mouth === 0) {
				wikifier("drugs", 300);
				const pills = V.player.inventory.sextoys["aphrodisiac pills"][0];
				pills.uses -= 1;
				if (pills.uses <= 0) V.player.inventory.sextoys["aphrodisiac pills"].splice(0, 1);
				if (V.drugged > 0) {
					fragment.append(span("You pop an aphrodisiac pill into your mouth and swallow. The lewd warmth within you intensifies."));
				} else {
					fragment.append(span("You pop an aphrodisiac pill into your mouth and swallow. A lewd warmth begins to spread in your belly."));
				}
			}
			break;
		case "mdildolick":
			clearAction();
			wikifier("arousal", 100, "masturbationOral");
			if (["mdildomouthentrance", "mdildomouth"].includes(V.leftarm)) {
				altText.selectedToy = selectedToy("left");
			} else if (["mdildomouthentrance", "mdildomouth"].includes(V.rightarm)) {
				altText.selectedToy = selectedToy("right");
			}
			altText.toyDisplay = toyDisplay(altText.selectedToy);

			if (V.mouth === "mdildomouthentrance") {
				if (currentSkillValue("oralskill") < 100) {
					fragment.append(span(`You gingerly lick the ${altText.toyDisplay}'s tip, trying your best to tease it with your tongue.`));
				} else if (currentSkillValue("oralskill") < 200) {
					wikifier("arousal", 100, "masturbationOral");
					fragment.append(span(`You eagerly lick the ${altText.toyDisplay}'s tip, doing your best to tease it with your tongue.`));
				} else {
					wikifier("arousal", 200, "masturbationOral");
					fragment.append(
						span(`You skilfully kiss and lick the ${altText.toyDisplay}'s tip, lavishing attention upon it with your lips and tongue.`)
					);
				}
			} else {
				if (currentSkillValue("oralskill") < 100) {
					if (altText.selectedToy.name.includes("small")) {
						fragment.append(span(`You awkwardly wiggle your tongue along the bottom of the ${altText.toyDisplay} in your mouth.`));
					} else {
						fragment.append(
							span(`You struggle to lick along the ${altText.toyDisplay}, its girth pinning your tongue to the bottom of your mouth.`)
						);
					}
				} else if (currentSkillValue("oralskill") < 200) {
					wikifier("arousal", 100, "masturbationOral");
					fragment.append(
						span(`You wriggle your tongue along the ${altText.toyDisplay} in your mouth, trying your best to reach as much of the toy as you can.`)
					);
				} else {
					wikifier("arousal", 200, "masturbationOral");
					fragment.append(
						span(
							`You skillfully wriggle your tongue along the ${altText.toyDisplay} in your mouth, occasionally adjusting your angle to reach as much of it as possible.`
						)
					);
				}
			}
			break;
		case "mdildokiss":
			clearAction();
			wikifier("arousal", 100, "masturbationMouth");
			if (["mdildomouthentrance", "mdildomouth"].includes(V.leftarm)) {
				altText.selectedToy = selectedToy("left");
			} else if (["mdildomouthentrance", "mdildomouth"].includes(V.rightarm)) {
				altText.selectedToy = selectedToy("right");
			}
			altText.toyDisplay = toyDisplay(altText.selectedToy);
			if (currentSkillValue("oralskill") < 100) {
				fragment.append(span(`You clumsily kiss along the ${altText.toyDisplay}'s length.`));
			} else if (currentSkillValue("oralskill") < 200) {
				wikifier("arousal", 100, "masturbationMouth");
				fragment.append(span(`You kiss along the ${altText.toyDisplay}'s length, a lewd warmth growing within you.`));
			} else {
				altText.virginity =
					V.player.virginity.oral === true
						? "hoping you'll get to experience the real thing soon."
						: "a lewd warmth growing within you as you treat it like the real thing.";
				wikifier("arousal", 200, "masturbationMouth");
				fragment.append(span(`You lovingly plant a series of kisses along the ${altText.toyDisplay}'s length, ${altText.virginity}`));
			}
			break;
		case "mdildosuck":
			clearAction();
			wikifier("arousal", 100, "masturbationOral");
			if (["mdildomouthentrance", "mdildomouth"].includes(V.leftarm)) {
				altText.selectedToy = selectedToy("left");
			} else if (["mdildomouthentrance", "mdildomouth"].includes(V.rightarm)) {
				altText.selectedToy = selectedToy("right");
			}
			altText.toyDisplay = toyDisplay(altText.selectedToy);
			if (currentSkillValue("oralskill") < 100) {
				fragment.append(span(`You try your best to suck on the ${altText.toyDisplay}.`));
			} else if (currentSkillValue("oralskill") < 200) {
				wikifier("arousal", 100, "masturbationOral");
				fragment.append(span(`You eagerly suck on the ${altText.toyDisplay}.`));
			} else {
				wikifier("arousal", 200, "masturbationOral");
				if (V.player.virginity.oral === true) {
					altText.virginity = "wondering how different a real penis would feel.";
				} else if (V.ejactrait) {
					altText.virginity = "a little disappointed you won't be getting your reward when you're done.";
				} else {
					altText.virginity = "pretending it's the real thing.";
				}
				fragment.append(span(`You skillfully suck on and tease the ${altText.toyDisplay}, ${altText.virginity}`));
			}
			break;
		default:
			clearAction("mrest");
			break;
	}

	fragment.append(" ");
	return fragment;
}

function deepthroateffects(span) {
	const fragment = document.createDocumentFragment();

	const sWikifier = text => {
		if (T.noMasturbationOutput) return;
		fragment.append(Wikifier.wikifyEval(text));
	};

	switch (V.penisHeight) {
		case 0:
			fragment.append(span("Error: Impossible condition.", "red"));
			break;
		case 1:
			switch (V.selfsuckDepth) {
				case 1:
					sWikifier("Your lips touch the base of your <<penis>> and the head pokes at the back of your mouth.");
					break;
				default:
					fragment.append(span("Error: Impossible condition.", "red"));
					break;
			}
			break;
		case 2:
			switch (V.selfsuckDepth) {
				case 1:
					sWikifier("The head of your penis is poking at the entrance to your throat.");
					break;
				case 2:
					sWikifier("Your lips touch the base of your <<penis>> as the head pushes into your throat.");
					break;
				default:
					fragment.append(span("Error: Impossible condition.", "red"));
					break;
			}
			break;
		case 3:
			switch (V.selfsuckDepth) {
				case 1:
					sWikifier("The head of your penis is poking at the entrance to your throat.");
					break;
				case 2:
					sWikifier("Your <<penis>> is stretching the walls of your throat.");
					break;
				case 3:
					sWikifier("Your lips touch the base of your <<penis>> as the shaft fills your throat.");
					break;
				default:
					fragment.append(span("Error: Impossible condition.", "red"));
					break;
			}
			break;
		default:
			fragment.append(span("Error: Impossible condition.", "red"));
			break;
	}
	if (V.selfsuckDepth === V.penisHeight) {
		fragment.append(" ");
		fragment.append(span("You've reached the bottom."));
	} else if (V.selfsuckDepth === V.selfsuckLimit) {
		fragment.append(" ");
		fragment.append(span("You are not flexible enough to get any lower."));
	}

	fragment.append(" ");
	return fragment;
}

function masturbationeffectsVaginaAnus({ span, otherElement, additionalEffect, selectedToy, toyDisplay, genitalsExposed, breastsExposed, hymenIntact }) {
	const fragment = document.createDocumentFragment();

	const sWikifier = text => {
		if (T.noMasturbationOutput) return;
		fragment.append(Wikifier.wikifyEval(text));
	};

	const clearAction = (actionType, defaultAction) => {
		V[actionType + "actiondefault"] = defaultAction !== undefined ? defaultAction : V[actionType + "action"];
		V[actionType + "action"] = 0;
	};

	const altText = {};

	switch (V.mouthaction) {
		case "mpenisflowerlick":
			clearAction("mouth");
			wikifier("arousal", 200, "mouth");
			wikifier("drugs", 10);
			V.mouth = "mpenisflowerlick";
			V.moorPhallusPlant = 2;
			switch (random(1, 3)) {
				case 1:
					fragment.append(span("You almost take the phallus plant into your mouth, but suddenly feel apprehensive."));
					break;
				case 2:
					fragment.append(span("You lick the phallus plant's tip and swallow the sweet liquid."));
					break;
				case 3:
					fragment.append(span("You lick the phallus plant's tip."));
					break;
			}
			if (V.vaginaaction === "mpenisflowerrub") {
				V.vaginaaction = 0;
				V.vaginaactiondefault = "mrest";
			}
			if (V.anusaction === "mpenisflowerrub") {
				V.anusaction = 0;
				V.anusactiondefault = "mrest";
			}
			break;
		case "mpenisflowertakein":
			clearAction("mouth", "mpenisflowersuck");
			V.mouth = "mpenisflowersuck";
			V.mouthstate = "penetrated";
			wikifier("arousal", 300, "oral");
			wikifier("drugs", 10);
			if (V.player.virginity.oral === true) {
				fragment.append(wikifier("takeVirginity", "'phallus plant'", "oral"));
				fragment.append(" ");
				sWikifier('You suck on the plant. <span class="red">It tastes very strange</span>, and you feel yourself heating up.');
			} else {
				fragment.append(span("You suck on the plant. It tastes very sweet, and you feel yourself heating up."));
			}
			break;
		case "mpenisflowerstop":
			clearAction("mouth");
			V.mouth = 0;
			V.moorPhallusPlant = 1;
			fragment.append(span("You stop licking the plant.", "lblue"));
			break;
		case "mpenisflowersuck":
			clearAction("mouth");
			wikifier("arousal", 500, "oral");
			wikifier("drugs", 10);
			if (V.arousal >= (V.arousalmax / 5) * 4) {
				fragment.append(span("You shiver as you drink down the fluid while sucking and moving your head back and forward."));
			} else if (V.arousal >= (V.arousalmax / 5) * 3) {
				fragment.append(span("You're sucking on the plant while lapping up its fluid."));
			} else {
				fragment.append(span("You're sucking on the phallus plant."));
			}
			break;
		case "mpenisflowersuckstop":
			clearAction("mouth", "mpenisflowersuck");
			wikifier("arousal", 300, "oral");
			wikifier("drugs", 10);
			fragment.append(
				span("Your head keeps bobbing up and down, sucking on the phallus plant. Try as you might, you just can't will yourself to stop.", "red")
			);
			break;
	}

	switch (V.vaginaaction) {
		case "mpenisflowerrub":
			clearAction("vagina");
			V.vaginause = "mpenisflowerrub";
			V.moorPhallusPlant = 2;
			if (genitalsExposed()) {
				wikifier("arousal", 100, "anal");
				fragment.append(span("You grind your crotch against the plant, although your clothing gets in the way."));
			} else {
				wikifier("arousal", 200, "anal");
				wikifier("drugs", 10);
				switch (random(1, 3)) {
					case 1:
						fragment.append(
							span(
								"You nearly impale yourself on the plant, as a sudden burst of desire hits you. You stop yourself at the last moment, and gently circle the plant around your entrance."
							)
						);
						break;
					case 2:
						sWikifier("You rub your <<if $player.penisExist>><<penis>><<else>>clit<</if>> against the plant.");
						break;
					case 3:
						fragment.append(span("You rub your vulva against the phallus plant."));
						break;
				}
			}
			if (V.anusaction === "mpenisflowerrub") {
				V.anusaction = 0;
				V.anusactiondefault = "mrest";
			}
			break;
		case "mpenisflowerpenetrate":
			clearAction("vagina", "mpenisflowerbounce");
			V.vaginause = "mpenisflowerpenetrate";
			V.vaginastate = "penetrated";
			wikifier("arousal", 1000, "vaginal");
			wikifier("vaginalstat");
			wikifier("drugs", 10);
			wikifier("vaginaraped");
			if (V.player.virginity.vaginal === true) {
				fragment.append(span("You lower yourself down, allowing the plant to penetrate you."));
				fragment.append(" ");
				fragment.append(wikifier("takeVirginity", "'phallus plant'", "vaginal"));
				fragment.append(" ");
				sWikifier(
					'You almost scream out as <span class="red">your no longer virgin</span> vagina struggles to accommodate the plant, but the pain is gone within moments.'
				);
			} else {
				fragment.append(span("You lower yourself down, allowing the plant to penetrate you. You've never felt anything quite like it before."));
			}
			break;
		case "mpenisflowerstop":
			clearAction("vagina");
			V.vaginause = 0;
			V.moorPhallusPlant = 1;
			fragment.append(span("You stop rubbing your vagina against the phallus plant.", "lblue"));
			break;
		case "mpenisflowerbounce":
			clearAction("vagina");
			wikifier("arousal", 500, "vaginal");
			wikifier("drugs", 10);
			if (V.arousal >= (V.arousalmax / 5) * 4) {
				fragment.append(span("You hungrily ride the plant, rubbing it as quickly as you can. The sensation threatens to drive you mad."));
			} else if (V.arousal >= (V.arousalmax / 5) * 3) {
				fragment.append(span("You bounce on the phallus plant. The sensation threatens to drive you mad."));
			} else {
				fragment.append(span("You gently bounce on the phallus plant, each poke sending a wave of pleasure through your body."));
			}
			break;
		case "mpenisflowerpenetratestop":
			clearAction("vagina", "mpenisflowerbounce");
			wikifier("arousal", 300, "vaginal");
			wikifier("drugs", 10);
			fragment.append(span("Your legs fail to lift you off of the plant, as if your body isn't obeying you.", "red"));
			break;
		case "mdildopenetratebounce":
			clearAction("vagina");
			wikifier("arousal", 300, "masturbationVagina");
			altText.selectedToy = selectedToy("vagina");
			if (V.arousal >= (V.arousalmax / 5) * 4) {
				sWikifier(`You hungrily ride the ${toyDisplay(altText.selectedToy)}, rubbing it as quickly as you can.`);
			} else if (V.arousal >= (V.arousalmax / 5) * 3) {
				sWikifier(`You bounce on the ${toyDisplay(altText.selectedToy)}.`);
			} else {
				sWikifier(`You gently bounce on the ${toyDisplay(altText.selectedToy)}.`);
			}
			break;
		case "mdildopenetratestop":
			clearAction("vagina", "mrest");
			V.vaginause = 0;
			altText.selectedToy = selectedToy("vagina", false);
			fragment.append(span(`You stop rubbing your vagina against the ${toyDisplay(altText.selectedToy)} and let it fall away.`, "lblue"));
			break;
	}
	fragment.append(" ");

	switch (V.anusaction) {
		case "mpenisflowerrub":
			clearAction("anus");
			V.anususe = "mpenisflowerrub";
			V.moorPhallusPlant = 2;
			if (genitalsExposed()) {
				wikifier("arousal", 100, "anal");
				fragment.append(span("You grind your ass against the plant, although your clothes get in the way."));
			} else {
				wikifier("arousal", 200, "anal");
				wikifier("drugs", 10);
				switch (random(1, 3)) {
					case 1:
						fragment.append(
							span(
								"You nearly let yourself take the whole plant into your anus, but stop yourself at the last moment. You gently circle the plant around the entrance."
							)
						);
						break;
					case 2:
						sWikifier("You rub the phallus plant between your <<bottom>> cheeks.");
						break;
					case 3:
						fragment.append(span("You rub your anus against the phallus plant."));
						break;
				}
			}
			break;
		case "mpenisflowerpenetrate":
			clearAction("anus", "mpenisflowerbounce");
			V.anususe = "mpenisflowerpenetrate";
			wikifier("arousal", 1000, "anal");
			wikifier("analstat");
			wikifier("drugs", 10);
			if (V.player.virginity.anal === true) {
				fragment.append(span("You lower yourself down, allowing the plant to penetrate you."));
				fragment.append(" ");
				fragment.append(wikifier("takeVirginity", "'phallus plant'", "anal"));
				fragment.append(" ");
				sWikifier(
					'You almost scream out as <span class="red">your no longer virgin</span> anus struggles to accommodate the plant, but the pain is gone within moments.'
				);
			} else {
				fragment.append(span("You lower yourself down, allowing the plant to penetrate you. You've never felt anything quite like it before."));
			}
			break;
		case "mpenisflowerstop":
			clearAction("anus");
			V.anususe = 0;
			V.moorPhallusPlant = 1;
			fragment.append(span("You stop rubbing your anus against the phallus plant", "lblue"));
			break;
		case "mpenisflowerbounce":
			clearAction("anus");
			wikifier("arousal", 500, "anal");
			wikifier("drugs", 10);
			if (V.arousal >= (V.arousalmax / 5) * 4) {
				fragment.append(span("You roughly ride the plant, rubbing it as quickly as you can. It's unlike anything you've felt before.."));
			} else if (V.arousal >= (V.arousalmax / 5) * 3) {
				fragment.append(
					span(`You ride the plant${V.player.penisExist ? ", trying to get it to hit your prostate" : ""}. It's unlike anything you've felt before.`)
				);
			} else {
				fragment.append(span("You gently ride the phallus plant, each poke sending a wave of pleasure through your body."));
			}
			break;
		case "mpenisflowerpenetratestop":
			clearAction("anus", "mpenisflowerbounce");
			wikifier("arousal", 300, "anal");
			wikifier("drugs", 10);
			fragment.append(span("Your legs fail to lift you off of the plant, as if your body isn't obeying you.", "red"));
			break;
		case "mdildopenetratebounce":
			clearAction("anus");
			wikifier("arousal", 300, "masturbationAnal");
			altText.selectedToy = selectedToy("anus");
			if (V.arousal >= (V.arousalmax / 5) * 4) {
				sWikifier(`You hungrily ride the ${toyDisplay(altText.selectedToy)}, rubbing it as quickly as you can.`);
			} else if (V.arousal >= (V.arousalmax / 5) * 3) {
				sWikifier(`You bounce on the ${toyDisplay(altText.selectedToy)}.`);
			} else {
				sWikifier(`You gently bounce on the ${toyDisplay(altText.selectedToy)}.`);
			}
			break;
		case "mdildopenetratestop":
			clearAction("anus", "mrest");
			V.anususe = 0;
			altText.selectedToy = selectedToy("anus", false);
			fragment.append(span(`You stop rubbing your anus against the ${toyDisplay(altText.selectedToy)} and let it fall away.`, "lblue"));
			break;
	}

	fragment.append(" ");
	return fragment;
}

Macro.add("masturbationeffects", {
	handler() {
		const fragment = masturbationeffects();
		this.output.append(fragment);
	},
});
