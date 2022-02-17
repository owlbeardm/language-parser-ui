// morphProcess

/* Copyright Vulgarlang.com 2022. All rights reserved.
 * This file is not permitted to be reproduced or uploaded anywhere under any circumstances
 * We kindly ask you to respect the copyright of this file :) Vulgar is how we make money, and if it stops being profitable, we might stop developing the program :(
 * Thanks for reading this! */
'use strict';
// Global variables
let morphRules, morphRulesOrder, grammarWords, gendersYuled, englishList, conlangWords, applyPhonologicalChanges,
  secondSpellingCheck, spellingSensitiveToStress, harmonyCheck, globalSoundChanges, defaultSpellings, spellingRules,
  secSpellingRules, spellingRulesString, spellingRuleslength, stress, valstress, footDefinitionRB, feetBuildFromRB,
  mainStressRB, feetStressedOnRB, boundRoots, englishJSON, conlangJSON, anglicizedName, languageIPA, finalDictionary,
  globalAffix, uniqueToSecondGroup, onsetProb, codaProb, cOnset, cMidd, cCoda, vOnset, vHarmOnset, midBlankProb,
  illegalRules, maxCoda, reflectSoundChangesInSpelling, squareBracketChanges, hasHangul, wordPatterns,
  globalWordPatterns, AWSclasses, rg_AWS_classes, awsAffixes, countWords, hasGenders, hasAnimacy, hasStress,
  hashedSoundChanges, concreteDelta, editableDerivRules, synchronicChanges, orderedOnsets_forWS, orderedMids_forWS,
  orderedCodas_forWS, orderedVowels_forWS, tabledWords, genderLables, svo, modifierOrder, clusterNum = 0
  , derivsForEdit;
let warnings, underlyingIPA, originalIPA, notEnoughWarning, irrSpellRules, hasIrregularSeplling, hasTempSoundChanges;
let S, VP, NAP, PP, barDerivationals, numberBase;

/**********************************
 Settings save and load stuff
 ***********************************/

const vulgarVersion = '10.8.17';
const settingsVersion = '10.85';
// must be float x.x -- be careful if a version creeps up from x.9 to x.10

const textInputs = ['customConsonants', 'customVowels', 'wordInitialConsonants', 'midWordConsonants', 'wordFinalConsonants', 'illegalCombinations', 'bwsVowels', 'bws2ndVowels', 'phonemeClasses', 'wordPatterns', 'affixPatterns', 'maxOnset', 'maxCoda', 'vowelStartProb', 'vowelEndProb', 'vowelTones', 'spellingRules', 'customAlphabetOrder', 'secondSpellingRules', 'soundChanges', 'words', 'derivedWords', 'derivationalAffixes', 'POSmorphology', 'ipaLangName', 'anglicizedName', 'nounGenders'];

['mediumDrop', 'letter', 'randomWordOrder', 'randomAdjOrder', 'pre_postposition', 'forceAffixesEither'].forEach(i => document.getElementById(i).checked = true);

let isSelected = {
  'customPhonemes': false
  , 'wordStructure': false
  , 'basicWordStructure': false
  , 'advancedWordStructure': false
  , 'vowelToneCheck': false
  , 'vowelProbabilities': false
  , 'soundChangesCheck': false
  , 'spellingCheck': false
  , 'secondSpellingCheck': false
  , 'wordsCheck': false
  , 'POSmorphologyCheck': false
  , 'nounGenderCheck': false
  , 'grammarCheck': false
}

let checkboxes;

// needed for saveLanguage

function resetSettings() {
  setInput('derivationalAffixes', 'ADVERB = Random\nQUALITY.OF.BEING = Random\nTO.MAKE = Random\nHAVING.QUALITY.OF = Random\nRELATING.TO = Random\nNOUN.TO.VERB = Random\nRESULT.OF.DOING = Random\nTENDING.TO = Random\nACT.OF = Random\nPRODUCT.OF = Random\nDOER = Random\nPLACE.OF = Random\nDIM = Random\nAUG = Random\n');

  setInput('nounGenders', 'Masculine\nFeminine\nNeuTer');

  if (quill != undefined)
    quill.setContents({});
  document.getElementById('grammarEditor').style.background = disabledGrey;

  textInputs.filter(a => !['maxOnset', 'maxCoda', 'phonemeClasses', 'wordPatterns', 'affixPatterns', 'derivationalAffixes', 'nounGenders', 'POSmorphology'].includes(a)).forEach(i => clearInput(i));

  const checkboxesOff = ['customPhonemes', 'addRandomPhonemes', 'wordStructure', 'advancedWordStructure', 'banDoubleSyllable', 'allowContrastiveStress', 'vowelProbabilities', 'vowelToneCheck', 'spellingCheck', 'spellingSensitiveToStress', 'addRandomSpellingRules', 'composeSpelling', 'hangul', 'removeAllSpelling', 'secondSpellingCheck', 'soundChangesCheck', 'permanentSoundChanges', 'reflectSoundChangesInSpelling', 'squareBracketChanges', 'removeForwardslash', 'wordsCheck', 'sciFiVocab', 'removeDefaultWords', 'removeTranslations', 'removeDefaultDerivedWords', 'POSmorphologyCheck', 'nounGenderCheck', 'grammarCheck', 'hidePhonologySection'];
  const checkboxesOn = ['banDoubleVowel', 'displayNumbers', 'displayDerivationalAffixes'];

  checkboxes = checkboxesOff.concat(checkboxesOn);

  checkboxesOff.forEach(i => document.getElementById(i).checked = false);
  checkboxesOn.forEach(i => document.getElementById(i).checked = true);
  Object.keys(isSelected).forEach(i => isSelected[i] = false);
  document.getElementById('stressDropdown').value = 'random';
}

resetSettings();
// creates checkboxes variable

let parentTog = {
  'customConsonants': 'customPhonemes'
  , 'customVowels': 'customPhonemes'
  , 'wordInitialConsonants': 'wordStructure'
  , 'midWordConsonants': 'wordStructure'
  , 'wordFinalConsonants': 'wordStructure'
  , 'bwsVowels': 'wordStructure'
  , 'bws2ndVowels': 'wordStructure'
  , 'phonemeClasses': 'wordStructure'
  , 'wordPatterns': 'wordStructure'
  , 'affixPatterns': 'wordStructure'
  , 'vowelTones': 'vowelToneCheck'
  , 'soundChanges': 'soundChangesCheck'
  , 'vowelStartProb': 'vowelProbabilities'
  , 'vowelEndProb': 'vowelProbabilities'
  , 'spellingRules': 'spellingCheck'
  , 'secondSpellingRules': 'secondSpellingCheck'
  , 'words': 'wordsCheck'
  , 'derivedWords': 'wordsCheck'
  , 'POSmorphology': 'POSmorphologyCheck'
  , 'nounGenders': 'nounGenderCheck'
  , 'grammarEditor': 'grammarCheck'
}

const lec = 'Pro';

/*************************************
 Misc. functions
 *************************************/

function sentenceCase(words) {
  if (typeof words == 'string') {
    return words.charAt(0).toUpperCase() + words.slice(1);
  } else {
    return words.map(a => a.charAt(0).toUpperCase() + a.slice(1)).join(' ');
  }
}

function set(list) {
  // deletes duplicates
  let seen = {};
  return list.filter(function (i) {
    return seen.hasOwnProperty(i) ? false : (seen[i] = true);
  });
}

let harmonyClicked = false;

function harmonyClick() {
  // needed by loadSettings() and Phonology tab
  if (harmonyClicked == false) {
    toggleOn('bws2ndVowelsDiv');
    setHTML('plusMinusVH', '– vowel harmony');
  } else {
    document.getElementById('bws2ndVowelsDiv').style.display = 'none';
    setHTML('plusMinusVH', '+ vowel harmony');
  }
  harmonyClicked = !harmonyClicked;
}

/***************************************
 User infterface stuff
 **************************************/

function turnToggle(ID, state) {
  let backGround, fontColor;
  if (state == 'on') {
    backGround = enabledWhite;
    fontColor = enabledFont;
    isSelected[ID] = true;
  } else {
    backGround = disabledGrey;
    fontColor = disabledFont;
    isSelected[ID] = false;
    document.getElementById(ID).checked = false;
  }

  for (let i in parentTog) {
    if (parentTog[i] == ID) {
      document.getElementById(i).style.background = backGround;
      document.getElementById(i).style.color = fontColor;
    }
  }
}

function focusChange(ID) {
  if (isSelected[parentTog[ID]] == false) {
    document.getElementById(parentTog[ID]).click();
    isSelected[parentTog[ID]] = true;
    turnToggle(parentTog[ID], 'on');
  }
}

function styleBackground(ID, color) {
  document.getElementById(ID).style.background = color;
}

styleBackground('derivationalAffixes', enabledWhite);

function greyout(ID) {
  if (getInput(ID) == '') {
    styleBackground(ID, disabledGrey);
    if (parentTog[ID] !== undefined)
      document.getElementById(parentTog[ID]).click();
  }
}

document.getElementById('customPhonemes').onchange = function () {
  if (isSelected.customPhonemes) {
    // if checked, unchecked
    turnToggle('customPhonemes', 'off');
  } else {
    // if unchecked, check
    isSelected.basicWordStructure = false;
    isSelected.advancedWordStructure = false;
    turnToggle('customPhonemes', 'on');
    turnToggle('wordStructure', 'off');
    clearLastLang();
  }

  document.getElementById('addRandomPhonemes').disabled = !this.checked;
  let element = document.getElementById('IPAsymbols_top');
  if (element.style.display != 'block' && isChecked('customPhonemes')) {
    toggleIPA('on');
  }
  toggleOn('cutomPhonemesAdvice');
  document.getElementById('addRandomPhonemesDiv').disabled = false;
  document.getElementById('maxOnset').disabled = false;
  document.getElementById('maxCoda').disabled = false;
  conFocus = 'customConsonants';
  vowFocus = 'customVowels';
  disableVowelProb(false);
};

let suppressIPAbuttons = false;
document.getElementById('wordStructure').onchange = function () {
  if (isSelected.customPhonemes)
    turnToggle('customPhonemes', 'off');
  // if checked, unchecked

  if (isChecked('wordStructure')) {
    turnToggle('wordStructure', 'on');
    isSelected.wordStructure = true;
    document.getElementById('maxOnset').disabled = true;
    document.getElementById('maxCoda').disabled = true;
    document.getElementById('maxOnset').selectedIndex = 0;
    document.getElementById('maxCoda').selectedIndex = 0;
    if (isChecked('advancedWordStructure')) {
      isSelected.basicWordStructure = false;
      isSelected.advancedWordStructure = true;
    } else {
      isSelected.basicWordStructure = true;
      isSelected.advancedWordStructure = false;
    }
  } else {
    document.getElementById('maxOnset').disabled = false;
    document.getElementById('maxCoda').disabled = false;
    turnToggle('wordStructure', 'off');
    isSelected.wordStructure = false;
    isSelected.basicWordStructure = false;
    isSelected.advancedWordStructure = false;
  }

  if (isChecked('advancedWordStructure')) {
    document.getElementById('advancedWordStructureTab').style.display = 'block';
    document.getElementById('basicWordStructureTab').style.display = 'none';
  } else if (isChecked('wordStructure')) {
    document.getElementById('advancedWordStructureTab').style.display = 'none';
    document.getElementById('basicWordStructureTab').style.display = 'block';
  }

  disableVowelProb(isChecked('advancedWordStructure') && isChecked('wordStructure'));
  // evaluates to true or flase

  document.getElementById('addRandomPhonemes').disabled = true;
  if (suppressIPAbuttons) {
    // new 10.8.7
    suppressIPAbuttons = false;
  } else if (isChecked('wordStructure') && document.getElementById('IPAsymbols_top').style.display != 'block') {
    toggleIPA('on');
  }
  conFocus = 'wordInitialConsonants';
  vowFocus = 'bwsVowels';
};

function loadJS(path) {
  let head = document.getElementsByTagName('head')[0];
  if (!head.innerHTML.includes(path)) {
    let script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = '/wp-content/plugins/_vulgarlang/includes/assets/' + path + '.js';
    head.appendChild(script);
  }
}

function loadTranslator() {
  let head = document.getElementsByTagName('head')[0];
  if (!head.innerHTML.includes('assets/translator')) {
    let script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = '/wp-content/plugins/_vulgarlang/includes/assets/translator/10.8.9.js';
    head.appendChild(script);
  } else {
    document.getElementById('grammarButtonsDiv').innerHTML = `<p>Affixes:</p>
  <div class="vl__TAGS cabin-height">` + grammarButtons(morphRules, '-') + `</div>
  <p>Grammatical words:</p>
  <div class="vl__TAGS cabin-height">` + grammarButtons(grammarWords, '') + `</div>`;
  }
  document.getElementById('doTranslateButton').innerHTML = 'Translate';
}

function signup(toggle, textar) {
  popup('generic-popup', message.signUp);
  try {
    // fix - why is try needed?
    turnToggle(toggle, 'off');
    document.getElementById(textar).style.background = disabledGrey;
    document.getElementById(textar).style.color = disabledFont;
  } catch {
  }
}

function basicONOFF(ID) {
  let onOff = isSelected[ID] ? 'off' : 'on';
  turnToggle(ID, onOff);
}

document.getElementById('vowelToneCheck').onchange = function () {
  basicONOFF('vowelToneCheck');
};

document.getElementById('squareBracketChanges').onchange = function () {
  if (isChecked('permanentSoundChanges')) {
    document.getElementById('permanentSoundChanges').checked = false;
  }
};

document.getElementById('permanentSoundChanges').onchange = function () {
  if (isChecked('permanentSoundChanges')) {
    document.getElementById('squareBracketChanges').checked = false;
  }
};

document.getElementById('nounGenderCheck').onchange = function () {
  //signup('nounGenderCheck');
  basicONOFF('nounGenderCheck');
};

document.getElementById('hidePhonologySection').onchange = function () {
  document.getElementById('reInsertSections').style.display = (document.getElementById('hidePhonologySection').checked) ? 'block' : 'none';
};

function toneSwitch(string) {
  let toneStyle = getRadioID('representToneAs');
  let n, regs;
  switch (toneStyle) {
    case 'letter':
      n = 0;
      regs = [1, 2];
      break;
    case 'number':
      n = 1;
      regs = [0, 2];
      break;
    case 'diacritic':
      n = 2;
      regs = [0, 1];
      break;
  }

  const toneTable = [
    ['˩˥', '¹⁵', '̌']
    , ['˥˩', '⁵¹', '̂']
    , ['˥', '⁵', '̋']
    , ['˦', '⁴', '́']
    , ['˧', '³', '̄']
    , ['˨', '²', '̀']
    , ['˩', '¹', '̏']
  ];

  for (let tone of toneTable) {
    let reps = new RegExp('(' + tone[regs[0]] + '|' + tone[regs[1]] + ')', 'g');
    string = string.replace(reps, tone[n]);
  }
  return string;
}

document.getElementById('representToneAs').onchange = function () {
  let toneStyle = getRadioID('representToneAs');
  let toneInput = getInput('vowelTones');
  if (toneInput) {
    toneInput = toneSwitch(toneInput.replaceAll('◌', ''));
    if (toneStyle == 'diacritic') {
      toneInput = toneInput.split(/ +/).map(symbol => '◌' + symbol).join(' ');
    }
    setInput('vowelTones', toneInput);
  }
}

document.getElementById('spellingCheck').onchange = function () {
  //signup('spellingCheck');
  basicONOFF('spellingCheck');
};

document.getElementById('secondSpellingCheck').onchange = function () {
  // don't move to html. keep all basicONOFF in script
  basicONOFF('secondSpellingCheck');
};

document.getElementById('wordsCheck').onchange = function () {
  basicONOFF('wordsCheck');
  if (fullLanguageLoaded) {
    let ONOFF = isSelected['wordsCheck'];
    document.getElementById('removeDefaultWords').checked = ONOFF;
    document.getElementById('removeDefaultDerivedWords').checked = ONOFF;
  }
};

document.getElementById('POSmorphologyCheck').onchange = function () {
  basicONOFF('POSmorphologyCheck');
};

document.getElementById('grammarCheck').onchange = function () {
  basicONOFF('grammarCheck');
};

function disableVowelProb(onoff) {
  if (onoff && isChecked('vowelProbabilities')) {
    document.getElementById('vowelProbabilities').click();
  }
  for (let i of ['vowelProbabilities', 'vowelStartProb', 'vowelEndProb']) {
    document.getElementById(i).disabled = onoff;
  }
}

document.getElementById('advancedWordStructure').onchange = function () {
  if (!isChecked('advancedWordStructure')) {
    isSelected.advancedWordStructure = false;
    document.getElementById('advancedWordStructureTab').style.display = 'none';
    document.getElementById('basicWordStructureTab').style.display = 'block';
    if (isChecked('wordStructure'))
      isSelected.basicWordStructure = true;
    disableVowelProb(false);
  } else {
    isSelected.basicWordStructure = false;
    isSelected.advancedWordStructure = true;
    clearLastLang();
    if (!isChecked('wordStructure')) {
      document.getElementById('wordStructure').click();
    } else {
      disableVowelProb(true);
    }

    document.getElementById('advancedWordStructureTab').style.display = 'block';
    document.getElementById('basicWordStructureTab').style.display = 'none';
    styleBackground('phonemeClasses', enabledWhite);
    styleBackground('wordPatterns', enabledWhite);
    styleBackground('affixPatterns', enabledWhite);
  }
};

function codeBlockTable(tableType, axes, pos, exampleWord, nulls, engTrans, conTrans, staticAxes) {
  if (!axes.length)
    return [];
  // do not add empty tables!

  let axisnames = ['cols', 'rows', 'blocks'];
  if (!staticAxes) {
    // if added by the generator
    axes.sort(function (a, b) {
      return a.length - b.length;
    });
    if (axes.length == 3) {
      axes = [axes[0], axes[2], axes[1]];
    } else if (axes.length == 2) {
      axes = [axes[0], axes[1]];
    } else {
      axes = [axes[0]];
      axisnames = ['rows'];
    }
  }

  let content = [];
  if (!exampleWord)
    exampleWord = '';
  if (!nulls) {
    nulls = [];
  } else {
    nulls = (nulls == 'add' || rand() > 0.15) ? [/\bSG\b/, /\bPRS\b/, /\bDEF\b/, /\bNOM\b/, /\bABS\b/, /\bIND\b/, /\bM\b/, /\bF\b/, /\bNT\b/] : [/\bPL\b/, /\bPST\b/, /\bINDEF\b/, /\bNOM\b/, /\bABS\b/, /\bIND\b/, /\bM\b/, /\bF\b/, /\bNT\b/]
  }

  content.push({
    'insert': 'TABLE TYPE = ' + tableType
  }, {
    'attributes': {
      'code-block': true
    }
    , 'insert': '\n'
  });

  if (tableType == 'word' || tableType == 'WORD') {
    content.push({
      'insert': 'part-of-speech = ' + pos
    }, {
      'attributes': {
        'code-block': true
      }
      , 'insert': '\n\n'
    });
    exampleWord = ' ~ ' + exampleWord;
  } else {
    // affix
    content.push({
      'insert': 'part-of-speech = ' + pos
    }, {
      'attributes': {
        'code-block': true
      }
      , 'insert': '\n'
    },);
    if (typeof exampleWord == 'string') {
      content.push({
        'insert': 'example-word = ' + exampleWord
      }, {
        'attributes': {
          'code-block': true
        }
        , 'insert': '\n\n'
      });
    } else {
      let M = 'M';
      let F = 'F';
      if (hasAnimacy) {
        M = 'AN';
        F = 'IN';
      }
      content.push({
        'insert': 'example-word ' + M + ' = ' + exampleWord[0]
      }, {
        'attributes': {
          'code-block': true
        }
        , 'insert': '\n'
      }, {
        'insert': 'example-word ' + F + ' = ' + exampleWord[1]
      }, {
        'attributes': {
          'code-block': true
        }
        , 'insert': '\n'
      });
      if (exampleWord[2]) {
        content.push({
          'insert': 'example-word NT = ' + exampleWord[2]
        }, {
          'attributes': {
            'code-block': true
          }
          , 'insert': '\n'
        });
      }
      content.push({
        'attributes': {
          'code-block': true
        }
        , 'insert': '\n'
      });
    }
    exampleWord = '';
  }

  let tags = [];

  for (let i = 0; i < axes.length; i++) {
    if (axes[i].length == 1 && axes[i][0] == '') {
      // empty?
      continue;
    }
    let tagLines = axes[i];
    let thisLine = [];
    let upperLine = [];
    for (let property of tagLines) {
      let abbreviation = property.match(rg_upperTag)?.join('').replace(/ +/g, '.').replace(/^\.+|\.+$/g, '') || property.trim().toUpperCase();
      let upperlinetag = rg_allLowerCase.test(property) ? property.toUpperCase() : property;
      thisLine.push(abbreviation);
      upperLine.push(upperlinetag);
    }
    tags.push(thisLine);
    content.push({
      'insert': axisnames[i] + ' = ' + upperLine.join(', ')
    }, {
      'attributes': {
        'code-block': true
      }
      , 'insert': '\n'
    });
  }

  function nullLabel(label) {
    for (let i of nulls) {
      label = label.replace(i, '');
    }
    label = label.replaceAll('.', '');
    return label;
  }

  content.push({
    'attributes': {
      'code-block': true
    }
    , 'insert': '\n'
  });

  let findTranslation = function (dict, tag) {
    let i = 0;
    let found = dict[tag.join('.')];
    if (found) { // length 1 and AB, ABC length > 1
      // pass
    } else if (tag.length == 2) {
      // BA length 2
      let swapped = tag[1] + '.' + tag[0];
      found = dict[swapped];
    } else if (tag.length == 3) {

      while (i < tag.length) {
        found = dict[tag.join('.')];
        let swapped = tag[0] + '.' + tag[2] + '.' + tag[1];
        swapped = dict[swapped];
        if (found || swapped)
          return found || swapped;
        tag.push(tag[0]);
        tag = tag.slice(1);
        i++;
      }
    }
    return found || '';
    // do not return undefined
  }

  if (tags.length == 1) {
    for (let x of tags[0]) {
      let label = x;
      if (engTrans)
        exampleWord = ' ~ ' + findTranslation(engTrans, [x]);
      let equals = (nullLabel(label)) ? ' = Random' : ' =';
      if (conTrans)
        equals = ' = {{' + conTrans[label] + '}}';
      content.push({
        'insert': label + exampleWord + equals
      }, {
        'attributes': {
          'code-block': true
        }
        , 'insert': '\n'
      });
    }
  } else if (tags.length == 2) {
    for (let x of tags[0]) {
      for (let y of tags[1]) {
        let label = x + '.' + y;
        if (engTrans)
          exampleWord = ' ~ ' + findTranslation(engTrans, [x, y]);
        let equals = (nullLabel(label)) ? ' = Random' : ' =';
        if (conTrans)
          equals = ' = {{' + conTrans[label] + '}}';
        content.push({
          'insert': label + exampleWord + equals
        }, {
          'attributes': {
            'code-block': true
          }
          , 'insert': '\n'
        });
      }
    }
  } else if (tags.length == 3) {
    for (let x of tags[0]) {
      for (let y of tags[1]) {
        for (let z of tags[2]) {
          let label = x + '.' + y + '.' + z;
          if (engTrans)
            exampleWord = ' ~ ' + findTranslation(engTrans, [x, y, z]);
          let equals = (nullLabel(label)) ? ' = Random' : ' =';
          if (conTrans)
            equals = ' = {{' + conTrans[label] + '}}';
          content.push({
            'insert': label + exampleWord + equals
          }, {
            'attributes': {
              'code-block': true
            }
            , 'insert': '\n'
          });
        }
      }
    }
  }
  content.push({
    'insert': '\n'
  });
  // fix - this is needed to stop certain tables from gluing together
  return content;
}

let pronounStack = {
  'SG': 'I, me, mine, you, yours, he, she, him, her, his, hers, it, its'
  , 'PL': 'we, us, ours, you all, yours (pl), they, them, theirs'
  , '1': 'I, me, mine, we, us, ours'
  , '2': 'you, yours, you all, yours (pl)'
  , '3': 'he, she, him, her, his, hers, it, its, they, them, theirs',

  '1.M': 'I, me, mine, we, us, ours'
  , '1.F': 'I, me, mine, we, us, ours'
  , '1.NT': 'I, me, mine, we, us, ours'
  , '2.M': 'you, yours, you all, yours (pl)'
  , '2.F': 'you, yours, you all, yours (pl)'
  , '2.NT': 'you, yours, you all, yours (pl)'
  , '3.M': 'he, him, his, they, them, theirs'
  , '3.F': 'she, her, hers, they, them, theirs'
  , '3.NT': 'it, its, they, them, theirs',

  'SG.M': 'I, me, mine, you, yours, he, him, his'
  , 'SG.F': 'I, me, mine, you, yours, she, her, hers'
  , 'SG.NT': 'I, me, mine, you, yours, it, its'
  , 'PL.M': 'we, us, ours, you all, yours (pl), they, them, theirs'
  , 'PL.F': 'we, us, ours, you all, yours (pl), they, them, theirs'
  , 'PL.NT': 'we, us, ours, you all, yours (pl), they, them, theirs',

  'NOM': 'I, you, he, she, it, we, you all, they'
  , 'ACC': 'me, you, him, her, it, us, you all, them'
  , 'ERG': 'I, you, he, she, it, we, you all, they'
  , 'ABL': 'me, you, him, her, it, us, you all, them'
  , 'GEN': 'mine, yours, his, hers, its, ours, theirs'
  , 'DAT': 'me, you, him, her, it, us, you all, them',

  'SG.NOM': 'I, you, he, she, it'
  , 'PL.NOM': 'we, you all, they'
  , 'SG.ACC': 'me, you, him, her, it'
  , 'PL.ACC': 'us, you all, them'
  , 'SG.GEN': 'mine, yours, his, hers, its'
  , 'PL.GEN': 'ours, yours (pl), theirs'
  , 'SG.DAT': 'me, you, him, her, it'
  , 'PL.DAT': 'us, you all, them',

  '1.NOM': 'I, we'
  , '2.NOM': 'we, you all, they'
  , '3.NOM': 'we, you all, they'
  , '1.ACC': 'me, us'
  , '2.ACC': 'you, you all'
  , '3.ACC': 'him, her, it, them'
  , '1.GEN': 'mine, ours'
  , '2.GEN': 'yours, yours (pl)'
  , '3.GEN': 'his, hers, its, theirs'
  , '1.DAT': 'me, us'
  , '2.DAT': 'you, you all'
  , '3.DAT': 'him, her, it, them',

  'M.NOM': 'I, you, he, we, you all, they'
  , 'M.ACC': 'me, you, him, us, you all, them'
  , 'F.NOM': 'I, you, she, we, you all, they'
  , 'F.ACC': 'me, you, her, us, you all, them'
  , 'NT.NOM': 'I, you, it, we, you all, they'
  , 'NT.ACC': 'me, you, it, us, you all, them',

  '1.SG': 'I, me, mine',
  // if possessive determiners?
  '1.SG.M': 'I (masc), me (masc), mine (masc)'
  , '1.SG.F': 'I (fem), me (fem), mine (fem)'
  , '1.SG.NT': 'I, me, mine'
  , '2.SG': 'you, yours'
  , '2.SG.M': 'you (masc), yours (masc)'
  , '2.SG.F': 'you (fem), yours (fem)'
  , '2.SG.NT': 'you, yours'
  , '3.SG': 'he, she, him, her, his, hers, it, its'
  , '3.SG.M': 'he, him, his'
  , '3.SG.F': 'she, her, hers'
  , '3.SG.NT': 'it, its'
  , '1.PL': 'we, us, ours'
  , '1.PL.M': 'we (masc), us (masc), ours (masc)'
  , '1.PL.F': 'we (fem), us (fem), ours (fem)'
  , '1.PL.NT': 'we, us, ours'
  , '1.PL.INCL': 'we (including you), us (including you), ours (including you)'
  , '1.PL.EXCL': 'we (excluding you), us (excluding you), ours (excluding you)'
  , '2.PL': 'you all, yours (pl)'
  , '2.PL.M': 'you all (masc), yours (pl masc)'
  , '2.PL.F': 'you all (fem), yours (pl fem)'
  , '2.PL.NT': 'you all, yours (pl)'
  , '3.PL': 'they, them, theirs'
  , '3.PL.M': 'they (masc), them (masc), theirs (masc)'
  , '3.PL.F': 'they (fem), them (fem), theirs (fem)'
  , '3.PL.NT': 'they (neut), them (neut), theirs (neut)',

  '1.SG.NOM': 'I'
  , '1.SG.M.NOM': 'I (masc)'
  , '1.SG.F.NOM': 'I (fem)'
  , '2.SG.NOM': 'you'
  , '2.SG.M.NOM': 'you (masc)'
  , '2.SG.F.NOM': 'you (fem)'
  , '3.SG.NOM': 'he, she, it'
  , '3.SG.M.NOM': 'he'
  , '3.SG.F.NOM': 'she'
  , '3.SG.NT.NOM': 'it'
  , '1.PL.NOM': 'we'
  , '1.PL.M.NOM': 'we (masc)'
  , '1.PL.F.NOM': 'we (fem)'
  , '1.PL.INCL.NOM': 'we (including you)'
  , '1.PL.EXCL.NOM': 'we (excluding you)'
  , '2.PL.NOM': 'you all'
  , '2.PL.M.NOM': 'you all (masc)'
  , '2.PL.F.NOM': 'you all (fem)'
  , '3.PL.NOM': 'they'
  , '3.PL.M.NOM': 'they (masc)'
  , '3.PL.F.NOM': 'they (fem)'
  , '3.PL.NT.NOM': 'they (neut)',

  '1.SG.ACC': 'me'
  , '1.SG.M.ACC': 'me (masc)'
  , '1.SG.F.ACC': 'me (fem)'
  , '2.SG.ACC': 'you'
  , '2.SG.M.ACC': 'you (masc)'
  , '2.SG.F.ACC': 'you (fem)'
  , '3.SG.ACC': 'him, her, it'
  , '3.SG.M.ACC': 'him'
  , '3.SG.F.ACC': 'her'
  , '3.SG.NT.ACC': 'it'
  , '1.PL.ACC': 'us'
  , '1.PL.M.ACC': 'us (masc)'
  , '1.PL.F.ACC': 'us (fem)'
  , '1.PL.INCL.ACC': 'us (including you)'
  , '1.PL.EXCL.ACC': 'us (excluding you)'
  , '2.PL.ACC': 'you all'
  , '2.PL.M.ACC': 'you all (masc)'
  , '2.PL.F.ACC': 'you all (fem)'
  , '3.PL.ACC': 'them'
  , '3.PL.M.ACC': 'them (masc)'
  , '3.PL.F.ACC': 'them (fem)'
  , '3.PL.NT.ACC': 'them (neut)',

  '1.SG.ERG': 'I'
  , '1.SG.M.ERG': 'I (masc)'
  , '1.SG.F.ERG': 'I (fem)'
  , '2.SG.ERG': 'you'
  , '2.SG.M.ERG': 'you (masc)'
  , '2.SG.F.ERG': 'you (fem)'
  , '3.SG.ERG': 'he, she, it'
  , '3.SG.M.ERG': 'he'
  , '3.SG.F.ERG': 'she'
  , '3.SG.NT.ERG': 'it'
  , '1.PL.ERG': 'we'
  , '1.PL.M.ERG': 'we (masc)'
  , '1.PL.F.ERG': 'we (fem)'
  , '1.PL.INCL.ERG': 'we (including you)'
  , '1.PL.EXCL.ERG': 'we (excluding you)'
  , '2.PL.ERG': 'you all'
  , '2.PL.M.ERG': 'you all (masc)'
  , '2.PL.F.ERG': 'you all (fem)'
  , '3.PL.ERG': 'they'
  , '3.PL.M.ERG': 'they (masc)'
  , '3.PL.F.ERG': 'they (fem)'
  , '3.PL.NT.ERG': 'they (neut)',

  '1.SG.ABS': 'me, I'
  , '1.SG.M.ABS': 'me (masc), I (masc)'
  , '1.SG.F.ABS': 'me (fem), I (fem)'
  , '2.SG.ABS': 'you'
  , '2.SG.M.ABS': 'you (masc)'
  , '2.SG.F.ABS': 'you (fem)'
  , '3.SG.ABS': 'him, her, it, he, she'
  , '3.SG.M.ABS': 'him, he'
  , '3.SG.F.ABS': 'her, she'
  , '3.SG.NT.ABS': 'it'
  , '1.PL.ABS': 'us, we'
  , '1.PL.M.ABS': 'us (masc), we (masc)'
  , '1.PL.F.ABS': 'us (fem), we (fem)'
  , '1.PL.INCL.ABS': 'us, we (including you)'
  , '1.PL.EXCL.ABS': 'us, we (excluding you)'
  , '2.PL.ABS': 'you all'
  , '2.PL.M.ABS': 'you all (masc)'
  , '2.PL.F.ABS': 'you all (fem)'
  , '3.PL.ABS': 'them, they'
  , '3.PL.M.ABS': 'them (masc), they (masc)'
  , '3.PL.F.ABS': 'them (fem), they (fem)'
  , '3.PL.NT.ABS': 'them (neut), they (neut)',

  '1.SG.GEN': 'mine',
  // if possessive determiners?
  '1.SG.M.GEN': 'mine (masc)'
  , '1.SG.F.GEN': 'mine (fem)'
  , '2.SG.GEN': 'yours'
  , '2.SG.M.GEN': 'yours (masc)'
  , '2.SG.F.GEN': 'yours (fem)'
  , '3.SG.GEN': 'his, hers, its'
  , '3.SG.M.GEN': 'his'
  , '3.SG.F.GEN': 'hers'
  , '3.SG.NT.GEN': 'its'
  , '1.PL.GEN': 'ours'
  , '1.PL.M.GEN': 'ours (masc)'
  , '1.PL.F.GEN': 'ours (fem)'
  , '1.PL.INCL.GEN': 'ours (including you)'
  , '1.PL.EXCL.GEN': 'ours (excluding you)'
  , '2.PL.GEN': 'yours (pl)'
  , '2.PL.M.GEN': 'yours (pl masc)'
  , '2.PL.F.GEN': 'yours (pl fem)'
  , '3.PL.GEN': 'theirs'
  , '3.PL.M.GEN': 'theirs (masc)'
  , '3.PL.F.GEN': 'theirs (fem)'
  , '3.PL.NT.GEN': 'theirs (neut)',

  '1.SG.DAT': 'to me'
  , '1.SG.M.DAT': 'to me (masc)'
  , '1.SG.F.DAT': 'to me (fem)'
  , '2.SG.DAT': 'to you'
  , '2.SG.M.DAT': 'to you (masc)'
  , '2.SG.F.DAT': 'to you (fem)'
  , '3.SG.DAT': 'to him, her, it'
  , '3.SG.M.DAT': 'to him'
  , '3.SG.F.DAT': 'to her'
  , '3.SG.NT.DAT': 'to it'
  , '1.PL.DAT': 'to us'
  , '1.PL.M.DAT': 'to us (masc)'
  , '1.PL.F.DAT': 'to us (fem)'
  , '1.PL.INCL.DAT': 'to us (including you)'
  , '1.PL.EXCL.DAT': 'to us (excluding you)'
  , '2.PL.DAT': 'to you all'
  , '2.PL.M.DAT': 'to you all (masc)'
  , '2.PL.F.DAT': 'to you all (fem)'
  , '3.PL.DAT': 'to them'
  , '3.PL.M.DAT': 'to them (masc)'
  , '3.PL.F.DAT': 'to them (fem)'
  , '3.PL.NT.DAT': 'to them (neut)',

  '1.SG.LOC': 'at me'
  , '1.SG.M.LOC': 'at me (masc)'
  , '1.SG.F.LOC': 'at me (fem)'
  , '2.SG.LOC': 'at you'
  , '2.SG.M.LOC': 'at you (masc)'
  , '2.SG.F.LOC': 'at you (fem)'
  , '3.SG.LOC': 'at him, her, it'
  , '3.SG.M.LOC': 'at him'
  , '3.SG.F.LOC': 'at her'
  , '3.SG.NT.LOC': 'at it'
  , '1.PL.LOC': 'at us'
  , '1.PL.M.LOC': 'at us (masc)'
  , '1.PL.F.LOC': 'at us (fem)'
  , '1.PL.INCL.LOC': 'at us (including you)'
  , '1.PL.EXCL.LOC': 'at us (excluding you)'
  , '2.PL.LOC': 'at you all'
  , '2.PL.M.LOC': 'at you all (masc)'
  , '2.PL.F.LOC': 'at you all (fem)'
  , '3.PL.LOC': 'at them'
  , '3.PL.M.LOC': 'at them (masc)'
  , '3.PL.F.LOC': 'at them (fem)'
  , '3.PL.NT.LOC': 'at them (neut)',

  '1.SG.ABL': 'from me'
  , '1.SG.M.ABL': 'from me (masc)'
  , '1.SG.F.ABL': 'from me (fem)'
  , '2.SG.ABL': 'from you'
  , '2.SG.M.ABL': 'from you (masc)'
  , '2.SG.F.ABL': 'from you (fem)'
  , '3.SG.ABL': 'from him, her, it'
  , '3.SG.M.ABL': 'from him'
  , '3.SG.F.ABL': 'from her'
  , '3.SG.NT.ABL': 'from it'
  , '1.PL.ABL': 'from us'
  , '1.PL.M.ABL': 'from us (masc)'
  , '1.PL.F.ABL': 'from us (fem)'
  , '1.PL.INCL.ABL': 'from us (including you)'
  , '1.PL.EXCL.ABL': 'from us (excluding you)'
  , '2.PL.ABL': 'from you all'
  , '2.PL.M.ABL': 'from you all (masc)'
  , '2.PL.F.ABL': 'from you all (fem)'
  , '3.PL.ABL': 'from them'
  , '3.PL.M.ABL': 'from them (masc)'
  , '3.PL.F.ABL': 'from them (fem)'
  , '3.PL.NT.ABL': 'from them (neut)',

  '1.SG.INS': 'with/using me'
  , '1.SG.M.INS': 'with/using me (masc)'
  , '1.SG.F.INS': 'with/using me (fem)'
  , '2.SG.INS': 'with/using you'
  , '2.SG.M.INS': 'with/using you (masc)'
  , '2.SG.F.INS': 'with/using you (fem)'
  , '3.SG.INS': 'with/using him, her, it'
  , '3.SG.M.INS': 'with/using him'
  , '3.SG.F.INS': 'with/using her'
  , '3.SG.NT.INS': 'with/using it'
  , '1.PL.INS': 'with/using us'
  , '1.PL.M.INS': 'with/using us (masc)'
  , '1.PL.F.INS': 'with/using us (fem)'
  , '1.PL.INCL.INS': 'with/using us (including you)'
  , '1.PL.EXCL.INS': 'with/using us (excluding you)'
  , '2.PL.INS': 'with/using you all'
  , '2.PL.M.INS': 'with/using you all (masc)'
  , '2.PL.F.INS': 'with/using you all (fem)'
  , '3.PL.INS': 'with/using them'
  , '3.PL.M.INS': 'with/using them (masc)'
  , '3.PL.F.INS': 'with/using them (fem)'
  , '3.PL.NT.INS': 'with/using them (neut)'
  ,
};

let possDetStack = {
  '1.SG': 'my'
  , '1.SG.M': 'my (masc)'
  , '1.SG.F': 'my (fem)'
  , '2.SG': 'your'
  , '2.SG.M': 'your (masc)'
  , '2.SG.F': 'your'
  , '3.SG': 'his, her, its'
  , '3.SG.M': 'his'
  , '3.SG.F': 'her'
  , '3.SG.NT': 'its'
  , '1.PL': 'our'
  , '1.PL.M': 'our (masc)'
  , '1.PL.F': 'our (fem)'
  , '1.PL.INCL': 'our (including you)'
  , '1.PL.EXCL': 'our (excluding you)'
  , '2.PL': 'your (pl)'
  , '2.PL.M': 'your (pl masc)'
  , '2.PL.F': 'your (pl fem)'
  , '3.PL': 'their'
  , '3.PL.M': 'their (masc)'
  , '3.PL.F': 'their (fem)'
  , '3.PL.NT': 'their (neut)'
  ,
}

let nounStack = {
  'SG': 'dog'
  , 'PL': 'dogs'
  , 'DU': 'two dogs'
  , 'TRI': 'three dogs'
  , 'PAUC': 'few dogs'
  , 'SG.M': 'man'
  , 'PL.M': 'men'
  , 'DU.M': 'two men'
  , 'TRI.M': 'three men'
  , 'PAUC.M': 'few men'
  , 'SG.F': 'woman'
  , 'PL.F': 'women'
  , 'DU.F': 'two women'
  , 'TRI.F': 'three women'
  , 'PAUC.F': 'few women'
  , 'SG.NT': 'dog'
  , 'PL.NT': 'dogs'
  , 'DU.NT': 'two dogs'
  , 'TRI.NT': 'three dogs'
  , 'PAUC.NT': 'few dogs',

  'DEF': 'the dog'
  , 'INDEF': 'a dog',

  'SG.DEF': 'the dog'
  , 'SG.INDEF': 'a dog'
  , 'PL.DEF': 'the dogs'
  , 'PL.INDEF': 'some dogs'
  , 'DU.DEF': 'the two dogs'
  , 'DU.INDEF': 'some two dogs'
  , 'TRI.DEF': 'the three dogs'
  , 'TRI.INDEF': 'some three dogs'
  , 'PAUC.DEF': 'the few dogs'
  , 'PAUC.INDEF': 'a few dogs',

  'NOM': 'dog (doing the verb)'
  , 'ACC': '(verb done to) dog'
  , 'ERG': 'dog (doing the verb to something)'
  , 'ABS': 'dog (doing the verb, but not to something)'
  , 'GEN': 'dogʼs'
  , 'DAT': 'to (the/a) dog'
  , 'LOC': 'near/at/by (the/a) dog'
  , 'ABL': 'from (the/a) dog'
  , 'INS': 'with/using (the/a) dog',

  'SG.NOM': 'dog (when doing the verb)'
  , 'PL.NOM': 'dogs (when doing the verb)'
  , 'SG.ACC': '(verb done to) dog'
  , 'PL.ACC': '(verb done to) dogs'
  , 'SG.ERG': 'dog (doing the verb to something)'
  , 'PL.ERG': 'dogs (doing the verb to something)'
  , 'SG.ABS': 'dog (doing the verb, but not to something)'
  , 'PL.ABS': 'dogs (doing the verb, but not to something)'
  , 'SG.GEN': 'dogʼs'
  , 'PL.GEN': 'dogsʼ'
  , 'SG.DAT': 'to (the/a) dog'
  , 'PL.DAT': 'to (the/some) dogs'
  , 'SG.LOC': 'near/at/by (the/a) dog'
  , 'PL.LOC': 'near/at/by (the/some) dogs'
  , 'SG.ABL': 'from (the/a) dog'
  , 'PL.ABL': 'from (the/some) dogs'
  , 'SG.INS': 'with/using (the/a) dog'
  , 'PL.INS': 'with/using (the/some) dogs',

  'DEF.SG.NOM': 'the dog (when doing the verb)'
  , 'DEF.PL.NOM': 'the dogs (when doing the verb)'
  , 'DEF.SG.ACC': '(verb done to) the dog'
  , 'DEF.PL.ACC': '(verb done to) the dogs'
  , 'DEF.SG.ERG': 'the dog (doing the verb to something)'
  , 'DEF.PL.ERG': 'the dogs (doing the verb to something)'
  , 'DEF.SG.ABS': 'the dog (doing the verb, but not to something)'
  , 'DEF.PL.ABS': 'the dogs (doing the verb, but not to something)'
  , 'DEF.SG.GEN': 'the dogʼs'
  , 'DEF.PL.GEN': 'the dogsʼ'
  , 'DEF.SG.DAT': 'to the dog'
  , 'DEF.PL.DAT': 'to the dogs'
  , 'DEF.SG.LOC': 'near/at/by the dog'
  , 'DEF.PL.LOC': 'near/at/by the dogs'
  , 'DEF.SG.ABL': 'from the dog'
  , 'DEF.PL.ABL': 'from the dogs'
  , 'DEF.SG.INS': 'with/using the dog'
  , 'DEF.PL.INS': 'with/using the dogs',

  'INDEF.SG.NOM': 'a dog (when doing the verb)'
  , 'INDEF.PL.NOM': 'some dogs (when doing the verb)'
  , 'INDEF.SG.ACC': '(verb done to) a dog'
  , 'INDEF.PL.ACC': '(verb done to) some dogs'
  , 'INDEF.SG.ERG': 'a dog (doing the verb to something)'
  , 'INDEF.PL.ERG': 'some dogs (doing the verb to something)'
  , 'INDEF.SG.ABS': 'a dog (doing the verb, but not to something)'
  , 'INDEF.PL.ABS': 'some dogs (doing the verb, but not to something)'
  , 'INDEF.SG.GEN': 'a dogʼs'
  , 'INDEF.PL.GEN': 'some dogsʼ'
  , 'INDEF.SG.DAT': 'to a dog'
  , 'INDEF.PL.DAT': 'to some dogs'
  , 'INDEF.SG.LOC': 'near/at/by a dog'
  , 'INDEF.PL.LOC': 'near/at/by some dogs'
  , 'INDEF.SG.ABL': 'from a)dog'
  , 'INDEF.PL.ABL': 'from some dogs'
  , 'INDEF.SG.INS': 'with/using a dog'
  , 'INDEF.PL.INS': 'with/using some dogs',

  'SG.NOM.M': 'man (when doing the verb)'
  , 'PL.NOM.M': 'men (when doing the verb)'
  , 'SG.ACC.M': '(verb done to) man'
  , 'PL.ACC.M': '(verb done to) men'
  , 'SG.ERG.M': 'man (doing the verb to something)'
  , 'PL.ERG.M': 'men (doing the verb to something)'
  , 'SG.ABS.M': 'man (doing the verb, but not to something)'
  , 'PL.ABS.M': 'men (doing the verb, but not to something)'
  , 'SG.GEN.M': 'manʼs'
  , 'PL.GEN.M': 'menʼs'
  , 'SG.DAT.M': 'to (the/a) man'
  , 'PL.DAT.M': 'to (the/some) men'
  , 'SG.LOC.M': 'near/at/by (the/a) man'
  , 'PL.LOC.M': 'near/at/by (the/some) men'
  , 'SG.ABL.M': 'from (the/a) man'
  , 'PL.ABL.M': 'from (the/some) men'
  , 'SG.INS.M': 'with/using (the/a) man'
  , 'PL.INS.M': 'with/using (the/some) men',

  'SG.NOM.F': 'woman (when doing the verb)'
  , 'PL.NOM.F': 'women (when doing the verb)'
  , 'SG.ACC.F': '(verb done to) woman'
  , 'PL.ACC.F': '(verb done to) women'
  , 'SG.ERG.F': 'woman (doing the verb to something)'
  , 'PL.ERG.F': 'women (doing the verb to something)'
  , 'SG.ABS.F': 'woman (doing the verb, but not to something)'
  , 'PL.ABS.F': 'women (doing the verb, but not to something)'
  , 'SG.GEN.F': 'womanʼs'
  , 'PL.GEN.F': 'womenʼs'
  , 'SG.DAT.F': 'to (the/a) woman'
  , 'PL.DAT.F': 'to (the/some) women'
  , 'SG.LOC.F': 'near/at/by (the/a) woman'
  , 'PL.LOC.F': 'near/at/by (the/some) women'
  , 'SG.ABL.F': 'from (the/a) woman'
  , 'PL.ABL.F': 'from (the/some) women'
  , 'SG.INS.F': 'with/using (the/a) woman'
  , 'PL.INS.F': 'with/using (the/some) women',

  'SG.NOM.NT': 'dog (when doing the verb)'
  , 'PL.NOM.NT': 'dogs (when doing the verb)'
  , 'SG.ACC.NT': '(verb done to) dog'
  , 'PL.ACC.NT': '(verb done to) dogs'
  , 'SG.ERG.NT': 'dog (doing the verb to something)'
  , 'PL.ERG.NT': 'dogs (doing the verb to something)'
  , 'SG.ABS.NT': 'dog (doing the verb, but not to something)'
  , 'PL.ABS.NT': 'dogs (doing the verb, but not to something)'
  , 'SG.GEN.NT': 'dogʼs'
  , 'PL.GEN.NT': 'dogsʼ'
  , 'SG.DAT.NT': 'to (the/a) dog'
  , 'PL.DAT.NT': 'to (the/some) dogs'
  , 'SG.LOC.NT': 'near/at/by (the/a) dog'
  , 'PL.LOC.NT': 'near/at/by (the/some) dogs'
  , 'SG.ABL.NT': 'from (the/a) dog'
  , 'PL.ABL.NT': 'from (the/some) dogs'
  , 'SG.INS.NT': 'with/using (the/a) dog'
  , 'PL.INS.NT': 'with/using (the/some) dogs',

  'DEF.NOM': 'the dog (when doing the verb)'
  , 'INDEF.NOM': 'a dog (when doing the verb)'
  , 'DEF.ACC': '(verb done to) the dog'
  , 'INDEF.ACC': '(verb done to) a dog'
  , 'DEF.ERG': 'the dog (doing the verb to something)'
  , 'INDEF.ERG': 'a dog (doing the verb to something)'
  , 'DEF.ABS': 'the dog (doing the verb, but not to something)'
  , 'INDEF.ABS': 'a dog (doing the verb, but not to something)'
  , 'DEF.GEN': 'the dogʼs'
  , 'INDEF.GEN': 'a dogʼs'
  , 'DEF.DAT': 'to the dog'
  , 'INDEF.DAT': 'to a dog'
  , 'DEF.LOC': 'near/at/by the dog'
  , 'INDEF.LOC': 'near/at/by a dog'
  , 'DEF.ABL': 'from the dog'
  , 'INDEF.ABL': 'from a dog'
  , 'DEF.INS': 'with/using the dog'
  , 'INDEF.INS': 'with/using a dog',

  'DEF.NOM.M': 'the man (when doing the verb)'
  , 'INDEF.NOM.M': 'a man (when doing the verb)'
  , 'DEF.ACC.M': '(verb done to) the man'
  , 'INDEF.ACC.M': '(verb done to) a man'
  , 'DEF.ERG.M': 'the man (doing the verb to something)'
  , 'INDEF.ERG.M': 'a man (doing the verb to something)'
  , 'DEF.ABS.M': 'the man (doing the verb, but not to something)'
  , 'INDEF.ABS.M': 'a man (doing the verb, but not to something)'
  , 'DEF.GEN.M': 'the manʼs'
  , 'INDEF.GEN.M': 'a manʼs'
  , 'DEF.DAT.M': 'to the man'
  , 'INDEF.DAT.M': 'to a man'
  , 'DEF.LOC.M': 'near/at/by the man'
  , 'INDEF.LOC.M': 'near/at/by a man'
  , 'DEF.ABL.M': 'from the man'
  , 'INDEF.ABL.M': 'from a man'
  , 'DEF.INS.M': 'with/using the man'
  , 'INDEF.INS.M': 'with/using a man',

  'DEF.NOM.F': 'the woman (when doing the verb)'
  , 'INDEF.NOM.F': 'a woman (when doing the verb)'
  , 'DEF.ACC.F': '(verb done to) the woman'
  , 'INDEF.ACC.F': '(verb done to) a woman'
  , 'DEF.ERG.F': 'the woman (doing the verb to something)'
  , 'INDEF.ERG.F': 'a woman (doing the verb to something)'
  , 'DEF.ABS.F': 'the woman (doing the verb, but not to something)'
  , 'INDEF.ABS.F': 'a woman (doing the verb, but not to something)'
  , 'DEF.GEN.F': 'the womanʼs'
  , 'INDEF.GEN.F': 'a womanʼs'
  , 'DEF.DAT.F': 'to the woman'
  , 'INDEF.DAT.F': 'to a woman'
  , 'DEF.LOC.F': 'near/at/by the woman'
  , 'INDEF.LOC.F': 'near/at/by a woman'
  , 'DEF.ABL.F': 'from the woman'
  , 'INDEF.ABL.F': 'from a woman'
  , 'DEF.INS.F': 'with/using the woman'
  , 'INDEF.INS.F': 'with/using a woman',

  'DEF.NOM.NT': 'the dog (when doing the verb)'
  , 'INDEF.NOM.NT': 'a dog (when doing the verb)'
  , 'DEF.ACC.NT': '(verb done to) the dog'
  , 'INDEF.ACC.NT': '(verb done to) a dog'
  , 'DEF.ERG.NT': 'the dog (doing the verb to something)'
  , 'INDEF.ERG.NT': 'a dog (doing the verb to something)'
  , 'DEF.ABS.NT': 'the dog (doing the verb, but not to something)'
  , 'INDEF.ABS.NT': 'a dog (doing the verb, but not to something)'
  , 'DEF.GEN.NT': 'the dogʼs'
  , 'INDEF.GEN.NT': 'a dogʼs'
  , 'DEF.DAT.NT': 'to the dog'
  , 'INDEF.DAT.NT': 'to a dog'
  , 'DEF.LOC.NT': 'near/at/by the dog'
  , 'INDEF.LOC.NT': 'near/at/by a dog'
  , 'DEF.ABL.NT': 'from the dog'
  , 'INDEF.ABL.NT': 'from a dog'
  , 'DEF.INS.NT': 'with/using the dog'
  , 'INDEF.INS.NT': 'with/using a dog',

  'DEF.M': 'the man'
  , 'INDEF.M': 'a man'
  , 'DEF.F': 'the woman'
  , 'INDEF.F': 'a woman'
  , 'DEF.NT': 'the dog'
  , 'INDEF.NT': 'a dog',

  'DEF.SG.M': 'the man'
  , 'INDEF.SG.M': 'a man'
  , 'DEF.PL.M': 'the men'
  , 'INDEF.PL.M': 'some men',

  'DEF.SG.F': 'the woman'
  , 'INDEF.SG.F': 'a woman'
  , 'DEF.PL.F': 'the women'
  , 'INDEF.PL.F': 'some women',

  'DEF.SG.NT': 'the dog'
  , 'INDEF.SG.NT': 'a dog'
  , 'DEF.PL.NT': 'the dogs'
  , 'INDEF.PL.NT': 'some dogs',

};

let verbStack = {
  'PRS': 'learn'
  , 'PST': 'learned'
  , 'REM': 'learned (long ago)'
  , 'FUT': 'will learn'
  , 'REM.FUT': 'will learn (long way away)'
  , '1': '(I/we) learn/learned/will learn'
  , '2': '(you) learn/learned/will learn'
  , '3': '(he/she/it/they) learn/learned/will learn'
  , 'SG': '(I/you/he/she/it) learn/learned/will learn'
  , 'PL': '(we/they) learn/learned/will learn'
  , 'DU': 'those two learn/learned/will learn'
  , 'TRI': 'those three learn/learned/will learn'
  , 'PAUC': 'those few learn/learned/will learn',

  'PFV': 'learn'
  , 'HAB': 'learn (often)'
  , 'CONT': 'learning'
  , 'PRF': 'have learned',

  'PFV.1': '(I/we) learn'
  , 'PFV.2': '(you/you all) learn'
  , 'PFV.3': '(he/she/it/they) learn'
  , 'HAB.1': '(I/we) learn (often)'
  , 'HAB.2': '(you/you all) learn (often)'
  , 'HAB.3': '(he/she/it/they) learn (often)'
  , 'CONT.1': '(I/we) am learning'
  , 'CONT.2': '(he/she/it/they) is/are learning'
  , 'CONT.3': 'learning'
  , 'PRF.1': '(I/we) have learned'
  , 'PRF.2': '(you/you all) have learned'
  , 'PRF.3': '(he/she/it/they) has/have learned',

  'PFV.SG': '(I/you/he/she/it) learn'
  , 'PFV.PL': '(we/you all/they) learn'
  , 'HAB.SG': '(I/you/he/she/it) learn (often)'
  , 'HAB.PL': '(we/you all/they) learn (often)'
  , 'CONT.SG': '(I/you/he/she/it) am/is learning'
  , 'CONT.PL': '(we/you all/they) are learning'
  , 'PRF.SG': '(I/you/he/she/it) have/has learned'
  , 'PRF.PL': '(we/you all/they) have learned',

  'PFV.PRS': 'learn'
  , 'PFV.PST': 'learned'
  , 'HAB.FUT': 'will learn'
  , 'HAB.PRS': 'learn (often)'
  , 'HAB.PST': 'used to learn'
  , 'HAB.FUT': 'will learn (often)'
  , 'CONT.PRS': 'is/are/am learning'
  , 'CONT.PST': 'was/were learning'
  , 'CONT.FUT': 'will be learning'
  , 'PRF.PRS': 'have learned'
  , 'PRF.PST': 'had learned'
  , 'PRF.FUT': 'will have learned',

  'IND': 'learn'
  , 'COND': 'would learn'
  , 'SUBJ': 'learn'
  , 'IMP': 'learn! (command)',

  '1.SG': '(I) learn/learned/will learn'
  , '2.SG': '(you) learn/learned/will learn'
  , '3.SG': '(he/she/it) learns/learned/will learn'
  , '1.PL': '(we) learn/learned/will learn'
  , '2.PL': '(you all) learn/learned/will learn'
  , '3.PL': '(they) learn/learned/will learn',

  'SG.PRS': '(I/you/he/she/it) learn'
  , 'PL.PRS': '(we/they) learn'
  , 'SG.PST': '(I/you/he/she/it) learned'
  , 'PL.PST': '(we/they) learned'
  , 'SG.REM': '(I/you/he/she/it) learned (long ago)'
  , 'PL.REM': '(we/they) learned (long ago)'
  , 'SG.FUT': '(I/you/he/she/it) will learn'
  , 'PL.FUT': '(we/they) will learn',

  'PRS.1': '(I/we) learn'
  , 'PRS.1.SG': '(I) learn'
  , 'PRS.1.SG.M': '(I) learn'
  , 'PRS.1.SG.F': '(I) learn'
  , 'PRS.2': '(you/you all) learn'
  , 'PRS.2.SG': '(you) learn'
  , 'PRS.2.SG.M': '(you) learn'
  , 'PRS.2.SG.F': '(you) learn'
  , 'PRS.3': '(he/she/it/they) learn'
  , 'PRS.3.SG': '(he/she/it) learns'
  , 'PRS.3.SG.M': '(he) learns'
  , 'PRS.3.SG.F': '(she) learns'
  , 'PRS.3.SG.NT': '(it) learns'
  , 'PRS.1.PL': '(we) learn'
  , 'PRS.1.PL.M': '(we) learn'
  , 'PRS.1.PL.F': '(we) learn'
  , 'PRS.1.PL.INCL': '(we) learn (including you)'
  , 'PRS.1.PL.EXCL': '(we) learn (excluding you)'
  , 'PRS.2.PL': '(you all) learn'
  , 'PRS.2.PL.M': '(you all) learn'
  , 'PRS.2.PL.F': '(you all) learn'
  , 'PRS.3.PL': '(they) learn'
  , 'PRS.3.PL.M': '(they) learn'
  , 'PRS.3.PL.F': '(they) learn'
  , 'PRS.3.PL.NT': '(they) learn',

  'PST.1': '(I/we) learned'
  , 'PST.1.SG': '(I) learned'
  , 'PST.1.SG.M': '(I) learned'
  , 'PST.1.SG.F': '(I) learned'
  , 'PST.2': '(you/you all) learned'
  , 'PST.2.SG': '(you) learned'
  , 'PST.2.SG.M': '(you) learned'
  , 'PST.2.SG.F': '(you) learned'
  , 'PST.3': '(he/she/it/they) learned'
  , 'PST.3.SG': '(he/she/it) learned'
  , 'PST.3.SG.M': '(he) learned'
  , 'PST.3.SG.F': '(she) learned'
  , 'PST.3.SG.NT': '(it) learned'
  , 'PST.1.PL': '(we) learned'
  , 'PST.1.PL.M': '(we) learned'
  , 'PST.1.PL.F': '(we) learned'
  , 'PST.1.PL.INCL': '(we) learned (including you)'
  , 'PST.1.PL.EXCL': '(we) learned (excluding you)'
  , 'PST.2.PL': '(you all) learned'
  , 'PST.2.PL.M': '(you all) learned'
  , 'PST.2.PL.F': '(you all) learned'
  , 'PST.3.PL': '(they) learned'
  , 'PST.3.PL.M': '(they) learned'
  , 'PST.3.PL.F': '(they) learned'
  , 'PST.3.PL.NT': '(they) learned',

  'REM.1': '(I/we) learned (long ago)'
  , 'REM.1.SG': '(I) learned (long ago)'
  , 'REM.1.SG.M': '(I) learned (long ago)'
  , 'REM.1.SG.F': '(I) learned (long ago)'
  , 'REM.2': '(you/you all) learned (long ago)'
  , 'REM.2.SG': '(you) learned (long ago)'
  , 'REM.2.SG.M': '(you) learned (long ago)'
  , 'REM.2.SG.F': '(you) learned (long ago)'
  , 'REM.3': '(he/she/it/they) learned (long ago)'
  , 'REM.3.SG': '(he/she/it) learned (long ago)'
  , 'REM.3.SG.M': '(he) learned (long ago)'
  , 'REM.3.SG.F': '(she) learned (long ago)'
  , 'REM.3.SG.NT': '(it) learned (long ago)'
  , 'REM.1.PL': '(we) learned (long ago)'
  , 'REM.1.PL.M': '(we) learned (long ago)'
  , 'REM.1.PL.F': '(we) learned (long ago)'
  , 'REM.1.PL.INCL': '(we) learned (including you) (long ago)'
  , 'REM.1.PL.EXCL': '(we) learned (excluding you) (long ago)'
  , 'REM.2.PL': '(you all) learned (long ago)'
  , 'REM.2.PL.M': '(you all) learned (long ago)'
  , 'REM.2.PL.F': '(you all) learned (long ago)'
  , 'REM.3.PL': '(they) learned (long ago)'
  , 'REM.3.PL.M': '(they) learned (long ago)'
  , 'REM.3.PL.F': '(they) learned (long ago)'
  , 'REM.3.PL.NT': '(they) learned (long ago)',

  'FUT.1': '(I/we) will learn'
  , 'FUT.1.SG': '(I) will learn'
  , 'FUT.1.SG.M': '(I) will learn'
  , 'FUT.1.SG.F': '(I) will learn'
  , 'FUT.2': '(you/you all) will learn'
  , 'FUT.2.SG': '(you) will learn'
  , 'FUT.2.SG.M': '(you) will learn'
  , 'FUT.2.SG.F': '(you) will learn'
  , 'FUT.3': '(he/she/it/they) will learn'
  , 'FUT.3.SG': '(he/she/it) will learn'
  , 'FUT.3.SG.M': '(he) will learn'
  , 'FUT.3.SG.F': '(she) will learn'
  , 'FUT.3.SG.NT': '(it) will learn'
  , 'FUT.1.PL': '(we) will learn'
  , 'FUT.1.PL.M': '(we) will learn'
  , 'FUT.1.PL.F': '(we) will learn'
  , 'FUT.1.PL.INCL': '(we) will learn (including you)'
  , 'FUT.1.PL.EXCL': '(we) will learn (excluding you)'
  , 'FUT.2.PL': '(you all) will learn'
  , 'FUT.2.PL.M': '(you all) will learn'
  , 'FUT.2.PL.F': '(you all) will learn'
  , 'FUT.3.PL': '(they) will learn'
  , 'FUT.3.PL.M': '(they) will learn'
  , 'FUT.3.PL.F': '(they) will learn'
  , 'FUT.3.PL.NT': '(they) will learn'
  ,
}

let artStack = {
  'DEF': 'the'
  , 'INDEF': 'a/some'
  , 'DEF.SG': 'the'
  , 'DEF.PL': 'the'
  , 'INDEF.SG': 'a'
  , 'INDEF.PL': 'some'
}

let polysemy = [
  ['be (exist):v', 'be (permanent state):v', 0.8, 0]
  , ['be (permanent state):v', 'be (temporary state):v', 0.9, 0]
  , ['be (temporary state):v', 'be (located):v', 0.8, 0]
  , ['be (permanent state):v', 'be (age):v', 0.3, 0]
  , ['in:prep', 'within:prep', 1, 0]
  , ['in:prep', 'into:prep', 0.7, 0]
  , ['into:prep', 'inside:prep', 0.3, 0]
  , ['to:prep', 'towards:prep', 1, 0]
  , ['by (agent performing an action):prep', 'by (author or creator):prep', 0.9, 0]
  , ['by (agent performing an action):prep', 'by (using the means of):prep', 0.2, 0]
  , ['by (using the means of):prep', 'by (using a route):prep', 0.9, 0]
  , ['get:v', 'obtain:v', 1, 0]
  , ['get:v', 'take:v', 0.5, 0.5]
  , ['or:conj', 'either:conj', 0.6, 0]
  , ['have:v', 'take:v', 0.4, 0.5]
  , ['take:v', 'bring:v', 0.1, 0]
  , ['have:v', 'be (age):v', 0.3, 0]
  , ['take:v', 'receive:v', 0.3, 0.9]
  , ['take:v', 'arrest:v', 0.3, 0.9]
  , ['take:v', 'capture:v', 0.3, 0.9]
  , ['take:v', 'collect:v', 0.2, 0.5]
  , ['take:v', 'hold:v', 0.2, 0.5]
  , ['take:v', 'grab:v', 0.3, 0.6]
  , ['take:v', 'carry:v', 0.3, 0.6]
  , ['take:v', 'catch:v', 0.2, 0.6]
  , ['take:v', 'steal:v', 0.3, 0.8]
  , ['take:v', 'seize:v', 0.3, 0.7]
  , ['take:v', 'earn:v', 0.2, 0.8]
  , ['take:v', 'accept:v', 0.2, 1]
  , ['take:v', 'understand:v', 0.1, 1]
  , ['take:v', 'adopt:v', 0.1, 1]
  , ['take:v', 'attract:v', 0.1, 1]
  , ['take:v', 'reserve:v', 0.2, 0]
  , ['take:v', 'book:v', 0.2, 0]
  , ['take:v', 'charm:v', 0.05, 1]
  , ['take:v', 'consider:v', 0.05, 1]
  , ['take:v', 'drive:v', 0.05, 1]
  , ['take:v', 'eat:v', 0.05, 1]
  , ['take:v', 'escort:v', 0.1, 0]
  , ['take:v', 'experience:v', 0.05, 1]
  , ['take:v', 'fascinate:v', 0.05, 1]
  , ['take:v', 'gain:v', 0.1, 0]
  , ['take:v', 'hire:v', 0.05, 0]
  , ['take:v', 'include:v', 0.05, 0]
  , ['take:v', 'inhale:v', 0.05, 0]
  , ['take:v', 'reap:v', 0.1, 0]
  , ['take:v', 'remove:v', 0.3, 0.5]
  , ['take:v', 'select:v', 0.05, 0]
  , ['arrest:v', 'capture:v', 0.3, 0.6]
  , ['arrest:v', 'detain:v', 0.4, 0.4]
  , ['detain:v', 'restrain:v', 0.4, 0.4]
  , ['about:prep', 'concerning:prep', 1, 0]
  , ['about:prep', 'regarding:prep', 1, 0]
  , ['also:adv', 'as well:adv', 1, 0]
  , ['way:n', 'manner:n', 0.5, 0.3]
  , ['way:n', 'process:n', 0.3, 0.7]
  , ['way:n', 'style:n', 0.3, 0.9]
  , ['way:n', 'route:n', 0.4, 0.3]
  , ['way:n', 'direction (way):n', 0.3, 0.3]
  , ['use:v', 'utilize:v', 1, 0]
  , ['length:n', 'life (lifetime):n', 0.1, 1]
  , ['energy (strength, stamina):n', 'life (soul):n', 0.1, 0]
  , ['life (lifetime):n', 'life (soul):n', 0.9, 0]
  , ['life (lifetime):n', 'life (living organism):n', 0.9, 0]
  , ['life (living organism):n', 'existence:n', 0.3, 0]
  , ['life (living organism):n', 'organism:n', 0.2, 0.8]
  , ['heart:n', 'life (soul):n', 0.2, 0]
  , ['life (soul):n', 'soul:n', 0.7, 0]
  , ['life (soul):n', 'spirit:n', 0.7, 0.5]
  , ['course (direction of travel):n', 'life (lifetime):n', 0.1, 1]
  , ['sick:adj', 'ill:adj', 1, 0]
  , ['sick:adj', 'unwell:adj', 1, 0]
  , ['only:adv', 'merely:adv', 1, 0]
  , ['only:adv', 'hardly:adv', 0.5, 0]
  , ['barely:adv', 'merely:adv', 0.5, 0]
  , ['very:adv', 'really:adv', 1, 0]
  , ['very:adv', 'pretty:adv', 0.5, 0.5]
  , ['try (attempt):v', 'attempt:v', 1, 0]
  , ['try (attempt):v', 'try (strive):v', 0.4, 0]
  , ['try (attempt):v', 'try (test out):v', 0.4, 0]
  , ['country (nation):n', 'state (province, country):n', 0.3, 0]
  , ['territory:n', 'state (province, country):n', 0.2, 0]
  , ['state (province, country):n', 'government:n', 0.1, 0]
  , ['shape:n', 'state (condition):n', 0.1, 0.2]
  , ['state (condition):n', 'condition (state):n', 1, 0]
  , ['state (condition):n', 'mood:n', 0.2, 1]
  , ['state (condition):n', 'situation (circumstances, context):n', 0.3, 0.8]
  , ['rule (law, regulation):n', 'condition (requirement, stipulation):n', 0.3, 0.5]
  , ['become (begin to be):v', 'become (change into):v', 0.8, 0.1]
  , ['become (change into):v', 'get:v', 1, 1]
  , ['become (change into):v', 'convert:v', 0.3, 0]
  , ['keep (store):v', 'store:v', 1, 0]
  , ['keep (store):v', 'own:v', 0.2, 1]
  , ['keep (save, retain):v', 'save:v', 0.5, 0.5]
  , ['keep (save, retain):v', 'accumulate:v', 0.4, 0.5]
  , ['keep (save, retain):v', 'hold:v', 0.2, 1]
  , ['keep (save, retain):v', 'carry:v', 0.2, 1]
  , ['keep (save, retain):v', 'reserve:v', 0.2, 0]
  , ['keep (save, retain):v', 'guard:v', 0.2, 0]
  , ['keep (not return):v', 'control:v', 0.2, 1]
  , ['keep (store):v', 'put (place):v', 0.2, 1]
  , ['keep (store):v', 'deposit:v', 0.3, 0]
  , ['keep (store):v', 'detain:v', 0.3, 0]
  , ['store:v', 'collect:v', 0.2, 0]
  , ['store:v', 'deposit:v', 0.1, 0]
  , ['let:v', 'allow (let):v', 1, 0], // permit
  ['let:v', 'approve:v', 0.3, 0]
  , ['let:v', 'tolerate:v', 0.1, 1]
  , ['let:v', 'authorize:v', 0.2, 0]
  , ['let:v', 'certify:v', 0.2, 0]
  , ['let:v', 'enable:v', 0.7, 0]
  , ['help:v', 'assist:v', 1, 0]
  , ['talk:v', 'speak:v', 1, 0]
  , ['talk:v', 'chat:v', 0.2, 0]
  , ['speak:v', 'pronounce:v', 0.3, 0.3]
  , ['start:v', 'begin:v', 1, 0]
  , ['show:v', 'demonstrate:v', 1, 0]
  , ['right:adj', 'correct:adj', 1, 0], //['question:n', 'query:n', 1, 0],
  ['always:adv', 'all the time:adv', 1, 0]
  , ['under:prep', 'below:prep', 1, 0]
  , ['story:n', 'fable:n', 1, 0]
  , ['right:n', 'entitlement:n', 1, 0]
  , ['right:n', 'privilege:n', 0.4, 0]
  , ['issue:n', 'concern:n', 1, 0]
  , ['kind:n', 'type:n', 1, 0]
  , ['continue:v', 'keep (continue):v', 1, 0]
  , ['keep (continue):v', 'run:v', 0.2, 1]
  , ['keep (continue):v', 'support:v', 0.2, 1]
  , ['keep (continue):v', 'sustain:v', 0.2, 0]
  , ['result:n', 'outcome:n', 1, 0]
  , ['process:n', 'procedure:n', 1, 0]
  , ['buy:v', 'purchase:v', 1, 0]
  , ['buy:v', 'shop:v', 1, 0]
  , ['build:v', 'construct:v', 1, 0]
  , ['build:v', 'erect:v', 0.9, 0]
  , ['build:v', 'produce (manufacture):v', 0.3, 0]
  , ['build:v', 'assemble:v', 0.3, 0]
  , ['construct:v', 'erect:v', 0.3, 0]
  , ['construct:v', 'produce (manufacture):v', 0.3, 0]
  , ['wait:v', 'stay:v', 0.3, 0.2]
  , ['stand:v', 'stay:v', 0.3, 0.2]
  , ['settle:v', 'stay:v', 0.3, 0.2]
  , ['stop:v', 'stay:v', 0.3, 0.2]
  , ['stay:v', 'remain:v', 1, 0]
  , ['someone:pron', 'somebody:pron', 1, 0]
  , ['last (final):adj', 'last (previous):adj', 0.8, 0]
  , ['last (final):adj', 'last (only remaining):adj', 0.8, 0]
  , ['last (previous):adj', 'previous:adj', 1, 0]
  , ['last (previous):adj', 'former:adj', 1, 0]
  , ['old:adj', 'former:adj', 0.3, 1]
  , ['seem:v', 'appear:v', 1, 0]
  , ['seem:v', 'imply:v', 0.3, 1]
  , ['feel (perceive, sense):v', 'feel (sense by touch):v', 0.4, 0.2]
  , ['feel (sense by touch):v', 'feel (examine by touch):v', 0.9, 0.2]
  , ['feel (perceive, sense):v', 'appreciate:v', 0.1, 0.4]
  , ['feel (perceive, sense):v', 'enjoy:v', 0.1, 0.4]
  , ['feel (perceive, sense):v', 'notice:v', 0.4, 0.3]
  , ['feel (perceive, sense):v', 'seem:v', 0.4, 0.3]
  , ['feel (perceive, sense):v', 'taste:v', 0.1, 1]
  , ['touch:v', 'feel (sense by touch):v', 0.9, 0.2]
  , ['feel (sense by touch):v', 'stroke:v', 0.1, 0]
  , ['feel (perceive, sense):v', 'perceive:v', 0.4, 0.2]
  , ['explore:v', 'feel (examine by touch):v', 0.1, 0]
  , ['strong:adj', 'tough:adj', 1, 0]
  , ['whole:adj', 'entire:adj', 1, 0]
  , ['return:v', 'go back:v', 1, 0]
  , ['price:n', 'fee:n', 1, 0]
  , ['price:n', 'cost:n', 1, 0], //['price:n', 'fare:n', 1, 0],
  ['wear:v', 'put on:v', 1, 0]
  , ['teach:v', 'instruct:v', 1, 0]
  , ['clothes:n', 'clothing:n', 1, 0]
  , ['worker:n', 'employee:n', 1, 0]
  , ['choose:v', 'select:v', 1, 0]
  , ['cause:v', 'induce:v', 1, 0]
  , ['look:n', 'appearance (looks):n', 1, 0]
  , ['chance:n', 'odds:n', 1, 0]
  , ['short:adj', 'low:adj', 1, 0]
  , ['close:v', 'shut:v', 1, 0]
  , ['have:v', 'involve:v', 0.1, 0]
  , ['involve:v', 'entail:v', 1, 0]
  , ['increase:v', 'expand:v', 1, 0], //['officer:n', 'official:n', 1, 0],
  ['store:n', 'shop:n', 1, 0]
  , ['store:n', 'salon:n', 0.2, 0]
  , ['sadness:n', 'sorrow:n', 1, 0]
  , ['factor:n', 'variable:n', 1, 0]
  , ['save:v', 'rescue:v', 1, 0]
  , ['exact:adj', 'precise:adj', 1, 0]
  , ['exact:adj', 'definite:adj', 0.3, 0.2]
  , ['precise:adj', 'definite:adj', 0.3, 0.2]
  , ['specific:adj', 'definite:adj', 1, 0]
  , ['identify:v', 'point out:v', 1, 0]
  , ['amount:n', 'quantity:n', 1, 0]
  , ['bill:n', 'check:n', 1, 0]
  , ['present:n', 'gift:n', 1, 0]
  , ['rock:n', 'stone:n', 0.9, 0]
  , ['remove:v', 'take out:v', 1, 0]
  , ['respond:v', 'answer:v', 1, 0]
  , ['respond:v', 'reply:v', 1, 0]
  , ['wide:adj', 'broad:adj', 1, 0]
  , ['specific:adj', 'particular:adj', 1, 0]
  , ['specific:adj', 'distinct:adj', 0.3, 0.2]
  , ['distinct:adj', 'apparent:adj', 0.7, 0.2]
  , ['sea:n', 'ocean:n', 1, 0]
  , ['jewel:n', 'gem:n', 1, 0]
  , ['jewel:n', 'pearl:n', 0.2, 0]
  , ['screw:v', 'fuck (slang):v', 0.4, 1]
  , ['lay:v', 'fuck (slang):v', 0.4, 1]
  , ['bang:v', 'fuck (slang):v', 0.4, 1]
  , ['stomach:n', 'gut:n', 1, 0]
  , ['path:n', 'track:n', 1, 0]
  , ['loud:adj', 'noisy:adj', 1, 0]
  , ['copper:n', 'bronze:n', 1, 0]
  , ['mistake:n', 'error:n', 1, 0]
  , ['bug:n', 'insect:n', 1, 0]
  , ['bug:n', 'beetle:n', 0.3, 0]
  , ['chicken:n', 'fowl:n', 1, 0]
  , ['shame:n', 'stigma:n', 1, 0]
  , ['slope:n', 'slant:n', 1, 0]
  , ['smell (emit odor):v', 'stink:v', 1, 0]
  , ['trick:v', 'deceive:v', 1, 0]
  , ['coat:n', 'jacket:n', 1, 0]
  , ['cabinet:n', 'drawer:n', 1, 0]
  , ['engine:n', 'motor:n', 1, 0]
  , ['cauldron:n', 'kettle:n', 1, 0]
  , ['match (game):n', 'contest:n', 1, 0]
  , ['parcel:n', 'package:n', 1, 0]
  , ['parcel:n', 'bundle:n', 1, 0]
  , ['fix:v', 'mend:v', 1, 0]
  , ['fix:v', 'repair:v', 1, 0]
  , ['prison:n', 'jail:n', 1, 0]
  , ['rod:n', 'shaft:n', 1, 0]
  , ['rod:n', 'bar:n', 1, 0]
  , ['shaft:n', 'cylinder:n', 0.5, 0]
  , ['rod:n', 'stick:n', 0.3, 0]
  , ['rod:n', 'pole:n', 0.3, 0]
  , ['stick:n', 'bat (club):n', 0.3, 0]
  , ['shelf:n', 'rack:n', 1, 0]
  , ['trousers:n', 'pants:n', 1, 0]
  , ['angry:adj', 'mad:adj', 1, 0]
  , ['pile:n', 'heap:n', 1, 0]
  , ['pile:n', 'mound:n', 0.6, 0]
  , ['sudden:adj', 'abrupt:adj', 1, 0]
  , ['lounge:n', 'couch:n', 1, 0]
  , ['lounge:n', 'sofa:n', 1, 0]
  , ['when:conj', 'while:conj', 0.3, 1]
  , ['although:conj', 'though:conj', 1, 0]
  , ['think:v', 'figure out:v', 0.2, 1]
  , ['solve:v', 'figure out:v', 1, 0]
  , ['restaurant:n', 'diner:n', 1, 0]
  , ['potion:n', 'elixir:n', 1, 0]
  , ['spear:n', 'lance:n', 1, 0]
  , ['spear:n', 'pike:n', 1, 0]
  , ['ancestor:n', 'forefather:n', 1, 0]
  , ['date:v', 'go out:v', 1, 0]
  , ['attend:v', 'date, go out:v', 0.3, 0.2]
  , ['lend:v', 'loan:v', 1, 0]
  , ['gay:adj', 'homosexual:adj', 1, 0]
  , ['blasphemy:n', 'heresy:n', 1, 0]
  , ['idiot:n', 'fool:n', 1, 0]
  , ['holiday:n', 'vacation:n', 1, 0]
  , ['hallway:n', 'corridor:n', 1, 0]
  , ['hallway:n', 'lobby:n', 0.3, 0]
  , ['stable:adj', 'steady:adj', 1, 0]
  , ['stable:adj', 'calm:adj', 0.6, 0.9]
  , ['stable:adj', 'safe:adj', 0.3, 0.9]
  , ['tread:v', 'step on:v', 1, 0]
  , ['naked:adj', 'nude:adj', 1, 0]
  , ['awful:adj', 'terrible:adj', 1, 0]
  , ['hurt:v', 'injure:v', 1, 0]
  , ['therefore:adv', 'thus:adv', 1, 0]
  , ['good:adj', 'excellent:adj', 0.3, 0.8]
  , ['excellent:adj', 'fantastic:adj', 1, 0]
  , ['excellent:adj', 'wonderful:adj', 1, 0]
  , ['excellent:adj', 'fabulous:adj', 1, 0]
  , ['excellent:adj', 'terrific:adj', 1, 0]
  , ['excellent:adj', 'superb:adj', 1, 0]
  , ['good:adj', 'superb:adj', 0.3, 0.8]
  , ['good:adj', 'wonderful:adj', 0.3, 0.8]
  , ['good:adj', 'fabulous:adj', 0.3, 0.8]
  , ['good:adj', 'precious:adj', 0.1, 0.8]
  , ['good:adj', 'honest:adj', 0.1, 0.8]
  , ['good:adj', 'innocent:adj', 0.1, 0.8]
  , ['good:adj', 'pure:adj', 0.1, 0.8]
  , ['good:adj', 'right:adj', 0.1, 0.8]
  , ['good:adj', 'competent:adj', 0.1, 0.8]
  , ['good:adj', 'appropriate:adj', 0.1, 0.8]
  , ['fair:adj', 'just:adj', 1, 0]
  , ['just:adj', 'moral:adj', 0.3, 0.3], //['pair:n', 'duo:n', 1, 0],
  ['search:v', 'look up:v', 1, 0]
  , ['search:v', 'explore:v', 0.5, 0]
  , ['search:v', 'investigate:v', 0.3, 0.4]
  , ['search:v', 'scan:v', 0.3, 0]
  , ['search:v', 'research:v', 0.3, 0]
  , ['ban:v', 'prohibit:v', 1, 0]
  , ['direct:v', 'conduct:v', 1, 0]
  , ['weird:adj', 'strange:adj', 1, 0]
  , ['complicated:adj', 'complex:adj', 1, 0]
  , ['wake:v', 'wake up:v', 1, 0]
  , ['wake:v', 'get up:v', 1, 0]
  , ['crazy:adj', 'insane:adj', 1, 0]
  , ['except:prep', 'besides:prep', 1, 0]
  , ['smart:adj', 'intelligent:adj', 1, 0]
  , ['somewhat:adv', 'fairly:adv', 1, 0]
  , ['somewhat:adv', 'pretty:adv', 1, 0]
  , ['tear:v', 'rip:v', 1, 0]
  , ['massive:adj', 'enormous:adj', 1, 0]
  , ['achieve:v', 'accomplish:v', 1, 0]
  , ['release:v', 'let go:v', 1, 0]
  , ['release:v', 'let out:v', 1, 0]
  , ['fabric:n', 'textile:n', 1, 0]
  , ['nevertheless:adv', 'regardless:adv', 1, 0]
  , ['nevertheless:adv', 'even though:adv', 1, 0]
  , ['assume:v', 'presume:v', 1, 0]
  , ['recommend:v', 'advise:v', 1, 0]
  , ['scared:adj', 'afraid:adj', 1, 0]
  , ['afraid:adj', 'reluctant:adj', 0.3, 0.6]
  , ['depend:v', 'rely on:v', 1, 0]
  , ['explode:v', 'blow up:v', 1, 0]
  , ['sequence:n', 'order:n', 1, 0]
  , ['order:n', 'hierarchy:n', 0.3, 0]
  , ['chef:n', 'cook:n', 1, 0]
  , ['field:n', 'arena:n', 0.2, 0.2]
  , ['arena:n', 'stadium:n', 1, 0]
  , ['germ:n', 'bacteria:n', 1, 0]
  , ['virus:n', 'germ:n', 0.3, 1]
  , ['footpath:n', 'sidewalk:n', 1, 0]
  , ['noon:n', 'midday:n', 1, 0]
  , ['look out:v', 'watch out:v', 1, 0]
  , ['withdraw:v', 'take out:v', 1, 0]
  , ['homeland:n', 'motherland:n', 1, 0]
  , ['bankrupt:adj', 'broke:adj', 1, 0]
  , ['alongside:prep', 'as well as:prep', 1, 0]
  , ['vanish:v', 'disappear:v', 1, 0]
  , ['garbage:n', 'trash:n', 1, 0]
  , ['garbage:n', 'rubbish:n', 1, 0]
  , ['attend:v', 'show up:v', 1, 0]
  , ['sole:adj', 'lone:adj', 1, 0]
  , ['think:v', 'deem:v', 0.2, 0.2]
  , ['regard:v', 'deem:v', 1, 0]
  , ['defeat:v', 'beat:v', 1, 0]
  , ['customer:n', 'patron:n', 1, 0]
  , ['mobile:adj', 'portable:adj', 1, 0]
  , ['jersey:n', 'sweater:n', 1, 0]
  , ['quit:v', 'surrender:v', 0.5, 0.1]
  , ['surrender:v', 'give up:v', 1, 0]
  , ['extinguish:v', 'put out:v', 1, 0]
  , ['taxi:n', 'cab:n', 1, 0]
  , ['destiny:n', 'fate:n', 1, 0]
  , ['quit:v', 'give up:v', 1, 0]
  , ['confirm:v', 'validate:v', 1, 0]
  , ['confirm:v', 'verify:v', 1, 0]
  , ['wet:adj', 'damp:adj', 0.5, 0]
  , ['damp:adj', 'moist:adj', 1, 0]
  , ['melody:n', 'tune:n', 1, 0]
  , ['name:v', 'dub:v', 1, 0]
  , ['notify:v', 'inform:v', 1, 0]
  , ['compost:n', 'fertilizer:n', 1, 0]
  , ['lethal:adj', 'fatal:adj', 1, 0]
  , ['insure:v', 'assure:v', 1, 0]
  , ['insure:v', 'guarantee:v', 1, 0]
  , ['remove:v', 'deprive:v', 1, 0]
  , ['remove:v', 'take away:v', 1, 0]
  , ['bloom:v', 'blossom:v', 1, 0]
  , ['bloom:v', 'flourish:v', 1, 0]
  , ['grow up:v', 'sprout:v', 0.5, 0]
  , ['bloom:v', 'sprout:v', 0.3, 0]
  , ['leisure:n', 'recreation:n', 1, 0]
  , ['clip:v', 'snip:v', 1, 0]
  , ['clip:v', 'trim:v', 1, 0]
  , ['cut:v', 'snip:v', 0.4, 0]
  , ['shave:v', 'trim:v', 0.4, 0], //['reduce:v', 'trim:v', 0.3, 0],
  ['shave:v', 'skim:v', 0.3, 0]
  , ['shave:v', 'graze (touch):v', 0.3, 0]
  , ['graze (touch):v', 'skim:v', 0.3, 0]
  , ['forgive:v', 'excuse:v', 1, 0]
  , ['explain:v', 'excuse:v', 0.3, 1]
  , ['discharge:v', 'excuse:v', 0.4, 1]
  , ['excuse:v', 'vindicate:v', 0.4, 0]
  , ['relieve:v', 'excuse:v', 0.4, 1]
  , ['release:v', 'excuse:v', 0.3, 0.9]
  , ['take apart:v', 'dismantle:v', 1, 0]
  , ['dismantle:v', 'destroy:v', 0.3, 1]
  , ['nervous:adj', 'anxious:adj', 1, 0]
  , ['pan:n', 'saucepan:n', 1, 0]
  , ['pan:n', 'pot:n', 0.3, 0]
  , ['bag:n', 'suitcase:n', 0.3, 0]
  , ['suitcase:n', 'baggage:n', 0.6, 0]
  , ['luggage:n', 'baggage:n', 1, 0]
  , ['bag:n', 'luggage, baggage:n', 0.5, 0]
  , ['baggage:n', 'equipment:n', 0.3, 0.9]
  , ['shout:v', 'yell:v', 1, 0]
  , ['sickness:n', 'illness:n', 1, 0]
  , ['inn:n', 'lodge:n', 1, 0]
  , ['rubble:n', 'debris:n', 1, 0]
  , ['rubble:n', 'remains:n', 0.3, 0]
  , ['capture:v', 'seize:v', 1, 0]
  , ['capture:v', 'kidnap:v', 0.6, 0.5]
  , ['steal:v', 'kidnap:v', 0.4, 0.2]
  , ['hire:v', 'rent:v', 1, 0]
  , ['hire:v', 'recruit:v', 0.7, 0]
  , ['border:n', 'boundary:n', 1, 0]
  , ['border:n', 'margin:n', 0.3, 0]
  , ['border:n', 'verge:n', 0.5, 0]
  , ['border:n', 'fringe:n', 0.3, 0]
  , ['porch:n', 'veranda:n', 1, 0]
  , ['tone:n', 'pitch:n', 1, 0]
  , ['area:n', 'region:n', 0.6, 0.1]
  , ['area:n', 'territory:n', 0.5, 0.1]
  , ['region:n', 'territory:n', 0.4, 0.1]
  , ['province:n', 'territory:n', 0.4, 0.1]
  , ['cave:n', 'hole:n', 0.3, 0.1]
  , ['hole:n', 'ditch:n', 0.5, 0.1]
  , ['cave:n', 'tomb:n', 0.3, 0.1]
  , ['river:n', 'stream:n', 0.5, 0.1]
  , ['river:n', 'creek:n', 0.5, 0.8]
  , ['stream:n', 'creek:n', 0.5, 0.8]
  , ['water:n', 'liquid:n', 0.3, 0.1]
  , ['juice:n', 'fluid:n', 0.2, 0]
  , ['fluid:n', 'liquid:n', 0.5, 0.1]
  , ['girl:n', 'woman:n', 0.2, 0.9]
  , ['woman:n', 'wife:n', 0.6, 1]
  , ['tongue:n', 'language:n', 0.7, 0.85]
  , ['tongue:n', 'dialect:n', 0.7, 0]
  , ['tongue:n', 'voice:n', 0.4, 0.8]
  , ['tree:n', 'wood:n', 0.7, 0.9]
  , ['tree:n', 'plant:n', 0.4, 0.2]
  , ['wood:n', 'pole:n', 0.4, 0.2]
  , ['rock:n', 'jewel, gem:n', 0.3, 0.9]
  , ['rock:n', 'mountain:n', 0.3, 0.7]
  , ['mountain:n', 'hill:n', 0.5, 0.7]
  , ['top:n', 'mountain:n', 0.5, 0.9]
  , ['day:n', 'date:n', 0.7, 0.4]
  , ['sun:n', 'day:n', 0.3, 0.7]
  , ['smoke:n', 'cloud:n', 0.3, 0.9]
  , ['cloud:n', 'mist:n', 0.5, 0]
  , ['smoke:n', 'dust:n', 0.3, 0.9]
  , ['smoke:n', 'steam:n', 0.3, 0.9]
  , ['smoke:n', 'fog:n', 0.3, 0.5]
  , ['smoke:n', 'gas:n', 0.3, 1]
  , ['field:n', 'farm:n', 0.3, 0.5]
  , ['shade:n', 'shadow:n', 0.7, 0.3]
  , ['hour:n', 'time:n', 0.5, 0.9]
  , ['time:n', 'age:n', 0.2, 0.1]
  , ['time:n', 'moment:n', 0.4, 0.2]
  , ['time:n', 'past:n', 0.2, 0.1]
  , ['history:n', 'past:n', 0.4, 0.3]
  , ['day:n', 'light:n', 0.4, 0.5]
  , ['sun:n', 'light:n', 0.4, 0.5]
  , ['day:n', 'world:n', 0.3, 0.4]
  , ['water:n', 'rain:n', 0.3, 0.4]
  , ['rain:n', 'shower:n', 0.4, 0.2]
  , ['water:n', 'mirror:n', 0.3, 0.4]
  , ['water:n', 'sap:n', 0.3, 0.4]
  , ['sap:n', 'glue:n', 0.3, 0.4]
  , ['land:n', 'earth:n', 0.6, 0.2]
  , ['land:n', 'ground:n', 0.6, 0.2]
  , ['land:n', 'soil:n', 0.4, 0.8]
  , ['land:n', 'country (rural area):n', 0.2, 0.8]
  , ['field:n', 'country (rural area):n', 0.2, 0.8]
  , ['floor:n', 'ground:n', 0.9, 1]
  , ['base:n', 'ground:n', 0.4, 0.3]
  , ['floor:n', 'bottom (lowest part):n', 1.1, 1]
  , ['clay:n', 'mud:n', 0.3, 0.8]
  , ['stump:n', 'root:n', 0.3, 0.8]
  , ['stump:n', 'log:n', 0.3, 0.8]
  , ['mud:n', 'swamp:n', 0.3, 0.3]
  , ['mud:n', 'cement:n', 0.3, 1]
  , ['dust:n', 'flour:n', 0.3, 0.8]
  , ['dust:n', 'powder:n', 0.4, 0]
  , ['bottom (lowest part):n', 'buttocks:n', 0.7, 0.8]
  , ['arm:n', 'wing:n', 0.4, 0.3]
  , ['back (of body):n', 'back (reverse side):n', 1.1, 0]
  , ['chin:n', 'jaw:n', 0.4, 0.3]
  , ['face:n', 'forehead:n', 0.6, 0.1]
  , ['forehead:n', 'brow:n', 1, 0]
  , ['chin:n', 'beard:n', 0.3, 0.18]
  , ['brush:n', 'beard:n', 0.3, 0]
  , ['face:n', 'side:n', 0.7, 0.99]
  , ['face:n', 'front:n', 0.7, 0.8]
  , ['face:n', 'expression:n', 0.7, 0.8]
  , ['body:n', 'corpse:n', 0.3, 0.8]
  , ['meat:n', 'animal:n', 0.3, 1]
  , ['meat:n', 'flesh:n', 0.4, 1]
  , ['meat:n', 'fish:n', 0.3, 0.95]
  , ['wing:n', 'fin (of fish):n', 0.3, 0.95]
  , ['hair (of head):n', 'hair (of body):n', 0.9, 0.95]
  , ['hair (of body):n', 'fur:n', 0.7, 0.95]
  , ['skin:n', 'fur:n', 0.3, 0.8]
  , ['skin:n', 'bark (of tree):n', 0.3, 0.9]
  , ['wool:n', 'fur:n', 0.6, 0.8]
  , ['wool:n', 'thread:n', 0.2, 0]
  , ['eyelid:n', 'eyelash:n', 0.5, 0.95]
  , ['eye:n', 'eyeball:n', 0.9, 0.1]
  , ['piece:n', 'member:n', 0.3, 0.1]
  , ['part:n', 'piece:n', 0.3, 0.1]
  , ['kill:v', 'murder:v', 0.9, 0.3]
  , ['finger:n', 'toe:n', 1.1, 0]
  , ['arm:n', 'hand:n', 0.4, 0]
  , ['hand:n', 'wrist:n', 0.4, 0]
  , ['hand:n', 'palm (of hand):n', 0.4, 0]
  , ['leg:n', 'foot:n', 0.3, 0]
  , ['leg:n', 'thigh:n', 0.3, 0.1]
  , ['nose:n', 'beak:n', 0.3, 0]
  , ['tooth:n', 'beak:n', 0.3, 0]
  , ['mouth:n', 'beak:n', 0.3, 0]
  , ['mouth:n', 'language:n', 0.3, 1]
  , ['mouth:n', 'edge:n', 0.3, 0.5]
  , ['mouth:n', 'lip:n', 0.2, 0.1]
  , ['edge:n', 'shore:n', 0.3, 0.1]
  , ['shore:n', 'coast:n', 0.5, 0.1]
  , ['shore:n', 'beach:n', 0.3, 0.6]
  , ['sand:n', 'shore:n', 0.2, 0.6]
  , ['drug:n', 'medicine:n', 0.9, 0.7]
  , ['nose:n', 'point:n', 0.3, 0.3]
  , ['nose:n', 'nostril:n', 0.3, 0]
  , ['thin (slender):adj', 'slim:adj', 1, 0]
  , ['thin (slender):adj', 'skinny:adj', 1, 0.5]
  , ['thin (slender):adj', 'fragile:adj', 0.2, 0]
  , ['thin (narrow):adj', 'narrow:adj', 0.4, 0]
  , ['light (weight):adj', 'easy:adj', 0.3, 0.2]
  , ['light (weight):adj', 'fragile:adj', 0.4, 0.2]
  , ['poor:adj', 'weak:adj', 0.3, 0.3]
  , ['stomach, gut:n', 'belly:n', 0.6, 1]
  , ['must:v', 'have to:v', 1, 0]
  , ['have:v', 'must, have to:v', 0.6, 0.4]
  , ['have:v', 'own:v', 0.6, 0.4]
  , ['have:v', 'possess:v', 0.4, 0.4]
  , ['have:v', 'get:v', 0.4, 1]
  , ['own:v', 'possess:v', 0.4, 0.4]
  , ['get, obtain:v', 'possess:v', 0.4, 0.4]
  , ['cook (heat food):v', 'cook (prepare food):v', 0.9, 0.5]
  , ['burn:v', 'cook (heat food):v', 0.5, 1]
  , ['crush:v', 'grind:v', 1, 0.5]
  , ['fruit:n', 'seed:n', 0.4, 0.2]
  , ['nut:n', 'seed:n', 0.4, 0.1]
  , ['seed:n', 'grain:n', 0.4, 0.1]
  , ['rice:n', 'grain:n', 0.4, 0]
  , ['grain:n', 'cereal:n', 0.6, 0]
  , ['seed:n', 'egg:n', 0.2, 0]
  , ['dish:n', 'plate:n', 0.4, 0.1]
  , ['dish:n', 'bowl:n', 0.4, 0.1]
  , ['plate:n', 'tray:n', 0.4, 0.1]
  , ['plate:n', 'disk:n', 0.4, 0]
  , ['sky:n', 'space (beyond Earth):n', 0.4, 0.1]
  , ['stretch:v', 'pull:v', 0.3, 0.1]
  , ['comb:n', 'brush (for hair):n', 0.3, 0]
  , ['brush:n', 'brush (for hair):n', 1, 0]
  , ['brush:n', 'broom:n', 0.5, 0]
  , ['rake:n', 'fork:n', 0.3, 0]
  , ['story, fable:n', 'history:n', 0.6, 0.3]
  , ['rank (military):n', 'rank (position):n', 0.7, 0.3]
  , ['prostitute:n', 'whore:n', 0.6, 0]
  , ['boyfriend:n', 'girlfriend:n', 0.4, 0]
  , ['horn:n', 'penis (slang):n', 0.3, 1]
  , ['bird:n', 'penis (slang):n', 0.3, 1]
  , ['copy:v', 'imitate:v', 0.9, 0.4]
  , ['story, fable:n', 'plot:n', 0.9, 0]
  , ['add:v', 'combine:v', 0.6, 0.6]
  , ['edge:n', 'limit:n', 0.6, 0.6]
  , ['edge:n', 'verge:n', 0.6, 0]
  , ['hot:adj', 'hot (attractive):adj', 0.6, 0.6]
  , ['good:adj', 'hot (attractive):adj', 0.6, 0.6]
  , ['gorgeous:adj', 'handsome:adj', 0.4, 0.2]
  , ['handsome:adj', 'attractive:adj', 0.4, 0.2]
  , ['beautiful:adj', 'attractive:adj', 0.3, 0.2]
  , ['corpse:n', 'carcass:n', 0.4, 0.2]
  , ['white:adj', 'blank:adj', 0.7, 0.8]
  , ['mattress:n', 'cushion:n', 0.3, 0]
  , ['pillow:n', 'cushion:n', 0.6, 0]
  , ['pillow:n', 'breast (slang):n', 0.3, 1]
  , ['tail:n', 'ass (slang):n', 0.4, 1]
  , ['buttocks:n', 'ass:n', 0.5, 1]
  , ['miss (not hit):v', 'miss (not take advantage of):v', 0.9, 0]
  , ['arrive:v', 'happen:v', 0.5, 0]
  , ['angle:n', 'corner:n', 0.5, 0]
  , ['angle:n', 'direction (way):n', 0.5, 0.6]
  , ['course (direction of travel):n', 'direction (way):n', 0.5, 0.6]
  , ['ball:n', 'bullet:n', 0.5, 1]
  , ['coast:n', 'rib:n', 0.5, 0.5]
  , ['desk:n', 'office:n', 0.4, 0.2]
  , ['high:adj', 'loud, noisy:adj', 0.4, 0.2]
  , ['leak:v', 'sink:v', 0.4, 0]
  , ['map:n', 'menu:n', 0.4, 0]
  , ['silver:n', 'money:n', 0.4, 0.8]
  , ['money:n', 'coin:n', 0.4, 0.8]
  , ['noise:n', 'rumor:n', 0.4, 0]
  , ['window:n', 'nostril:n', 0.5, 0]
  , ['stop:v', 'arrest:v', 0.5, 1]
  , ['stop:v', 'stall:v', 0.3, 0.2]
  , ['stop:v', 'halt:v', 0.5, 1]
  , ['halt:v', 'stall:v', 0.3, 0.2]
  , ['town:n', 'population:n', 0.7, 0.1]
  , ['candy:n', 'vagina (slang):n', 0.4, 1]
  , ['cat:n', 'vagina (slang):n', 0.5, 1]
  , ['mouse:n', 'rat:n', 0.4, 1]
  , ['deep:adj', 'serious:adj', 0.3, 1]
  , ['heavy:adj', 'serious:adj', 0.4, 1]
  , ['push:v', 'shove:v', 0.5, 0]
  , ['push:v', 'grow:v', 0.3, 1]
  , ['species:n', 'kind, type:n', 0.3, 0.7]
  , ['price, fee, cost, fare:n', 'prize:n', 0.5, 0]
  , ['price, fee, cost, fare:n', 'value:n', 0.5, 0.5]
  , ['straight:adj', 'steep:adj', 0.4, 0]
  , ['range:n', 'radius:n', 0.3, 0]
  , ['ray (of light):n', 'radius:n', 0.3, 0]
  , ['if:conj', 'whether:conj', 0.5, 0]
  , ['if:conj', 'when:conj', 0.3, 1]
  , ['think:v', 'consider:v', 0.5, 0]
  , ['think:v', 'believe:v', 0.4, 0.7]
  , ['think:v', 'guess:v', 0.3, 1]
  , ['think:v', 'expect:v', 0.3, 0.7]
  , ['look:v', 'consider:v', 0.3, 1]
  , ['consider:v', 'estimate:v', 0.3, 1]
  , ['suspect:v', 'estimate:v', 0.3, 1]
  , ['need (require):v', 'need (lack):v', 0.9, 0]
  , ['want:v', 'need (lack):v', 0.3, 0.2]
  , ['want:v', 'require:v', 0.3, 0.2]
  , ['need (lack):v', 'lack:v', 0.4, 0.2]
  , ['require:v', 'lack:v', 0.4, 0.2]
  , ['hello:interj', 'goodbye:interj', 0.3, 0.2]
  , ['always:adv', 'forever:adv', 0.4, 0.2]
  , ['do:v', 'make:v', 0.6, 0.2]
  , ['make:v', 'produce (manufacture):v', 0.4, 0.2]
  , ['go:v', 'leave (depart):v', 0.4, 0.7]
  , ['leave (depart):v', 'depart:v', 1, 0]
  , ['leave (depart):v', 'embark:v', 0.8, 0]
  , ['leave (depart):v', 'evacuate:v', 0.3, 0]
  , ['depart:v', 'evacuate:v', 0.3, 0]
  , ['put (place):v', 'put on:v', 0.5, 0.5]
  , ['out:prep', 'outside:prep', 0.7, 0]
  , ['behind:adv', 'back:adv', 0.7, 0]
  , ['maybe:adv', 'perhaps:adv', 0.9, 0]
  , ['know (a fact):v', 'know (be acquainted with):v', 0.7, 0.5]
  , ['know (a fact):v', 'understand:v', 0.5, 0.5]
  , ['know (a fact):v', 'comprehend:v', 0.5, 0.5]
  , ['every:det', 'each:det', 0.9, 0.5]
  , ['state:v', 'declare:v', 1, 0]
  , ['state:v', 'say:v', 0.7, 1]
  , ['state:v', 'affirm:v', 0.4, 0]
  , ['say:v', 'tell:v', 0.6, 0.3]
  , ['just:adv', 'barely:adv', 0.4, 0.3]
  , ['just:adv', 'hardly:adv', 0.4, 0.3]
  , ['just:adv', 'only:adv', 0.4, 0.3]
  , ['just:adv', 'merely:adv', 0.4, 0.3]
  , ['barely:adv', 'hardly:adv', 0.9, 0.2]
  , ['baby:n', 'infant:n', 0.6, 0.3]
  , ['infant:n', 'toddler:n', 0.5, 0]
  , ['night:n', 'evening:n', 0.4, 0.3]
  , ['trouble:n', 'problem:n', 0.4, 0]
  , ['issue, concern:n', 'problem:n', 0.4, 0]
  , ['issue, concern:n', 'controversy:n', 0.4, 0]
  , ['understand:v', 'realize:v', 0.6, 0.5]
  , ['understand:v', 'comprehend:v', 0.9, 0.4]
  , ['comprehend:v', 'fathom:v', 0.9, 0]
  , ['think:v', 'understand:v', 0.3, 1]
  , ['think:v', 'analyze:v', 0.2, 1]
  , ['see:v', 'understand:v', 0.5, 1]
  , ['see:v', 'realize:v', 0.4, 0.5]
  , ['child (young human being):n', 'child (son or daughter of any age):n', 0.8, 0]
  , ['child (young human being):n', 'kid:n', 0.7, 0]
  , ['child (young human being):n', 'infant:n', 0.1, 0.2]
  , ['child (young human being):n', 'toddler:n', 0.1, 0.2]
  , ['child (son or daughter of any age):n', 'offspring:n', 0.4, 0.2]
  , ['thing:n', 'stuff:n', 0.7, 0]
  , ['gun:n', 'rifle:n', 0.7, 0.8]
  , ['town:n', 'city:n', 0.4, 1]
  , ['far:adv', 'away:adv', 0.6, 0.1]
  , ['between:prep', 'among:prep', 0.6, 0.1]
  , ['chance:n', 'luck:n', 0.6, 0.1]
  , ['food:n', 'meal:n', 0.3, 0.7]
  , ['fire:n', 'flame:n', 0.4, 0.6]
  , ['power:n', 'force:n', 0.7, 0]
  , ['power:n', 'strength:n', 0.7, 0.5]
  , ['word:n', 'language:n', 0.3, 0.4]
  , ['mind (thinking faculty):n', 'brain:n', 0.4, 0.3]
  , ['mind (thinking faculty):n', 'soul:n', 0.4, 0.3]
  , ['good:adj', 'nice:adj', 0.5, 1]
  , ['too:adv', 'so:adv', 0.7, 1]
  , ['too:adv', 'very, really:adv', 0.3, 0]
  , ['so:adv', 'very, really:adv', 0.7, 1]
  , ['too:adv', 'also, as well:adv', 0.7, 1], //['word:n', 'term:n', 0.7, 1],
  ['like:v', 'love:v', 0.4, 0.8]
  , ['like:v', 'admire:v', 0.4, 0.3]
  , ['tablet:n', 'slab:n', 0.6, 0.1]
  , ['slab:n', 'brick:n', 0.4, 0.1]
  , ['slab:n', 'loaf:n', 0.3, 0]
  , ['square:n', 'block:n', 0.3, 0.1]
  , ['square:n', 'cube:n', 0.3, 0.1]
  , ['block:n', 'brick:n', 0.4, 0.1]
  , ['block:n', 'cube:n', 0.3, 0.1]
  , ['game:n', 'toy:n', 0.4, 0.3]
  , ['face:n', 'character:n', 0.3, 0.3]
  , ['secret:n', 'mystery:n', 0.3, 0.5]
  , ['puzzle:n', 'mystery:n', 0.3, 0]
  , ['puzzle:n', 'maze:n', 0.2, 0]
  , ['small:adj', 'little:adj', 1, 0.5]
  , ['small:adj', 'short, low:adj', 0.5, 0.1]
  , ['small:adj', 'miniature:adj', 0.4, 0]
  , ['search, look up:v', 'hunt:v', 0.4, 0.1]
  , ['hunt:v', 'stalk:v', 0.2, 0]
  , ['ball:n', 'sphere:n', 0.5, 0.5]
  , ['ball:n', 'circle:n', 0.4, 0]
  , ['circle:n', 'wheel:n', 0.4, 0]
  , ['circle:n', 'ring:n', 0.4, 1]
  , ['circle:n', 'sphere:n', 0.4, 0.2]
  , ['wheel:n', 'disk:n', 0.4, 0]
  , ['world:n', 'sphere:n', 0.3, 0]
  , ['store, shop:n', 'office:n', 0.3, 0]
  , ['look:v', 'glance:v', 0.3, 0.2]
  , ['window:n', 'view:n', 0.3, 0]
  , ['sound:n', 'voice:n', 0.3, 0.2]
  , ['sound:n', 'noise:n', 0.3, 0.2]
  , ['find:v', 'discover:v', 0.6, 0.1]
  , ['bottom (lowest part):n', 'basement:n', 0.2, 0.4]
  , ['basement:n', 'cellar:n', 0.5, 0]
  , ['stuff:n', 'property:n', 0.4, 0]
  , ['give:v', 'let, allow:v', 0.4, 0]
  , ['matter (substance, material):n', 'content:n', 0.4, 0]
  , ['thing:n', 'matter (substance, material):n', 0.4, 0]
  , ['with (accompanied by):prep', 'with (using):prep', 0.6, 0]
  , ['reach:v', 'achieve, accomplish:v', 0.3, 0.5]
  , ['arrive:v', 'reach:v', 0.4, 0.2]
  , ['good:adj', 'fine (okay):adj', 0.4, 0.2]
  , ['excellent:adj', 'fine (okay):adj', 0.2, 0.8]
  , ['neat:adj', 'fine (okay):adj', 0.3, 0.8], //['elegant:adj', 'fine (okay):adj', 0.3, 0.8],
  ['good:adj', 'great (excellent):adj', 0.4, 0.9]
  , ['big:adj', 'great (very large):adj', 1, 0.2]
  , ['great (very large):adj', 'enormous:adj', 0.8, 0.2]
  , ['great (very large):adj', 'huge:adj', 0.8, 0.2]
  , ['great (very large):adj', 'great (excellent):adj', 0.2, 0]
  , ['great (excellent):adj', 'awesome:adj', 0.8, 0.8]
  , ['great (excellent):adj', 'fantastic:adj', 0.8, 0.8]
  , ['great (excellent):adj', 'terrific:adj', 0.8, 0.8]
  , ['great (excellent):adj', 'wonderful:adj', 0.8, 0.8]
  , ['good:adj', 'moral:adj', 0.4, 0.5]
  , ['keep (store):v', 'save (put aside):v', 0.4, 0.2]
  , ['keep (store):v', 'hold:v', 0.4, 0.2]
  , ['oil:n', 'grease:n', 0.9, 0.2]
  , ['other:adj', 'new:adj', 0.3, 0.9]
  , ['other:adj', 'spare:adj', 0.2, 0.2]
  , ['different:adj', 'other:adj', 0.4, 0.2]
  , ['accurate:adj', 'exact, precise:adj', 0.4, 0.2]
  , ['accurate:adj', 'specific, particular:adj', 0.4, 0.2]
  , ['accurate:adj', 'valid:adj', 0.4, 0]
  , ['see:v', 'look:v', 0.4, 0.2]
  , ['see:v', 'watch:v', 0.4, 0.2]
  , ['see:v', 'discover:v', 0.3, 0.1]
  , ['bring:v', 'lead:v', 0.4, 0.2]
  , ['sample:n', 'example:n', 0.4, 0.2]
  , ['master:n', 'lord:n', 0.7, 0]
  , ['master:n', 'boss:n', 0.4, 0.2]
  , ['chief:n', 'boss:n', 0.4, 0.2]
  , ['house:n', 'home:n', 0.4, 0.2]
  , ['sauce:n', 'juice:n', 0.4, 0.2]
  , ['important:adj', 'main:adj', 0.4, 0.2]
  , ['meet:v', 'find:v', 0.4, 0.2]
  , ['meet:v', 'encounter:v', 0.4, 0.2]
  , ['group:n', 'community:n', 0.4, 0.2]
  , ['study:v', 'learn:v', 0.4, 0.2]
  , ['straight:adj', 'honest:adj', 0.3, 1]
  , ['carriage:n', 'cart:n', 0.7, 1]
  , ['heal:v', 'cure:v', 0.4, 0.2], //['shape:n', 'form:n', 0.5, 0.2],
  ['shape:n', 'pattern:n', 0.5, 0.2]
  , ['shape:n', 'structure:n', 0.3, 0.2]
  , ['shape:n', 'architecture:n', 0.2, 0.5]
  , ['shape:n', 'shadow:n', 0.2, 0.4]
  , ['easy:adj', 'simple:adj', 0.4, 0.2]
  , ['company:n', 'business:n', 0.5, 0.2]
  , ['turn:v', 'rotate:v', 0.4, 0.2]
  , ['turn:v', 'wind:v', 0.7, 0.7]
  , ['wind:v', 'weave:v', 0.7, 0]
  , ['let, allow:v', 'permit:v', 0.7, 0.2]
  , ['permit:v', 'enable:v', 0.7, 0]
  , ['allow (let):v', 'enable:v', 0.4, 0.3]
  , ['allow (let):v', 'admit:v', 0.2, 1]
  , ['allow (let):v', 'endorse:v', 0.1, 1]
  , ['allow (let):v', 'indulge:v', 0.2, 1]
  , ['permit:v', 'approve:v', 0.7, 0]
  , ['approve:v', 'authorize:v', 0.7, 0]
  , ['enable:v', 'authorize:v', 0.3, 0]
  , ['approve:v', 'endorse:v', 0.6, 0]
  , ['praise:v', 'endorse:v', 0.2, 0]
  , ['device:n', 'appliance:n', 0.4, 0.2]
  , ['device:n', 'apparatus:n', 0.4, 0.2]
  , ['instrument:n', 'tool:n', 0.3, 0.8]
  , ['instrument:n', 'appliance:n', 0.3, 0.2]
  , ['instrument:n', 'equipment:n', 0.4, 0.4]
  , ['instrument:n', 'device:n', 0.4, 0.4]
  , ['instrument:n', 'apparatus:n', 0.4, 0.4]
  , ['appliance:n', 'apparatus:n', 0.4, 0.4]
  , ['tool:n', 'appliance:n', 0.3, 0.2]
  , ['tool:n', 'weapon:n', 0.3, 1]
  , ['push:v', 'press:v', 0.4, 0.2]
  , ['thought:n', 'reason:n', 0.2, 0.2]
  , ['reason:n', 'logic:n', 1, 0.2]
  , ['sorry:adj', 'sad:adj', 0.4, 0.2]
  , ['road:n', 'street:n', 0.9, 0.2]
  , ['excrement:n', 'shit:n', 0.5, 0.9]
  , ['big:adj', 'large:adj', 1, 0.2]
  , ['big:adj', 'huge:adj', 0.4, 0.5]
  , ['big:adj', 'massive, enormous:adj', 0.4, 0.2]
  , ['big:adj', 'heavy:adj', 0.2, 0.2]
  , ['big:adj', 'popular:adj', 0.3, 1]
  , ['big:adj', 'loud:adj', 0.1, 0]
  , ['hold:v', 'grip:v', 0.4, 0.2]
  , ['sky:n', 'darling:n', 0.3, 1]
  , ['sky:n', 'heaven:n', 0.3, 1]
  , ['heaven:n', 'paradise:n', 0.9, 0.2]
  , ['honey:n', 'darling:n', 0.3, 1]
  , ['think:v', 'ponder:v', 1, 0]
  , ['think:v', 'meditate:v', 0.3, 0.7]
  , ['simple:adj', 'poor:adj', 0.3, 1]
  , ['topic:n', 'theme:n', 0.5, 0], //['topic:n', 'subject:n', 0.5, 0],
  ['thought:n', 'idea:n', 0.4, 0.1]
  , ['thought:n', 'concept:n', 0.4, 0.1]
  , ['thought:n', 'theory:n', 0.2, 0.1]
  , ['thought:n', 'belief:n', 0.4, 0.1]
  , ['thought:n', 'opinion:n', 0.2, 0.9]
  , ['thought:n', 'dream:n', 0.2, 1]
  , ['idea:n', 'concept:n', 1, 0]
  , ['idea:n', 'theory:n', 0.3, 0.9]
  , ['idea:n', 'theme:n', 0.3, 0]
  , ['theme:n', 'motif:n', 0.4, 0]
  , ['beautiful:adj', 'pretty:adj', 0.4, 0.9]
  , ['place:n', 'location:n', 0.5, 0.2]
  , ['stupid:adj', 'dumb:adj', 9, 0.2]
  , ['poison:n', 'venom:n', 0.7, 0.2]
  , ['fast:adj', 'smart, intelligent:adj', 1, 0]
  , ['smart:adj', 'clever:adj', 1, 0]
  , ['smart, intelligent:adj', 'wise:adj', 0.4, 0]
  , ['slice:n', 'flake:n', 0.3, 0.2]
  , ['defend:v', 'protect:v', 0.7, 0.2]
  , ['protect:v', 'secure:v', 0.4, 0.2]
  , ['defend:v', 'secure:v', 0.4, 0.2]
  , ['insure:v', 'secure:v', 0.4, 0.2]
  , ['defend:v', 'guard:v', 0.5, 0.2]
  , ['escape:v', 'flee:v', 0.7, 0.2]
  , ['escape:v', 'dodge:v', 0.5, 0.2]
  , ['steal:v', 'rob:v', 1, 0]
  , ['steal:v', 'snatch:v', 0.5, 0.2]
  , ['steal:v', 'deprive:v', 0.2, 0]
  , ['white:adj', 'clear:adj', 0.5, 0.2]
  , ['bright:adj', 'clear:adj', 0.5, 0.2]
  , ['clear:adj', 'transparent:adj', 0.9, 0.2]
  , ['piece:n', 'item:n', 0.3, 0.2]
  , ['gather:v', 'assemble:v', 0.4, 0.2]
  , ['gather:v', 'congregate:v', 0.4, 0.2]
  , ['collect:v', 'congregate:v', 0.4, 0.2]
  , ['congregate:v', 'rally:v', 0.2, 0.4]
  , ['understand:v', 'grasp:v', 1, 0.1]
  , ['explain:v', 'discuss:v', 0.4, 0.9]
  , ['explain:v', 'describe:v', 0.4, 0.2]
  , ['right, correct:adj', 'true:adj', 0.4, 0.2]
  , ['all:det', 'both:det', 0.3, 0.2]
  , ['total:n', 'sum:n', 0.7, 0.2]
  , ['sum:n', 'score:n', 0.5, 0]
  , ['sum:n', 'value:n', 0.2, 0.2]
  , ['total:n', 'amount:n', 0.5, 0.5]
  , ['job:n', 'career:n', 0.5, 0.2]
  , ['job:n', 'task:n', 0.5, 1], //['job:n', 'role:n', 0.5, 0.2],
  ['task:n', 'chore:n', 0.7, 0]
  , ['watch:v', 'look:v', 0.5, 0.2]
  , ['watch:v', 'monitor:v', 0.5, 0.6]
  , ['watch:v', 'spectate:v', 0.9, 0]
  , ['monitor:v', 'follow:v', 0.5, 1]
  , ['follow:v', 'stalk:v', 0.2, 0]
  , ['look:v', 'read:v', 0.3, 0.8]
  , ['place:n', 'point:n', 0.3, 0.5]
  , ['pass:v', 'cross:v', 0.6, 0]
  , ['listen:v', 'hear:v', 0.4, 0]
  , ['blanket:n', 'quilt:n', 0.6, 0]
  , ['cry:v', 'shout:v', 0.4, 0]
  , ['shout:v', 'scream:v', 0.4, 1]
  , ['shout:v', 'exclaim:v', 0.3, 0]
  , ['yell:v', 'exclaim:v', 0.3, 0]
  , ['picture:n', 'image:n', 0.4, 0.2]
  , ['compare:v', 'contrast:v', 0.5, 0.2]
  , ['contradict:v', 'contrast:v', 0.3, 0.2]
  , ['eat:v', 'drink:v', 0.3, 0.2]
  , ['country (nation):n', 'nation:n', 0.3, 0.5]
  , ['species:n', 'breed:n', 0.3, 0.5]
  , ['kind:n', 'breed:n', 0.3, 0]
  , ['rule (law, regulation):n', 'law:n', 0.3, 0.5]
  , ['group:n', 'gang:n', 0.4, 0]
  , ['group:n', 'bunch:n', 0.4, 0]
  , ['bunch:n', 'bundle:n', 0.4, 0]
  , ['ask (inquire):v', 'ask (request):v', 0.5, 0.2]
  , ['ask (request):v', 'request:v', 0.7, 0.2]
  , ['ask (request):v', 'ask (invite):v', 0.7, 0.2]
  , ['ask (inquire):v', 'interrogate:v', 0.2, 0.8]
  , ['ask (request):v', 'order:v', 0.3, 0.3]
  , ['ask (request):v', 'crave:v', 0.1, 1]
  , ['seek:v', 'ask (request):v', 0.2, 1]
  , ['request:v', 'appeal:v', 0.7, 0.2]
  , ['request:v', 'demand:v', 0.3, 0.2]
  , ['pray:v', 'appeal:v', 0.3, 1]
  , ['beg:v', 'appeal:v', 0.3, 0.5]
  , ['pray:v', 'beg:v', 0.2, 0.2]
  , ['ask (inquire):v', 'inquire:v', 0.9, 0.2]
  , ['ask (inquire):v', 'consult:v', 0.5, 0]
  , ['discuss:v', 'consult:v', 0.4, 0]
  , ['need (require):v', 'require:v', 0.7, 0.2]
  , ['need (require):v', 'crave:v', 0.2, 0.2]
  , ['require:v', 'oblige:v', 0.7, 0.2]
  , ['diameter:n', 'year:n', 0.1, 0]
  , ['range:n', 'year:n', 0.1, 0]
  , ['year:n', 'age:n', 0.3, 0.2]
  , ['air:n', 'gas:n', 0.3, 0.9]
  , ['air:n', 'atmosphere:n', 0.3, 0.5]
  , ['air:n', 'breeze:n', 0.3, 0.3]
  , ['air:n', 'oxygen:n', 0.3, 0.8]
  , ['wind:n', 'breeze:n', 0.4, 0]
  , ['air:n', 'weather:n', 0.3, 1]
  , ['drag:v', 'pull:v', 0.3, 0.9]
  , ['finish:v', 'complete:v', 0.7, 0.9]
  , ['complete:v', 'achieve, accomplish:v', 0.5, 0.4]
  , ['coin:n', 'currency:n', 0.4, 0.1]
  , ['belt:n', 'strap:n', 0.4, 0.1]
  , ['continue:v', 'last:v', 0.6, 0], //['continue:v', 'maintain:v', 0.9, 0],
  //['maintain:v', 'sustain:v', 0.4, 0],
  ['continue:v', 'sustain:v', 0.4, 0]
  , ['continue:v', 'remain:v', 0.3, 0]
  , ['remain:v', 'persist:v', 0.3, 0]
  , ['continue, keep:v', 'persist:v', 0.3, 0]
  , ['persist:v', 'linger:v', 0.3, 0]
  , ['edge:n', 'border, boundary:n', 0.3, 0]
  , ['side:n', 'border, boundary:n', 0.3, 0]
  , ['edge:n', 'fringe:n', 0.3, 0]
  , ['fringe:n', 'verge:n', 0.5, 0]
  , ['limit:n', 'border, boundary:n', 0.3, 0]
  , ['boundary:n', 'perimeter:n', 1, 0]
  , ['descendant:n', 'offspring:n', 0.5, 0]
  , ['descendant:n', 'heir:n', 0.3, 0]
  , ['today:adv', 'nowadays:adv', 0.3, 0.3]
  , ['cut:v', 'divide:v', 0.3, 0.5]
  , ['separate:v', 'divide:v', 0.3, 0.1]
  , ['divide:v', 'isolate:v', 0.3, 0.5]
  , ['tie:n', 'knot:n', 0.3, 0]
  , ['hard:adj', 'difficult:adj', 0.7, 0.2]
  , ['exclaim:v', 'proclaim:v', 0.9, 0]
  , ['announce:v', 'proclaim:v', 0.9, 0]
  , ['advertise:v', 'promote:v', 0.3, 0.3]
  , ['proclaim:v', 'advertise:v', 0.3, 0]
  , ['vow:v', 'swear:v', 0.5, 0.3]
  , ['assure:v', 'vow:v', 0.5, 0.3]
  , ['promise:v', 'assure:v', 0.5, 0.3]
  , ['affirm:v', 'swear:v', 0.2, 0.7]
  , ['affirm:v', 'vow:v', 0.3, 0.4]
  , ['proclaim:v', 'affirm:v', 0.3, 0]
  , ['announce:v', 'testify:v', 0.5, 0]
  , ['stem:n', 'root:n', 0.3, 0.9]
  , ['origin:n', 'root:n', 0.3, 0.1]
  , ['new:adj', 'recent:adj', 0.3, 0]
  , ['new:adj', 'fresh:adj', 0.3, 0.5]
  , ['new:adj', 'current:adj', 0.2, 0.5]
  , ['new:adj', 'unique:adj', 0.1, 0]
  , ['measure:v', 'calculate:v', 0.3, 0.2]
  , ['figure out:v', 'deduce:v', 0.9, 0]
  , ['solve, figure out:v', 'calculate:v', 0.3, 0.2]
  , ['count:v', 'calculate:v', 0.3, 0.5]
  , ['interrupt:v', 'interfere:v', 0.5, 0.2]
  , ['interfere:v', 'intervene:v', 0.4, 0.1]
  , ['assume:v', 'deduce:v', 0.5, 0]
  , ['presume:v', 'deduce:v', 0.5, 0]
  , ['deduce:v', 'deem:v', 0.4, 0]
  , ['door:n', 'gate:n', 0.4, 0]
  , ['gate:n', 'exit:n', 0.2, 0]
  , ['high:adj', 'tall:adj', 0.3, 0]
  , ['burst:v', 'explode, blow up:v', 0.4, 0.5]
  , ['explode:v', 'erupt:v', 0.4, 0]
  , ['explode:v', 'blast:v', 0.4, 0]
  , ['explode:v', 'shoot:v', 0.4, 0]
  , ['burst:v', 'erupt:v', 0.3, 0]
  , ['break:v', 'burst:v', 0.3, 0]
  , ['break:v', 'crash:v', 0.2, 0.5]
  , ['break:v', 'shatter:v', 0.4, 0]
  , ['break:v', 'smash:v', 0.5, 0]
  , ['break:v', 'snap:v', 0.5, 0]
  , ['break:v', 'split:v', 0.5, 0]
  , ['break:v', 'tear:v', 0.5, 0]
  , ['break:v', 'interrupt:v', 0.5, 0.2]
  , ['snap:v', 'crack:v', 0.3, 0.6]
  , ['smash:v', 'shatter:v', 1, 0.2]
  , ['smash:v', 'destroy:v', 0.4, 0.5]
  , ['battle:n', 'combat:n', 0.3, 0]
  , ['battle:n', 'clash:n', 0.3, 1]
  , ['war:n', 'battle:n', 0.3, 0.3]
  , ['king:n', 'emperor:n', 0.7, 0]
  , ['boat:n', 'ship:n', 0.4, 0.2]
  , ['fight:v', 'attack:v', 0.4, 0.2]
  , ['quiet:adj', 'calm:adj', 0.3, 0.2]
  , ['calm:adj', 'patient:adj', 0.3, 0]
  , ['stab:v', 'pierce:v', 0.5, 0.3]
  , ['pierce:v', 'penetrate:v', 0.3, 0.3]
  , ['pierce:v', 'prick:v', 0.7, 0]
  , ['stab:v', 'prick:v', 0.3, 0]
  , ['danger:n', 'hazard:n', 0.4, 0]
  , ['danger:n', 'risk:n', 0.4, 0]
  , ['risk:n', 'hazard:n', 0.4, 0]
  , ['risk:n', 'threat:n', 0.4, 0]
  , ['danger:n', 'trouble:n', 0.3, 0.5]
  , ['evil:adj', 'mean:adj', 0.3, 0.2]
  , ['bad:adj', 'evil:adj', 0.3, 0.5]
  , ['ghost:n', 'spirit:n', 0.5, 0.2]
  , ['spirit:n', 'soul:n', 0.7, 0.2]
  , ['demon:n', 'devil:n', 0.2, 0]
  , ['demon:n', 'monster:n', 0.3, 0.7]
  , ['demon:n', 'goblin:n', 0.2, 0]
  , ['ghost:n', 'demon:n', 0.3, 0.2]
  , ['change:v', 'modify:v', 0.4, 0.2]
  , ['come:v', 'go:v', 0.3, 0]
  , ['move:v', 'go:v', 0.3, 0]
  , ['go:v', 'pass:v', 0.3, 0]
  , ['go:v', 'continue:v', 0.3, 0.2]
  , ['come:v', 'arrive:v', 0.3, 1]
  , ['here:adv', 'there:adv', 0.3, 0.9]
  , ['time:n', 'tense:n', 0.5, 0]
  , ['person:n', 'human:n', 0.3, 0.4]
  , ['else:adv', 'otherwise:adv', 0.7, 0]
  , ['bring:v', 'fetch:v', 0.7, 0]
  , ['bring:v', 'deliver:v', 0.4, 0.2]
  , ['fall:v', 'drop:v', 0.4, 0]
  , ['shine:v', 'seem:v', 0.3, 0.9]
  , ['hard:adj', 'firm:adj', 0.3, 0]
  , ['now:adv', 'already:adv', 0.3, 0]
  , ['fungus:n', 'mold:n', 0.5, 0]
  , ['garden:n', 'park:n', 0.3, 0]
  , ['have:v', 'include:v', 0.6, 0.2]
  , ['contain:v', 'include:v', 0.4, 0.2]
  , ['contain:v', 'involve, entail:v', 0.4, 0]
  , ['pattern:n', 'style:n', 0.3, 0.3], //['pattern:n', 'design:n', 0.3, 0.3],
  ['view:n', 'opinion:n', 0.3, 0.9]
  , ['belief:n', 'opinion:n', 0.5, 0]
  , ['moon:n', 'month:n', 0.3, 0]
  , ['want:v', 'crave:v', 0.3, 0]
  , ['want:v', 'desire:v', 0.6, 0]
  , ['desire:v', 'crave:v', 0.4, 0]
  , ['change:v', 'vary:v', 0.3, 0.2]
  , ['vary:v', 'differ:v', 0.7, 0]
  , ['appear:v', 'reveal:v', 0.3, 0.2]
  , ['appear:v', 'manifest:v', 0.3, 0]
  , ['empty:adj', 'vacant:adj', 0.5, 0]
  , ['empty:adj', 'hollow:adj', 0.5, 0.1]
  , ['empty:adj', 'naked, nude:adj', 0.3, 0.2]
  , ['lift:v', 'raise:v', 0.4, 0.2]
  , ['lift:v', 'climb:v', 0.3, 0.5]
  , ['lift:v', 'boost:v', 0.4, 0.2]
  , ['raise:v', 'elevate:v', 0.4, 0]
  , ['raise:v', 'boost:v', 0.4, 0]
  , ['raise:v', 'erect:v', 0.4, 0]
  , ['log:n', 'stick:n', 0.4, 0.2]
  , ['song:n', 'music:n', 0.3, 0.9]
  , ['rope:n', 'string:n', 0.4, 0.2]
  , ['string:n', 'cord:n', 0.4, 0.2]
  , ['rope:n', 'line:n', 0.3, 0.1]
  , ['machine:n', 'device:n', 0.3, 0]
  , ['machine:n', 'engine, motor:n', 0.4, 0]
  , ['plant:v', 'bury:v', 0.3, 0]
  , ['dive:v', 'plant:v', 0.3, 0]
  , ['star:n', 'sun:n', 0.2, 1]
  , ['star:n', 'celebrity:n', 0.6, 1]
  , ['figure:n', 'celebrity:n', 0.6, 1]
  , ['hero:n', 'celebrity:n', 0.3, 0.5]
  , ['glory:n', 'honor:n', 0.6, 0.4]
  , ['pay:v', 'spend:v', 0.4, 0.2]
  , ['relax:v', 'relieve:v', 0.3, 0.2]
  , ['flow:v', 'leak:v', 0.3, 0]
  , ['group:n', 'flock:n', 0.3, 0]
  , ['group:n', 'herd:n', 0.3, 0]
  , ['herd:n', 'flock:n', 0.5, 0]
  , ['community:n', 'colony:n', 0.3, 0.4]
  , ['colony:n', 'flock:n', 0.3, 0]
  , ['spread:v', 'scatter:v', 0.4, 0]
  , ['clean:v', 'wash:v', 0.6, 0.2]
  , ['shake:v', 'tremble:v', 0.3, 0]
  , ['stream:n', 'current:n', 0.3, 0.4]
  , ['current:n', 'wave (ocean):n', 0.3, 0.4]
  , ['show (performance):n', 'ceremony:n', 0.2, 0.4]
  , ['ceremony:n', 'ritual:n', 0.4, 0]
  , ['throw:v', 'toss:v', 0.5, 0.2]
  , ['rock (move back and forth):v', 'toss:v', 0.4, 0.2]
  , ['stir:v', 'toss:v', 0.3, 0.2]
  , ['toss:v', 'hurl:v', 0.5, 0.2]
  , ['decide:v', 'judge:v', 0.3, 0.2]
  , ['money:n', 'wealth:n', 0.3, 0.2]
  , ['card:n', 'ticket:n', 0.4, 0]
  , ['ticket:n', 'license:n', 0.2, 0.5], //['permit:n', 'ticket:n', 0.5, 0.2], // no permit:n
  ['ticket:n', 'voucher:n', 0.3, 0.2]
  , ['ticket:n', 'receipt:n', 0.3, 0]
  , ['pig:n', 'pork:n', 0.9, 0.3]
  , ['rubber:n', 'tire:n', 0.4, 0]
  , ['wall:n', 'barrier:n', 0.3, 0]
  , ['fence:n', 'barrier:n', 0.3, 0]
  , ['barrier:n', 'hurdle:n', 0.7, 0]
  , ['guess:v', 'speculate:v', 0.5, 0.8]
  , ['guess:v', 'estimate:v', 0.5, 0.5]
  , ['see:v', 'detect:v', 0.5, 0.6]
  , ['see:v', 'perceive:v', 0.9, 0.3]
  , ['see:v', 'scan:v', 0.1, 0]
  , ['see:v', 'distinguish:v', 0.2, 0]
  , ['see:v', 'identify:v', 0.1, 1]
  , ['see:v', 'recognize:v', 0.3, 1]
  , ['see:v', 'notice:v', 0.3, 0.8]
  , ['see:v', 'imagine:v', 0.1, 1]
  , ['see:v', 'envision:v', 0.3, 0]
  , ['see:v', 'foresee:v', 0.4, 0]
  , ['see:v', 'hear:v', 0.2, 0.9]
  , ['see:v', 'accompany:v', 0.1, 1]
  , ['see:v', 'date, go out:v', 0.4, 0]
  , ['see:v', 'attend:v', 0.1, 1]
  , ['see:v', 'examine:v', 0.1, 1]
  , ['see:v', 'know (a fact):v', 0.1, 1]
  , ['come:v', 'become (change into), get:v', 0.4, 0]
  , ['move:v', 'come:v', 0.4, 0.4]
  , ['come:v', 'reach:v', 0.4, 0.2]
  , ['come:v', 'enter:v', 0.4, 0.2]
  , ['come:v', 'occur:v', 0.4, 0.2]
  , ['come:v', 'happen:v', 0.4, 0.2]
  , ['soon:adv', 'now:adv', 0.4, 1]
  , ['today:adv', 'now:adv', 0.3, 1]
  , ['look:v', 'peer:v', 0.3, 0]
  , ['peer:v', 'glance:v', 0.2, 0]
  , ['flash:v', 'glance:v', 0.1, 0]
  , ['look:v', 'stare:v', 0.3, 0]
  , ['stare:v', 'glare:v', 0.5, 0]
  , ['look:v', 'study:v', 0.3, 0.6]
  , ['use, utilize:v', 'spend:v', 0.4, 0.2]
  , ['use, utilize:v', 'operate:v', 0.4, 0.1]
  , ['use, utilize:v', 'manipulate:v', 0.4, 0.4]
  , ['use, utilize:v', 'waste:v', 0.2, 0.2]
  , ['use, utilize:v', 'employ:v', 0.4, 0.5]
  , ['use, utilize:v', 'exert:v', 0.4, 0.6]
  , ['use, utilize:v', 'exploit:v', 0.4, 0.9]
  , ['man:n', 'father:n', 0.2, 1]
  , ['man:n', 'husband:n', 0.5, 1]
  , ['man:n', 'boyfriend:n', 0.5, 0.8]
  , ['find:v', 'detect:v', 0.4, 0.8]
  , ['find:v', 'encounter:v', 0.4, 0.8]
  , ['find:v', 'uncover:v', 0.4, 0]
  , ['thing:n', 'object:n', 0.6, 0.4]
  , ['thing:n', 'item:n', 0.6, 0.4]
  , ['give:v', 'deliver:v', 0.4, 0.4]
  , ['give:v', 'donate:v', 0.4, 0.4]
  , ['give:v', 'present:v', 0.4, 0.4]
  , ['give:v', 'provide:v', 0.4, 0.4]
  , ['green:adj', 'sick:adj', 0.4, 1]
  , ['gross:adj', 'sick:adj', 0.1, 1]
  , ['weak:adj', 'sick:adj', 0.3, 1]
  , ['tell:v', 'speak:v', 0.4, 0.4]
  , ['tell:v', 'state:v', 0.4, 0.4]
  , ['tell:v', 'recite:v', 0.2, 0.2]
  , ['tell:v', 'proclaim:v', 0.2, 0.2]
  , ['tell:v', 'announce:v', 0.3, 0.4]
  , ['tell:v', 'declare:v', 0.3, 0.4]
  , ['tell:v', 'confess:v', 0.4, 0.4]
  , ['tell:v', 'express:v', 0.2, 0.4]
  , ['tell:v', 'describe:v', 0.2, 0.4]
  , ['tell:v', 'explain:v', 0.4, 1]
  , ['tell:v', 'notify, inform:v', 0.4, 0.3]
  , ['tell:v', 'mention:v', 0.4, 0.3]
  , ['tell:v', 'instruct:v', 0.2, 0.2]
  , ['tell:v', 'order:v', 0.2, 0.2]
  , ['tell:v', 'report:v', 0.2, 0.2]
  , ['woman:n', 'female:n', 0.4, 0]
  , ['girl:n', 'female:n', 0.3, 0]
  , ['woman:n', 'mother:n', 0.4, 1]
  , ['run:v', 'work (function):v', 0.2, 0.5]
  , ['work (function):v', 'perform:v', 0.2, 1]
  , ['work (function):v', 'operate:v', 0.2, 0.8]
  , ['work (be employed):v', 'work (toil):v', 0.9, 0]
  , ['work (be employed):v', 'work (function):v', 0.9, 0]
  , ['work (function):v', 'work (have desired result):v', 0.9, 0]
  , ['work (toil):v', 'strive:v', 0.2, 0.4]
  , ['work (have desired result):v', 'carry out:v', 0.2, 0]
  , ['sweat:v', 'work (toil):v', 0.1, 0]
  , ['achieve:v', 'work (have desired result):v', 0.3, 0]
  , ['accomplish:v', 'work (have desired result):v', 0.2, 0]
  , ['tired (needing sleep):adj', 'tired (needing rest):adj', 0.9, 0.4]
  , ['empty:adj', 'tired (needing rest):adj', 0.3, 1]
  , ['call (refer to by name):v', 'name:v', 0.3, 0]
  , ['call (refer to by name):v', 'dub:v', 0.3, 0]
  , ['cry:v', 'call (cry out):v', 0.1, 1]
  , ['shout:v', 'call (cry out):v', 0.2, 1]
  , ['call (cry out):v', 'call (request the attendance of):v', 0.3, 0]
  , ['ask (invite):v', 'call (request the attendance of):v', 0.3, 0]
  , ['summon:v', 'call (request the attendance of):v', 0.3, 0]
  , ['fat:adj', 'big:adj', 0.4, 1]
  , ['fat (bodily substance):n', 'fat (component in food):adj', 0.3, 0]
  , ['school:n', 'academy:n', 0.3, 0]
  , ['university:n', 'academy:n', 0.5, 0]
  , ['try (attempt):v', 'attack:v', 0.3, 0.2]
  , ['bowl:n', 'cup:n', 0.3, 0.1]
  , ['family (children and parents):n', 'family (related by blood):n', 0.8, 0]
  , ['family (related by blood):n', 'tribe:n', 0.3, 1]
  , ['family (related by blood):n', 'clan:n', 0.2, 0]
  , ['house:n', 'family (children and parents):n', 0.2, 1]
  , ['blood:n', 'family (related by blood):n', 0.2, 1]
  , ['house:n', 'tribe:n', 0.3, 1]
  , ['tribe:n', 'kin:n', 0.7, 0]
  , ['clan:n', 'kin:n', 0.7, 0]
  , ['leave (depart):v', 'migrate:v', 0.1, 0]
  , ['leave (depart):v', 'withdraw:v', 0.3, 0]
  , ['leave (depart):v', 'quit, give up:v', 0.2, 0]
  , ['leave (depart):v', 'leave (let remain)', 0.8, 0]
  , ['leave (let remain):v', 'let:v', 0.4, 0]
  , ['leave (let remain):v', 'abandon:v', 0.4, 0]
  , ['leave (let remain):v', 'desert:v', 0.4, 0]
  , ['old:adj', 'ancient:adj', 0.3, 0.2]
  , ['old:adj', 'mature:adj', 0.3, 0.2]
  , ['old:adj', 'late:adj', 0.1, 1]
  , ['mean (signify):v', 'express:v', 0.2, 0.9]
  , ['mean (signify):v', 'indicate:v', 0.3, 0.2]
  , ['mean (signify):v', 'imply:v', 0.3, 0.2]
  , ['mean (signify):v', 'mean (intend):v', 0.3, 0.2]
  , ['intend:v', 'mean (intend):v', 0.3, 0.2]
  , ['keep (store):v', 'carry:v', 0.4, 0.2]
  , ['let, allow:v', 'approve:v', 0.4, 0.2]
  , ['crowd:n', 'audience:n', 0.4, 0]
  , ['crew:n', 'crowd:n', 0.2, 0]
  , ['group:n', 'crowd:n', 0.4, 0]
  , ['group:n', 'company:n', 0.3, 1]
  , ['group:n', 'organization:n', 0.3, 1]
  , ['group:n', 'party:n', 0.2, 1]
  , ['group:n', 'society:n', 0.2, 1]
  , ['group:n', 'bundle:n', 0.2, 0]
  , ['turn:v', 'twist:v', 0.4, 0.3]
  , ['part:n', 'section:n', 0.4, 0.3]
  , ['section:n', 'segment:n', 0.4, 0]
  , ['section:n', 'compartment:n', 0.4, 0]
  , ['cell (room in a prison):n', 'compartment:n', 0.4, 0]
  , ['piece:n', 'segment:n', 0.4, 0]
  , ['section:n', 'piece:n', 0.4, 0]
  , ['portion:n', 'segment:n', 0.4, 0]
  , ['section:n', 'portion:n', 0.4, 0]
  , ['place:n', 'site:n', 0.4, 0]
  , ['place:n', 'venue:n', 0.4, 0.2]
  , ['right:adj', 'appropriate:adj', 0.4, 0.2]
  , ['right:adj', 'valid:adj', 0.3, 0]
  , ['right:adj', 'moral:adj', 0.3, 0.3]
  , ['play (have fun):v', 'compete:v', 0.6, 0]
  , ['travel:v', 'run:v', 0.3, 1]
  , ['small:adj', 'narrow:adj', 0.2, 0.3]
  , ['number:n', 'statistic:n', 0.2, 0]
  , ['want:v', 'wish:v', 0.4, 0]
  , ['want:v', 'lack:v', 0.4, 0.3]
  , ['want:v', 'prefer:v', 0.4, 0.3]
  , ['want:v', 'choose:v', 0.41, 0.9]
  , ['way:n', 'course (direction of travel):n', 0.4, 0.3]
  , ['live:v', 'survive:v', 0.4, 0]
  , ['believe:v', 'trust:v', 0.4, 0]
  , ['trust:v', 'rely on:v', 0.4, 0]
  , ['bring:v', 'carry:v', 0.4, 0.3]
  , ['pass:v', 'happen:v', 0.4, 0]
  , ['pass:v', 'occur:v', 0.4, 0]
  , ['happen:v', 'occur:v', 0.9, 0], //['occur:v', 'develop:v', 0.4, 1],
  ['large:adj', 'massive, enormous:adj', 0.4, 0.1]
  , ['large:adj', 'huge:adj', 0.5, 0.1]
  , ['money:n', 'wage:n', 0.3, 0]
  , ['wage:n', 'salary:n', 0.9, 0.2]
  , ['fee:n', 'salary:n', 0.3, 0.2]
  , ['story, fable:n', 'book:n', 0.3, 1]
  , ['story, fable:n', 'fiction:n', 0.3, 0]
  , ['story, fable:n', 'narrative:n', 0.5, 0]
  , ['drama:n', 'story, fable:n', 0.3, 1]
  , ['legend:n', 'myth:n', 0.7, 0]
  , ['book:n', 'novel:n', 0.5, 0.2]
  , ['story:n', 'novel:n', 0.3, 1]
  , ['novel:n', 'fiction:n', 0.4, 0.2]
  , ['fact:n', 'evidence:n', 0.4, 0.2]
  , ['different:adj', 'distinct:adj', 0.9, 0]
  , ['different:adj', 'various:adj', 0.9, 0]
  , ['right, entitlement:n', 'license:n', 0.4, 0.3]
  , ['book:n', 'magazine:n', 0.4, 0.5]
  , ['paper:n', 'magazine:n', 0.2, 0.5]
  , ['book:n', 'manual:n', 0.2, 1]
  , ['word:n', 'name:n', 0.3, 0.2]
  , ['name:n', 'title:n', 0.4, 0]
  , ['word:n', 'phrase:n', 0.4, 0.3]
  , ['shop:n', 'business:n', 0.4, 0.3], //['business:n', 'commerce:n', 0.3, 0],
  ['fix, mend, repair:v', 'heal:v', 0.4, 0.3]
  , ['fix, mend, repair:v', 'cure:v', 0.4, 0.3]
  , ['support:v', 'brace:v', 0.4, 0.3]
  , ['support:v', 'justify:v', 0.4, 0.3]
  , ['hold:v', 'support:v', 0.4, 0.3]
  , ['center:n', 'heart:n', 0.4, 1]
  , ['center:n', 'core:n', 0.4, 0]
  , ['center:n', 'nucleus:n', 0.4, 0]
  , ['center:n', 'hub (center of activity):n', 0.4, 0], //['set:n', 'couple:n', 0.4, 0],
  ['team:n', 'couple:n', 0.3, 0]
  , ['team:n', 'gang:n', 0.4, 0]
  , ['crew:n', 'gang:n', 0.4, 0]
  , ['site:n', 'scene:n', 0.3, 0]
  , ['location:n', 'address:n', 0.2, 0]
  , ['site:n', 'location:n', 0.3, 0]
  , ['hit:v', 'beat (strike):v', 0.4, 0.3]
  , ['hit:v', 'punch:v', 0.4, 0.3]
  , ['punch:v', 'beat (strike):v', 0.4, 0.3]
  , ['hit:v', 'slap:v', 0.4, 0.3]
  , ['table:n', 'counter (flat, elevated surface):n', 0.3, 0.2]
  , ['table:n', 'bench:n', 0.4, 0.2]
  , ['table:n', 'desk:n', 0.4, 0.2]
  , ['court (of law):n', 'tribunal:n', 0.4, 0.3]
  , ['committee:n', 'tribunal:n', 0.4, 0.3]
  , ['justice:n', 'tribunal:n', 0.2, 0.9]
  , ['court (of law):n', 'parliament:n', 0.2, 0]
  , ['luck:n', 'fluke:n', 0.4, 0.3]
  , ['produce (manufacture):v', 'generate:v', 0.7, 0.3], //['produce (manufacture):v', 'develop:v', 0.6, 0.3],
  ['produce (manufacture):v', 'spawn:v', 0.6, 0], //['develop:v', 'generate:v', 0.6, 0.3],
  ['generate:v', 'spawn:v', 0.6, 0]
  , ['produce (manufacture):v', 'publish:v', 0.3, 0.3]
  , ['build, construct:v', 'manufacture:v', 0.4, 0]
  , ['eat:v', 'bite:v', 0.2, 1]
  , ['teach:v', 'educate:v', 0.9, 0]
  , ['teach:v', 'coach:v', 0.4, 0]
  , ['teach:v', 'explain:v', 0.4, 0]
  , ['teach:v', 'train:v', 0.4, 0]
  , ['train:v', 'coach:v', 0.4, 0]
  , ['soil:n', 'dust:n', 0.4, 1]
  , ['soil:n', 'clay:n', 0.4, 0.5]
  , ['street:n', 'avenue:n', 0.4, 0.5]
  , ['path:n', 'avenue:n', 0.4, 0.3]
  , ['avenue:n', 'artery:n', 0.3, 0]
  , ['street:n', 'trail:n', 0.4, 0.5]
  , ['image:n', 'appearance (looks):n', 0.4, 0.5]
  , ['image:n', 'icon:n', 0.2, 0]
  , ['icon:n', 'idol:n', 0.4, 0]
  , ['god:n', 'idol:n', 0.4, 0], //['develop:v', 'exercise:v', 0.2, 0.5],
  ['exercise:v', 'practice:v', 0.4, 0]
  , ['exercise:v', 'train:v', 0.4, 0]
  , ['piece:n', 'bit:n', 0.4, 0]
  , ['sour:adj', 'bitter:adj', 0.6, 0]
  , ['bowl:n', 'container:n', 0.4, 0]
  , ['bowl:n', 'pot:n', 0.4, 0]
  , ['bowl:n', 'basin:n', 0.2, 0.2]
  , ['strong:adj', 'solid:adj', 0.4, 0.5]
  , ['yank:v', 'jerk:v', 0.5, 0]
  , ['pull:v', 'yank:v', 0.5, 0]
  , ['pull:v', 'tug:v', 0.6, 0]
  , ['yank:v', 'tug:v', 0.4, 0]
  , ['army:n', 'military:n', 0.4, 0.3]
  , ['price:n', 'bill, check:n', 0.4, 0.3]
  , ['boy:n', 'son:n', 0.4, 0.3]
  , ['hope:v', 'wish:v', 0.4, 0.3]
  , ['wish:v', 'crave:v', 0.4, 0.2]
  , ['wish:v', 'beg:v', 0.2, 0], //['pass:v', 'develop:v', 0.3, 0.8],
  //['develop:v', 'advance:v', 0.4, 0.3],
  //['develop:v', 'evolve:v', 0.4, 0.3],
  ['grow:v', 'evolve:v', 0.4, 0.3]
  , ['grow:v', 'flourish:v', 0.2, 0]
  , ['view:n', 'vision:n', 0.4, 0.3]
  , ['carry:v', 'lift:v', 0.4, 0.7]
  , ['city:n', 'metropolis:n', 0.7, 0]
  , ['path, track:n', 'road:n', 0.6, 0.5]
  , ['path, track:n', 'direction (way):n', 0.4, 0.2]
  , ['drive:v', 'chase:v', 0.2, 1]
  , ['chase:v', 'stalk:v', 0.2, 0]
  , ['rod, shaft, bar:n', 'arm:n', 0.3, 0]
  , ['arm:n', 'branch (tree part):n', 0.4, 0]
  , ['limb:n', 'branch (tree part):n', 0.4, 0]
  , ['true:adj', 'honest:adj', 0.5, 0]
  , ['true:adj', 'pure:adj', 0.5, 0]
  , ['honest:adj', 'sincere:adj', 0.5, 0]
  , ['serious:adj', 'sincere:adj', 0.4, 0]
  , ['true:adj', 'sincere:adj', 0.3, 0]
  , ['honest:adj', 'innocent:adj', 0.5, 0]
  , ['receive:v', 'collect:v', 0.4, 0.3]
  , ['receive:v', 'accept:v', 0.4, 0.3]
  , ['receive:v', 'earn:v', 0.4, 0.3]
  , ['receive:v', 'gain:v', 0.4, 0.3]
  , ['gain:v', 'earn:v', 0.4, 0.3]
  , ['receive:v', 'get:v', 0.4, 0.3]
  , ['receive:v', 'acquire:v', 0.4, 0.3]
  , ['get, obtain:v', 'acquire:v', 0.9, 0.3]
  , ['acquire:v', 'inherit:v', 0.3, 0]
  , ['receive:v', 'gather:v', 0.3, 0.3]
  , ['thank:v', 'praise:v', 0.3, 0.3]
  , ['thank:v', 'bless:v', 0.3, 0.3]
  , ['celebrate:v', 'praise:v', 0.3, 0.3]
  , ['praise:v', 'admire:v', 0.3, 0.3]
  , ['shuffle:v', 'shift:v', 0.4, 0.3]
  , ['shift:v', 'vary:v', 0.4, 1]
  , ['value:n', 'profit:n', 0.4, 0.3]
  , ['join:v', 'tie:v', 0.4, 0.3]
  , ['join:v', 'marry:v', 0.4, 0.3]
  , ['join:v', 'connect:v', 0.4, 0.3]
  , ['year:n', 'period (duration of time):n', 0.3, 0]
  , ['period (duration of time):n', 'season (quarter of the year):n', 0.4, 0]
  , ['tax:n', 'tariff:n', 0.7, 0]
  , ['price:n', 'tariff:n', 0.4, 0.3]
  , ['agree:v', 'admit:v', 0.5, 0.8]
  , ['special:adj', 'rare:adj', 0.2, 0]
  , ['precious:adj', 'rare:adj', 0.5, 1]
  , ['special:adj', 'unique:adj', 0.3, 0]
  , ['finger:n', 'claw:n', 0.4, 0]
  , ['finger:n', 'hook:n', 0.4, 0]
  , ['finger:n', 'thumb:n', 0.2, 0]
  , ['kitchen:n', 'cuisine:n', 0.4, 0]
  , ['cover:v', 'protect:v', 0.4, 0]
  , ['victim:n', 'prey:n', 0.4, 0.3]
  , ['patient:n', 'victim:n', 0.4, 0.3]
  , ['test:v', 'analyze:v', 0.4, 0.2]
  , ['review:v', 'analyze:v', 0.4, 0.3]
  , ['catch:v', 'capture, seize:v', 0.4, 0]
  , ['catch:v', 'grab:v', 0.4, 0.3]
  , ['catch:v', 'arrest:v', 0.4, 1]
  , ['drag:v', 'tow:v', 0.7, 0]
  , ['tug:v', 'tow:v', 0.7, 0]
  , ['drag:v', 'draw:v', 0.3, 0.3]
  , ['write:v', 'draw:v', 0.4, 0.5]
  , ['draw:v', 'mark:v', 0.4, 0]
  , ['mark:v', 'stain:v', 0.4, 0.3]
  , ['stain:v', 'contaminate:v', 0.4, 0.2]
  , ['tree:n', 'shrub:n', 0.4, 1]
  , ['shrub:n', 'bush:n', 0.9, 0]
  , ['tree:n', 'forest:n', 0.2, 0]
  , ['source:n', 'origin:n', 0.6, 0.3]
  , ['origin:n', 'cause:n', 0.2, 0.3]
  , ['choose, select:v', 'elect:v', 0.6, 0]
  , ['cause:v', 'provoke:v', 0.4, 0]
  , ['cause:v', 'generate:v', 0.4, 0]
  , ['evidence:n', 'clue:n', 0.2, 0]
  , ['culture:n', 'fashion:n', 0.3, 1], //['style:n', 'design:n', 0.5, 0.4],
  ['style:n', 'fashion:n', 0.5, 0.4]
  , ['style:n', 'tone:n', 0.3, 1]
  , ['style:n', 'kind:n', 0.3, 1]
  , ['justice:n', 'law:n', 0.2, 1]
  , ['couple:n', 'pair:n', 0.5, 0]
  , ['tie:v', 'attach:v', 0.4, 0.3]
  , ['connect:v', 'attach:v', 0.4, 0.3]
  , ['connect:v', 'combine:v', 0.4, 0.3]
  , ['connect:v', 'bond:v', 0.4, 0]
  , ['stir:v', 'mix:v', 0.5, 0.3]
  , ['mix:v', 'blend:v', 0.4, 0.3]
  , ['blend:v', 'merge:v', 0.4, 0.3]
  , ['mix:v', 'weave:v', 0.3, 0.3]
  , ['mix:v', 'combine:v', 0.4, 0.3]
  , ['mix:v', 'join:v', 0.4, 0.3]
  , ['attach:v', 'stick:v', 0.4, 0.3]
  , ['stick:v', 'cling:v', 0.5, 0.3]
  , ['device:n', 'equipment:n', 0.4, 0.3]
  , ['halt:v', 'ban, prohibit:v', 0.4, 1]
  , ['ban, prohibit:v', 'exclude, omit:v', 0.4, 0]
  , ['lead:v', 'direct, conduct:v', 0.4, 0]
  , ['favorite:adj', 'popular:adj', 0.4, 0]
  , ['enemy:n', 'villain:n', 0.4, 0]
  , ['enemy:n', 'rival:n', 0.4, 0]
  , ['enemy:n', 'rebel:n', 0.2, 0]
  , ['future:n', 'destiny, fate:n', 0.4, 0]
  , ['wrong:adj', 'false:adj', 0.2, 0.3]
  , ['false:adj', 'fake:adj', 0.4, 0.3]
  , ['defend:v', 'resist:v', 0.4, 0.3]
  , ['protest:v', 'resist:v', 0.3, 0.2]
  , ['resist:v', 'withstand:v', 0.4, 0.2]
  , ['defend:v', 'prevent:v', 0.4, 0.3]
  , ['resist:v', 'prevent:v', 0.4, 0.3]
  , ['confront:v', 'resist:v', 0.4, 0.8]
  , ['defend:v', 'justify:v', 0.4, 0.6]
  , ['act:v', 'behave:v', 0.9, 0.3]
  , ['perform:v', 'behave:v', 0.4, 0.3]
  , ['increase, expand:v', 'raise:v', 0.3, 0.3]
  , ['increase, expand:v', 'enhance:v', 0.3, 0.8]
  , ['increase, expand:v', 'extend:v', 0.4, 0]
  , ['increase, expand:v', 'boost:v', 0.4, 0]
  , ['increase, expand:v', 'gain:v', 0.4, 0.3]
  , ['bank:n', 'stock:n', 0.4, 0]
  , ['bank:n', 'fund:n', 0.4, 0]
  , ['fund:n', 'charity:n', 0.2, 0.2]
  , ['game:n', 'sport:n', 0.4, 0]
  , ['explore:v', 'seek:v', 0.4, 0]
  , ['search, look up:v', 'seek:v', 0.4, 0]
  , ['rest:v', 'relax:v', 0.4, 0.3]
  , ['throw:v', 'hurl:v', 0.9, 0.2]
  , ['throw:v', 'fling:v', 0.9, 0.2]
  , ['cast:v', 'fling:v', 0.7, 0.2]
  , ['cast:v', 'hurl:v', 0.3, 0.2]
  , ['throw:v', 'cast:v', 0.3, 0.2]
  , ['launch:v', 'cast:v', 0.5, 0.2]
  , ['launch:v', 'hurl:v', 0.3, 0.2]
  , ['cast:v', 'shoot:v', 0.3, 0.2]
  , ['throw:v', 'shoot:v', 0.5, 0]
  , ['top:n', 'lid:n', 0.6, 0]
  , ['lid:n', 'roof:n', 0.2, 0]
  , ['goal (objective):n', 'target:n', 0.5, 0]
  , ['goal (objective):n', 'destination:n', 0.3, 0]
  , ['goal (objective):n', 'purpose:n', 0.3, 0]
  , ['target:n', 'purpose:n', 0.3, 0]
  , ['purpose:n', 'ambition:n', 0.4, 0]
  , ['second (time):n', 'moment:n', 0.4, 0]
  , ['love:v', 'admire:v', 0.4, 0]
  , ['music:n', 'melody, tune:n', 0.3, 0]
  , ['grab:v', 'clutch:v', 0.9, 0]
  , ['grab:v', 'grasp:v', 0.7, 0.6]
  , ['grasp:v', 'clutch:v', 0.7, 0.6]
  , ['grab:v', 'grip:v', 0.6, 0]
  , ['clutch:v', 'grip:v', 0.7, 0.6]
  , ['hold:v', 'clutch:v', 0.3, 0.9]
  , ['wait:v', 'linger:v', 0.5, 0]
  , ['wait:v', 'expect:v', 0.3, 0]
  , ['wait:v', 'pause:v', 0.3, 0.8]
  , ['pause:v', 'halt:v', 0.4, 0]
  , ['serve:v', 'provide:v', 0.3, 0.5]
  , ['provide:v', 'cater:v', 0.5, 0]
  , ['help:v', 'amend:v', 0.2, 1]
  , ['help:v', 'treat:v', 0.2, 1]
  , ['help:v', 'serve:v', 0.2, 1]
  , ['help:v', 'cater:v', 0.2, 0]
  , ['help:v', 'improve:v', 0.3, 1]
  , ['help:v', 'relieve:v', 0.2, 1]
  , ['help:v', 'heal:v', 0.2, 1]
  , ['help:n', 'benefit:n', 0.1, 0]
  , ['hand:n', 'help:n', 0.2, 1]
  , ['help:n', 'service:n', 0.1, 0]
  , ['supply:v', 'cater:v', 0.3, 0]
  , ['serve:v', 'deliver:v', 0.3, 0.6]
  , ['die:v', 'expire:v', 0.3, 0]
  , ['finish:v', 'expire:v', 0.3, 0]
  , ['close:v', 'expire:v', 0.3, 0]
  , ['pass:v', 'expire:v', 0.3, 0]
  , ['expect:v', 'rely on:v', 0.4, 0.4]
  , ['expect:v', 'predict:v', 0.3, 0.2]
  , ['expect:v', 'hope:v', 0.3, 0.2]
  , ['perceive:v', 'foresee:v', 0.2, 0]
  , ['foresee:v', 'anticipate:v', 0.7, 0]
  , ['foresee:v', 'predict:v', 0.7, 0]
  , ['expect:v', 'anticipate:v', 0.5, 0]
  , ['predict:v', 'anticipate:v', 0.5, 0]
  , ['expect:v', 'assume, presume:v', 0.4, 0]
  , ['make:v', 'build, construct:v', 0.4, 1]
  , ['make:v', 'create:v', 0.4, 0.8]
  , ['make:v', 'generate:v', 0.4, 0.8]
  , ['make:v', 'prepare:v', 0.4, 0.8]
  , ['make:v', 'compose:v', 0.4, 0.8]
  , ['make:v', 'establish:v', 0.3, 0.8]
  , ['make:v', 'earn:v', 0.2, 0.7]
  , ['make:v', 'organize:v', 0.3, 0.8]
  , ['make:v', 'perform:v', 0.3, 0.4]
  , ['make:v', 'compel:v', 0.4, 0.8]
  , ['make:v', 'induce:v', 0.4, 0.8]
  , ['make:v', 'cause:v', 0.3, 0.9]
  , ['make:v', 'put (cause to be):v', 0.5, 0]
  , ['fall:v', 'collapse:v', 0.4, 0]
  , ['fall:v', 'dive:v', 0.4, 0.1]
  , ['fall:v', 'tumble:v', 0.4, 0]
  , ['trip:v', 'fall:v', 0.4, 0]
  , ['fall:v', 'stumble:v', 0.4, 0]
  , ['trip:v', 'stumble:v', 0.4, 0]
  , ['trip:v', 'slip:v', 0.4, 0]
  , ['plan:n', 'strategy (plan):n', 0.4, 0]
  , ['plan:n', 'tactic:n', 0.4, 0]
  , ['strategy (plan):n', 'tactic:n', 0.4, 0]
  , ['plan:n', 'program:n', 0.4, 1]
  , ['cut:v', 'slash:v', 0.4, 0]
  , ['cut:v', 'shave:v', 0.4, 0]
  , ['cut:v', 'tear, rip:v', 0.4, 1]
  , ['suggest:v', 'hint:v', 0.4, 0.3]
  , ['slow:adj', 'late:adj', 0.4, 0.3]
  , ['hard:adj', 'solid:adj', 0.4, 0.3]
  , ['field:n', 'pasture:n', 0.5, 0.9]
  , ['farm:n', 'pasture:n', 0.6, 0]
  , ['pasture:n', 'meadow:n', 0.6, 0]
  , ['meadow:n', 'prairie:n', 0.6, 0]
  , ['pasture:n', 'prairie:n', 0.6, 0]
  , ['field:n', 'garden:n', 0.4, 0.4]
  , ['hole:n', 'tunnel:n', 0.3, 0.3]
  , ['hole:n', 'gap:n', 0.4, 0.3]
  , ['gap:n', 'void:n', 0.4, 0]
  , ['hole:n', 'crater:n', 0.4, 0]
  , ['flaw:n', 'defect:n', 1, 0]
  , ['mistake:n', 'defect:n', 0.4, 0]
  , ['error:n', 'defect:n', 0.4, 0]
  , ['flaw:n', 'scar:n', 0.2, 1]
  , ['pain:n', 'wound:n', 0.3, 0.8]
  , ['wound:n', 'trauma:n', 0.7, 0]
  , ['damage:n', 'trauma:n', 0.7, 0]
  , ['wound:n', 'scar:n', 0.2, 1]
  , ['damage:n', 'wound:n', 0.3, 0.8]
  , ['scar:n', 'crater:n', 0.3, 0]
  , ['crater:n', 'cavity:n', 0.4, 0]
  , ['hole:n', 'cavity:n', 0.4, 0]
  , ['cavity:n', 'void:n', 0.4, 0]
  , ['hole:n', 'crack:n', 0.3, 1]
  , ['mouth:n', 'gate:n', 0.3, 0]
  , ['report:v', 'notify, inform:v', 0.4, 0], //['role:n', 'character:n', 0.4, 0.3],
  ['decide:v', 'choose:v', 0.3, 1]
  , ['heart:n', 'soul:n', 0.3, 0.2]
  , ['earth:n', 'planet:n', 0.4, 1]
  , ['drug:n', 'poison:n', 0.3, 1]
  , ['light:n', 'candle:n', 0.3, 1]
  , ['replace:v', 'substitute:v', 0.6, 0.2]
  , ['return, go back:v', 'replace:v', 0.3, 0.2]
  , ['link:n', 'relationship:n', 0.4, 0.5]
  , ['road:n', 'artery:n', 0.3, 0]
  , ['place:v', 'lay:v', 0.4, 0], //['put (place):v', 'place:v', 1, 0.3],
  ['place:v', 'deposit:v', 0.4, 0]
  , ['invest:v', 'deposit:v', 0.3, 0]
  , ['invest:v', 'devote:v', 0.3, 0]
  , ['lend:v', 'invest:v', 0.3, 1]
  , ['loan:v', 'invest:v', 0.3, 1]
  , ['deliver:v', 'deposit:v', 0.3, 0]
  , ['collect:v', 'deposit:v', 0.3, 0]
  , ['plant:v', 'place:v', 0.4, 0]
  , ['girl:n', 'daughter:n', 0.3, 0], //['cloth:n', 'material:n', 0.6, 1],
  ['well:n', 'reservoir:n', 0.6, 0]
  , ['source:n', 'well:n', 0.5, 0]
  , ['source:n', 'fountain:n', 0.5, 0]
  , ['well:n', 'fountain:n', 0.5, 0]
  , ['hole:n', 'well:n', 0.3, 1]
  , ['hospital:n', 'ward:n', 0.5, 0]
  , ['church:n', 'chapel:n', 0.9, 0]
  , ['temple:n', 'church:n', 0.5, 0.2]
  , ['church:n', 'shrine:n', 0.5, 0.2]
  , ['temple:n', 'shrine:n', 0.5, 0.2]
  , ['church:n', 'religion:n', 0.2, 0]
  , ['close, shut:v', 'block:v', 0.4, 0], //['maintain:v', 'defend:v', 0.3, 0.2],
  ['bed:n', 'mattress:n', 0.3, 0.6]
  , ['drive:v', 'ride:v', 0.4, 0.6]
  , ['drive:v', 'steer:v', 0.4, 0]
  , ['concentrate:v', 'focus:v', 0.6, 1]
  , ['focus:v', 'aim:v', 0.4, 0.3]
  , ['aim:v', 'strive:v', 0.2, 0.3]
  , ['aim:v', 'attempt:v', 0.2, 1]
  , ['try (strive):v', 'strive:v', 0.3, 0]
  , ['try (test out):v', 'test:v', 0.7, 0.6]
  , ['try (test out):v', 'inspect:v', 0.2, 0.9]
  , ['try (test out):v', 'examine:v', 0.2, 0.9]
  , ['try (test out):v', 'check:v', 0.2, 0.2]
  , ['try (strive):v', 'struggle:v', 0.6, 0.4]
  , ['try (strive):v', 'work:v', 0.2, 1]
  , ['try (attempt):v', 'intend:v', 0.6, 0.4]
  , ['try (attempt):v', 'aim:v', 0.2, 1]
  , ['aim:v', 'intend:v', 0.6, 0.4]
  , ['plan:v', 'intend:v', 0.6, 0.4]
  , ['drop:v', 'collapse:v', 0.4, 0]
  , ['spit:v', 'hiss:v', 0.4, 1]
  , ['whistle:v', 'hiss:v', 0.3, 0]
  , ['juice:n', 'syrup:n', 0.3, 0]
  , ['juice:n', 'blood:n', 0.4, 1]
  , ['blood:n', 'race, ethnicity:n', 0.3, 1]
  , ['push:v', 'propel:v', 0.4, 0.3]
  , ['throw:v', 'propel:v', 0.4, 0.3]
  , ['thrust:v', 'propel:v', 0.7, 0.3]
  , ['shoot:v', 'propel:v', 0.4, 0.3]
  , ['propel:v', 'hurl:v', 0.3, 0.3]
  , ['push:v', 'shift:v', 0.4, 0.3]
  , ['nature:n', 'environment (natural world):n', 0.5, 0.3]
  , ['color:n', 'hue:n', 0.9, 0]
  , ['shade:n', 'hue:n', 0.9, 0]
  , ['tone:n', 'hue:n', 0.3, 0]
  , ['color:n', 'paint:n', 0.3, 1]
  , ['hint:v', 'imply:v', 0.9, 0]
  , ['hint:v', 'remind:v', 0.4, 0]
  , ['hint:v', 'indicate:v', 0.4, 0]
  , ['indicate:v', 'imply:v', 0.4, 0]
  , ['suggest:v', 'imply:v', 0.3, 0]
  , ['sound:n', 'music:n', 0.3, 1]
  , ['hide:v', 'smuggle:v', 0.2, 1]
  , ['hide:v', 'protect:v', 0.3, 1]
  , ['enter:v', 'penetrate:v', 0.3, 0]
  , ['enter:v', 'invade:v', 0.3, 1], //['invade:v', 'raid:v', 0.7, 0], // no raid:v
  ['common:adj', 'frequent:adj', 0.4, 0]
  , ['common:adj', 'normal:adj', 0.5, 0.2]
  , ['common:adj', 'generic:adj', 0.5, 0.2]
  , ['general:adj', 'generic:adj', 0.7, 0.2]
  , ['normal:adj', 'regular:adj', 0.6, 0.2]
  , ['share:v', 'divide:v', 0.3, 1]
  , ['split:v', 'divide:v', 0.3, 1]
  , ['split:v', 'crack:v', 0.3, 0.2]
  , ['share:v', 'split:v', 0.3, 1]
  , ['divide:v', 'segregate:v', 0.3, 1]
  , ['split:v', 'separate:v', 0.3, 0]
  , ['pour:v', 'spill:v', 0.4, 0.5]
  , ['pour:v', 'drain:v', 0.4, 1]
  , ['pour:v', 'flow:v', 0.4, 0]
  , ['important:adj', 'significant:adj', 0.4, 0]
  , ['hot:adj', 'warm:adj', 0.4, 1]
  , ['language:n', 'dialect:n', 0.3, 0]
  , ['rise:v', 'climb:v', 0.3, 0.2]
  , ['rise:v', 'lift:v', 0.3, 0.2]
  , ['animal:n', 'beast:n', 0.4, 0]
  , ['animal:n', 'creature:n', 0.7, 0]
  , ['creature:n', 'beast:n', 0.3, 3]
  , ['creature:n', 'organism:n', 0.6, 0]
  , ['animal:n', 'pet:n', 0.3, 0]
  , ['art:n', 'craft:n', 0.4, 0.3], //['art:n', 'design:n', 0.4, 1],
  ['shoot:v', 'fire (detonate weapon):v', 1, 0]
  , ['shoot:v', 'blast:v', 0.3, 1]
  , ['shoot:v', 'hurl:v', 0.4, 0]
  , ['save, rescue:v', 'recover:v', 0.4, 0.5]
  , ['save (put aside):v', 'collect:v', 0.4, 0.5]
  , ['scene:n', 'stage:n', 0.3, 1]
  , ['course (direction of travel):n', 'career:n', 0.3, 0.2]
  , ['course (direction of travel):n', 'tour:n', 0.3, 0.9]
  , ['loop:n', 'curve:n', 0.3, 0.2]
  , ['size:n', 'amount, quantity:n', 0.2, 0.2]
  , ['size:n', 'capacity:n', 0.4, 0]
  , ['range:n', 'spectrum:n', 0.4, 0]
  , ['bunch:n', 'array:n', 0.1, 0]
  , ['array:n', 'spectrum:n', 0.4, 0]
  , ['size:n', 'range:n', 0.2, 0]
  , ['amount, quantity:n', 'volume:n', 0.3, 0.2]
  , ['volume:n', 'capacity:n', 0.4, 0]
  , ['serious:adj', 'severe:adj', 0.4, 0]
  , ['ready:adj', 'ripe:adj', 0.4, 0]
  , ['list:n', 'menu:n', 0.3, 0]
  , ['list:n', 'catalog:n', 0.3, 0]
  , ['source:n', 'resource:n', 0.4, 0]
  , ['root:n', 'source:n', 0.3, 0]
  , ['identify, point out:v', 'establish:v', 0.6, 1]
  , ['identify, point out:v', 'diagnose:v', 0.7, 0.2]
  , ['recognize:v', 'diagnose:v', 0.3, 0]
  , ['identify, point out:v', 'refer:v', 0.4, 0.2]
  , ['prepare:v', 'assemble:v', 0.5, 0.2]
  , ['assemble:v', 'congregate:v', 0.5, 0.2]
  , ['assemble:v', 'summon:v', 0.4, 0.2]
  , ['assemble:v', 'collect:v', 0.3, 1]
  , ['prepare:v', 'train:v', 0.5, 0.2]
  , ['prepare:v', 'rehearse:v', 0.4, 0.1]
  , ['prepare:v', 'brace:v', 0.4, 0.3]
  , ['rehearse:v', 'recite:v', 0.5, 0]
  , ['success:n', 'benefit:n', 0.5, 0.2]
  , ['success:n', 'profit:n', 0.4, 0.2]
  , ['argue:v', 'testify:v', 0.3, 0]
  , ['defend:v', 'argue:v', 0.3, 1]
  , ['argue:v', 'debate:v', 0.3, 0]
  , ['deal:v', 'haggle:v', 0.4, 0.2]
  , ['haggle:v', 'negotiate:v', 0.5, 0.2]
  , ['debate:v', 'negotiate:v', 0.3, 0]
  , ['notice:v', 'recognize:v', 0.4, 0]
  , ['notice:v', 'detect:v', 0.4, 0]
  , ['catch:v', 'notice:v', 0.2, 1]
  , ['remember:v', 'recognize:v', 0.4, 0]
  , ['cup:n', 'mug:n', 0.5, 0]
  , ['staff:n', 'crew:n', 0.4, 0]
  , ['rate:n', 'grade:n', 0.3, 1]
  , ['grade:n', 'rank (position):n', 0.5, 0]
  , ['level (degree, stage):n', 'rank (position):n', 0.4, 0]
  , ['rank (position):n', 'hierarchy:n', 0.4, 0.2], //['grade:n', 'degree:n', 0.5, 0],
  ['speculate:v', 'wonder:v', 0.5, 0.2]
  , ['box:n', 'crate:n', 0.4, 0]
  , ['vote:v', 'elect:v', 0.4, 0]
  , ['message:n', 'letter (written document):n', 0.4, 0.2]
  , ['message:n', 'note:n', 0.4, 0.2]
  , ['analyze:v', 'inspect:v', 0.4, 0.2]
  , ['investigate:v', 'inspect:v', 0.5, 0]
  , ['investigate:v', 'inquire:v', 0.4, 0]
  , ['check:v', 'examine:v', 0.5, 0.5]
  , ['investigate:v', 'examine:v', 0.5, 0.5]
  , ['investigate:v', 'interrogate:v', 0.4, 0]
  , ['inspect:v', 'scrutinize:v', 0.4, 0]
  , ['inspect:v', 'examine:v', 0.4, 0]
  , ['analyze:v', 'examine:v', 0.4, 0]
  , ['analyze:v', 'scrutinize:v', 0.4, 0]
  , ['investigate:v', 'probe:v', 0.3, 1]
  , ['examine:v', 'audit:v', 0.2, 0]
  , ['examine:v', 'criticize:v', 0.2, 0.9]
  , ['investigate:v', 'audit:v', 0.2, 0]
  , ['audit:v', 'probe:v', 0.3, 0]
  , ['benefit:n', 'profit:n', 0.5, 1]
  , ['weak:adj', 'fragile:adj', 0.4, 1]
  , ['crime:n', 'felony:n', 0.5, 0]
  , ['theater:n', 'stage:n', 0.4, 0.2]
  , ['theater:n', 'arena:n', 0.4, 0.2]
  , ['measure:v', 'compare:v', 0.4, 0.2]
  , ['crave:v', 'miss (long for):v', 0.4, 0]
  , ['arrange:v', 'organize:v', 0.5, 0.2]
  , ['sort:v', 'arrange:v', 0.4, 0.2]
  , ['gun:n', 'pistol:n', 0.4, 1]
  , ['gun:n', 'firearm:n', 0.4, 0]
  , ['discuss:v', 'debate:v', 0.4, 0]
  , ['blow:v', 'kiss:v', 0.2, 1]
  , ['check:v', 'review:v', 0.4, 0]
  , ['examine:v', 'review:v', 0.2, 0]
  , ['study:v', 'examine:v', 0.3, 0.6]
  , ['check:v', 'confirm:v', 0.7, 0]
  , ['press:v', 'squeeze:v', 0.4, 0.2]
  , ['stamp:v', 'press:v', 0.4, 0.2]
  , ['leg:n', 'lap:n', 0.3, 0]
  , ['pole:n', 'leg:n', 0.2, 1]
  , ['black:adj', 'dark:adj', 0.3, 0]
  , ['laugh:v', 'chuckle:v', 0.5, 0]
  , ['laugh:v', 'giggle:v', 0.5, 0]
  , ['chuckle:v', 'giggle:v', 0.5, 0]
  , ['guess:v', 'predict:v', 0.4, 0.2]
  , ['predict:v', 'estimate:v', 0.3, 0.2]
  , ['confirm:v', 'prove:v', 0.2, 0]
  , ['rock:n', 'gravel:n', 0.3, 1]
  , ['sand:n', 'gravel:n', 0.3, 1]
  , ['rock:n', 'metal:n', 0.2, 1]
  , ['forget:v', 'ignore:v', 0.4, 1]
  , ['ignore:v', 'neglect:v', 0.4, 0]
  , ['ignore:v', 'overlook:v', 0.9, 0]
  , ['neglect:v', 'overlook:v', 0.9, 0]
  , ['claim:v', 'allege:v', 0.9, 0]
  , ['allege:v', 'accuse:v', 0.4, 0.8]
  , ['allege:v', 'testify:v', 0.4, 0]
  , ['blame:v', 'accuse:v', 0.4, 0.8]
  , ['blame:v', 'criticize:v', 0.4, 0.2], //['accuse:v', 'denounce:v', 0.5, 0.5],
  ['remove:v', 'abolish:v', 0.4, 0.2]
  , ['remove:v', 'erase:v', 0.5, 0.2]
  , ['remove:v', 'expel:v', 0.5, 0.2]
  , ['remove:v', 'evacuate:v', 0.5, 0.6]
  , ['drink:v', 'sip:v', 0.3, 0.2]
  , ['ugly:adj', 'awful, terrible:adj', 0.2, 0.8]
  , ['beautiful:adj', 'cute:adj', 0.4, 0.3]
  , ['enjoy:v', 'appreciate:v', 0.4, 0.2]
  , ['like:v', 'enjoy:v', 0.3, 0.2]
  , ['cold:adj', 'crisp:adj', 0.4, 0]
  , ['cold:adj', 'cool (slightly cold):adj', 0.4, 0.2]
  , ['green:adj', 'fresh:adj', 0.3, 1]
  , ['fresh:adj', 'crisp:adj', 0.4, 0]
  , ['green:adj', 'raw:adj', 0.3, 1]
  , ['rough:adj', 'raw:adj', 0.3, 0]
  , ['fresh:adj', 'raw:adj', 0.3, 0]
  , ['card:n', 'badge:n', 0.2, 0]
  , ['medal:n', 'badge:n', 0.2, 0]
  , ['card:n', 'sheet:n', 0.3, 0.2]
  , ['leaf:n', 'sheet:n', 0.3, 0.2]
  , ['leaf:n', 'flake:n', 0.2, 0]
  , ['coat:n', 'layer:n', 0.3, 0.2]
  , ['layer:n', 'sheet:n', 0.3, 0.2]
  , ['blanket:n', 'sheet:n', 0.3, 1]
  , ['seat:n', 'chair:n', 0.9, 0.2]
  , ['seat:n', 'buttocks:n', 0.3, 1]
  , ['seat:n', 'saddle:n', 0.3, 0]
  , ['firm:adj', 'solid:adj', 0.2, 0]
  , ['close:adj', 'dense:adj', 0.3, 0.8]
  , ['close:adj', 'accurate:adj', 0.3, 0.8]
  , ['close:adj', 'intimate:adj', 0.3, 0.8]
  , ['solid:adj', 'dense:adj', 0.3, 0]
  , ['solid:adj', 'sturdy:adj', 0.5, 0]
  , ['strong:adj', 'sturdy:adj', 0.5, 0]
  , ['strong:adj', 'robust:adj', 0.9, 0]
  , ['strong:adj', 'severe:adj', 0.3, 0.7]
  , ['stiff:adj', 'stubborn:adj', 0.4, 0.4]
  , ['stiff:adj', 'sturdy:adj', 0.5, 0]
  , ['fence:n', 'wall:n', 0.3, 0.8]
  , ['plant:n', 'shrub:n', 0.3, 0]
  , ['hedge:n', 'shrub:n', 0.4, 0]
  , ['hedge:n', 'fence:n', 0.3, 0.9]
  , ['avoid:v', 'dodge:v', 0.2, 0.2]
  , ['avoid:v', 'avert:v', 0.3, 0.2]
  , ['avert:v', 'divert:v', 0.7, 0.2]
  , ['prevent:v', 'avert:v', 0.3, 0.2]
  , ['avoid:v', 'escape:v', 0.3, 0.2]
  , ['finish:v', 'close, shut:v', 0.2, 0.2]
  , ['theory:n', 'premise:n', 0.3, 0.2]
  , ['theory:n', 'thesis:n', 0.3, 0.2]
  , ['premise:n', 'thesis:n', 0.3, 0.2]
  , ['respond, answer, reply:v', 'react:v', 0.3, 0.2]
  , ['popular:adj', 'famous:adj', 0.3, 1]
  , ['tease:v', 'flirt:v', 0.3, 0.8]
  , ['mock:v', 'imitate:v', 0.6, 1]
  , ['tease:v', 'mock:v', 0.2, 0]
  , ['admit:v', 'confess:v', 0.5, 0]
  , ['admit:v', 'accept:v', 0.4, 0]
  , ['admit:v', 'affirm:v', 0.4, 0]
  , ['reveal:v', 'expose:v', 0.5, 0]
  , ['expose:v', 'uncover:v', 0.5, 0]
  , ['reveal:v', 'confess:v', 0.3, 1]
  , ['display:v', 'expose:v', 0.4, 0]
  , ['display:v', 'show off:v', 0.3, 0.6]
  , ['display:v', 'advertise:v', 0.3, 0]
  , ['display:v', 'demonstrate:v', 0.3, 1]
  , ['display:v', 'reveal:v', 0.3, 1]
  , ['include:v', 'incorporate:v', 0.4, 0]
  , ['contain:v', 'incorporate:v', 0.4, 0]
  , ['merge:v', 'incorporate:v', 0.4, 0]
  , ['consolidate:v', 'incorporate:v', 0.4, 1]
  , ['show (performance):n', 'play (stage play):n', 0.4, 0]
  , ['show (performance):n', 'exhibit:n', 0.4, 0], //['show (performance):n', 'spectacle:n', 0.3, 0],
  ['wide, broad:adj', 'deep:adj', 0.2, 1]
  , ['shake:v', 'rattle:v', 0.4, 0]
  , ['vibrate:v', 'rattle:v', 0.4, 0]
  , ['shake:v', 'shudder:v', 0.4, 0]
  , ['fly:v', 'glide:v', 0.2, 0]
  , ['operate:v', 'direct, conduct:v', 0.3, 0]
  , ['operate:v', 'perform:v', 0.4, 0]
  , ['operate:v', 'behave:v', 0.4, 0]
  , ['operate:v', 'treat:v', 0.5, 0]
  , ['serve:v', 'treat:v', 0.5, 0]
  , ['collapse:v', 'topple:v', 0.7, 0]
  , ['tumble:v', 'topple:v', 0.3, 0]
  , ['awake:adj', 'aware:adj', 0.4, 0]
  , ['awake:adj', 'conscious:adj', 0.4, 0]
  , ['aware:adj', 'conscious:adj', 0.4, 0]
  , ['province:n', 'region:n', 0.4, 0]
  , ['rope:n', 'cord:n', 0.4, 0]
  , ['rope:n', 'tape:n', 0.2, 0]
  , ['string:n', 'thread:n', 0.4, 0]
  , ['thread:n', 'strand:n', 0.9, 0]
  , ['string:n', 'strand:n', 0.4, 0]
  , ['wire:n', 'thread:n', 0.4, 0]
  , ['line:n', 'wire:n', 0.2, 1]
  , ['text:n', 'document:n', 0.4, 0]
  , ['paper:n', 'document:n', 0.4, 0]
  , ['slice:n', 'portion:n', 0.4, 0]
  , ['piece:n', 'portion:n', 0.4, 0]
  , ['part:n', 'portion:n', 0.4, 0]
  , ['confuse:v', 'distract:v', 0.4, 1]
  , ['confuse:v', 'complicate:v', 0.4, 0]
  , ['blame:v', 'attribute:v', 0.4, 0]
  , ['connect:v', 'attribute:v', 0.4, 0]
  , ['refer:v', 'attribute:v', 0.4, 0]
  , ['peer:v', 'squint:v', 0.4, 0]
  , ['peek:v', 'squint:v', 0.3, 0.4]
  , ['squint:v', 'blink:v', 0.2, 0]
  , ['flash:v', 'blink:v', 0.2, 0]
  , ['teenager:n', 'adolescent:n', 0.9, 0]
  , ['moral:adj', 'noble:adj', 0.4, 0.2]
  , ['practical:adj', 'pragmatic:adj', 0.9, 0]
  , ['graze (touch):v', 'scrape:v', 0.4, 0]
  , ['scratch:v', 'scrape:v', 0.4, 0]
  , ['scratch:v', 'rub:v', 0.4, 0]
  , ['scrub:v', 'rub:v', 0.4, 0]
  , ['scrub:v', 'polish:v', 0.3, 0]
  , ['scrub:v', 'wash:v', 0.2, 1]
  , ['excite:v', 'inspire:v', 0.3, 0.3]
  , ['affect:v', 'influence:v', 0.5, 0]
  , ['influence:v', 'persuade:v', 0.4, 0]
  , ['persuade:v', 'convince:v', 0.4, 0]
  , ['assure:v', 'convince:v', 0.4, 0]
  , ['satisfy:v', 'convince:v', 0.3, 0.9]
  , ['sway:v', 'convince:v', 0.3, 0.8]
  , ['inspire:v', 'influence:v', 0.4, 0.3]
  , ['inspire:v', 'impress:v', 0.2, 1]
  , ['inspire:v', 'arouse:v', 0.4, 0.8]
  , ['inspire:v', 'encourage:v', 0.4, 0.2]
  , ['character:n', 'persona:n', 0.9, 0]
  , ['hero:n', 'protagonist:n', 0.6, 0]
  , ['hero:n', 'idol:n', 0.6, 0]
  , ['fun:n', 'comedy:n', 0.2, 0.3]
  , ['comedy:n', 'humor:n', 0.6, 0]
  , ['trip:n', 'tour:n', 0.4, 0]
  , ['journey:n', 'trip:n', 0.4, 0]
  , ['journey:n', 'tour:n', 0.4, 0]
  , ['journey:n', 'voyage:n', 1, 0]
  , ['dream:n', 'fantasy:n', 0.3, 0]
  , ['fantasy:n', 'illusion:n', 0.3, 0]
  , ['improve:v', 'enhance:v', 0.4, 0.2]
  , ['improve:v', 'refine:v', 0.4, 0]
  , ['fix:v', 'amend:v', 0.4, 0]
  , ['improve:v', 'amend:v', 0.2, 0]
  , ['enhance:v', 'amend:v', 0.2, 0]
  , ['revise:v', 'amend:v', 0.4, 0]
  , ['ditch:n', 'trench:n', 0.4, 0]
  , ['canal:n', 'trench:n', 0.2, 0]
  , ['canal:n', 'channel (of water):n', 0.3, 0]
  , ['channel (of water):n', 'artery:n', 0.3, 0]
  , ['tomb:n', 'coffin:n', 0.3, 0.8]
  , ['tomb:n', 'grave:n', 0.3, 0]
  , ['mountain:n', 'cliff:n', 0.2, 1]
  , ['fog:n', 'mist:n', 0.6, 0]
  , ['glue:n', 'paste:n', 0.6, 0]
  , ['paste:n', 'cream:n', 0.3, 0]
  , ['glue:n', 'cement:n', 0.3, 0.8]
  , ['clay:n', 'brick:n', 0.3, 0.9]
  , ['man:n', 'guy:n', 0.3, 0.9]
  , ['male:n', 'guy:n', 0.3, 0.9]
  , ['wrist:n', 'ankle:n', 0.3, 0]
  , ['crust:n', 'bark (of tree):n', 0.3, 0]
  , ['skin:n', 'crust', 0.3, 0.8]
  , ['suck:v', 'inhale:v', 0.3, 0]
  , ['kill:v', 'execute:v', 0.3, 0]
  , ['clothes:n', 'garment:n', 0.7, 0]
  , ['naive:adj', 'ignorant:adj', 0.3, 0]
  , ['naive:adj', 'innocent:adj', 0.3, 1]
  , ['hug:v', 'embrace:v', 0.4, 0]
  , ['hug:v', 'cuddle:v', 0.4, 0]
  , ['hug:v', 'squeeze:v', 0.3, 0.7]
  , ['squeeze:v', 'clutch:v', 0.9, 0]
  , ['crack:n', 'fracture:n', 0.4, 0]
  , ['lump:n', 'bump:n', 0.6, 0]
  , ['snatch:v', 'yank:v', 0.5, 0]
  , ['imitate:v', 'mimic:v', 0.9, 0]
  , ['imitate:v', 'replicate:v', 0.6, 0.3]
  , ['copy:v', 'replicate:v', 0.6, 0.3]
  , ['repeat:v', 'replicate:v', 0.6, 0.3]
  , ['spin:v', 'swirl:v', 0.6, 0]
  , ['divert:v', 'distract:v', 0.4, 0.2]
  , ['fling:v', 'hurl:v', 0.4, 0.2]
  , ['pot:n', 'bucket:n', 0.2, 0]
  , ['bucket:n', 'tub:n', 0.3, 0]
  , ['tub:n', 'basin:n', 0.6, 0]
  , ['tub:n', 'bath:n', 0.4, 0]
  , ['roam:v', 'prowl:v', 0.4, 0.1]
  , ['roam:v', 'drift:v', 0.4, 1]
  , ['roam:v', 'wander:v', 0.5, 0.1]
  , ['roam:v', 'migrate:v', 0.4, 0.6]
  , ['cream:n', 'milk:n', 0.4, 1]
  , ['milk:n', 'semen:n', 0.2, 1]
  , ['seed:n', 'semen:n', 0.5, 0.7]
  , ['asteroid:n', 'comet:n', 0.9, 0]
  , ['naked, nude:adj', 'bald:adj', 0.4, 0]
  , ['protest:v', 'complain:v', 0.4, 1]
  , ['insist:v', 'protest:v', 0.4, 1]
  , ['insist:v', 'demand:v', 0.4, 0.8], //['insist:v', 'maintain:v', 0.4, 0.8],
  ['insist:v', 'persist:v', 0.4, 0.8]
  , ['shudder:v', 'shiver:v', 0.6, 0]
  , ['vibrate:v', 'shiver:v', 0.6, 0]
  , ['tremble:v', 'shiver:v', 0.3, 0]
  , ['tremble:v', 'vibrate:v', 0.3, 0]
  , ['shake:v', 'vibrate:v', 0.3, 0]
  , ['tap (faucet):n', 'valve:n', 0.4, 0]
  , ['hose:n', 'pipe:n', 0.6, 0]
  , ['pipe:n', 'valve:n', 0.4, 0]
  , ['tired (needing rest):adj', 'lazy:adj', 0.4, 1]
  , ['parcel, package, bundle:n', 'packet:n', 0.5, 0]
  , ['bag:n', 'packet:n', 0.5, 0]
  , ['cruel:adj', 'nasty:adj', 0.4, 0]
  , ['vicious:adj', 'cruel:adj', 0.4, 0]
  , ['wrap:v', 'drape:v', 0.4, 0]
  , ['tight:adj', 'tense:adj', 0.4, 0]
  , ['tense:adj', 'stiff:adj', 0.4, 0]
  , ['tense:adj', 'firm:adj', 0.4, 0]
  , ['emit:v', 'discharge:v', 0.4, 0]
  , ['emit:v', 'radiate:v', 0.6, 0]
  , ['fire (from job):v', 'discharge:v', 0.4, 0]
  , ['expel:v', 'fire (from job):v', 0.4, 0]
  , ['line:n', 'stripe:n', 0.4, 0]
  , ['stripe:n', 'strip:n', 0.6, 0]
  , ['strip:n', 'ribbon:n', 0.5, 0]
  , ['line:n', 'column:n', 0.3, 0]
  , ['list:n', 'column:n', 0.3, 0]
  , ['column:n', 'pillar:n', 0.3, 0]
  , ['pillar:n', 'mast:n', 0.2, 0]
  , ['pole:n', 'mast:n', 0.5, 0]
  , ['pole:n', 'stick:n', 0.4, 0]
  , ['nest:n', 'den:n', 0.4, 0]
  , ['curve:n', 'curl:n', 0.4, 0]
  , ['loop:n', 'curl:n', 0.4, 0]
  , ['neck:n', 'throat:n', 0.3, 0]
  , ['crunch:v', 'chew:v', 0.4, 0]
  , ['grind:v', 'chew:v', 0.2, 1]
  , ['bite:v', 'chew:v', 0.4, 0.2]
  , ['crush:v', 'squash:v', 0.2, 0]
  , ['grind:v', 'crumble:v', 0.3, 0]
  , ['alcohol:n', 'liquor:n', 0.4, 0]
  , ['grasp:v', 'embrace:v', 0.2, 0]
  , ['front:n', 'facade:n', 0.7, 0]
  , ['face:n', 'facade:n', 0.7, 0]
  , ['facade:n', 'surface:n', 0.3, 0.9]
  , ['facade:n', 'mask:n', 0.2, 0.8]
  , ['attack:v', 'assault:v', 0.3, 0]
  , ['safe:adj', 'immune:adj', 0.4, 0.3]
  , ['immune:adj', 'exempt:adj', 0.3, 0]
  , ['stew:n', 'soup:n', 0.3, 0]
  , ['soup:n', 'broth:n', 0.5, 0]
  , ['world:n', 'earth:n', 0.2, 0]
  , ['world:n', 'planet:n', 0.4, 0]
  , ['world:n', 'universe:n', 0.1, 1]
  , ['extend:v', 'stretch:v', 0.3, 1]
  , ['sword:n', 'blade:n', 0.4, 1]
  , ['knife:n', 'blade:n', 0.4, 1]
  , ['blade:n', 'razor:n', 1, 0]
  , ['leaf:n', 'petal:n', 0.2, 1]
  , ['neck:n', 'collar:n', 0.3, 0]
  , ['breast:n', 'chest:n', 0.3, 1]
  , ['sand:n', 'dirt:n', 0.3, 1]
  , ['sand:n', 'dust:n', 0.3, 1]
  , ['stupid:adj', 'dull:adj', 0.3, 0.2]
  , ['dumb:adj', 'dull:adj', 0.3, 0.2]
  , ['please:v', 'satisfy:v', 0.4, 0]
  , ['satisfy:v', 'indulge:v', 0.4, 0]
  , ['spoil:v', 'indulge:v', 0.2, 0]
  , ['cotton:n', 'cloth:n', 0.4, 0]
  , ['cloth:n', 'fabric, textile:n', 0.4, 0]
  , ['cloth:n', 'linen:n', 0.3, 0]
  , ['linen:n', 'fabric, textile:n', 0.3, 0]
  , ['cloth:n', 'rag:n', 0.4, 0]
  , ['ash:n', 'coal:n', 0.4, 0.3]
  , ['cry:v', 'moan:v', 0.3, 0.3]
  , ['cry:v', 'sob:v', 0.5, 0.3]
  , ['sob:v', 'weep:v', 0.6, 0]
  , ['cry:v', 'weep:v', 0.5, 0.3]
  , ['cry:v', 'mourn:v', 0.5, 0.3]
  , ['regret:v', 'lament:v', 0.9, 0]
  , ['mourn:v', 'lament:v', 0.5, 0]
  , ['weep:v', 'mourn:v', 0.4, 0]
  , ['curve:n', 'arc:n', 0.4, 0]
  , ['danger:n', 'threat:n', 0.6, 0]
  , ['herb:n', 'flower:n', 0.3, 1]
  , ['vine:n', 'flower:n', 0.3, 1]
  , ['bend:v', 'fold:v', 0.5, 0.1]
  , ['wrap:v', 'fold:v', 0.5, 0.1]
  , ['grass:n', 'lawn:n', 0.5, 1]
  , ['grass:n', 'pasture:n', 0.3, 0]
  , ['bay:n', 'harbor:n', 0.4, 0.6]
  , ['bay:n', 'cove:n', 0.6, 0]
  , ['gate:n', 'port:n', 0.3, 0.3]
  , ['harbor:n', 'port:n', 0.4, 1]
  , ['peace:n', 'harmony:n', 0.5, 0]
  , ['dirt:n', 'mud:n', 0.4, 1]
  , ['joke:n', 'humor:n', 0.4, 0]
  , ['humor:n', 'wit:n', 0.4, 0]
  , ['ice:n', 'diamond:n', 0.2, 0]
  , ['jelly:n', 'jam:n', 0.4, 0]
  , ['funny:adj', 'absurd:adj', 0.3, 0.2]
  , ['jump:v', 'leap:v', 0.5, 0]
  , ['jump:v', 'skip:v', 0.4, 0.2]
  , ['jump:v', 'bounce:v', 0.4, 0.2]
  , ['skip:v', 'hop:v', 0.4, 0.8]
  , ['skip:v', 'skim:v', 0.4, 0]
  , ['hop:v', 'bounce:v', 0.3, 0.8]
  , ['skin:n', 'leather:n', 0.4, 0]
  , ['tool:n', 'machine:n', 0.4, 0]
  , ['meal:n', 'feast:n', 0.4, 0]
  , ['feast:n', 'festival:n', 0.4, 0]
  , ['meal:n', 'picnic:n', 0.4, 0]
  , ['feast:n', 'picnic:n', 0.3, 0]
  , ['valley:n', 'canyon:n', 0.4, 0.5]
  , ['basin:n', 'valley:n', 0.4, 0.5]
  , ['basin:n', 'reservoir:n', 0.4, 0]
  , ['pain:n', 'agony:n', 0.4, 0]
  , ['polish:v', 'shine:v', 0.3, 1]
  , ['polish:v', 'refine:v', 0.3, 0.8]
  , ['poem:n', 'lyrics:n', 0.4, 0]
  , ['bath:n', 'pool:n', 0.4, 0]
  , ['lake:n', 'pond:n', 0.3, 0.3]
  , ['lake:n', 'pool:n', 0.4, 0]
  , ['pond:n', 'pool:n', 0.4, 0]
  , ['harm:v', 'abuse:v', 0.3, 0]
  , ['punish:v', 'abuse:v', 0.3, 0]
  , ['abuse:v', 'torture:v', 0.5, 0.7]
  , ['abuse:v', 'violate:v', 0.4, 0.7]
  , ['torture:v', 'oppress:v', 0.3, 0.8]
  , ['hurt, injure:v', 'harm:v', 0.5, 0.2]
  , ['hurt, injure:v', 'punish:v', 0.3, 0]
  , ['respect:v', 'admire:v', 0.3, 1]
  , ['admire:v', 'worship:v', 0.3, 0.8]
  , ['look:v', 'focus:v', 0.1, 0]
  , ['look:v', 'scan:v', 0.1, 0]
  , ['look:v', 'admire:v', 0.1, 1]
  , ['praise:v', 'worship:v', 0.3, 0.8]
  , ['respect:v', 'worship:v', 0.3, 0.8]
  , ['reward:n', 'award:n', 0.7, 0]
  , ['reward:n', 'prize:n', 0.7, 0]
  , ['reward:n', 'medal:n', 0.7, 0]
  , ['prize:n', 'award:n', 0.7, 0]
  , ['reward:n', 'profit:n', 0.3, 0.8]
  , ['pattern:n', 'rhythm:n', 0.3, 0]
  , ['pulse:n', 'rhythm:n', 0.4, 0]
  , ['rice:n', 'cereal:n', 0.4, 0]
  , ['turn:v', 'revolve:v', 0.2, 0.2]
  , ['twist:v', 'revolve:v', 0.2, 0.2]
  , ['roll:v', 'revolve:v', 0.9, 0]
  , ['roll:v', 'rotate:v', 0.9, 0.2]
  , ['rotate:v', 'revolve:v', 0.5, 0]
  , ['roll:v', 'spin:v', 0.3, 0.8]
  , ['rub:v', 'stroke:v', 0.5, 0.2]
  , ['rub:v', 'massage:v', 0.5, 0.2]
  , ['rub:v', 'wipe:v', 0.3, 0.2]
  , ['rub:v', 'spread:v', 0.3, 0.9]
  , ['salt:n', 'spice:n', 0.4, 1]
  , ['servant:n', 'waiter:n', 0.7, 0]
  , ['servant:n', 'maid:n', 0.3, 0]
  , ['slave:n', 'servant:n', 0.4, 1]
  , ['shame, stigma:n', 'guilt:n', 0.3, 1]
  , ['guilt:n', 'sin:n', 0.2, 0]
  , ['shock:v', 'startle:v', 0.7, 0]
  , ['shock:v', 'stun:v', 0.7, 0]
  , ['shock:v', 'surprise:v', 0.3, 1]
  , ['shake:v', 'shock:v', 0.3, 0]
  , ['scare:v', 'frighten:v', 1, 0]
  , ['scare:v', 'startle:v', 0.6, 0]
  , ['surprise:v', 'astonish:v', 0.6, 0]
  , ['astonish:v', 'shock:v', 0.4, 0.5]
  , ['surprise:v', 'startle:v', 0.6, 0]
  , ['silk:n', 'thread:n', 0.3, 0]
  , ['glide:v', 'slide:v', 0.2, 0]
  , ['slide:v', 'drift:v', 0.3, 0]
  , ['slide:v', 'slip:v', 0.5, 0]
  , ['slide:v', 'skid:v', 0.5, 0]
  , ['glide:v', 'slip:v', 0.4, 0]
  , ['slide:v', 'skate:v', 0.2, 0]
  , ['glide:v', 'skate:v', 0.2, 0]
  , ['stumble:v', 'slip:v', 0.4, 1]
  , ['slope, slant:n', 'ramp:n', 0.4, 0]
  , ['slope, slant:n', 'bank (river):n', 0.4, 0]
  , ['hill:n', 'mound:n', 0.2, 0]
  , ['hill:n', 'slope, slant:n', 0.4, 0]
  , ['crush:v', 'smash:v', 0.3, 0.6]
  , ['crush:v', 'crumple:v', 0.4, 0]
  , ['crumple:v', 'ruffle:v', 0.4, 0]
  , ['crush:v', 'ruffle:v', 0.2, 0]
  , ['tangle:v', 'ruffle:v', 0.4, 0]
  , ['crash:v', 'collide:v', 0.8, 0.3]
  , ['hit:v', 'collide:v', 0.8, 0.3]
  , ['beat (strike):v', 'collide:v', 0.4, 0.3]
  , ['sniff:v', 'smell (sense with nose):v', 0.2, 1]
  , ['sniff:v', 'inhale:v', 0.3, 0.3]
  , ['smile:v', 'smirk:v', 0.6, 0]
  , ['soft:adj', 'smooth:adj', 0.3, 0.2]
  , ['steel:n', 'iron:n', 0.5, 0]
  , ['bend:v', 'twist:v', 0.2, 0]
  , ['twist:v', 'wiggle:v', 0.3, 0]
  , ['twist:v', 'distort:v', 0.3, 0]
  , ['deceive:v', 'distort:v', 0.2, 0]
  , ['wash:v', 'rinse:v', 0.6, 0]
  , ['wash:v', 'flush:v', 0.3, 0]
  , ['drench:v', 'flush:v', 0.3, 0]
  , ['wave (ocean):n', 'surge:n', 0.4, 0]
  , ['weather:n', 'climate:n', 0.5, 0]
  , ['village:n', 'suburb:n', 0.5, 0]
  , ['region:n', 'suburb:n', 0.3, 0]
  , ['town:n', 'village:n', 0.5, 0.6]
  , ['arch:n', 'arc:n', 0.9, 0]
  , ['arch:n', 'dome:n', 0.3, 0]
  , ['bubble:n', 'dome:n', 0.2, 0]
  , ['moan:v', 'sigh:v', 0.4, 0]
  , ['groan:v', 'moan:v', 0.6, 1]
  , ['boat:n', 'canoe:n', 0.4, 0]
  , ['boat:n', 'raft:n', 0.3, 0]
  , ['boat:n', 'yacht:n', 0.5, 0]
  , ['feather:n', 'pen:n', 0.4, 0]
  , ['pen:n', 'pencil:n', 0.4, 0]
  , ['shoe:n', 'boot:n', 0.5, 0.8]
  , ['bottle:n', 'jar:n', 0.4, 0.2]
  , ['jar:n', 'vase:n', 0.5, 0.2]
  , ['brain:n', 'wit:n', 0.4, 0.2]
  , ['link:n', 'bridge:n', 0.3, 0.2]
  , ['floor:n', 'platform:n', 0.2, 1]
  , ['platform:n', 'balcony:n', 0.3, 0.2]
  , ['balcony:n', 'porch:n', 0.4, 0.2]
  , ['porch:n', 'terrace:n', 1, 0]
  , ['bridge:n', 'platform:n', 0.3, 0.7]
  , ['button (pushbutton):n', 'knob:n', 0.3, 0.8]
  , ['loaf:n', 'cake:n', 0.4, 0.2]
  , ['cart:n', 'wagon:n', 0.4, 0.2]
  , ['wagon:n', 'carriage:n', 0.4, 0.2]
  , ['chain:n', 'bracelet:n', 0.4, 0.1]
  , ['chain:n', 'link:n', 0.4, 0.1]
  , ['coat, jacket:n', 'cloak:n', 0.6, 0.1]
  , ['screen:n', 'curtain:n', 0.3, 0.1]
  , ['mask:n', 'veil:n', 0.5, 0.4]
  , ['curtain:n', 'veil:n', 0.4, 0.1]
  , ['symbol:n', 'flag:n', 0.3, 0.1]
  , ['flag:n', 'banner:n', 0.6, 0.1]
  , ['frame:n', 'cage:n', 0.3, 0.1]
  , ['frame:n', 'hull:n', 0.7, 0]
  , ['skeleton:n', 'hull:n', 0.7, 0]
  , ['cage:n', 'crate:n', 0.3, 0.2]
  , ['cage:n', 'prison, jail:n', 0.3, 0.4]
  , ['prison, jail:n', 'dungeon:n', 0.5, 0.2]
  , ['hat:n', 'helmet:n', 0.3, 0.9]
  , ['lump:n', 'knot:n', 0.4, 0]
  , ['web:n', 'net:n', 0.4, 0]
  , ['needle:n', 'pin:n', 0.4, 0]
  , ['rod, shaft, bar:n', 'pole:n', 0.5, 0]
  , ['rod, shaft, bar:n', 'cane:n', 0.3, 0]
  , ['roof:n', 'ceiling:n', 0.6, 0]
  , ['steer:v', 'sail:v', 0.3, 0]
  , ['drift:v', 'sail:v', 0.2, 0]
  , ['float:v', 'sail:v', 0.2, 0]
  , ['sail:v', 'cruise:v', 0.7, 0]
  , ['sail:v', 'navigate:v', 0.6, 0]
  , ['steer:v', 'navigate:v', 0.5, 0]
  , ['shelf, rack:n', 'ledge:n', 0.4, 0]
  , ['shelf, rack:n', 'counter (flat, elevated surface):n', 0.4, 0]
  , ['tooth:n', 'fang:n', 0.3, 0]
  , ['tooth:n', 'tusk:n', 0.2, 0]
  , ['fang:n', 'tusk:n', 0.2, 0]
  , ['shirt:n', 'blouse:n', 0.5, 0.6]
  , ['shirt:n', 'top (clothing):n', 0.5, 0.6]
  , ['dress:n', 'skirt:n', 0.4, 0.6]
  , ['trunk (of tree):n', 'stem:n', 0.4, 0]
  , ['factory:n', 'mill:n', 0.7, 0]
  , ['factory:n', 'laboratory:n', 0.3, 0], //['factory:n', 'industry:n', 0.3, 0],
  ['sign:n', 'signal:n', 0.9, 0]
  , ['sign:n', 'symptom:n', 0.3, 0]
  , ['evidence:n', 'symptom:n', 0.3, 0]
  , ['signal:n', 'alarm:n', 0.4, 0]
  , ['alarm:n', 'siren:n', 0.7, 0]
  , ['straight:adj', 'even:adj', 0.2, 0]
  , ['even:adj', 'equal:adj', 0.3, 0]
  , ['even:adj', 'flat:adj', 0.3, 0.9]
  , ['even:adj', 'parallel:adj', 0.3, 0]
  , ['even:adj', 'regular:adj', 0.1, 1]
  , ['even:adj', 'stable:adj', 0.2, 0.9]
  , ['even:adj', 'smooth:adj', 0.2, 1]
  , ['even:adj', 'consistent:adj', 0.1, 0]
  , ['hotel:n', 'inn, lodge:n', 0.5, 0]
  , ['possible:adj', 'plausible:adj', 0.9, 0]
  , ['probable:adj', 'possible:adj', 0.2, 0.8]
  , ['fast:adj', 'quick:adj', 0.5, 0]
  , ['quick:adj', 'swift:adj', 0.5, 0]
  , ['quiet:adj', 'silent:adj', 0.4, 0]
  , ['quiet:adj', 'shy:adj', 0.4, 0.7]
  , ['quiet:adj', 'subtle:adj', 0.3, 0]
  , ['humble:adj', 'modest:adj', 1, 0]
  , ['modest:adj', 'shy:adj', 0.3, 0]
  , ['shy:adj', 'reluctant:adj', 0.4, 0]
  , ['soft:adj', 'quiet:adj', 0.4, 1]
  , ['soft:adj', 'gentle:adj', 0.4, 0.2]
  , ['quiet:adj', 'gentle:adj', 0.3, 0.2]
  , ['benign:adj', 'gentle:adj', 0.3, 0.2]
  , ['calm:adj', 'gentle:adj', 0.3, 0.2]
  , ['sharp:adj', 'acute:adj', 0.4, 0]
  , ['sharp:adj', 'steep:adj', 0.3, 0.4]
  , ['smooth:adj', 'stable, steady:adj', 0.3, 1]
  , ['stiff:adj', 'tight:adj', 0.3, 0]
  , ['sweet:adj', 'delicious:adj', 0.3, 1]
  , ['thick:adj', 'wide, broad:adj', 0.3, 0]
  , ['thick:adj', 'fat:adj', 0.3, 0]
  , ['thick:adj', 'dense:adj', 0.3, 0]
  , ['tight:adj', 'narrow:adj', 0.4, 0]
  , ['tight:adj', 'compact:adj', 0.4, 0]
  , ['solid:adj', 'compact:adj', 0.6, 0]
  , ['wet:adj', 'damp, moist:adj', 0.5, 0]
  , ['chair:n', 'lounge, couch, sofa:n', 0.4, 0]
  , ['bed:n', 'lounge, couch, sofa:n', 0.2, 0]
  , ['monster:n', 'beast:n', 0.5, 0]
  , ['flood:n', 'tide:n', 0.2, 0]
  , ['vocabulary:n', 'dictionary:n', 0.4, 0.2]
  , ['rumor:n', 'gossip:n', 0.6, 0.2]
  , ['rumor:n', 'scandal:n', 0.4, 0.7]
  , ['soldier:n', 'veteran:n', 0.3, 0]
  , ['soldier:n', 'guerrilla:n', 0.4, 0]
  , ['rebel:n', 'guerrilla:n', 0.4, 0]
  , ['mat:n', 'rug:n', 0.4, 0]
  , ['carpet:n', 'rug:n', 0.4, 0]
  , ['spear, lance, pike:n', 'dart:n', 0.2, 0]
  , ['shelter:n', 'shield:n', 0.3, 0.2]
  , ['shelter:n', 'bunker:n', 0.2, 0]
  , ['shield:n', 'armor:n', 0.3, 0.2]
  , ['uniform:n', 'costume:n', 0.3, 0.2]
  , ['recipe:n', 'formula:n', 0.3, 0.2]
  , ['spike:n', 'thorn:n', 0.4, 0]
  , ['accent (of language):n', 'dialect:n', 0.3, 0]
  , ['ancient:adj', 'antique:adj', 0.5, 0]
  , ['old:adj', 'antique:adj', 0.4, 0]
  , ['fort:n', 'castle:n', 0.4, 0.7]
  , ['fort:n', 'citadel:n', 0.4, 0.7]
  , ['mansion:n', 'palace:n', 0.5, 0]
  , ['castle:n', 'palace:n', 0.5, 0]
  , ['destroy:v', 'devastate:v', 0.5, 0]
  , ['kill:v', 'destroy:v', 0.3, 0]
  , ['date, go out:v', 'escort:v', 0.4, 0.6]
  , ['dig:v', 'bore:v', 0.4, 0]
  , ['dig:v', 'scoop:v', 0.4, 0], //['dig:v', 'gouge:v', 0.4, 0],
  //['gouge:v', 'scoop:v', 0.4, 0],
  ['scrape:v', 'scoop:v', 0.4, 0]
  , ['suck:v', 'extract:v', 0.3, 0.5]
  , ['edit:v', 'refine:v', 0.3, 0.5]
  , ['edit:v', 'revise:v', 0.3, 0.5]
  , ['vague:adj', 'ambiguous:adj', 0.5, 0.4]
  , ['vague:adj', 'fuzzy:adj', 0.5, 0.4]
  , ['earn:v', 'reap:v', 0.3, 0], //['earn:v', 'score:v', 0.4, 0], // no score:v
  ['borrow:v', 'hire, rent:v', 0.3, 0.7]
  , ['sin:n', 'crime:n', 0.3, 0.7]
  , ['record:v', 'register:v', 0.5, 0.3]
  , ['register:v', 'book:v', 0.9, 0]
  , ['organize:v', 'book:v', 0.3, 0]
  , ['climate:n', 'temperature:n', 0.3, 1]
  , ['wizard:n', 'witch:n', 0.4, 0]
  , ['glass:n', 'lens:n', 0.4, 0.4]
  , ['skeleton:n', 'carcass:n', 0.3, 0]
  , ['arrow (weapon):n', 'arrow (sign):n', 0.5, 0]
  , ['arrow (weapon):n', 'dart:n', 0.5, 0]
  , ['blank:adj', 'plain:adj', 0.5, 0.1]
  , ['blank:adj', 'vacant:adj', 0.4, 0.1]
  , ['rodent:n', 'mouse:n', 0.3, 0]
  , ['top:n', 'peak:n', 0.4, 0.4]
  , ['peak:n', 'orgasm:n', 0.4, 0.9]
  , ['spasm:n', 'orgasm:n', 0.3, 0.9]
  , ['frenzy:n', 'orgasm:n', 0.2, 0.9]
  , ['torch:n', 'candle:n', 0.5, 0]
  , ['torch:n', 'lamp:n', 0.5, 0]
  , ['lean:v', 'tilt:v', 0.6, 0]
  , ['lean:v', 'bow (greet):v', 0.3, 0]
  , ['lean:v', 'drift:v', 0.2, 0]
  , ['bend:v', 'lean:v', 0.3, 0]
  , ['insult:v', 'offend:v', 0.5, 0]
  , ['insult:v', 'mock:v', 0.3, 0.2], //['outbreak:n', 'plague:n', 0.4, 0.3],
  ['guarantee:v', 'promise:v', 0.4, 0]
  , ['stumble:v', 'limp:v', 0.3, 0.3]
  , ['trap:n', 'bait:n', 0.3, 0.3]
  , ['flow:v', 'drain:v', 0.3, 0.2], //['drain:v', 'reduce:v', 0.3, 1],
  ['complain:v', 'criticize:v', 0.3, 0.7]
  , ['berry:n', 'bean:n', 0.3, 0.3]
  , ['float:v', 'hover:v', 0.3, 0.4]
  , ['float:v', 'skim:v', 0.3, 0.4]
  , ['mess:n', 'rubble, debris:n', 0.4, 0]
  , ['garbage:n', 'rubble, debris:n', 0.3, 0]
  , ['soak:v', 'drench:v', 0.4, 0]
  , ['soak:v', 'saturate:v', 0.9, 0]
  , ['soak:v', 'irrigate:v', 0.7, 0]
  , ['waist:n', 'midriff:n', 0.4, 0]
  , ['abdomen:n', 'midriff:n', 0.2, 0]
  , ['drown:v', 'drench:v', 0.4, 0]
  , ['drench:v', 'saturate:v', 0.9, 0]
  , ['sink:v', 'drown:v', 0.3, 0]
  , ['drown:v', 'suffocate:v', 0.4, 0]
  , ['mean:adj', 'rude:adj', 0.4, 0.8]
  , ['mean:adj', 'vicious:adj', 0.4, 0.8]
  , ['rude:adj', 'crude:adj', 0.9, 0]
  , ['rude:adj', 'nasty:adj', 0.9, 0]
  , ['crude:adj', 'vulgar:adj', 0.9, 0]
  , ['shine:v', 'glow:v', 0.4, 0]
  , ['shine:v', 'glare:v', 0.4, 0]
  , ['shine:v', 'radiate:v', 0.4, 0]
  , ['glow:v', 'radiate:v', 0.4, 0]
  , ['glow:v', 'sweat:v', 0.3, 0]
  , ['glow:v', 'blush:v', 0.3, 0]
  , ['suit:n', 'costume:n', 0.4, 0]
  , ['costume:n', 'garment:n', 0.4, 0]
  , ['dress:n', 'costume:n', 0.3, 0.8]
  , ['dress:n', 'uniform:n', 0.3, 0.8]
  , ['suit:n', 'dress:n', 0.3, 1]
  , ['suit:n', 'uniform:n', 0.4, 0.3]
  , ['prize:n', 'trophy:n', 0.4, 0]
  , ['trophy:n', 'award:n', 0.4, 0]
  , ['campaign:n', 'crusade:n', 0.3, 0]
  , ['nature:n', 'habit:n', 0.1, 0]
  , ['habit:n', 'custom:n', 0.4, 0.2]
  , ['custom:n', 'tradition:n', 0.4, 0.2]
  , ['culture:n', 'tradition:n', 0.4, 0.8]
  , ['tradition:n', 'ritual:n', 0.4, 0.2]
  , ['habit:n', 'ritual:n', 0.4, 0.2]
  , ['collect:v', 'gather:v', 0.5, 0]
  , ['collect:v', 'accumulate:v', 0.5, 0]
  , ['gather:v', 'accumulate:v', 0.3, 0]
  , ['collect:v', 'compile:v', 0.5, 0]
  , ['assemble:v', 'compile:v', 0.4, 0]
  , ['partner:n', 'spouse:n', 0.4, 0.2]
  , ['partner:n', 'ally:n', 0.4, 0]
  , ['forest:n', 'jungle:n', 0.5, 0.2]
  , ['atmosphere:n', 'mood:n', 0.3, 1]
  , ['mood:n', 'attitude:n', 0.5, 0.2]
  , ['so:adv', 'therefore, thus:adv', 0.7, 0.4]
  , ['resident:n', 'tenant:n', 0.5, 0]
  , ['resident:n', 'citizen:n', 0.5, 0.2]
  , ['guest:n', 'patron:n', 0.7, 0.2]
  , ['class:n', 'lesson:n', 0.3, 0.2]
  , ['lesson:n', 'lecture:n', 0.6, 0.2]
  , ['lecture:n', 'sermon:n', 0.6, 0]
  , ['equipment:n', 'apparatus:n', 0.4, 0], //['wary:adj', 'reluctant:adj', 0.6, 0],
  ['forgive:v', 'pardon:v', 0.9, 0.1]
  , ['excuse:v', 'pardon:v', 0.3, 0.2]
  , ['accept:v', 'pardon:v', 0.2, 0.8]
  , ['speed:n', 'velocity:n', 0.7, 0.2]
  , ['excellent, fantastic, wonderful, fabulous, terrific:adj', 'amazing:adj', 1, 0], //['standard:n', 'average:n', 0.5, 0.2],
  ['device:n', 'gadget:n', 0.9, 0.2]
  , ['ornament:n', 'accessory:n', 0.6, 0]
  , ['device:n', 'accessory:n', 0.3, 0.2]
  , ['restrict:v', 'confine:v', 0.3, 0]
  , ['ban, prohibit:v', 'restrict:v', 0.5, 0.2]
  , ['restrict:v', 'restrain:v', 0.4, 0.2]
  , ['restrict:v', 'inhibit:v', 0.3, 0.2]
  , ['restrain:v', 'inhibit:v', 0.3, 0.2]
  , ['suppress:v', 'inhibit:v', 0.4, 0.2]
  , ['discourage:v', 'inhibit:v', 0.4, 0.2]
  , ['weird, strange:adj', 'bizarre:adj', 0.9, 0.3]
  , ['rare:adj', 'weird, strange:adj', 0.3, 1]
  , ['rare:adj', 'funny:adj', 0.3, 1]
  , ['complicated:adj', 'intricate:adj', 0.5, 0]
  , ['sophisticated:adj', 'intricate:adj', 0.5, 0]
  , ['emotion:n', 'affection:n', 0.4, 0.2]
  , ['emotion:n', 'passion:n', 0.5, 0.2]
  , ['storm:n', 'hurricane:n', 0.4, 0.2]
  , ['storm:n', 'turmoil:n', 0.4, 0.2]
  , ['turmoil:n', 'chaos:n', 0.4, 0.2]
  , ['turmoil:n', 'riot:n', 0.2, 1]
  , ['ceiling:n', 'canopy:n', 0.3, 0]
  , ['ceiling:n', 'maximum:n', 0.3, 0]
  , ['canopy:n', 'umbrella:n', 0.3, 0]
  , ['shade:n', 'umbrella:n', 0.3, 0]
  , ['screen:n', 'umbrella:n', 0.3, 0]
  , ['distance:n', 'length:n', 0.4, 0.3]
  , ['distance:n', 'range:n', 0.4, 0.3]
  , ['distance:n', 'span:n', 0.4, 0.3]
  , ['distance:n', 'gap:n', 0.2, 0.8]
  , ['range:n', 'extent:n', 0.9, 0]
  , ['scope:n', 'extent:n', 0.9, 0]
  , ['stupid:adj', 'silly:adj', 0.7, 0.8]
  , ['silly:adj', 'absurd:adj', 0.5, 0]
  , ['crazy:adj', 'absurd:adj', 0.3, 1]
  , ['crazy, insane:adj', 'silly:adj', 0.3, 1]
  , ['very, really:adv', 'quite:adv', 0.3, 0]
  , ['somewhat, fairly, pretty:adv', 'quite:adv', 0.7, 0]
  , ['quite:adv', 'rather:adv', 1, 0]
  , ['employ:v', 'enlist:v', 0.2, 0]
  , ['employ:v', 'hire, rent:v', 0.2, 0]
  , ['employ:v', 'recruit:v', 0.6, 0]
  , ['volunteer:v', 'enlist:v', 0.5, 0]
  , ['almost:adv', 'barely:adv', 0.3, 0]
  , ['honor:n', 'integrity:n', 0.4, 0.4]
  , ['honor:n', 'dignity:n', 0.4, 0.7]
  , ['honor:n', 'pride:n', 0.4, 0.3]
  , ['warn:v', 'alert:v', 0.5, 0.5]
  , ['notify:v', 'alert:v', 0.3, 0]
  , ['describe:v', 'define:v', 0.4, 0]
  , ['illustrate:v', 'describe:v', 0.3, 1]
  , ['illustrate:v', 'manifest:v', 0.4, 0]
  , ['abandon:v', 'desert:v', 0.7, 0.2]
  , ['abandon:v', 'evacuate:v', 0.3, 0]
  , ['annoy:v', 'bother:v', 0.7, 0.3]
  , ['harass:v', 'bother:v', 0.4, 0.4]
  , ['nag:v', 'bother:v', 0.3, 1]
  , ['upset:v', 'bother:v', 0.3, 0.2]
  , ['annoy:v', 'agitate:v', 1, 0]
  , ['upset:v', 'disturb:v', 0.3, 0.2]
  , ['upset:v', 'disrupt:v', 0.3, 0.2]
  , ['disturb:v', 'disrupt:v', 0.3, 0.2]
  , ['disrupt:v', 'interrupt:v', 0.4, 0]
  , ['carry out:v', 'implement:v', 1, 0]
  , ['command:v', 'dominate:v', 0.4, 0]
  , ['command:v', 'supervise:v', 0.6, 0.5]
  , ['explain:v', 'interpret:v', 0.3, 0]
  , ['interpret:v', 'translate:v', 0.9, 0]
  , ['clinic:n', 'hospital:n', 0.5, 0]
  , ['perfect:adj', 'pure:adj', 0.3, 0.3]
  , ['pure:adj', 'authentic:adj', 0.4, 0.3]
  , ['pure:adj', 'clean:adj', 0.3, 1]
  , ['clean:adj', 'neat:adj', 0.3, 0.3]
  , ['clean:adj', 'clear:adj', 0.3, 0.4]
  , ['neat:adj', 'elegant:adj', 0.2, 0]
  , ['hang:v', 'dangle:v', 0.4, 0]
  , ['swing:v', 'dangle:v', 0.3, 0]
  , ['swing:v', 'hang:v', 0.2, 0.8]
  , ['hover:v', 'hang:v', 0.3, 0.8]
  , ['hang:v', 'drape:v', 0.3, 0.8]
  , ['swing:v', 'sway:v', 0.4, 0]
  , ['sway:v', 'rock (move back and forth):v', 0.4, 0]
  , ['swing:v', 'rock (move back and forth):v', 0.4, 0]
  , ['swing:v', 'wave (salutation):v', 0.4, 0]
  , ['circulate:v', 'publish:v', 0.4, 0.7]
  , ['tent:n', 'canvas:n', 0.4, 0]
  , ['tent:n', 'camp:n', 0.2, 0]
  , ['officer, official:n', 'deputy:n', 0.5, 0]
  , ['pole:n', 'beam:n', 0.4, 0]
  , ['pole:n', 'stake:n', 0.2, 0]
  , ['spike:n', 'stake:n', 0.3, 0]
  , ['suspect:v', 'assume, presume:v', 0.4, 0]
  , ['put (place):v', 'set:v', 0.2, 0.5]
  , ['put (place):v', 'situate:v', 0.2, 0]
  , ['put (place):v', 'install:v', 0.2, 0.5]
  , ['put (place):v', 'assign:v', 0.2, 0.5]
  , ['put (place):v', 'invest:v', 0.2, 0.5]
  , ['put (place):v', 'embed:v', 0.2, 0.5]
  , ['put (place):v', 'lay:v', 0.2, 0.5]
  , ['put (place):v', 'rest:v', 0.2, 1]
  , ['assign:v', 'elect:v', 0.3, 0]
  , ['assign:v', 'allocate:v', 0.4, 0]
  , ['advance:v', 'promote:v', 0.3, 0]
  , ['advance:v', 'propel:v', 0.3, 0.8]
  , ['boost:v', 'promote:v', 0.3, 0]
  , ['promote:v', 'advocate:v', 0.5, 0]
  , ['favor:v', 'advocate:v', 0.3, 0]
  , ['encourage:v', 'advocate:v', 0.3, 0]
  , ['justify:v', 'advocate:v', 0.3, 0]
  , ['last:v', 'survive:v', 0.4, 0.5]
  , ['sustain:v', 'survive:v', 0.4, 0.5]
  , ['survive:v', 'withstand:v', 0.4, 0]
  , ['create:v', 'invent:v', 0.4, 0.7]
  , ['create:v', 'found:v', 0.4, 0.7]
  , ['found:v', 'establish:v', 0.9, 0.8]
  , ['cooperate:v', 'collaborate:v', 0.6, 0]
  , ['gasp:v', 'pant:v', 0.5, 0]
  , ['pollute:v', 'infect:v', 0.3, 0.4]
  , ['infect:v', 'contaminate:v', 0.4, 0.2]
  , ['pollute:v', 'contaminate:v', 0.4, 0.2]
  , ['pollute:v', 'stain:v', 0.3, 1]
  , ['story, fable:n', 'literature:n', 0.5, 0.4]
  , ['literature:n', 'prose:n', 0.5, 0.4]
  , ['text:n', 'prose:n', 0.5, 0.4]
  , ['story:n', 'prose:n', 0.5, 0.4]
  , ['swallow:v', 'absorb:v', 0.2, 0]
  , ['take:v', 'absorb:v', 0.2, 0]
  , ['convert:v', 'adapt:v', 0.4, 0.3]
  , ['convert:v', 'translate:v', 0.4, 0.3]
  , ['send:v', 'transfer:v', 0.5, 0]
  , ['give:v', 'transfer:v', 0.4, 0]
  , ['deliver:v', 'transfer:v', 0.3, 0]
  , ['transfer:v', 'convert:v', 0.2, 0.3], //['translate:v', 'render:v', 0.3, 0.3],
  ['recommend, advise:v', 'suggest:v', 0.4, 0]
  , ['recommend, advise:v', 'endorse:v', 0.4, 0]
  , ['deny:v', 'reject:v', 0.4, 0]
  , ['deny:v', 'refuse:v', 0.4, 0]
  , ['deny:v', 'contradict:v', 0.4, 0]
  , ['reject:v', 'dismiss:v', 0.4, 0]
  , ['reject:v', 'refuse:v', 0.4, 0]
  , ['dismiss:v', 'expel:v', 0.4, 0]
  , ['release:v', 'dismiss:v', 0.4, 0]
  , ['foreign:adj', 'external:adj', 0.4, 0.3]
  , ['defy:v', 'violate:v', 0.5, 0]
  , ['encounter:v', 'confront:v', 0.5, 0.3]
  , ['defy:v', 'confront:v', 0.3, 0]
  , ['face:v', 'fight:v', 0.2, 1]
  , ['face:v', 'confront:v', 0.4, 0.3]
  , ['face:v', 'meet:v', 0.2, 1]
  , ['dot:n', 'spot:n', 0.5, 0]
  , ['location:n', 'position (location):n', 0.3, 0]
  , ['point:n', 'position (location):n', 0.3, 0]
  , ['point:n', 'time:n', 0.2, 1]
  , ['position (location):n', 'spot:n', 0.3, 0]
  , ['show:v', 'present:v', 0.5, 0.2]
  , ['show:v', 'express:v', 0.3, 0.2]
  , ['present:v', 'introduce:v', 0.5, 0.2]
  , ['minor:adj', 'mere:adj', 0.6, 0]
  , ['minor:adj', 'petty:adj', 0.6, 0]
  , ['flee:v', 'retreat:v', 0.5, 0.2]
  , ['afraid:adj', 'nervous, anxious:adj', 0.4, 1], //['efficient:adj', 'effective:adj', 0.9, 0.5],
  ['market:n', 'mall:n', 0.5, 0]
  , ['mature:adj', 'sophisticated:adj', 0.4, 0]
  , ['mature:adj', 'ripe:adj', 0.4, 0]
  , ['keen:adj', 'eager:adj', 0.4, 0]
  , ['short:adj', 'brief:adj', 0.4, 0]
  , ['temporary:adj', 'brief:adj', 0.4, 0]
  , ['cabin:n', 'hut:n', 0.5, 0.4]
  , ['hut:n', 'shack:n', 0.5, 0.4]
  , ['shack:n', 'shed:n', 0.3, 0.4]
  , ['shelter:n', 'shack:n', 0.3, 0.4]
  , ['camp:n', 'shack:n', 0.3, 0.3]
  , ['cabin:n', 'inn, lodge:n', 0.5, 0.4]
  , ['building:n', 'architecture:n', 0.3, 0.4]
  , ['morning:n', 'dawn:n', 0.4, 0]
  , ['dawn:n', 'birth:n', 0.4, 0.8]
  , ['fit:v', 'belong:v', 0.3, 0]
  , ['fit:v', 'apply:v', 0.4, 0]
  , ['fit:v', 'conform:v', 0.2, 0.9]
  , ['skill:n', 'talent:n', 0.7, 0.3]
  , ['skill:n', 'craft:n', 0.2, 0]
  , ['symbol:n', 'motif:n', 0.3, 0]
  , ['pattern:n', 'motif:n', 0.3, 0]
  , ['badge:n', 'symbol:n', 0.3, 0]
  , ['stamp:n', 'badge:n', 0.3, 0], //['urgent:adj', 'instant:adj', 0.2, 1],
  ['separate:v', 'isolate:v', 0.9, 0]
  , ['segregate:v', 'discriminate:v', 0.3, 0]
  , ['distinguish:v', 'discriminate:v', 0.3, 0]
  , ['isolate:v', 'segregate:v', 0.9, 0]
  , ['crumble:v', 'dissolve:v', 0.3, 0]
  , ['melt:v', 'dissolve:v', 0.7, 0]
  , ['dissolve:v', 'fade:v', 0.3, 1]
  , ['disappear:v', 'evaporate:v', 0.3, 0]
  , ['fade:v', 'evaporate:v', 0.3, 0]
  , ['dissolve:v', 'evaporate:v', 0.3, 0.8]
  , ['melt:v', 'fade:v', 0.2, 1]
  , ['let, allow:v', 'tolerate:v', 0.2, 0]
  , ['tolerate:v', 'sustain:v', 0.3, 0]
  , ['tolerate:v', 'indulge:v', 0.3, 0]
  , ['give:v', 'contribute:v', 0.5, 0]
  , ['give:v', 'supply:v', 0.5, 0]
  , ['give:v', 'permit:v', 0.1, 0]
  , ['contribute:v', 'donate:v', 0.3, 0]
  , ['devote:v', 'donate:v', 0.3, 0]
  , ['core:n', 'nucleus:n', 0.6, 0]
  , ['crisis:n', 'catastrophe:n', 0.6, 0]
  , ['disaster:n', 'catastrophe:n', 0.9, 0]
  , ['accident:n', 'catastrophe:n', 0.3, 0]
  , ['disaster:n', 'accident:n', 0.3, 0]
  , ['tragedy:n', 'disaster:n', 0.3, 0]
  , ['hazard:n', 'accident:n', 0.3, 1]
  , ['fluke:n', 'accident:n', 0.3, 1]
  , ['crack:n', 'accident:n', 0.2, 1]
  , ['garbage:n', 'junk:n', 0.4, 0]
  , ['debris:n', 'junk:n', 0.3, 0]
  , ['visit:v', 'attend, show up:v', 0.4, 0]
  , ['install:v', 'set up:v', 0.4, 0]
  , ['install:v', 'establish:v', 0.4, 0]
  , ['organize:v', 'set up:v', 0.4, 0]
  , ['set up:v', 'prepare:v', 0.4, 0]
  , ['enforce:v', 'compel:v', 0.4, 0]
  , ['order:v', 'impose:v', 0.4, 0]
  , ['order:v', 'demand:v', 0.4, 0]
  , ['demand:v', 'impose:v', 0.4, 0]
  , ['enforce:v', 'impose:v', 0.4, 0]
  , ['inflict:v', 'impose:v', 0.4, 0]
  , ['force:v', 'put (cause to be):v', 0.4, 0]
  , ['oblige:v', 'put (cause to be):v', 0.4, 0]
  , ['compel:v', 'oblige:v', 0.4, 0]
  , ['sneak:v', 'creep:v', 0.7, 0]
  , ['crawl:v', 'creep:v', 0.3, 0]
  , ['logic:n', 'rationale:n', 0.5, 0]
  , ['purpose:n', 'reason:n', 0.4, 0]
  , ['reason:n', 'rationale:n', 0.5, 0]
  , ['harass:v', 'intimidate:v', 0.4, 0.3]
  , ['barrel:n', 'cylinder:n', 0.3, 0]
  , ['barrel:n', 'drum:n', 0.3, 0]
  , ['supply:v', 'arm:v', 0.4, 0]
  , ['severe:adj', 'intense:adj', 0.4, 0.3], //['severe:adj', 'strict:adj', 0.2, 0.3],
  ['civilian:n', 'citizen:n', 0.5, 0.3]
  , ['prefer:v', 'favor:v', 0.4, 0.3]
  , ['chop:v', 'slash:v', 0.4, 0.3]
  , ['retrieve:v', 'bring back:v', 1, 0]
  , ['fetch:v', 'earn:v', 0.3, 1]
  , ['retrieve:v', 'fetch:v', 1, 0]
  , ['retrieve:v', 'recover:v', 0.4, 0.2]
  , ['repair:v', 'recover:v', 0.4, 0.2]
  , ['strange:adj', 'peculiar:adj', 1, 0]
  , ['sample:n', 'specimen:n', 0.4, 0]
  , ['think:v', 'imagine:v', 0.2, 0.4]
  , ['think:v', 'assume:v', 0.2, 0.4]
  , ['imagine:v', 'devise:v', 0.7, 0.4]
  , ['imagine:v', 'assume:v', 0.4, 0.6]
  , ['devise:v', 'come up with:v', 1, 0]
  , ['bargain:n', 'discount:n', 0.4, 0]
  , ['suppress:v', 'restrain:v', 0.3, 0]
  , ['suppress:v', 'squash:v', 0.5, 0.5]
  , ['extinguish:v', 'squash:v', 0.3, 0.2]
  , ['withdraw:v', 'extract:v', 0.7, 0.4]
  , ['extract:v', 'pluck:v', 0.7, 0]
  , ['extract:v', 'reap:v', 0.3, 0]
  , ['strip:v', 'reap:v', 0.2, 0.7]
  , ['reap:v', 'plow:v', 0.8, 0]
  , ['produce (manufacture):v', 'reap:v', 0.3, 0]
  , ['abandon:v', 'betray:v', 0.3, 0]
  , ['deceive:v', 'betray:v', 0.3, 0.7]
  , ['steady:adj', 'consistent:adj', 0.4, 0]
  , ['compassion:n', 'empathy:n', 0.7, 0.3]
  , ['compassion:n', 'sympathy:n', 0.7, 0]
  , ['sympathy:n', 'empathy:n', 0.5, 0]
  , ['soul:n', 'empathy:n', 0.2, 0.9]
  , ['real:adj', 'authentic:adj', 0.7, 0]
  , ['gallery (art):n', 'exhibit:n', 0.3, 0.3]
  , ['gallery (art):n', 'museum:n', 0.3, 0.3]
  , ['different:adj', 'unique:adj', 0.2, 0]
  , ['distinct:adj', 'unique:adj', 0.4, 0]
  , ['locker:n', 'trunk (large box):n', 0.3, 0.3]
  , ['harvest:n', 'autumn:n', 0.2, 0]
  , ['tourist:n', 'passenger:n', 0.2, 1]
  , ['induce:v', 'evoke:v', 0.3, 0.2]
  , ['evoke:v', 'arouse:v', 0.3, 0.2]
  , ['evoke:v', 'provoke:v', 0.5, 0.2], //['comment:n', 'commentary:n', 0.2, 0],
  ['hover:v', 'linger:v', 0.5, 1]
  , ['skeleton:n', 'fossil:n', 0.2, 0]
  , ['map:n', 'chart:n', 0.2, 0]
  , ['chart:n', 'graph:n', 0.4, 0]
  , ['graph:n', 'diagram:n', 0.4, 0]
  , ['chart:n', 'diagram:n', 0.4, 0], //['design:n', 'diagram:n', 0.3, 0.3],
  ['map:n', 'layout:n', 0.2, 0]
  , ['layout:n', 'geography:n', 0.4, 0]
  , ['layout:n', 'diagram:n', 0.3, 0.3]
  , ['draft:n', 'diagram:n', 0.2, 1]
  , ['splash:v', 'spray:v', 0.5, 0]
  , ['drip:v', 'splash:v', 0.3, 0.2]
  , ['dull:adj', 'dim:adj', 0.7, 0]
  , ['tribe:n', 'clan:n', 0.3, 0]
  , ['appetite:n', 'lust:n', 0.3, 0.3]
  , ['angel:n', 'saint:n', 0.3, 0]
  , ['robe:n', 'gown:n', 0.9, 0]
  , ['dress:n', 'gown:n', 0.2, 0]
  , ['width:n', 'diameter:n', 0.3, 0]
  , ['amateur:n', 'novice:n', 0.4, 0.4]
  , ['novice:n', 'rookie:n', 0.9, 0]
  , ['growl:v', 'roar:v', 0.4, 0.4]
  , ['bark:v', 'roar:v', 0.4, 0.4]
  , ['growl:v', 'grunt:v', 0.4, 0.4]
  , ['grunt:v', 'groan:v', 0.2, 0.2]
  , ['attract:v', 'lure:v', 0.4, 0.4]
  , ['seduce:v', 'lure:v', 0.4, 0.4]
  , ['attract:v', 'seduce:v', 0.4, 0.4]
  , ['attract:v', 'charm:v', 0.4, 0.4]
  , ['charm:v', 'seduce:v', 0.4, 0.2]
  , ['amuse:v', 'charm:v', 0.4, 0.2]
  , ['persuade:v', 'seduce:v', 0.4, 0.2]
  , ['seduce:v', 'tempt:v', 0.4, 0.2]
  , ['attract:v', 'fascinate:v', 0.4, 0.2]
  , ['erupt:v', 'vomit:v', 0.2, 1]
  , ['dare:v', 'tempt:v', 0.2, 0]
  , ['lure:v', 'tempt:v', 0.3, 0]
  , ['ribbon:n', 'tape:n', 0.5, 0]
  , ['go down:v', 'descend:v', 1, 0]
  , ['fall:v', 'sink:v', 0.2, 0]
  , ['go down:v', 'sink:v', 0.2, 0]
  , ['sink:v', 'descend:v', 0.5, 0]
  , ['grill:n', 'barbecue:n', 0.7, 0]
  , ['lamb:n', 'virgin:n', 0.3, 1]
  , ['lamb:n', 'victim:n', 0.2, 1]
  , ['whisper:v', 'murmur:v', 0.2, 0]
  , ['whisper:v', 'mumble:v', 0.2, 0.5]
  , ['murmur:v', 'hum:v', 0.3, 0]
  , ['murmur:v', 'mumble:v', 0.4, 0]
  , ['pyramid:n', 'cone:n', 0.3, 0]
  , ['pyramid:n', 'pile:n', 0.3, 0.8]
  , ['flat:adj', 'smooth:adj', 0.3, 0.3]
  , ['crush:v', 'cram:v', 0.5, 0]
  , ['cram:v', 'jam:v', 0.6, 0]
  , ['cram:v', 'squeeze:v', 0.5, 1]
  , ['cram:v', 'squash:v', 0.3, 0]
  , ['seat:n', 'stool (seat):n', 0.3, 0.8]
  , ['chair:n', 'stool (seat):n', 0.3, 0.8]
  , ['duck:v', 'crouch:v', 0.5, 0]
  , ['squat:v', 'crouch:v', 0.5, 0]
  , ['squat:v', 'perch:v', 0.5, 0]
  , ['struggle:v', 'wrestle:v', 0.3, 0]
  , ['tangle:v', 'wrestle:v', 0.3, 1]
  , ['wreck:v', 'ruin:v', 0.7, 0]
  , ['wreck:v', 'devastate:v', 0.5, 0]
  , ['ruin:v', 'spoil:v', 0.3, 0.3]
  , ['applaud:v', 'cheer:v', 0.4, 0.5]
  , ['applaud:v', 'hail:v', 0.4, 0]
  , ['applaud:v', 'praise:v', 0.3, 0]
  , ['clap:v', 'pat:v', 0.3, 0.5]
  , ['clap:v', 'cheer:v', 0.3, 0.5]
  , ['slap:v', 'clap:v', 0.3, 0.5]
  , ['round:adj', 'blunt:adj', 0.3, 0.2]
  , ['dull:adj', 'blunt:adj', 0.3, 0.2]
  , ['cork:n', 'plug:n', 0.3, 0]
  , ['spank:v', 'smack:v', 0.6, 0]
  , ['spank:v', 'slap:v', 0.4, 0]
  , ['smack:v', 'snap:v', 0.4, 1]
  , ['dusk:n', 'twilight:n', 0.4, 0]
  , ['doll:n', 'puppet:n', 0.3, 0]
  , ['pub:n', 'bar (pub):n', 0.9, 0]
  , ['pub:n', 'inn:n', 0.3, 0]
  , ['sleep:v', 'nap:v', 0.4, 0]
  , ['rest:v', 'nap:v', 0.5, 0]
  , ['pipe:n', 'vent:n', 0.3, 0]
  , ['paw:n', 'hoof:n', 0.5, 0]
  , ['moisture:n', 'dew:n', 0.4, 0]
  , ['lever:n', 'pedal:n', 0.7, 0]
  , ['lever:n', 'knob:n', 0.3, 0]
  , ['lever:n', 'trigger:n', 0.4, 0]
  , ['choke:v', 'gag:v', 0.4, 0]
  , ['choke:v', 'suffocate:v', 0.2, 0]
  , ['squeeze:v', 'choke:v', 0.2, 1]
  , ['creep:v', 'lurk:v', 0.6, 0]
  , ['prowl:v', 'lurk:v', 0.4, 0]
  , ['hide:v', 'lurk:v', 0.5, 0]
  , ['sneak:v', 'lurk:v', 0.4, 0]
  , ['crouch:v', 'lurk:v', 0.2, 0]
  , ['bubble:n', 'foam:n', 0.4, 0.3]
  , ['choir:n', 'chorus:n', 0.2, 0]
  , ['melody:n', 'chorus:n', 0.4, 0]
  , ['harmony:n', 'melody:n', 0.4, 1]
  , ['theme:n', 'chorus:n', 0.2, 0], //['progress:n', 'breakthrough:n', 0.6, 0],
  ['remains:n', 'remnant:n', 1, 0]
  , ['orchestra:n', 'choir:n', 0.3, 0]
  , ['convict:v', 'sentence:v', 0.5, 0]
  , ['sentence:v', 'punish:v', 0.4, 1]
  , ['fraud:n', 'hoax:n', 0.5, 0]
  , ['phrase:n', 'slogan:n', 0.4, 0]
  , ['structure:n', 'system:n', 0.6, 0.6], //['structure:n', 'network:n', 0.6, 0.6],
  //['grid:n', 'network:n', 0.7, 0],
  ['equal:adj', 'equivalent:adj', 1, 0]
  , ['food:n', 'nutrition:n', 0.4, 0.3]
  , ['food:n', 'cuisine:n', 0.9, 0]
  , ['meal:n', 'cuisine:n', 0.2, 0]
  , ['diary:n', 'memoir:n', 0.5, 0]
  , ['file:n', 'folder:n', 0.5, 0]
  , ['file:n', 'record (written account):n', 0.4, 0.4]
  , ['file:n', 'data:n', 0.2, 0.7]
  , ['pocket:n', 'folder:n', 0.2, 0]
  , ['folder:n', 'wallet:n', 0.2, 0]
  , ['add:v', 'inject:v', 0.4, 0]
  , ['inject:v', 'implant:v', 0.5, 0]
  , ['implant:v', 'embed:v', 0.5, 0]
  , ['bury:v', 'embed:v', 0.5, 0]
  , ['banner:n', 'advertisement:n', 1, 0]
  , ['cigarette:n', 'cigar:n', 0.5, 0]
  , ['haven:n', 'resort:n', 0.2, 0]
  , ['resort:n', 'sanctuary:n', 0.3, 0]
  , ['spa (mineral spring):n', 'resort:n', 0.3, 0]
  , ['sanctuary:n', 'haven:n', 0.5, 0]
  , ['whiskey:n', 'liquor:n', 0.2, 1], //['agency:n', 'ministry:n', 0.4, 0],
  ['ministry:n', 'embassy:n', 0.3, 0.5]
  , ['garden:n', 'orchard:n', 0.3, 0]
  , ['orchard:n', 'plantation:n', 1, 0]
  , ['able:adj', 'capable:adj', 1, 0]
  , ['able:adj', 'competent:adj', 0.7, 0]
  , ['able:adj', 'ready:adj', 0.3, 0.8]
  , ['offer:v', 'bid:v', 0.5, 0]
  , ['event (occurrence):n', 'incident:n', 0.4, 0.3]
  , ['paragraph:n', 'clause:n', 0.5, 0]
  , ['paragraph:n', 'verse:n', 0.4, 0]
  , ['verse:n', 'poem:n', 0.2, 0]
  , ['stamp:n', 'label:n', 0.2, 1]
  , ['label:n', 'tag:n', 0.4, 0.3]
  , ['label:n', 'logo:n', 0.4, 0.3], //['employee:n', 'clerk:n', 0.5, 0], // too derived
  ['clerk:n', 'accountant:n', 0.5, 0]
  , ['static:adj', 'passive:adj', 0.5, 0]
  , ['fry:v', 'simmer:v', 1, 0]
  , ['boil:v', 'simmer:v', 0.4, 1]
  , ['burn:v', 'ignite:v', 0.5, 0]
  , ['burn:v', 'light:v', 0.5, 0.7]
  , ['ignite:v', 'light:v', 0.5, 0.4]
  , ['light:v', 'illuminate:v', 0.7, 0.2]
  , ['light:v', 'shine:v', 0.4, 0.2]
  , ['burn:v', 'simmer:v', 0.4, 1]
  , ['elevate:v', 'promote:v', 0.2, 0]
  , ['inhabit:v', 'populate:v', 0.4, 0]
  , ['author:n', 'writer:n', 1, 0]
  , ['multiply:v', 'reproduce:v', 0.4, 0.4]
  , ['multiply:v', 'expand:v', 0.4, 0.3]
  , ['dry:adj', 'crisp:adj', 0.4, 0]
  , ['rich:adj', 'abundant:adj', 0.3, 0]
  , ['abundant:adj', 'lush:adj', 0.9, 0.3]
  , ['balance:v', 'poise:v', 0.6, 0], //['standard:n', 'model:n', 0.3, 0.8],
  //['model:n', 'prototype:n', 0.4, 0],
  ['example:n', 'prototype:n', 0.4, 0]
  , ['friend:n', 'acquaintance:n', 0.3, 0.2]
  , ['emphasize:v', 'exaggerate:v', 0.4, 0.2]
  , ['height:n', 'altitude:n', 1, 0]
  , ['stand:v', 'situate:v', 0.3, 0]
  , ['parlor:n', 'salon:n', 1, 0]
  , ['hate:v', 'resent:v', 0.5, 0]
  , ['race (competition):n', 'marathon:n', 0.5, 0]
  , ['diary:n', 'calendar:n', 0.3, 0.6]
  , ['calendar:n', 'schedule:n', 0.4, 0.3]
  , ['schedule:n', 'roster:n', 0.7, 0.4]
  , ['information:n', 'data:n', 0.7, 0]
  , ['reject:v', 'vomit:v', 0.4, 1]
  , ['space (empty area):n', 'room (space):n', 1, 0.3]
  , ['room (space):n', 'capacity:n', 0.4, 0]
  , ['cannon:n', 'artillery:n', 0.3, 0.3]
  , ['road:n', 'pavement:n', 0.4, 0]
  , ['concrete:n', 'pavement:n', 0.5, 0]
  , ['delay:v', 'postpone:v', 0.5, 0.2]
  , ['postpone:v', 'stall:v', 0.3, 0.2]
  , ['anger:n', 'fury:n', 0.5, 0.4]
  , ['launch:v', 'embark:v', 0.4, 0.2]
  , ['wrinkle:n', 'crease:n', 1, 0]
  , ['wrinkle:n', 'kink (sharp twist):n', 0.4, 0]
  , ['extreme:adj', 'intense:adj', 0.7, 0]
  , ['extreme:adj', 'severe:adj', 0.5, 0]
  , ['extreme:adj', 'radical:adj', 0.7, 0]
  , ['sudden:adj', 'swift:adj', 0.5, 0]
  , ['discourage:v', 'deter:v', 1, 0]
  , ['inhibit:v', 'deter:v', 0.3, 0]
  , ['avert:v', 'deter:v', 0.2, 0]
  , ['prevent:v', 'deter:v', 0.3, 0]
  , ['prevent:v', 'block:v', 0.4, 0]
  , ['block:v', 'deter:v', 0.3, 0]
  , ['bud:n', 'embryo:n', 0.3, 0]
  , ['bud:n', 'fetus:n', 0.3, 0]
  , ['fetus:n', 'embryo:n', 0.9, 0.3]
  , ['nucleus:n', 'embryo:n', 0.3, 0.2]
  , ['bud:n', 'spark:n', 0.2, 0]
  , ['surpass:v', 'transcend:v', 0.4, 0.3]
  , ['therapy:n', 'remedy:n', 0.3, 0], //['therapy:n', 'cure:n', 0.2, 0], // no cure:n
  ['election:n', 'referendum:n', 0.6, 0]
  , ['cool (fashionable):adj', 'casual:adj', 0.3, 0.2]
  , ['imminent:adj', 'pending:adj', 1, 0]
  , ['stone:n', 'granite:n', 0.2, 0]
  , ['decay:v', 'deteriorate:v', 0.3, 0]
  , ['crumble:v', 'deteriorate:v', 0.3, 0]
  , ['deteriorate:v', 'erode:v', 0.3, 0]
  , ['drink:n', 'beverage:n', 0.9, 0]
  , ['composite:n', 'hybrid:n', 0.6, 0]
  , ['relate:v', 'affiliate:v', 0.3, 0]
  , ['relate:v', 'correlate:v', 0.9, 0]
  , ['relate:v', 'connect:v', 0.4, 0]
  , ['relate:v', 'assign:v', 0.3, 0]
  , ['relate:v', 'refer:v', 0.3, 0]
  , ['subtle:adj', 'elusive:adj', 0.3, 0]
  , ['ambiguous:adj', 'elusive:adj', 0.3, 0]
  , ['ambiguous:adj', 'obscure:adj', 0.3, 0.5]
  , ['vague:adj', 'obscure:adj', 0.3, 0.5]
  , ['cow:n', 'buffalo:n', 0.4, 0]
  , ['comply:v', 'conform:v', 1, 0], //['ear:n', 'attention:n', 0.3, 0],
  ['case:n', 'event (occurrence):n', 0.5, 0]
  , ['case:n', 'situation (circumstances, context):n', 0.5, 0]
  , ['case:n', 'incident:n', 0.5, 0]
  , ['physical:adj', 'tangible:adj', 0.9, 0]
  , ['comfort:n', 'pleasure:n', 0.3, 0]
  , ['religion:n', 'cult:n', 0.3, 0]
  , ['start:n', 'beginning:n', 1, 0]
  , ['per:prep', 'for each:prep', 1, 0]
  , ['movement:n', 'motion:n', 1, 0]
  , ['race (ethnicity):n', 'ethnicity:n', 1, 0]
  , ['mafia:n', 'mob:n', 1, 0]
  , ['sewer:n', 'drain:n', 0.3, 0]
  , ['drain:n', 'ditch:n', 0.3, 0]
  , ['drain:v', 'bleed:v', 0.2, 0]
  , ['drain:v', 'divert:v', 0.3, 0.8]
  , ['confident:adj', 'certain:adj', 0.4, 0.4]
  , ['certain:adj', 'sure:adj', 1, 0]
  , ['live:v', 'exist:v', 0.3, 0.2]
  , ['survive:v', 'exist:v', 0.2, 0.7]
  , ['stand:v', 'exist:v', 0.2, 0.3]
  , ['stress:v', 'emphasize:v', 0.4, 0.3]
  , ['joint:n', 'elbow:n', 0.2, 0.1]
  , ['disease:n', 'plague:n', 0.3, 0.3]
  , ['disease:n', 'virus:n', 0.3, 0.3]
  , ['disease:n', 'flu:n', 0.3, 0.5]
  , ['disease:n', 'infection:n', 0.2, 0.5]
  , ['disease:n', 'defect:n', 0.2, 0.8]
  , ['holy:adj', 'sacred:adj', 1, 0]
  , ['expert:n', 'specialist:n', 1, 0]
  , ['loose:adj', 'easy:adj', 0.3, 0.9]
  , ['boulder:n', 'stone:n', 0.4, 0.9]
  , ['boulder:n', 'slab:n', 0.3, 0.7]
  , ['slab:n', 'portion:n', 0.3, 1]
  , ['boulder:n', 'lump:n', 0.3, 0.5]
  , ['sharp:adj', 'bitter:adj', 0.2, 0.5]
  , ['sincere:adj', 'earnest:adj', 1, 0]
  , ['smooth:adj', 'sleek:adj', 1, 0]
  , ['consistent:adj', 'compatible:adj', 0.6, 0]
  , ['hill:n', 'dune:n', 0.4, 0]
  , ['correct:adj', 'appropriate:adj', 0.2, 0]
  , ['appropriate:adj', 'convenient:adj', 0.2, 0]
  , ['accessory:n', 'fixture:n', 0.5, 0]
  , ['device:n', 'fixture:n', 0.5, 0]
  , ['equipment:n', 'fixture:n', 0.5, 0]
  , ['appliance:n', 'fixture:n', 0.5, 0]
  , ['construct:v', 'mold:v', 0.3, 0.2]
  , ['forge:v', 'mold:v', 0.3, 0.2]
  , ['product (item made):n', 'merchandise:n', 0.5, 0], //['material:n', 'merchandise:n', 0.3, 0],
  ['skeptic:n', 'cynic:n', 0.4, 0]
  , ['pass:v', 'excel:v', 0.3, 0]
  , ['surpass:v', 'excel:v', 0.4, 0]
  , ['transcend:v', 'excel:v', 0.3, 0]
  , ['beat:v', 'excel:v', 0.2, 0]
  , ['catch:v', 'intercept:v', 0.4, 0.2]
  , ['prevent:v', 'intercept:v', 0.4, 0.2]
  , ['intercept:v', 'arrest:v', 0.3, 1]
  , ['sheet:n', 'membrane:n', 0.3, 0]
  , ['face:n', 'surface:n', 0.5, 1], //['surface:n', 'veneer:n', 0.4, 0],
  ['surface:n', 'skin:n', 0.4, 0.9]
  , ['respect:n', 'awe:n', 0.3, 0.4]
  , ['spy:n', 'scout:n', 0.3, 0]
  , ['rape:v', 'assault:v', 0.6, 0.7]
  , ['violate:v', 'assault:v', 0.4, 0.7]
  , ['beat (strike):v', 'assault:v', 0.5, 0.3]
  , ['ethic:n', 'integrity:n', 0.5, 0]
  , ['embarrass:v', 'tease:v', 0.3, 0.2]
  , ['freeze:v', 'paralyze:v', 0.3, 0.9]
  , ['halt:v', 'paralyze:v', 0.3, 0.9]
  , ['stun:v', 'paralyze:v', 0.4, 0.9]
  , ['provoke:v', 'exacerbate:v', 0.4, 0.3]
  , ['increase:v', 'exacerbate:v', 0.5, 0.3]
  , ['annoy:v', 'exacerbate:v', 0.4, 0.3]
  , ['fat:adj', 'obese:adj', 0.4, 0]
  , ['fat:adj', 'broad:adj', 0.2, 0]
  , ['heavy:adj', 'obese:adj', 0.4, 0]
  , ['urine:n', 'excrement:n', 0.2, 1]
  , ['dirt:n', 'pornography:n', 0.2, 1]
  , ['cloth:n', 'napkin:n', 0.4, 0]
  , ['towel:n', 'napkin:n', 0.4, 0]
  , ['linen:n', 'napkin:n', 0.2, 0]
  , ['grass:n', 'hay:n', 0.3, 1]
  , ['girlfriend:n', 'mistress:n', 0.4, 0.8]
  , ['gather:v', 'huddle:v', 0.5, 0.3]
  , ['cuddle:v', 'huddle:v', 0.2, 0.3]
  , ['hug:v', 'huddle:v', 0.3, 0.3]
  , ['pattern:n', 'constellation:n', 0.3, 0]
  , ['shape:n', 'constellation:n', 0.3, 0]
  , ['excrement:n', 'sewage:n', 0.3, 1]
  , ['garbage:n', 'sewage:n', 0.3, 0.8]
  , ['tray:n', 'platter:n', 0.7, 0]
  , ['plate:n', 'platter:n', 0.3, 0]
  , ['dish:n', 'platter:n', 0.3, 0]
  , ['license:n', 'patent:n', 0.3, 0]
  , ['privilege:n', 'patent:n', 0.4, 0]
  , ['say:v', 'express:v', 0.4, 0.2]
  , ['indicate:v', 'express:v', 0.4, 0.2]
  , ['pronounce:v', 'express:v', 0.4, 0.2]
  , ['fury:n', 'frenzy:n', 0.3, 0]
  , ['turmoil:n', 'frenzy:n', 0.3, 0]
  , ['spasm:n', 'seizure:n', 0.4, 0]
  , ['frenzy:n', 'seizure:n', 0.3, 0]
  , ['den:n', 'apartment:n', 0.2, 0.7]
  , ['insurgent:n', 'rebel:n', 0.4, 0.6]
  , ['frame:n', 'torso:n', 0.2, 0]
  , ['torso:n', 'trunk (of tree):n', 0.3, 0]
  , ['disguise:v', 'deceive:v', 0.3, 0.2]
  , ['disguise:v', 'feign:v', 0.3, 0.2]
  , ['leaf:n', 'foliage:n', 0.6, 0]
  , ['cathedral:n', 'temple:n', 0.3, 0.3]
  , ['pest:n', 'bully:n', 0.2, 0.7]
  , ['stock:n', 'arsenal:n', 0.3, 0]
  , ['store:n', 'arsenal:n', 0.2, 0]
  , ['deny:v', 'veto:v', 0.6, 0.3]
  , ['refuse:v', 'veto:v', 0.6, 0.3]
  , ['reject:v', 'veto:v', 0.6, 0.3]
  , ['prohibit:v', 'veto:v', 0.6, 0.3]
  , ['dry:adj', 'sober:adj', 0.3, 0]
  , ['calm:adj', 'sober:adj', 0.2, 0]
  , ['serious:adj', 'sober:adj', 0.4, 0.8]
  , ['damage:v', 'impair:v', 1, 0]
  , ['harm:v', 'impair:v', 0.3, 0], //['reduce:v', 'impair:v', 0.4, 0],
  ['coal:n', 'charcoal:n', 0.4, 0]
  , ['charcoal:n', 'fuel:n', 0.3, 0.9]
  , ['lush:adj', 'fertile:adj', 0.2, 0]
  , ['capsule:n', 'tablet:n', 0.7, 0]
  , ['save:v', 'liberate:v', 0.5, 0]
  , ['discourse:n', 'rhetoric:n', 0.9, 0]
  , ['support:v', 'reinforce:v', 0.7, 0]
  , ['reinforce:v', 'supplement:v', 0.6, 0]
  , ['wizard:n', 'prophet:n', 0.3, 0.3], //['pragmatic:adj', 'efficient:adj', 0.7, 0],
  ['pragmatic:adj', 'sensible:adj', 0.2, 1]
  , ['pragmatic:adj', 'logical:adj', 0.2, 1]
  , ['bite:v', 'graze (feed on):v', 0.2, 0]
  , ['ridicule:v', 'humiliate:v', 0.6, 0]
  , ['embarrass:v', 'humiliate:v', 0.6, 0.8]
  , ['mimic:v', 'mock:v', 0.7, 0.3]
  , ['ridicule:v', 'mock:v', 0.7, 0]
  , ['climb:v', 'escalate:v', 0.7, 0]
  , ['raise:v', 'escalate:v', 0.3, 0]
  , ['rise:v', 'escalate:v', 0.3, 0]
  , ['escalate:v', 'increase:v', 0.3, 1]
  , ['escalate:v', 'grow:v', 0.3, 1]
  , ['cavity:n', 'armpit:n', 0.2, 0]
  , ['massacre:n', 'genocide:n', 0.5, 0]
  , ['cane:n', 'whip:n', 0.2, 1]
  , ['proud:adj', 'arrogant:adj', 0.2, 0.8]
  , ['main:adj', 'premier:adj', 0.3, 0]
  , ['chicken:n', 'poultry:n', 0.7, 0]
  , ['govern:v', 'reign:v', 0.4, 0]
  , ['rule:v', 'reign:v', 0.5, 0]
  , ['reign:v', 'command:v', 0.3, 0.3]
  , ['reign:v', 'dominate:v', 0.4, 0.9]
  , ['guard:v', 'patrol:v', 0.4, 0.3]
  , ['cruise:v', 'patrol:v', 0.2, 1]
  , ['history:n', 'genetics:n', 0.1, 1]
  , ['line:n', 'genetics:n', 0.1, 1]
  , ['fountain:n', 'oasis:n', 0.3, 0]
  , ['table:n', 'plateau:n', 0.3, 0.3]
  , ['urge:n', 'lust:n', 0.3, 0.5]
  , ['wave (ocean):n', 'surf:n', 0.4, 0]
  , ['deceive:v', 'bluff:v', 0.2, 0.2]
  , ['trick:v', 'bluff:v', 0.4, 0]
  , ['feign:v', 'bluff:v', 0.4, 0]
  , ['cupboard:n', 'wardrobe:n', 0.2, 0]
  , ['trumpet:n', 'alarm:n', 0.1, 0.3]
  , ['gift:n', 'souvenir:n', 0.5, 0]
  , ['memento:n', 'souvenir:n', 0.5, 0]
  , ['trophy:n', 'souvenir:n', 0.2, 0]
  , ['shield:n', 'apron:n', 0.3, 0]
  , ['virus:n', 'venom:n', 0.2, 0]
  , ['pure:adj', 'wholesome:adj', 0.5, 0]
  , ['pure:adj', 'moral:adj', 0.3, 0.5]
  , ['innocent:adj', 'wholesome:adj', 0.5, 0]
  , ['fur:n', 'mane:n', 0.6, 0]
  , ['hair (of head):n', 'mane:n', 0.4, 0]
  , ['fringe:n', 'mane:n', 0.4, 0]
  , ['beard:n', 'mane:n', 0.3, 0]
  , ['horizon:n', 'panorama:n', 0.4, 0]
  , ['view:n', 'panorama:n', 0.4, 0]
  , ['panorama:n', 'orbit:n', 0.1, 0]
  , ['crystal:n', 'prism:n', 0.4, 0]
  , ['gem:n', 'prism:n', 0.4, 0]
  , ['stir:v', 'stoke:v', 0.6, 0], //['feed:v', 'stoke:v', 0.1, 0],
  ['axis:n', 'axle:n', 0.7, 0]
  , ['rod:n', 'axle:n', 0.7, 0]
  , ['vase:n', 'urn:n', 0.5, 0]
  , ['pluck:v', 'cull:v', 0.3, 0]
  , ['cull:v', 'extract:v', 0.3, 0], //['exclusive:adj', 'elite:adj', 0.5, 0],
  ['noble:adj', 'elite:adj', 0.5, 0]
  , ['stall:n', 'kiosk:n', 1, 0]
  , ['soak:v', 'marinate:v', 0.3, 0]
  , ['pattern:n', 'stereotype:n', 0.2, 0]
  , ['custom:n', 'stereotype:n', 0.1, 0]
  , ['cover:v', 'muffle:v', 0.4, 0]
  , ['suppress:v', 'muffle:v', 0.4, 0]
  , ['drown:v', 'muffle:v', 0.2, 0.4]
  , ['wrap:v', 'muffle:v', 0.2, 0.4]
  , ['prejudice:n', 'bias:n', 0.6, 0]
  , ['habit:n', 'bias:n', 0.3, 0]
  , ['gap:n', 'cleavage:n', 0.3, 0]
  , ['chasm:n', 'cleavage:n', 0.3, 0]
  , ['nest:n', 'treasure:n', 0.2, 1]
  , ['weight:n', 'leverage:n', 0.1, 0]
  , ['power:n', 'leverage:n', 0.2, 0]
  , ['quality:n', 'essence:n', 0.2, 0]
  , ['soul:n', 'essence:n', 0.2, 0]
  , ['spirit:n', 'essence:n', 0.2, 0]
  , ['nature:n', 'essence:n', 0.2, 0]
  , ['internal:adj', 'interior:n', 0.6, 0]
  , ['central:adj', 'interior:n', 0.2, 0]
  , ['normal:adj', 'medium:adj', 0.3, 0.4]
  , ['common:adj', 'medium:adj', 0.3, 0.7]
  , ['furniture:n', 'wardrobe:n', 0.1, 0], //['beauty:n', 'grace:n', 0.2, 0],
  //['style:n', 'grace:n', 0.1, 0],
  ['foster:v', 'adopt:v', 0.5, 0]
  , ['free:adj', 'wild:adj', 0.3, 1]
  , ['natural:adj', 'wild:adj', 0.3, 1]
  , ['vicious:adj', 'wild:adj', 0.4, 1]
  , ['record (written account):n', 'contract:n', 0.4, 0.4]
  , ['evidence:n', 'contract:n', 0.3, 1]
  , ['paper:n', 'contract:n', 0.3, 0.6]
  , ['contract:n', 'pact:n', 0.5, 0]
  , ['agree:v', 'compromise:v', 0.3, 0]
  , ['midday:n', 'lunch:n', 0.2, 0]
  , ['animal:n', 'wildlife:n', 0.2, 0]
  , ['orbit:n', 'year:n', 0.2, 1], //zx
];

let choiceDerivs = [ // what to derive from, new word, new part of speech
  [
    ['this:det', 'this', 'pron']
  ]
  , [
    ['that:det', 'that', 'pron']
  ]
  , [
    ['what:det', 'what', 'pron']
  ]
  , [
    ['which:det', 'which', 'pron']
  ]
  , [
    ['clean:adj', 'clean', 'v']
  ]
  , [
    ['work_(be_employed):v', 'work', 'n', 5]
    , ['work_(be_employed)-ACT.OF', 'work', 'n']
  ]
  , [
    ['change:v', 'change', 'n', 5]
    , ['change:v-ACT.OF', 'change', 'n']
  ]
  , [
    ['use:v', 'use', 'n', 5]
    , ['use:v-ACT.OF', 'use', 'n']
  ]
  , [
    ['care:v', 'care', 'n', 5]
    , ['care:v-ACT.OF', 'care', 'n']
  ]
  , [
    ['report:v', 'report', 'n', 5]
    , ['report:v-PRODUCT.OF', 'report', 'n']
  ]
  , [
    ['need_(require):v', 'need', 'n', 5]
    , ['need_(require):v-ACT.OF', 'need', 'n']
  ]
  , [
    ['support:v', 'support', 'n', 5]
    , ['support:v-ACT.OF', 'support', 'n']
  ]
  , [
    ['plan:n', 'plan', 'v', 5]
    , ['plan:n-NOUN.TO.VERB', 'plan', 'v']
  ]
  , [
    ['answer:v', 'answer', 'n', 3]
    , ['give answer:n', 'answer', 'v']
  ]
  , [
    ['nation-RELATING.TO', 'national', 'adj']
  ]
  , [
    ['culture-RELATING.TO', 'cultural', 'adj']
  ]
  , [
    ['study:v-ACT.OF', 'study', 'n']
    , ['study:v', 'study', 'n']
  ]
  , [
    ['fashion-HAVING.QUALITY.OF', 'fashionable', 'adj']
  ]
  , [
    ['civilization-HAVING.QUALITY.OF', 'civilized', 'adj']
    , ['civilized-QUALITY.OF.BEING', 'civilization', 'n']
  ]
  , [
    ['law-DOER', 'lawyer', 'n']
  ]
  , [
    ['work_(be_employed)-DOER', 'worker, employee', 'n'], 0.8
  ]
  , [
    ['cook:v-DOER', 'chef, cook', 'n']
  ]
  , [
    ['write-DOER', 'author, writer', 'n']
  ]
  , [
    ['friend-HAVING.QUALITY.OF', 'friendly', 'adj']
  ]
  , [
    ['think-ACT.OF', 'thought', 'n', 5]
    , ['thought-NOUN.TO.VERB', 'think', 'v']
  ]
  , [
    ['know_(a_fact)-PRODUCT.OF', 'knowledge', 'n', 4]
    , ['knowledge-NOUN.TO.VERB', 'know (a fact)', 'v']
  ]
  , [
    ['violent-QUALITY.OF.BEING', 'violence', 'n']
    , ['violence-HAVING.QUALITY.OF', 'violent', 'adj']
  ]
  , [
    ['school-DOER', 'teacher', 'n']
    , ['teach-DOER', 'teacher', 'n', 5]
  ]
  , [
    ['young-QUALITY.OF.BEING', 'youth', 'n']
    , ['youth-HAVING.QUALITY.OF', 'young', 'adj']
  ]
  , [
    ['sick-QUALITY.OF.BEING', 'sickness', 'n', 4]
    , ['sickness-HAVING.QUALITY.OF', 'sick', 'adj']
  ]
  , [
    ['beautiful-QUALITY.OF.BEING', 'beauty', 'n']
    , ['beauty-HAVING.QUALITY.OF', 'beautiful', 'adj']
  ]
  , [
    ['govern-ACT.OF', 'government', 'n', 4]
    , ['government-NOUN.TO.VERB', 'govern', 'v']
  ]
  , [
    ['believe-ACT.OF', 'belief', 'n', 3]
    , ['belief-NOUN.TO.VERB', 'believe', 'v']
  ]
  , [
    ['long-QUALITY.OF.BEING', 'length', 'n', 3]
    , ['length-HAVING.QUALITY.OF', 'long', 'adj']
  ]
  , [
    ['serve-ACT.OF', 'service', 'n', 3]
    , ['service-NOUN.TO.VERB', 'serve', 'v']
  ]
  , [
    ['power-HAVING.QUALITY.OF', 'powerful', 'adj', 2]
    , ['powerful-QUALITY.OF.BEING', 'power', 'n']
  ]
  , [
    ['love:v-DOER', 'lover', 'n']
  ]
  , [
    ['meet-PRODUCT.OF', 'meeting', 'n', 3]
    , ['meeting-NOUN.TO.VERB', 'meet', 'v']
  ]
  , [
    ['city-HAVING.QUALITY.OF', 'urban', 'adj']
  ]
  , [
    ['health-HAVING.QUALITY.OF', 'healthy', 'adj', 2]
    , ['healthy-QUALITY.OF.BEING', 'health', 'n']
  ]
  , [
    ['hunt:v-DOER', 'hunter', 'n']
  ]
  , [
    ['war-DOER', 'warrior', 'n']
  ]
  , [
    ['open:v-PRODUCT.OF', 'opening', 'n', 4]
    , ['opening-NOUN.TO.VERB', 'open', 'v']
  ]
  , [
    ['remember-ACT.OF', 'memory', 'n', 3]
    , ['memory-NOUN.TO.VERB', 'remember', 'v']
  ]
  , [
    ['serve-DOER', 'slave', 'n'], 0.2
  ]
  , [
    ['die-ACT.OF', 'death', 'n', 6]
    , ['death-NOUN.TO.VERB', 'die', 'v']
  ]
  , [
    ['die-RESULT.OF.DOING', 'dead', 'adj']
  ]
  , [
    ['kill-DOER', 'killer', 'n']
  ]
  , [
    ['sell-DOER', 'vendor', 'n']
  ]
  , [
    ['sell', 'sale', 'n', 3]
    , ['sell-ACT.OF', 'sale', 'n']
  ], //[['develop-ACT.OF', 'development', 'n']],
  [
    ['economy-RELATING.TO', 'economic', 'adj']
  ]
  , [
    ['strong-QUALITY.OF.BEING', 'strength', 'n', 4]
    , ['strength-HAVING.QUALITY.OF', 'strong', 'adj']
  ]
  , [
    ['possible-QUALITY.OF.BEING', 'possibility', 'n', 4]
    , ['possibility-HAVING.QUALITY.OF', 'possible', 'adj']
  ]
  , [
    ['decide-ACT.OF', 'decision', 'n', 5]
    , ['decision-NOUN.TO.VERB', 'decide', 'v']
  ]
  , [
    ['drive-DOER', 'driver', 'n']
  ]
  , [
    ['true-QUALITY.OF.BEING', 'truth', 'n', 3]
    , ['truth-HAVING.QUALITY.OF', 'true', 'adj']
  ]
  , [
    ['different-QUALITY.OF.BEING', 'difference', 'n', 6]
    , ['difference-HAVING.QUALITY.OF', 'different', 'adj']
  ]
  , [
    ['agree-ACT.OF', 'agreement', 'n', 5]
    , ['agreement-NOUN.TO.VERB', 'agree', 'v']
  ]
  , [
    ['center-HAVING.QUALITY.OF', 'central', 'adj']
  ]
  , [
    ['luck-HAVING.QUALITY.OF', 'lucky', 'adj']
    , ['lucky-QUALITY.OF.BEING', 'luck', 'n']
  ], //[['industry-RELATING.TO', 'industrial', 'adj']],
  [
    ['cost:v-ACT.OF', 'cost', 'n']
    , ['cost:v', 'cost', 'n', 5]
  ]
  , [
    ['cost:n-HAVING.QUALITY.OF', 'expensive', 'adj']
  ]
  , [
    ['describe-ACT.OF', 'description', 'n', 7]
    , ['description-NOUN.TO.VERB', 'describe', 'v']
  ]
  , [
    ['suggest-ACT.OF', 'suggestion', 'n', 3]
    , ['suggestion-NOUN.TO.VERB', 'suggest', 'v']
  ]
  , [
    ['person-RELATING.TO', 'personal', 'adj']
  ]
  , [
    ['simple-ADVERB', 'simply', 'adv']
  ]
  , [
    ['choose-ACT.OF', 'choice', 'n', 6]
    , ['choice-NOUN.TO.VERB', 'choose', 'v']
  ]
  , [
    ['defend-ACT.OF', 'defense', 'n', 4]
    , ['defense-NOUN.TO.VERB', 'defend', 'v']
  ]
  , [
    ['behave-ACT.OF', 'behavior', 'n']
  ]
  , [
    ['quick-ADVERB', 'quickly', 'adv']
  ]
  , [
    ['foreign-DOER', 'foreigner', 'n']
    , ['foreign-QUALITY.OF.BEING', 'foreigner', 'n']
  ]
  , [
    ['recent-ADVERB', 'recently', 'adv']
  ]
  , [
    ['usual-ADVERB', 'usually', 'adv']
  ]
  , [
    ['move-ACT.OF', 'movement, motion', 'n']
  ]
  , [
    ['art-DOER', 'artist', 'n']
  ]
  , [
    ['respond-ACT.OF', 'response', 'n', 3]
    , ['response-NOUN.TO.VERB', 'respond', 'v']
  ]
  , [
    ['treat-ACT.OF', 'treatment', 'n']
  ]
  , [
    ['protect-ACT.OF', 'protection', 'n', 3]
    , ['protection-NOUN.TO.VERB', 'protect', 'v']
  ]
  , [
    ['sad-QUALITY.OF.BEING', 'sadness', 'n', 3]
    , ['sadness-HAVING.QUALITY.OF', 'sad', 'adj']
  ]
  , [
    ['happy-QUALITY.OF.BEING', 'happiness', 'n', 5]
    , ['happiness-HAVING.QUALITY.OF', 'happy', 'adj']
  ]
  , [
    ['prepare-ACT.OF', 'preparation', 'n', 4]
    , ['preparation-NOUN.TO.VERB', 'prepare', 'v']
  ]
  , [
    ['success-HAVING.QUALITY.OF', 'successful', 'adj', 2]
    , ['successful-QUALITY.OF.BEING', 'success', 'n']
  ]
  , [
    ['argue-ACT.OF', 'argument', 'n', 3]
    , ['argument-NOUN.TO.VERB', 'argue', 'v']
  ]
  , [
    ['able-QUALITY.OF.BEING', 'ability', 'n']
  ]
  , [
    ['recognize-ACT.OF', 'recognition', 'n', 3]
    , ['recognition-NOUN.TO.VERB', 'recognize', 'v']
  ]
  , [
    ['grow-ACT.OF', 'growth', 'n', 3]
    , ['growth-NOUN.TO.VERB', 'grow', 'v']
  ]
  , [
    ['lose-ACT.OF', 'loss', 'n', 3]
    , ['loss-NOUN.TO.VERB', 'lose', 'v']
  ]
  , [
    ['religion-RELATING.TO', 'religious', 'adj']
  ], //[['train-ACT.OF', 'training', 'n']],
  [
    ['elect-ACT.OF', 'election', 'n', 3]
    , ['election-NOUN.TO.VERB', 'elect', 'v']
  ]
  , [
    ['fail-ACT.OF', 'failure', 'n', 4]
    , ['failure-NOUN.TO.VERB', 'fail', 'v']
  ]
  , [
    ['analyze-ACT.OF', 'analysis', 'n', 3]
    , ['analysis-NOUN.TO.VERB', 'analyze', 'v']
  ]
  , [
    ['arrive-ACT.OF', 'arrival', 'n', 7]
    , ['arrival-NOUN.TO.VERB', 'arrive', 'v']
  ]
  , [
    ['skill-HAVING.QUALITY.OF', 'skilled', 'adj', 6]
    , ['skilled-QUALITY.OF.BEING', 'skill', 'n']
  ]
  , [
    ['steal-DOER', 'thief', 'n'], 0.3
  ]
  , [
    ['clear-ADVERB', 'clearly', 'adv']
  ]
  , [
    ['discuss-ACT.OF', 'discussion', 'n']
  ]
  , [
    ['hot-QUALITY.OF.BEING', 'heat', 'n', 6]
    , ['heat-HAVING.QUALITY.OF', 'hot', 'adj']
  ]
  , [
    ['prove-ACT.OF', 'proof', 'n', 3]
    , ['proof-NOUN.TO.VERB', 'prove', 'v']
  ]
  , [
    ['law-RELATING.TO', 'legal', 'adj']
  ]
  , [
    ['finish-RESULT.OF.DOING', 'final', 'adj', 3]
    , ['final-TO.MAKE', 'finish', 'v']
  ]
  , [
    ['farm-DOER', 'farmer', 'n']
  ]
  , [
    ['science-DOER', 'scientist', 'n']
  ]
  , [
    ['visit:v-DOER', 'visitor', 'n']
  ]
  , [
    ['visit:v', 'visit', 'n']
  ]
  , [
    ['spell-ACT.OF', 'spelling', 'n']
  ]
  , [
    ['pain-HAVING.QUALITY.OF', 'painful', 'adj']
  ]
  , [
    ['wide-QUALITY.OF.BEING', 'width', 'n', 3]
    , ['width-HAVING.QUALITY.OF', 'wide', 'adj']
  ]
  , [
    ['high-QUALITY.OF.BEING', 'height', 'n', 3]
    , ['height-HAVING.QUALITY.OF', 'high', 'adj']
  ]
  , [
    ['fly-ACT.OF', 'flight', 'n']
  ]
  , [
    ['politics-DOER', 'politician', 'n']
  ]
  , [
    ['politics-RELATING.TO', 'political', 'adj']
  ]
  , [
    ['weight-NOUN.TO.VERB', 'weigh', 'v']
  ]
  , [
    ['weight-HAVING.QUALITY.OF', 'heavy', 'adj'], 0.4
  ]
  , [
    ['sudden-ADVERB', 'suddenly', 'adv']
  ]
  , [
    ['discover-ACT.OF', 'discovery', 'n', 4]
    , ['discovery-TO.MAKE', 'discover', 'v']
  ]
  , [
    ['distance-HAVING.QUALITY.OF', 'distant', 'adj', 3]
    , ['distant-QUALITY.OF.BEING', 'distance', 'n']
  ]
  , [
    ['gold-HAVING.QUALITY.OF', 'golden', 'adj']
  ]
  , [
    ['divide-ACT.OF', 'division', 'n']
  ]
  , [
    ['poem-DOER', 'poet', 'n']
  ]
  , [
    ['dirt-HAVING.QUALITY.OF', 'dirty', 'adj']
  ]
  , [
    ['break:v-RESULT.OF.DOING', 'broken', 'adj']
  ]
  , [
    ['company-NOUN.TO.VERB', 'accompany', 'v', 3]
    , ['accompany-ACT.OF', 'company', 'n']
  ]
  , [
    ['dark-QUALITY.OF.BEING', 'darkness', 'n']
  ]
  , [
    ['nature-RELATING.TO', 'natural', 'adj']
  ]
  , [
    ['destroy-ACT.OF', 'destruction', 'n']
  ]
  , [
    ['angry-QUALITY.OF.BEING', 'anger', 'n', 6]
    , ['anger-HAVING.QUALITY.OF', 'angry', 'adj']
  ]
  , [
    ['sex:n-HAVING.QUALITY.OF', 'sexual', 'adj']
  ]
  , [
    ['same sexual', 'homosexual', 'n'], 0.7
  ]
  , [
    ['run-DOER', 'runner', 'n']
  ]
  , [
    ['flower-DOER', 'florist', 'n']
  ]
  , [
    ['greed-HAVING.QUALITY.OF', 'greedy', 'adj']
  ]
  , [
    ['settle-ACT.OF', 'settlement (village)', 'n']
  ]
  , [
    ['sail:v-DOER', 'sailor', 'n']
    , ['boat-DOER', 'sailor', 'n']
  ]
  , [
    ['feel_(perceive,_sense)-ACT.OF', 'feeling', 'n', 3]
    , ['feel_(perceive,_sense)', 'feeling', 'n']
  ]
  , [
    ['dance:v-DOER', 'dancer', 'n']
  ]
  , [
    ['song-NOUN.TO.VERB', 'sing', 'v', 6]
    , ['sing-ACT.OF', 'song', 'n']
  ]
  , [
    ['song-DOER', 'singer', 'n']
    , ['song-DOER', 'singer', 'n']
  ]
  , [
    ['fertile-QUALITY.OF.BEING', 'fertility', 'n']
  ]
  , [
    ['subtle-QUALITY.OF.BEING', 'subtlety', 'n']
  ]
  , [
    ['irony-HAVING.QUALITY.OF', 'ironic', 'adj']
    , ['ironic-QUALITY.OF.BEING', 'irony', 'n']
  ]
  , [
    ['mouth-RELATING.TO', 'oral', 'adj']
  ]
  , [
    ['anxious-QUALITY.OF.BEING', 'anxiety', 'n']
    , ['anxiety-HAVING.QUALITY.OF', 'anxious', 'adj']
  ]
  , [
    ['mind_(thinking_faculty) science', 'psychology', 'n'], 1
  ]
  , [
    ['psychology-DOER', 'psychologist', 'n']
  ]
  , [
    ['excite-ACT.OF', 'excitement', 'n', 3]
    , ['excitement-NOUN.TO.VERB', 'excite', 'v']
  ]
  , [
    ['risk-HAVING.QUALITY.OF', 'risky', 'adj', 4]
    , ['risky-QUALITY.OF.BEING', 'risk', 'n']
  ]
  , [
    ['danger-HAVING.QUALITY.OF', 'dangerous', 'adj', 4]
    , ['dangerous-QUALITY.OF.BEING', 'danger', 'n']
  ]
  , [
    ['paint:v-ACT.OF', 'painting', 'n']
  ]
  , [
    ['paint-DOER', 'painter', 'n']
  ]
  , [
    ['garden-DOER', 'gardener', 'n']
  ]
  , [
    ['coffee-PLACE.OF', 'cafe', 'n']
    , ['coffee shop', 'cafe', 'n']
  ]
  , [
    ['weapon-PLACE.OF', 'armory', 'n']
  ]
  , [
    ['horse-PLACE.OF', 'stable', 'n'], 0.5
  ]
  , [
    ['lock:n-DOER', 'locksmith', 'n']
  ]
  , [
    ['drug-PLACE.OF', 'chemist', 'n']
  ]
  , [
    ['vegetable-PLACE.OF', 'grocer', 'n']
  ]
  , [
    ['technology-RELATING.TO', 'technological', 'adj']
  ]
  , [
    ['evidence-HAVING.QUALITY.OF', 'evident', 'adj', 8]
    , ['evident-QUALITY.OF.BEING', 'evidence', 'n']
  ]
  , [
    ['produce_(manufacture)-PRODUCT.OF', 'product (item made)', 'n', 6]
    , ['product_(item_made)-NOUN.TO.VERB', 'produce', 'v']
  ]
  , [
    ['offend-TENDING.TO', 'offensive', 'adj']
  ]
  , [
    ['grave-PLACE.OF', 'graveyard', 'n']
  ]
  , [
    ['hear-ACT.OF', 'hearing', 'n']
  ]
  , [
    ['wine-PLACE.OF', 'winery', 'n']
  ]
  , [
    ['dog-DIM', 'puppy', 'n']
  ]
  , [
    ['cat-DIM', 'kitten', 'n']
  ]
  , [
    ['house-AUG', 'mansion', 'n']
  ]
  , [
    ['prison-DOER', 'prisoner', 'n']
  ]
  , [
    ['silent-QUALITY.OF.BEING', 'silence', 'n', 2]
    , ['silence-HAVING.QUALITY.OF', 'silent', 'adj']
  ]
  , [
    ['freeze-PRODUCT.OF', 'frost', 'n']
  ]
  , [
    ['perfect-QUALITY.OF.BEING', 'perfection', 'n', 5]
    , ['perfection-HAVING.QUALITY.OF', 'perfect', 'adj']
  ]
  , [
    ['care-TENDING.TO', 'careful', 'adj']
  ]
  , [
    ['please:v-ACT.OF', 'pleasure', 'n']
  ]
  , [
    ['mess-HAVING.QUALITY.OF', 'messy', 'adj']
  ]
  , [
    ['blood-HAVING.QUALITY.OF', 'bloody', 'adj']
  ]
  , [
    ['reflect-ACT.OF', 'reflection', 'n']
  ]
  , [
    ['confident-QUALITY.OF.BEING', 'confidence', 'n']
    , ['confidence-HAVING.QUALITY.OF', 'confident', 'adj']
  ]
  , [
    ['crime-DOER', 'criminal', 'n']
  ]
  , [
    ['medicine-RELATING.TO', 'medical', 'adj']
  ]
  , [
    ['pride-HAVING.QUALITY.OF', 'proud', 'adj']
    , ['proud-QUALITY.OF.BEING', 'pride', 'n']
  ]
  , [
    ['assassin-NOUN.TO.VERB', 'assassinate', 'v']
    , ['assassinate-DOER', 'assassin', 'n']
  ]
  , [
    ['certain-ADVERB', 'certainly', 'adv']
  ]
  , [
    ['exact-ADVERB', 'exactly', 'adv']
  ]
  , [
    ['circulate-ACT.OF', 'circulation', 'n']
  ], //[['complete-ACT.OF', 'completion', 'n', 7], ['completion-NOUN.TO.VERB', 'complete', 'v']],
  [
    ['exist-ACT.OF', 'existence', 'n']
  ], //[['convict-ACT.OF', 'conviction', 'n']],
  [
    ['conquer-ACT.OF', 'conquest', 'n', 4]
    , ['conquest-NOUN.TO.VERB', 'conquer', 'v']
  ], //[['edit-DOER', 'editor', 'n']],
  [
    ['trade:v-DOER', 'trader', 'n']
  ]
  , [
    ['trade:v', 'trade', 'n', 3]
    , ['trade:v-PRODUCT.OF', 'trade', 'n']
  ]
  , [
    ['advertise-ACT.OF', 'advertisement', 'n']
  ]
  , [
    ['book:n-PLACE.OF', 'library', 'n', 5]
    , ['book:n house', 'library', 'n'], 0.9
  ]
  , [
    ['make:v-PLACE.OF', 'factory', 'n'], 0.5
  ], //[['navy-RELATING.TO', 'naval', 'adj']],
  [
    ['manage-DOER', 'manager', 'n']
  ], //
  [
    ['final-ADVERB', 'finally', 'adv']
  ]
  , [
    ['intervene-ACT.OF', 'intervention', 'n']
  ]
  , [
    ['perceive-ACT.OF', 'perception', 'n', 5]
    , ['perception-NOUN.TO.VERB', 'perceive', 'v']
  ]
  , [
    ['repeat-ACT.OF', 'repetition', 'n', 5]
    , ['repetition-NOUN.TO.VERB', 'repeat', 'v']
  ]
  , [
    ['play-DOER', 'player', 'n']
  ]
  , [
    ['deal-DOER', 'dealer', 'n']
  ]
  , [
    ['reserve-ACT.OF', 'reservation', 'n', 5]
    , ['reservation-NOUN.TO.VERB', 'reserve', 'v']
  ]
  , [
    ['reverse-ACT.OF', 'reversal', 'n', 5]
    , ['reversal-NOUN.TO.VERB', 'reverse', 'v']
  ]
  , [
    ['academy-RELATING.TO', 'academic', 'adj']
    , ['school-RELATING.TO', 'academic', 'adj']
  ], //[['guard-DOER', 'guardian', 'n']],
  [
    ['infect-PRODUCT.OF', 'infection', 'n', 5]
    , ['infect-ACT.OF', 'infection', 'n']
  ]
  , [
    ['fury-HAVING.QUALITY.OF', 'furious', 'adj']
  ]
  , [
    ['appear-ACT.OF', 'appearance (act of appearing)', 'n']
  ]
  , [
    ['bore-TENDING.TO', 'boring', 'adj']
    , ['boring-TO.MAKE', 'bore', 'v']
  ]
  , [
    ['authority-NOUN.TO.VERB', 'authorize', 'v']
  ]
  , [
    ['reason-HAVING.QUALITY.OF', 'reasonable', 'adj']
  ]
  , [
    ['logic-HAVING.QUALITY.OF', 'logical', 'adj']
  ]
  , [
    ['stick:v-TENDING.TO', 'sticky', 'adj']
  ]
  , [
    ['employ-DOER', 'employer', 'n']
  ]
  , [
    ['previous-ADVERB', 'previously', 'adv']
  ], //[['keep_(save,_retain)-ACT.OF', 'retention', 'n']],
  [
    ['rule:v-DOER', 'ruler', 'n']
  ]
  , [
    ['special-ADVERB', 'especially', 'adv']
  ]
  , [
    ['enter-ACT.OF', 'entrance', 'n']
  ]
  , [
    ['organize-PRODUCT.OF', 'organization', 'n']
  ]
  , [
    ['shine-TENDING.TO', 'shiny', 'adj']
  ]
  , [
    ['tense:adj-QUALITY.OF.BEING', 'tension', 'n']
  ]
  , [
    ['suspect-RESULT.OF.DOING', 'suspicious', 'adj']
  ]
  , [
    ['win-ACT.OF', 'victory', 'n']
  ]
  , [
    ['probable-ADVERB', 'probably', 'adv']
  ]
  , [
    ['absent-QUALITY.OF.BEING', 'absence', 'n']
    , ['absence-HAVING.QUALITY.OF', 'absent', 'adj']
  ]
  , [
    ['tour:n-DOER', 'tourist', 'n']
    , ['visit:v-DOER', 'tourist', 'n']
    , ['journey-DOER', 'tourist', 'n']
    , ['travel:v-DOER', 'tourist', 'n']
  ]
  , [
    ['wet-QUALITY.OF.BEING', 'moisture', 'n']
    , ['moist-QUALITY.OF.BEING', 'moisture', 'n', 3]
  ]
  , [
    ['build-PRODUCT.OF', 'building', 'n'], 0.5
  ]
  , [
    ['emphasis-NOUN.TO.VERB', 'emphasize', 'v']
    , ['emphasize-ACT.OF', 'emphasis', 'n']
  ]
  , [
    ['guilt-HAVING.QUALITY.OF', 'guilty', 'adj']
    , ['blame-RESULT.OF.DOING', 'guilty', 'adj']
  ]
  , [
    ['allow-ACT.OF', 'permission', 'n']
    , ['permit-ACT.OF', 'permission', 'n']
  ]
  , [
    ['criticize-PRODUCT.OF', 'critique', 'n']
    , ['critique-NOUN.TO.VERB', 'criticize', 'v']
  ]
  , [
    ['criticize-TENDING.TO', 'critical', 'adj']
  ]
  , [
    ['secure-PRODUCT.OF', 'insurance', 'n']
    , ['insure-PRODUCT.OF', 'insurance', 'n']
  ]
  , [
    ['justice-DOER', 'judge', 'n']
    , ['judge-DOER', 'judge', 'n'], 0.6
  ]
  , [
    ['complex:adj-TO.MAKE', 'complicate', 'v']
    , ['complicate-RESULT.OF.DOING', 'complex', 'adj']
  ]
  , [
    ['act-ACT.OF', 'action (movement)', 'n']
    , ['perform-ACT.OF', 'action (movement)', 'n']
    , ['do-ACT.OF', 'action (movement)', 'n']
  ]
  , [
    ['external-QUALITY.OF.BEING', 'appearance (looks)', 'n'], /*['form', 'appearance (looks)', 'n'],*/
    ['outside look', 'appearance (looks)', 'n'], 0.6
  ]
  , [
    ['certify-PRODUCT.OF', 'certificate', 'n']
  ]
  , [
    ['special-QUALITY.OF.BEING', 'characteristic', 'n']
    , ['character-QUALITY.OF.BEING', 'characteristic', 'n'], 0.6
  ]
  , [
    ['push:v-ACT.OF', 'pressure', 'n']
    , ['press-ACT.OF', 'pressure', 'n'], 0.6
  ], //[['point-ACT.OF', 'reference', 'n'], ['refer-ACT.OF', 'reference', 'n'], ['link', 'reference', 'n']],
  [
    ['lead:v-DOER', 'leader', 'n']
    , ['boss', 'leader', 'n']
    , ['head', 'leader', 'n']
  ]
  , [
    ['late-ADVERB', 'recently', 'adv']
    , ['recent-ADVERB', 'recently', 'adv']
  ]
  , [
    ['supervise-DOER', 'supervisor', 'n']
    , ['watch-DOER', 'supervisor', 'n'], 0.1
  ]
  , [
    ['examine-ACT.OF', 'exam', 'n']
    , ['test:v-ACT.OF', 'exam', 'n']
  ]
  , [
    ['common group', 'society', 'n']
    , ['every person', 'society', 'n']
    , ['community', 'society', 'n']
    , ['social-QUALITY.OF.BEING', 'society', 'n']
    , ['common-QUALITY.OF.BEING', 'society', 'n'], 0.15
  ]
  , [
    ['sewage-PLACE.OF', 'sewer', 'n']
    , ['drain:v-PRODUCT.OF', 'sewer', 'n']
    , ['flow-PLACE.OF', 'sewer', 'n']
  ]
  , [
    ['interior-RELATING.TO', 'internal', 'adj']
    , ['internal-QUALITY.OF.BEING', 'interior', 'n']
  ]
  , [
    ['explain-ACT.OF', 'explanation', 'n', 5]
    , ['explanation-NOUN.TO.VERB', 'explain', 'v']
  ]
  , [
    ['tooth doctor', 'dentist', 'n']
    , ['tooth-DOER', 'dentist', 'n']
  ]
  , [
    ['year time', 'season (quarter of the year)', 'n'], 0.2
  ]
  , [
    ['trial house', 'court (of law)', 'n'], 0.2
  ]
  , [
    ['kitchen plant', 'vegetable', 'n'], 0.2
  ]
  , [
    ['foot finger', 'toe', 'n']
    , ['leg finger', 'toe', 'n'], 0.2
  ]
  , [
    ['hot season', 'summer', 'n'], 0.2
  ]
  , [
    ['street girl', 'prostitute', 'n']
    , ['leisure girl', 'prostitute', 'n'], 0.2
  ]
  , [
    ['sick house', 'hospital', 'n']
    , ['medicine house', 'hospital', 'n'], 0.2
  ]
  , [
    ['belief house', 'church', 'n'], 0.2
  ]
  , [
    ['next time', 'future', 'n'], 0.2
  ]
  , [
    ['calm time', 'peace', 'n'], 0.2
  ]
  , [
    ['precious stone', 'jewel', 'n'], 0.2
  ]
  , [
    ['sheep fur', 'wool', 'n'], 0.2
  ]
  , [
    ['eye lid', 'eyelid', 'n'], 0.8
  ]
  , [
    ['eye hair', 'eyelash', 'n'], 0.8
  ]
  , [
    ['eye apple', 'eyeball', 'n']
    , ['eye ball', 'eyeball', 'n'], 0.6
  ]
  , [
    ['nose hole', 'nostril', 'n']
    , ['nose window', 'nostril', 'n'], 0.2
  ]
  , [
    ['star son', 'planet', 'n'], 0.2
  ]
  , [
    ['thorn spoon', 'fork', 'n'], 0.2
  ]
  , [
    ['skin insect', 'louse', 'n'], 0.2
  ]
  , [
    ['black lung', 'liver', 'n'], 0.2
  ]
  , [
    ['hunt dog', 'wolf', 'n']
    , ['wild dog', 'wolf', 'n'], 0.3
  ]
  , [
    ['stone water', 'ice', 'n'], 0.2
  ]
  , [
    ['sweet salt', 'sugar', 'n'], 0.2
  ]
  , [
    ['cold season', 'winter', 'n'], 0.2
  ]
  , [
    ['small town', 'village', 'n'], 0.2
  ]
  , [
    ['tree arm', 'branch (tree part)', 'n'], 0.2
  ]
  , [
    ['sweet bread', 'cake', 'n'], 0.2
  ]
  , [
    ['key mother', 'lock', 'n'], 0.2
  ]
  , [
    ['earth apple', 'potato', 'n'], 0.2
  ]
  , [
    ['head finger', 'thumb', 'n']
    , ['fat finger', 'thumb', 'n']
    , ['mother finger', 'thumb', 'n']
    , ['father finger', 'thumb', 'n']
    , ['big finger', 'thumb', 'n', 3], 0.3
  ]
  , [
    ['fire:n cart', 'train', 'n'], 0.2
  ]
  , [
    ['metal thread', 'wire', 'n'], 0.2
  ]
  , [
    ['bottom laundry', 'underwear', 'n']
    , ['intimate white', 'underwear', 'n']
    , ['inside clothes', 'underwear', 'n']
    , ['small clothes', 'underwear', 'n'], 0.7
  ]
  , [
    ['giant fish', 'shark', 'n']
    , ['sea dog', 'shark', 'n']
    , ['war fish', 'shark', 'n'], 0.4
  ]
  , [
    ['food house', 'restaurant', 'n']
    , ['meal-PLACE.OF', 'restaurant', 'n']
    , ['dine-PLACE.OF', 'restaurant', 'n'], 0.3
  ]
  , [
    ['god house', 'tower', 'n']
    , ['sky house', 'tower', 'n'], 0.2
  ]
  , [
    ['word stock', 'vocabulary', 'n'], 0.2
  ]
  , [
    ['whore house', 'brothel', 'n'], 0.2
  ]
  , [
    ['earth tremble', 'earthquake', 'n']
    , ['earth shake', 'earthquake', 'n'], 0.5
  ]
  , [
    ['under prison', 'dungeon', 'n'], 0.2
  ]
  , [
    ['little rat', 'mouse', 'n'], 0.2
  ]
  , [
    ['festival day', 'holiday', 'n'], 0.2
  ]
  , [
    ['spirit shape', 'mood', 'n'], 0.2
  ]
  , [
    ['food list', 'menu', 'n'], 0.2
  ]
  , [
    ['middle class', 'middle class', 'n'], 0.8
  ]
  , [
    ['high class', 'upper class', 'n'], 0.8
  ]
  , [
    ['low class', 'lower class', 'n'], 0.8
  ]
  , [
    ['after noon', 'afternoon', 'n'], 0.5
  ]
  , [
    ['science house', 'university', 'n']
    , ['great school', 'university', 'n'], 0.2
  ]
  , [
    ['mother lake', 'ocean', 'n'], 0.2
  ]
  , [
    ['eye water', 'tear', 'n'], 0.2
  ]
  , [
    ['sea shore', 'beach', 'n'], 0.2
  ]
  , [
    ['big puddle', 'lake', 'n'], 0.2
  ]
  , [
    ['big love', 'romance', 'n'], 0.2
  ]
  , [
    ['half night', 'midnight', 'n']
    , ['middle night', 'midnight', 'n'], 0.8
  ]
  , [
    ['real quality', 'essence', 'n'], 0.2
  ]
  , [
    ['star science', 'astronomy', 'n'], 0.8
  ]
  , [
    ['king country', 'realm', 'n'], 0.2
  ]
  , [
    ['country_(nation) economy', 'agriculture', 'n'], 0.2
  ]
  , [
    ['pig meat', 'pork', 'n'], 0.2
  ]
  , [
    ['note book:n', 'notebook', 'n'], 1
  ]
  , [
    ['orange root', 'carrot', 'n'], 0.2
  ]
  , [
    ['country_(nation) member', 'citizen', 'n'], 0.2
  ]
  , [
    ['old thing', 'junk', 'n'], 0.2
  ]
  , [
    ['waist fruit', 'kidney', 'n'], 0.2
  ]
  , [
    ['earth science', 'geography', 'n'], 0.8
  ]
  , [
    ['tail star', 'comet', 'n'], 0.2
  ]
  , [
    ['dry time', 'drought', 'n'], 0.2
  ]
  , [
    ['king son', 'prince', 'n'], 0.2
  ]
  , [
    ['young sheep', 'lamb', 'n'], 0.2
  ]
  , [
    ['one saw', 'triangle', 'n']
    , ['three square', 'triangle', 'n']
    , ['mountain shape', 'triangle', 'n']
    , ['three angle', 'triangle', 'n'], 0.2
  ]
  , [
    ['hot herb', 'spice', 'n'], 0.2
  ]
  , [
    ['strong drink:n', 'liquor', 'n'], 0.2
  ]
  , [
    ['word sense', 'wit', 'n']
    , ['funny sense', 'wit', 'n'], 0.3
  ]
  , [
    ['witch bird', 'owl', 'n']
    , ['ghost bird', 'owl', 'n']
    , ['night bird', 'owl', 'n'], 0.3
  ]
  , [
    ['plant fence', 'hedge', 'n'], 0.2
  ]
  , [
    ['house worker', 'maid', 'n'], 0.2
  ]
  , [
    ['populate-PRODUCT.OF', 'population', 'n']
    , ['population-NOUN.TO.VERB', 'populate', 'v']
  ]
  , [
    ['population count', 'census', 'n'], 0.2
  ]
  , [
    ['copy:v right:n', 'copyright', 'n']
    , ['author right:n', 'copyright', 'n'], 0.8
  ]
  , [
    ['grill bread', 'toast', 'n']
    , ['roast bread', 'toast', 'n'], 0.3
  ]
  , [
    ['pig leg', 'ham', 'n'], 0.2
  ]
  , [
    ['ocean crab', 'lobster', 'n'], 0.2
  ]
  , [
    ['ride seat', 'saddle', 'n'], 0.2
  ]
  , [
    ['narrow box', 'coffin', 'n']
    , ['death case', 'coffin', 'n'], 0.3
  ]
  , [
    ['free time', 'leisure', 'n'], 0.2
  ]
  , [
    ['father type:n', 'prototype', 'n'], 0.2
  ]
  , [
    ['animal park', 'zoo', 'n'], 0.2
  ]
  , [
    ['hell mountain', 'volcano', 'n']
    , ['fire:n mountain', 'volcano', 'n'], 0.3
  ]
  , [
    ['back bag', 'backpack', 'n'], 0.2
  ]
  , [
    ['shell frog', 'turtle', 'n'], 0.2
  ]
  , [
    ['money house', 'bank', 'n'], 0.1
  ]
  , [
    ['data bank', 'archive', 'n'], 0.2
  ]
  , [
    ['traffic surface', 'pavement', 'n'], 0.2
  ]
  , [
    ['neck chain', 'necklace', 'n'], 0.2
  ]
  , [
    ['head salad', 'lettuce', 'n'], 0.2
  ]
  , [
    ['fire:n weapon', 'firearm', 'n']
    , ['fire:n arm', 'firearm', 'n'], 0.3
  ]
  , [
    ['green shrub', 'parsley', 'n'], 0.2
  ]
  , [
    ['body shirt', 'vest', 'n']
    , ['strap shirt', 'vest', 'n'], 0.2
  ]
  , [
    ['language science', 'linguistics', 'n'], 0.2
  ]
  , [
    ['metal paper', 'foil', 'n'], 0.2
  ]
  , [
    ['land master', 'landlord', 'n'], 0.2
  ]
  , [
    ['tree skin', 'bark (of tree)', 'n']
    , ['wood skin', 'bark (of tree)', 'n'], 0.3
  ]
  , [
    ['big stripe', 'tiger', 'n'], 0.2
  ]
  , [
    ['rotate meat', 'barbecue', 'n'], 0.2
  ]
  , [
    ['milk nut', 'coconut', 'n'], 0.2
  ]
  , [
    ['blue military', 'navy', 'n'], 0.2
  ]
  , [
    ['low age', 'infant', 'n'], 0.2
  ]
  , [
    ['battle supply', 'ammunition', 'n'], 0.2
  ]
  , [
    ['night talk', 'gossip', 'n'], 0.2
  ]
  , [
    ['life seed', 'semen', 'n'], 0.2
  ], // fix - what kind of life?
  [
    ['ear curl', 'earring', 'n']
    , ['ear ring:n', 'earring', 'n'], 0.9
  ]
  , [
    ['white vegetable', 'cabbage', 'n'], 0.2
  ]
  , [
    ['life water', 'whiskey', 'n'], 0.2
  ], // fix - what kind of life?
  [
    ['blood demon', 'vampire', 'n'], 0.2
  ]
  , [
    ['pot art', 'pottery', 'n'], 0.2
  ]
  , [
    ['ground train', 'metro', 'n'], 0.2
  ]
  , [
    ['little water', 'urine', 'n'], 0.2
  ]
  , [
    ['sun down', 'dusk', 'n'], 0.2
  ]
  , [
    ['crime action', 'felony', 'n'], 0.2
  ]
  , [
    ['fruit garden', 'orchard', 'n'], 0.2
  ]
  , [
    ['finger mark:v', 'fingerprint', 'n']
    , ['finger print:v', 'fingerprint', 'n']
  ], //[['show case', 'showcase', 'n'], 0.2],
  [
    ['holy war', 'crusade', 'n'], 0.2
  ]
  , [
    ['red lip', 'lipstick', 'n']
    , ['lip color', 'lipstick', 'n']
    , ['lip pen', 'lipstick', 'n']
  ]
  , [
    ['float wood', 'raft', 'n'], 0.2
  ]
  , [
    ['shower sign', 'rainbow', 'n']
    , ['old arc', 'rainbow', 'n']
    , ['sky arc', 'rainbow', 'n']
    , ['rain arc', 'rainbow', 'n']
    , ['color cloud', 'rainbow', 'n']
    , ['arc cloud', 'rainbow', 'n']
  ]
  , [
    ['drink:v house', 'pub', 'n'], 0.2
  ]
  , [
    ['shave blade', 'razor', 'n'], 0.2
  ]
  , [
    ['tree coal', 'charcoal', 'n']
    , ['wood coal', 'charcoal', 'n'], 0.2
  ]
  , [
    ['red dog', 'fox', 'n']
    , ['yellow dog', 'fox', 'n'], 0.3
  ]
  , [
    ['place:n order:n', 'layout', 'n'], 0.2
  ]
  , [
    ['nation murder', 'genocide', 'n'], 0.2
  ]
  , [
    ['foot person', 'pedestrian', 'n'], 0.2
  ]
  , [
    ['flame emotion', 'agony', 'n'], 0.2
  ]
  , [
    ['breast lace', 'bra', 'n'], 0.2
  ]
  , [
    ['farm bird', 'poultry', 'n'], 0.2
  ]
  , [
    ['ice river', 'glacier', 'n'], 0.2
  ]
  , [
    ['ocean tornado', 'hurricane', 'n'], 0.2
  ]
  , [
    ['half island', 'peninsula', 'n'], 0.2
  ]
  , [
    ['back:n column', 'spine', 'n']
    , ['back:n bone', 'spine', 'n'], 0.3
  ]
  , [
    ['precious stone', 'gem', 'n'], 0.2
  ]
  , [
    ['holiday village', 'resort', 'n'], 0.2
  ]
  , [
    ['bad hero', 'villain', 'n']
    , ['black character', 'villain', 'n'], 0.3
  ]
  , [
    ['round bread', 'biscuit', 'n'], 0.2
  ]
  , [
    ['present:n thing', 'souvenir', 'n'], 0.2
  ]
  , [
    ['desert horse', 'camel', 'n'], 0.2
  ]
  , [
    ['business room', 'office', 'n'], 0.2
  ]
  , [
    ['before noon', 'morning', 'n'], 0.2
  ]
  , [
    ['water cook_(prepare_food)', 'boil', 'v'], 0.2
  ]
  , [
    ['teach-PRODUCT.OF', 'education', 'v'], 0.2
  ]
  , [
    ['memory get', 'remember', 'v'], 0.2
  ]
  , [
    ['dance:v sound', 'music', 'n'], 0.2
  ]
  , [
    ['shop:n', 'shop', 'v'], 0.3
  ]
  , [
    ['fun:adj-QUALITY.OF.BEING', 'fun', 'n']
  ]
  , [
    ['hate:v-PRODUCT.OF', 'hate', 'n']
    , ['hate:v', 'hate', 'n']
  ]
  , [
    ['value:v-ACT.OF', 'value', 'n']
    , ['value:v', 'value', 'n']
  ]
  , [
    ['join:v-PRODUCT.OF', 'joint', 'n']
    , ['join:v', 'joint', 'n'], 0.9
  ], //[['pose:v-PRODUCT.OF', 'position', 'n'], ['pose:v', 'position', 'n'], 0.9],
  [
    ['record:v-PRODUCT.OF', 'record', 'n']
    , ['record_(written_account)-NOUN.TO.VERB', 'record', 'v'], 0.9
  ]
  , [
    ['ask_(inquire):v-ACT.OF', 'question', 'n']
    , ['ask_(inquire):v', 'question', 'n'], 0.5
  ]
  , [
    ['live:v-PRODUCT.OF', 'life (living organism)', 'n']
    , ['live:v', 'life (living organism)', 'n']
  ], // fix
  [
    ['fat:adj-QUALITY.OF.BEING', 'fat (bodily substance)', 'n']
    , ['fat:adj', 'fat (bodily substance)', 'n'], 0.8
  ]
  , [
    ['long story', 'history', 'n'], 0.2
  ]
  , [
    ['hunger-HAVING.QUALITY.OF', 'hungry', 'adj', 3]
    , ['hungry-QUALITY.OF.BEING', 'hunger', 'n']
  ]
  , [
    ['name:n-NOUN.TO.VERB', 'name', 'v']
    , ['name:n', 'name', 'v'], 0.8
  ]
  , [
    ['force:n-RELATING.TO', 'strong', 'adj'], 0.2
  ]
  , [
    ['offer:v-ACT.OF', 'offer', 'n']
    , ['offer:n-NOUN.TO.VERB', 'offer', 'v']
    , ['offer:n', 'offer', 'v'], 0.8
  ]
  , [
    ['cut:v-PRODUCT.OF', 'cut', 'n']
    , ['cut:v', 'cut', 'n']
  ]
  , [
    ['experience:v-ACT.OF', 'experience', 'n']
    , ['experience:v', 'experience', 'n']
  ]
  , [
    ['control:v-ACT.OF', 'control', 'n']
    , ['control:v', 'control', 'n']
  ]
  , [
    ['rate:n-NOUN.TO.VERB', 'rate', 'v']
    , ['rate:v', 'rate', 'n']
  ]
  , [
    ['food', 'eat', 'v'], 0.2
  ], //[['head activity', 'mind', 'n'], 0.1], activity untilpolyemized
  [
    ['hope:v-ACT.OF', 'hope', 'n', 4]
    , ['hope:n-NOUN.TO.VERB', 'hope', 'v']
    , ['hope:v', 'hope', 'n', 6]
  ]
  , [
    ['clear:adj-TO.MAKE', 'clear', 'v']
    , ['clear:adj', 'clear', 'v']
  ]
  , [
    ['draw-PRODUCT.OF', 'drawing', 'n']
  ]
  , [
    ['tree-PLACE.OF', 'forest', 'n'], 0.1
  ]
  , [
    ['red', 'blood', 'n'], 0.15
  ]
  , [
    ['cause:v-ACT.OF', 'cause', 'n']
    , ['cause:v', 'cause', 'n']
  ]
  , [
    ['sex:n fur', 'pubic hair', 'n']
  ]
  , [
    ['rule:v', 'rule (law, regulation)', 'n'], 0.2
  ]
  , [
    ['spit-PRODUCT.OF', 'saliva', 'n']
    , ['spit', 'saliva', 'n', 4], 0.5
  ]
  , [
    ['hint:v-ACT.OF', 'hint', 'n']
    , ['hint:v', 'hint', 'n']
  ]
  , [
    ['vary-DOER', 'variable', 'n'], 0.2
  ]
  , [
    ['ten year', 'decade', 'n'], 0.2
  ]
  , [
    ['lay-PLACE.OF', 'bed', 'n'], 0.1
  ]
  , [
    ['sex:n-NOUN.TO.VERB', 'have sex', 'v']
    , ['make sex:n', 'have sex', 'v']
  ]
  , [
    ['laugh:v-ACT.OF', 'laugh', 'n']
    , ['laugh:v', 'laugh', 'n', 4]
  ]
  , [
    ['guess:v-ACT.OF', 'guess', 'n']
    , ['guess:v', 'guess', 'n', 4]
  ]
  , [
    ['drink:v', 'drink', 'n', 4]
  ]
  , [
    ['this night', 'tonight', 'adv'], 0.8
  ]
  , [
    ['this day', 'today', 'adv'], 0.2
  ]
  , [
    ['finish', 'end', 'n'], 0.9
  ]
  , [
    ['flirt-TENDING.TO', 'flirtatious', 'adj'], 0.8
  ]
  , [
    ['contain-DOER', 'container', 'n'], 0.3
  ]
  , [
    ['light:v-HAVING.QUALITY.OF', 'bright', 'adj'], 0.9
  ]
  , [
    ['return:v-ACT.OF', 'return', 'n']
    , ['return:v', 'return', 'n', 4]
  ]
  , [
    ['help:v-ACT.OF', 'help', 'n']
    , ['help:v', 'help', 'n', 4]
  ]
  , [
    ['start:v-ACT.OF', 'start, beginning', 'n']
    , ['start:v', 'start, beginning', 'n', 4]
  ]
  , [
    ['test:v-ACT.OF', 'test', 'n']
    , ['test:v', 'test', 'n', 4]
  ]
  , [
    ['place:n-NOUN.TO.VERB', 'place', 'v']
    , ['place:n', 'place', 'v', 4]
  ]
  , [
    ['fight:v-ACT.OF', 'fight', 'n']
    , ['fight:v', 'fight', 'n', 4]
  ]
  , [
    ['low', 'floor', 'n'], 0.1
  ]
  , [
    ['close:adj-TO.MAKE', 'approach', 'v']
    , ['go close:adj', 'approach', 'v'], 0.7
  ]
  , [
    ['lie:v-PRODUCT.OF', 'lie', 'n']
    , ['lie:v', 'lie', 'n', 4]
  ]
  , [
    ['lie:v-DOER', 'liar', 'n']
  ]
  , [
    ['sleep:v-PRODUCT.OF', 'sleep', 'n']
    , ['sleep:v', 'sleep', 'n', 5]
  ]
  , [
    ['dream:n-NOUN.TO.VERB', 'dream', 'v']
    , ['dream:n', 'dream', 'v', 4]
  ]
  , [
    ['wide stream', 'river', 'n'], 0.1
  ]
  , [
    ['foot press', 'footprint', 'n']
    , ['step_(footstep) press', 'footprint', 'n']
    , ['foot print', 'footprint', 'n']
    , ['step_(footstep) print', 'footprint', 'n']
  ]
  , [
    ['dead body', 'corpse', 'n'], 0.2
  ]
  , [
    ['wet dirt', 'mud', 'n'], 0.15
  ]
  , [
    ['hand face', 'palm (of hand)', 'n'], 0.15
  ]
  , [
    ['high leg', 'thigh', 'n'], 0.2
  ]
  , [
    ['rest:v place', 'grave', 'n'], 0.15
  ]
  , [
    ['bird nose', 'beak', 'n'], 0.15
  ]
  , [
    ['sea edge', 'shore', 'n']
    , ['sea line', 'shore', 'n']
    , ['water edge', 'shore', 'n'], 0.15
  ]
  , [
    ['plant cure', 'medicine', 'n'], 0.15
  ]
  , [
    ['stomach bump', 'belly', 'n'], 0.15
  ]
  , [
    ['air pipe', 'throat', 'n', 3]
    , ['swallow', 'throat', 'n'], 0.2
  ]
  , [
    ['knife-AUG', 'sword', 'n'], 0.15
  ]
  , [
    ['round-QUALITY.OF.BEING', 'circle', 'n'], 0.15
  ]
  , [
    ['past day', 'yesterday', 'n'], 0.4
  ]
  , [
    ['next day', 'tomorrow', 'n'], 0.4
  ]
  , [
    ['stable:adj-TO.MAKE', 'balance', 'v'], 0.2
  ]
  , [
    ['comfort-HAVING.QUALITY.OF', 'comfortable', 'adj']
  ]
  , [
    ['crack:n-NOUN.TO.VERB', 'crack', 'v']
    , ['crack:n', 'crack', 'v', 4]
  ]
  , [
    ['damage:v-PRODUCT.OF', 'damage', 'n']
    , ['damage:v', 'damage', 'n', 5]
  ]
  , [
    ['land end', 'horizon', 'n', 4]
    , ['land end', 'distance', 'n'], 0.15
  ]
  , [
    ['water rock', 'ice', 'n'], 0.15
  ]
  , [
    ['own-DOER', 'owner', 'n']
  ]
  , [
    ['relate-PRODUCT.OF', 'relationship', 'n']
  ]
  , [
    ['respect:v-PRODUCT.OF', 'respect', 'n']
    , ['respect:v', 'respect', 'n', 5]
  ]
  , [
    ['snow:n-NOUN.TO.VERB', 'snow', 'v']
    , ['snow:n', 'snow', 'v', 4]
  ]
  , [
    ['time-DOER', 'clock', 'n', 4]
    , ['time-AFFIX', 'clock', 'n'], 0.20
  ]
  , [
    ['hard hat', 'helmet', 'n'], 0.15
  ]
  , [
    ['land-AFFIX', 'island', 'n'], 0.15
  ]
  , [
    ['pot-AUG', 'cauldron', 'n']
    , ['hot pot', 'cauldron', 'n']
    , ['pot-AFFIX', 'cauldron', 'n'], 0.6
  ]
  , [
    ['win-ACT.OF', 'victory', 'n'], 0.7
  ]
  , [
    ['stab knife', 'dagger', 'n'], 0.3
  ]
  , [
    ['tie:v', 'knot', 'n'], 0.2
  ]
  , [
    ['lock-AFFIX', 'key', 'n'], 0.1
  ]
  , [
    ['fire:n-DOER', 'match (for fire)', 'n']
    , ['fire:n-AFFIX', 'match (for fire)', 'n'], 0.4
  ]
  , [
    ['strength-AFFIX', 'muscle', 'n']
    , ['strength-DOER', 'muscle', 'n'], 0.1
  ]
  , [
    ['pierce-DOER', 'needle', 'n'], 0.2
  ]
  , [
    ['pants bag', 'pocket', 'n', 5]
    , ['bag-DIM', 'pocket', 'n'], 0.3
  ]
  , [
    ['air-DOER', 'pump', 'n'], 0.1
  ]
  , [
    ['metal track', 'rail', 'n'], 0.1
  ]
  , [
    ['house top', 'roof', 'n'], 0.1
  ]
  , [
    ['boat', 'sail', 'v'], 0.2
  ]
  , [
    ['shoe-DIM', 'sock', 'n']
    , ['cotton shoe', 'sock', 'n'], 0.1
  ]
  , [
    ['absorb-DOER', 'sponge', 'n']
    , ['absorb', 'sponge', 'n', 5], 0.4
  ]
  , [
    ['stamp:v', 'stamp', 'n']
    , ['stamp:v-DOER', 'stamp', 'n']
    , ['ink-DOER', 'stamp', 'n'], 0.9
  ]
  , [
    ['stem-AUG', 'trunk (of tree)', 'n'], 0.3
  ]
  , [
    ['box-AUG', 'trunk (large box)', 'n'], 0.8
  ]
  , [
    ['hold-DOER', 'tray', 'n'], 0.2
  ]
  , [
    ['round-DOER', 'wheel', 'n']
    , ['round', 'wheel', 'n', 4], 0.2
  ]
  , [
    ['space_(empty_area)-DIM', 'gap', 'n'], 0.3
  ]
  , [
    ['food-AFFIX', 'diet', 'n'], 0.3
  ]
  , [
    ['price-DIM', 'cheap', 'adj']
    , ['market-DIM', 'cheap', 'adj'], 0.3
  ]
  , [
    ['word book:n', 'dictionary', 'n']
    , ['word list', 'dictionary', 'n']
    , ['word-AFFIX', 'dictionary', 'n'], 0.7
  ]
  , [
    ['letter_(of_an_alphabet)-AFFIX', 'alphabet', 'n'], 0.3
  ]
  , [
    ['army-AFFIX', 'soldier', 'n']
    , ['army-DOER', 'soldier', 'n']
    , ['army man', 'soldier', 'n'], 0.5
  ]
  , [
    ['soft-AFFIX', 'pillow', 'n'], 0.1
  ]
  , [
    ['breast-AFFIX', 'buxom', 'adj']
    , ['breast-HAVING.QUALITY.OF', 'buxom', 'adj']
  ]
  , [
    ['magic drink:n', 'potion', 'n'], 0.2
  ]
  , [
    ['block:v-DOER', 'shield', 'n'], 0.2
  ]
  , [
    ['sad-AFFIX', 'frown', 'n'], 0.1
  ]
  , [
    ['food-HAVING.QUALITY.OF', 'delicious', 'adj']
    , ['flavor-HAVING.QUALITY.OF', 'delicious', 'adj'], 0.2
  ]
  , [
    ['laugh:v-DIM', 'giggle', 'v'], 0.2
  ]
  , [
    ['language style', 'accent (of a language)', 'n'], 0.2
  ]
  , [
    ['plant claw', 'thorn', 'n'], 0.2
  ]
  , [
    ['old-AUG', 'ancient', 'adj'], 0.1
  ]
  , [
    ['wall city', 'citadel', 'n']
    , ['wall-AFFIX', 'citadel', 'n'], 0.2
  ]
  , [
    ['before family', 'ancestor', 'n']
    , ['before-AFFIX', 'ancestor', 'n'], 0.2
  ]
  , [
    ['chair-AUG', 'throne', 'n']
    , ['king chair', 'throne', 'n']
    , ['lion seat', 'throne', 'n'], 0.1
  ]
  , [
    ['glory ring', 'crown', 'n'], 0.1
  ]
  , [
    ['rub press', 'massage', 'v'], 0.1
  ]
  , [
    ['wrong-AFFIX', 'sin', 'n'], 0.2
  ]
  , [
    ['head bone', 'skull', 'n', 3]
    , ['hard head', 'skull', 'n'], 0.2
  ]
  , [
    ['wise-DOER', 'wizard', 'n'], 0.2
  ]
  , [
    ['drink:v-RESULT.OF.DOING', 'drunk (inebriated)', 'adj']
    , ['drink:v-AFFIX', 'drunk (inebriated)', 'adj']
  ]
  , [
    ['attract-TENDING.TO', 'attractive', 'adj'], 0.5
  ]
  , [
    ['through glass', 'lens', 'n'], 0.2
  ]
  , [
    ['blood line', 'vein', 'n']
    , ['blood channel_(of_water)', 'vein', 'n'], 0.4
  ]
  , [
    ['between-break:v', 'interrupt', 'v'], 0.3
  ], //[['bad speech', 'blasphemy', 'n'], 0.1],
  [
    ['science-PLACE.OF', 'laboratory', 'n', 4]
    , ['work:n-PLACE.OF', 'laboratory', 'n'], 0.3
  ]
  , [
    ['down:adv', 'down', 'prep'], 1
  ]
  , [
    ['up:adv', 'up', 'prep'], 1
  ]
  , [
    ['detain-PRODUCT.OF', 'detention', 'n']
  ]
  , [
    ['elevate-PRODUCT.OF', 'elevation', 'n']
  ], //[['for each', 'per, for each', 'prep'], 0.5], // fix - problems getting the correct sense of 'for'
  [
    ['length-HAVING.QUALITY.OF', 'long', 'adj']
  ]
  , [
    ['die-RESULT.OF.DOING', 'dead', 'adj']
  ]
  , [
    ['wealth-HAVING.QUALITY.OF', 'rich', 'adj']
    , ['rich-QUALITY.OF.BEING', 'wealth', 'n'], 0.7
  ]
  , [
    ['oil lamp', 'candle', 'n'], 0.1
  ]
  , [
    ['eye glass', 'glasses', 'n'], 0.9
  ]
  , [
    ['excuse:v', 'excuse', 'n', 3]
    , ['excuse:v-PRODUCT.OF', 'excuse', 'n']
    , ['excuse:n-NOUN.TO.VERB', 'excuse', 'v']
  ]
  , [
    ['drain:v-DOER', 'drain', 'n', 5]
    , ['drain:n-NOUN.TO.VERB', 'drain', 'v']
  ]
  , [
    ['blood-NOUN.TO.VERB', 'bleed', 'v']
  ]
  , [
    ['abuse:v-PRODUCT.OF', 'abuse', 'n', 4]
    , ['abuse:n-NOUN.TO.VERB', 'abuse', 'v']
  ]
  , [
    ['research:n-NOUN.TO.VERB', 'research', 'v']
    , ['research:n', 'research', 'v']
  ], // do research
  [
    ['sport-DOER', 'athlete', 'n']
    , ['play:v-DOER', 'athlete', 'n'], 0.2
  ]
  , [
    ['order:v-PRODUCT.OF', 'order', 'n']
    , ['order:n-NOUN.TO.VERB', 'order', 'v']
    , ['order', 'order', 'v', 3]
  ]
  , [
    ['logic-RELATING.TO', 'logical', 'adj']
  ]
  , [
    ['wrist ornament', 'bracelet', 'n'], 0.2
  ]
  , [
    ['spell-PRODUCT.OF', 'spelling', 'n']
  ]
  , [
    ['middle night', 'midnight', 'n'], 0.8
  ]
  , [
    ['building style', 'architecture', 'n'], 0.3
  ]
  , [
    ['animal life_(living_organism)', 'wildlife', 'n'], 0.5
  ], // fix - what kind of life?
];
//xcv

/*
let Ls = [];
for (let i of choiceDerivs) {
	let line = [];
	for (let e of i) {
		if (typeof e == 'number') {
           line.push('<span class="unique">unique word</span>');

		} else {
			line.push(e[1] + ' : ' + e[2] + ' = ' + e[0])
		}
	}
	Ls.push(line.join(' <span class="ors">OR</span> '));
}
Ls = Ls.sort();
consol.log('<li>' + Ls.join('</li>\n<li>') + '</li>')
*/

let englishListDefault = ['be (permanent state):v', 'be (exist):v', 'be (located):v', 'be (temporary state):v', 'be (age):v', 'and:conj', 'of:prep', 'in:prep', 'within:prep', 'have:v', // carry accept keep
  'to:prep', 'towards:prep', 'that:conj', // gram
  'for (in favor of):prep', 'for (the purpose of):prep', 'for (a period of time or length of distance):prep', 'with (accompanied by):prep', 'with (using):prep', 'on:prep', 'do:v', // definitely not done?
  'this:det', // gram
  'this:pron', // gram
  'at:prep', 'but:conj', // however as conj
  'from:prep', 'that:det', // gram
  'that:pron', // gram
  'not:adv', // gram
  'by (agent performing an action):prep', 'by (author or creator):prep', 'by (using the means of):prep', 'by (using a route):prep', 'or:conj', 'as:adv', // gram
  'what:det', // gram
  'what:pron', // gram
  'who:pron', // gram
  'if:conj', 'one:num', 'two:num', 'three:num', 'four:num', 'five:num', 'six:num', 'seven:num', 'eight:num', 'nine:num', 'ten:num', 'say:v', // definitely not done?
  'go:v', 'have to:v', 'can:v', // gram
  'get:v', // definitely not done?
  'obtain:v', // definitely not done?
  'would:v', // gram
  'all:det', 'make:v', 'about:prep', // close to approximately almost
  'concerning:prep', 'regarding:prep', 'know (a fact):v', 'know (be acquainted with):v', 'okay:interj', 'up:adv', //
  'up:prep', //
  'time:n', // clock
  'year:n', 'ear:n', 'so:adv', //
  'think:v', 'thought:n', 'when:conj', //
  'when:adv', 'which:det', //gram
  'which:pron', //gram
  'take:v', 'out:adv', // is prep?
  'into:prep', 'just:adv', 'see:v', 'come:v', 'could:v', // gram
  'now:adv', 'than:conj', // gram?
  'like:prep', // is it a preposition?
  'other:adj', 'how:adv', // gram
  'then:adv', // gram
  //'these:det', //plural of this
  'want:v', 'lack:v', 'way:n', ///// definitely not done!
  'look:v', 'first:num', //gram
  'also:adv', //gram
  'as well:adv', //gram
  'new:adj', 'because:conj', //gram
  'day:n', 'more:det', //gram
  'use:v', 'utilize:v', 'no:det', //gram
  'man:nma', 'find:v', 'here:adv', //gram
  'thing:n', 'give:v', 'many:det', //gram
  'sick:adj', 'ill:adj', 'unwell:adj', 'well:adv', 'only:adv', 'merely:adv', //'those:det', //plural of that
  'tell:v', 'one:pron', //gram
  'very:adv', 'really:adv', 'quite:adv', 'even:adj', 'back:adv', // not in thesaurus
  'any:det', //gram
  'good:adj', 'woman:nfa', 'through:prep', 'life (lifetime):n', // up to here, different kinds of life?
  'life (living organism):n', 'life (soul):n', 'child (young human being):na', 'child (son or daughter of any age):na', 'there:adv', 'work (be employed):v', 'work (toil):v', 'work (function):v', 'work (have desired result):v', 'tired (needing sleep):adj', 'tired (needing rest):adj', 'cook (heat food):v', 'cook (prepare food):v', 'sun:n', //sunshine
  'rain:n', 'down:adv', 'down:prep', 'may:v', 'after:prep', 'should:v', 'call (refer to by name):v', 'call (cry out):v', 'call (request the attendance of):v', 'world:n', 'over:prep', 'thin (narrow):adj', 'thin (slender):adj', 'slim:adj', 'fat:adj', 'fat (bodily substance):n', 'fat (component in food):n', 'school:n', 'still:adv', 'try (attempt):v', 'try (strive):v', 'try (test out):v', 'attempt:v', 'last (final):adj', 'last (previous):adj', 'last (only remaining):adj', 'ask (inquire):v', 'ask (request):v', 'ask (invite):v', 'need (require):v', 'need (lack):v', 'too:adv', 'feel (perceive, sense):v', 'feel (sense by touch):v', 'feel (examine by touch):v', 'state (province, country):n', 'state (condition):n', 'condition (state):n', 'condition (requirement, stipulation):n', 'never:adv', // not ever
  'become (begin to be):v', 'become (change into):v', 'between:prep', 'high:adj', 'height:n', 'something:pron', 'most:adv', //
  'much:det', //
  'family (children and parents):na', 'family (related by blood):na', 'own:v', 'out:prep', // gram
  'leave (depart):v', 'leave (let remain):v', 'put (place):v', 'put (cause to be):v', 'old:adj', 'while:conj', 'mean (signify):v', 'mean (intend):v', 'keep (not return):v', 'keep (save, retain):v', //restrain:v arrest:v are also options
  'keep (store):v', 'keep (continue):v', 'store:v', 'student:na', 'why:adv', // gram
  'let:v', 'allow (let):v', // authorize ceritfy
  'great (very large):adj', 'great (excellent):adj', 'same:det', // gram
  'big:adj', 'group:n', 'seem:v', 'country (nation):n', 'country (rural area):n', 'help:v', 'help:n', 'assist:v', 'talk:v', 'speak:v', 'turn:v', 'problem:n', 'every:det', 'start:v', 'start:n', 'beginning:n', 'begin:v', 'hand:n', 'might:v', 'show:v', 'demonstrate:v', 'part:n', 'about:adv', 'against:prep', 'place:n', 'such:det', 'again:adv', 'few:det', 'case:n', 'week:n', 'where:adv', 'system:n', 'each:det', 'right:adj', 'correct:adj', 'right (direction):adj', 'program:n', 'hear:v', 'question:n', //'query:n',
  'during:prep', 'play (have fun):v', 'work:n', 'river:n', 'sky:n', 'pretty:adj', 'god:na', 'run:v', 'small:adj', 'number:n', 'off:adv', 'always:adv', 'all the time:adv', 'move:v', 'like:v', 'night:n', 'live:v', 'point:n', 'believe:v', 'hold:v', 'today:adv', 'bring:v', 'happen:v', 'next:adj', 'without:prep', // not with
  'before:prep', 'large:adj', 'hundred:num', 'thousand:num', 'million:num', 'must:v', // gram
  'home:n', 'under:prep', 'below:prep', 'water:n', 'room (space):n', 'room (of house):n', 'write:v', 'mother:nfa', 'area:n', 'money:n', 'story:n', 'fable:n', 'young:adj', 'youth:n', 'fact:n', 'month:n', 'different:adj', 'lot:n', 'right:n', 'entitlement:n', 'book:n', 'eye:n', 'job:n', 'task:n', 'word:n', 'though:conj', 'mirror:n', 'business:n', 'issue:n', 'concern:n', 'side:n', 'kind:n', 'type:n', 'head:n', 'far:adv', 'black:adj', 'long:adj', 'length:n', 'both:det', 'little:adj', 'house:n', 'hungry:adj', 'hunger:n', 'yes:interj', 'since:conj', 'provide:v', 'around:prep', 'friend:na', 'important:adj', 'father:nma', 'sit:v', 'away:adv', 'until:conj', 'power:n', 'hour:n', 'game:n', 'often:adv', 'yet:adv', 'line:n', 'end:n', 'among:prep', 'ever:adv', 'stand:v', 'political:adj', 'bad:adj', 'lose:v', 'however:adv', 'member:n', 'pay:v', 'law:n', 'meet:v', 'car:n', 'city:n', 'almost:adv', 'include:v', 'continue:v', 'set:v', 'later:adv', 'community:n', 'name:n', 'once:adv', 'white:adj', 'least:adv', 'king:nma', 'queen:nfa', 'learn:v', 'real:adj', 'change:v', 'team:n', 'minute:n', 'best:adj', 'several:det', 'idea:n', 'kid:na', 'body:n', 'information:n', 'nothing:pron', 'ago:adv', 'lead:v', 'social:adj', 'understand:v', 'whether:conj', 'back (of body):n', 'back (reverse side):n', 'watch:v', 'together:adv', 'follow:v', 'parent:na', 'only:adj', 'stop:v', 'face:n', 'anything:pron', 'create:v', 'already:adv', 'read:v', 'level (degree, stage):n', 'add:v', 'office:n', 'spend:v', 'door:n', 'health:n', 'person:na', 'hunt:v', 'sure:adj', 'war:n', 'history:n', 'party:n', 'grow:v', 'grow up:v', 'result:n', 'outcome:n', 'steal:v', 'open:v', 'change:n', 'morning:n', 'walk:v', 'reason:n', 'low:adj', 'win:v', 'research:n', 'research:v', 'girl:nfa', 'guy:nma', 'early:adj', 'food:n', 'moment:n', 'air:n', 'teacher:na', 'force:n', 'offer:v', 'offer:n', 'enough:det', 'boil:v', 'roast:v', 'education:n', 'across:prep', 'cross:v', 'although:conj', 'remember:v', 'foot:n', 'second:num', 'boy:nma', 'maybe:adv', //
  'will:n', //
  'able:adj', 'capable:adj', 'age:n', 'gain:v', 'everything:pron', 'love:v', 'process:n', 'procedure:n', 'music:n', 'including:prep', 'consider:v', 'grab:v', 'appear:v', 'actually:adv', 'buy:v', 'purchase:v', 'probably:adv', 'shop:v', 'fun:adj', 'fun:n', 'human:na', 'wait:v', 'serve:v', 'market:n', 'die:v', 'send:v', 'hate:v', 'hate:n', 'expect:v', 'sense:n', //
  'build:v', 'construct:v', 'stay:v', 'remain:v', 'use:n', 'care:n', 'fall:v', 'report:n', 'death:n', 'nation:n', 'plan:n', 'cut:v', 'cut:n', 'interest (curiosity, concern):n', // interesting
  'someone:pron', // gram
  'somebody:pron', 'experience:n', 'experience:v', 'behind:adv', 'reach:v', 'local:adj', 'kill:v', 'effect:n', 'suggest:v', 'class:n', 'control:n', 'raise:v', 'perhaps:adv', 'late:adj', 'hard:adj', 'field:n', 'cave:n', 'hole:n', 'else:adv', 'pass:v', //
  'mouth:n', 'previous:adj', 'former:adj', 'sell:v', 'major:adj', 'sometimes:adv', 'require:v', 'along:prep', 'report:v', //'role:n', untilpolyemized
  //'better:adj',
  'effort:n', 'decide:v', 'bowl:n', 'rate:n', 'rate:v', 'strong:adj', 'tough:adj', 'possible:adj', 'heart:n', 'earth:n', 'drug:n', 'leader:na', 'show (performance):n', 'light:n', 'light (weight):adj', 'voice:n', 'wife:nfa', 'whole:adj', 'entire:adj', 'police:na', 'mind (thinking faculty):n', 'finally:adv', 'pull:v', 'return:v', 'return:n', 'go back:v', 'free:adj', 'military:n', 'price:n', 'fee:n', 'cost:n', //'fare:n',untilpolyemized
  'decision:n', 'less:adv', 'according to:prep', 'explain:v', 'son:nma', 'hope:v', 'hope:n', 'even:conj', //'develop:v',untilpolyemized
  'view:n', 'relationship:n', 'carry:v', 'town:n', 'road:n', 'drive:v', 'arm:n', 'difference:n', 'true:adj', 'break:v', 'receive:v', 'thank:v', 'shift:v', 'value:n', // needs polysemy!
  'value:v', 'building:n', 'action (movement):n', 'full:adj', //'model:n', //untilpolyemized
  'join:v', 'season (quarter of the year):n', 'society:n', 'tax:n', 'position (location):n', 'player:na', 'agree:v', 'especially:adv', 'record (written account):n', 'record:v', 'pick:v', 'wear:v', 'put on:v', 'paper:n', 'special:adj', 'space (empty area):n', 'space (beyond Earth):n', 'ground:n', //'form:n',untilpolyemized
  'support:v', 'event (occurrence):n', 'whose:det', //gram
  'matter (substance, material):n', 'everyone:pron', 'center:n', 'couple:n', 'site:n', 'project:n', 'hit:v', //'activity:n',untilpolyemized
  'star:n', 'table:n', 'need:n', 'court (of law):n', 'luck:n', 'produce (manufacture):v', // needs polysemy bad
  'eat:v', 'teach:v', 'instruct:v', 'oil:n', 'soil:n', 'half:n', 'situation (circumstances, context):n', 'easy:adj', 'cost:v', //'industry:n', untilpolyemized
  'figure:n', 'street:n', 'image:n', 'phone:n', 'either:conj', 'either:adv', 'finger:n', 'clothes:n', 'clothing:n', 'vegetable:n', 'kitchen:n', 'desk:n', 'toe:n', 'data:n', 'cover:v', 'picture:n', 'clear:adj', 'clear:v', 'practice:v', 'piece:n', 'land:n', 'sour:adj', 'recent:adj', 'describe:v', 'product (item made):n', 'doctor:na', 'wall:n', 'worker:na', 'employee:na', 'dish:n', 'plate:n', 'bone:n', 'patient:na', 'news:n', 'test:v', 'test:n', 'certain:adj', 'north:n', 'personal:adj', 'support:n', 'simply:adv', 'third:num', 'technology:n', 'catch:v', 'step (one level of stairs):n', 'step (footstep):n', 'baby:na', 'draw:v', 'drawing:n', 'tree:n', 'source:n', 'red:adj', 'choose:v', 'select:v', 'cause:v', 'cause:n', 'hair (of head):n', 'hair (of body):n', 'fur:n', 'pubic hair:n', 'look:n', 'century:n', 'evidence:n', 'window:n', 'difficult:adj', 'listen:v', 'soon:adv', 'culture:na', 'cultural:adj', 'billion:num', 'blood:n', 'bleed:v', 'chance:n', 'odds:n', 'brother:nma', 'energy (strength, stamina):n', 'realize:v', 'period (duration of time):n', 'course (direction of travel):n', 'summer:n', 'available:adj', 'plant:n', //'term:n',untilpolyemized
  'short:adj', 'letter (of an alphabet):n', 'letter (written document):n', 'choice:n', 'place:v', 'single:adj', 'rule (law, regulation):n', 'rule:v', 'daughter:nfa', 'south:n', 'husband:na', 'floor:n', // storey?
  //'material:n',untilpolyemized
  'population:n', 'well:interj', 'economy:n', 'medical:adj', 'well:n', 'hospital:n', 'church:n', 'close:v', 'shut:v', 'risk:n', 'current:adj', 'fire:n', 'future:n', 'wrong:adj', 'happiness:n', 'involve:v', 'entail:v', 'defense:n', 'behavior:n', 'defend:v', 'behave:v', 'dancer:na', //'anyone:pron', anybody // gram?untilpolyemized
  'increase:v', 'expand:v', 'safe:adj', 'bank:n', 'certainly:adv', 'elbow:n', 'west:n', 'sport:n', //'board:n',untilpolyemized
  'seek:v', 'per:prep', 'for each:prep', //'subject:n',untilpolyemized
  'officer:na', //
  //'official:n', //untilpolyemized
  'private:adj', 'rest:v', 'deal:v', 'fight:v', 'fight:n', 'throw:v', 'quickly:adv', 'top:n', 'top (clothing):n', 'past:adj', 'goal (objective):n', 'second (time):n', 'bed:n', 'ride:v', 'order:n', 'order:v', 'demand:v', 'fill:v', 'focus:v', 'foreign:adj', 'drop:v', 'plan:v', 'prostitute:nfa', 'spit:v', 'saliva:n', 'upon:prep', //'agency:n',untilpolyemized
  'push:v', 'nature:n', 'color:n', 'store:n', 'shop:n', 'recently:adv', //'reduce:v', // lower turn down untilpolyemized
  'hint:v', 'hint:n', 'sound:n', 'fine (okay):adj', 'near:prep', //
  'page:n', 'movement:n', 'motion:n', 'hide:v', 'enter:v', 'common:adj', 'share:v', 'poor:adj', 'race (ethnicity):n', //
  'ethnicity:n', //
  'race (competition):n', //
  'series:n', 'pour:v', //'reference:n',untilpolyemized
  'significant:adj', 'similar:adj', 'hot:adj', 'language:n', 'usual:adj', 'usually:adv', 'dead:adj', 'sadness:n', 'sorrow:n', 'rise:v', 'animal:na', 'factor:n', 'variable:n', 'decade:n', 'article (text):n', 'art:n', 'shoot:v', 'pepper:n', 'busy:adj', 'east:n', 'save:v', 'rescue:v', 'save (put aside):v', 'artist:na', 'scene:n', 'stock:n', 'career:n', //'despite:prep',untilpolyemized
  'central:adj', 'treatment:n', 'loop:n', 'beyond:prep', 'happy:adj', 'exact:adj', 'exactly:adv', 'precise:adj', 'protect:v', 'park:n', 'approach:v', // get close
  'lie:v', 'lie:n', 'liar:na', 'size:n', 'dog:na', 'sad:adj', 'fund:n', 'serious:adj', 'occur:v', 'media:n', // what kind?
  'ready:adj', 'sign:n', 'list:n', 'simple:adj', 'quality:n', 'pressure:n', 'accept:v', 'zero:num', 'answer:n', 'resource:n', 'identify:v', 'point out:v', 'meeting:n', 'left:adj', 'prepare:v', //'whatever:det',untilpolyemized
  'success:n', 'argue:v', 'recognize:v', //'naval:adj',untilpolyemized
  'cup:n', 'amount:n', 'ability:n', 'quantity:n', 'staff:n', 'indicate:v', 'character:na', //
  'growth:n', 'loss:n', //'degree:n',untilpolyemized
  'wonder:v', 'attack:v', 'region:n', 'box:n', //'training:n',untilpolyemized
  'everybody:pron', 'trade:v', 'trade:n', 'elect:v', 'election:n', 'physical:adj', 'lay:v', 'general:adj', 'feeling:n', //'standard:n',untilpolyemized
  'message:n', 'fail:v', 'bill:n', 'check:n', 'outside:prep', //
  'arrive:v', 'analysis:n', 'lawyer:na', 'analyze:v', 'benefit:n', 'sex:n', 'have sex:v', //'forward:adv', //untilpolyemized
  'present:n', 'gift:n', 'weak:adj', 'section:n', 'glass:n', 'skill:n', 'sister:nfa', 'crime:n', 'stage:n', 'compare:v', 'authority:n', 'miss (not hit):v', 'miss (long for):v', 'miss (not take advantage of):v', //'design:n',untilpolyemized
  'sort:v', 'act:v', //
  'knowledge:n', 'gun:n', 'station (railroad, bus):n', 'nut:n', 'blue:adj', 'state:v', 'declare:v', 'strategy (plan):n', 'clearly:adv', 'discuss:v', 'discussion:n', 'truth:n', 'kiss:v', 'song:n', 'example:n', 'check:v', 'press:v', 'environment (natural world):n', 'leg:n', 'dark:adj', 'public:n', 'various:adj', 'rather:adv', 'laugh:v', 'laugh:n', 'guess:v', 'guess:n', //'set:n', //untilpolyemized
  'study:v', 'study:n', 'prove:v', 'hang:v', 'rock:n', 'stone:n', 'forget:v', 'claim:v', 'note:n', 'remove:v', 'manager:na', // boss or something
  'take out:v', 'drink:v', 'drink:n', 'ugly:adj', 'cute:adj', 'close:adj', // near
  'enjoy:v', //'network:n',untilpolyemized
  'legal:adj', 'final:adj', 'religious:adj', 'cold:adj', 'main:adj', 'science:n', 'green:adj', 'card:n', 'memory:n', 'above:prep', 'seat:n', 'cell (room in a prison):n', // what kind?
  'establish:v', 'nice:adj', 'trial:n', 'expert:na', 'that:adv', 'spring (season):n', 'firm:adj', 'fence:n', 'visit:v', 'visit:n', 'healthy:adj', 'care:v', 'avoid:v', 'imagine:v', 'tonight:adv', 'huge:adj', 'ball:n', 'no:interj', 'finish:v', 'theory:n', //'impact:n', // untilpolyemized
  'respond:v', 'answer:v', 'reply:v', //'maintain:v',untilpolyemized
  'charge:v', 'popular:adj', 'onto:prep', 'spell:v', 'flirt:v', 'flirtatious:adj', 'reveal:v', 'direction (way):n', //'attention:n',untilpolyemized
  'weapon:n', 'contain:v', 'peace:n', 'control:v', 'base:n', // what kind?
  'apply:v', 'play (stage play):n', 'wide:adj', 'broad:adj', 'measure:v', 'shake:v', 'fly:v', 'interview:n', 'manage:v', 'chair:n', 'fish:na', 'specific:adj', 'particular:adj', 'camera:n', 'structure:n', 'politics:n', 'bit:n', //
  'sleep:v', 'sleep:n', 'perform:v', 'suddenly:adv', 'theater:n', 'weight:n', 'discover:v', 'treat:v', 'evening:n', 'mail:n', 'suggestion:n', 'spell (of magic):n', 'trip:n', 'affect:v', 'inside:prep', //
  'unit:n', //
  'style:n', 'adult:na', 'worry:v', 'mention:v', 'range:n', 'deep:adj', 'past:n', 'edge:n', 'trouble:n', 'necessary:adj', 'throughout:prep', 'challenge:n', // verb
  'fear:n', 'breakfast:n', 'lunch:n', 'dinner:n', 'farmer:na', 'shoulder:n', 'middle:adj', 'sea:n', 'ocean:n', 'dream:n', 'dream:v', 'bar (pub):n', 'beautiful:adj', 'beauty:n', 'property:n', //'instead:adv', untilpolyemized
  'improve:v', 'stuff:n', 'fruit:n', 'seed:n', 'expensive:adj', 'detail:n', 'magazine:n', 'ditch:n', 'tomb:n', 'stream:n', 'liquid:n', 'wind:n', 'girlfriend:nfa', 'boyfriend:nma', 'turn on:v', 'tongue:n', 'jaw:n', 'chin:n', 'wood:n', 'jewel:n', 'gem:n', 'mountain:n', 'hill:n', 'smoke:n', 'cloud:n', 'dust:n', 'steam:n', 'plain:adj', 'nose:n', 'shade:n', 'skin:n', 'shadow:n', 'fog:n', 'boring:adj', 'sap:n', 'glue:n', 'bottom (lowest part):n', 'clay:n', 'mud:n', 'stump:n', 'root:n', 'swamp:n', 'flour:n', 'buttocks:n', 'male:nma', 'female:nfa', 'wing:n', 'forehead:n', 'beard:n', 'front:n', 'wrist:n', 'expression (look on someone\'s face):n', 'meat:n', 'flesh:n', 'corpse:n', 'defecate:v', 'excrement:n', 'fin (of fish):n', 'feather:n', 'bark (of tree):n', 'bark:v', 'wool:n', 'shell:n', 'eyelid:n', 'eyelash:n', 'eyeball:n', 'breathe:v', 'fuck (slang):v', // more slang please
  'screw:v', 'shit:n', 'murder:v', 'footprint:n', 'palm (of hand):n', 'thigh:n', 'grave:n', 'beak:n', 'shore:n', 'medicine:n', 'lip:n', 'nostril:n', 'fragile:adj', 'stomach:n', 'weigh:v', 'gut:n', 'belly:n', 'wound:n', 'throat:n', 'swallow:v', 'chew:v', 'vomit:v', 'crush:v', 'grind:v', 'bake:v', 'oven:n', 'alcohol:n', 'beer:n', 'wine:n', 'grain:n', 'orange:adj', 'embrace:v', 'planet:n', 'stretch:v', 'sword:n', 'battle:n', 'comb:n', 'crawl:v', 'brush (for hair):n', 'brush:n', 'broom:n', 'rake:n', 'fork:n', 'bird:na', 'louse:na', 'leaf:n', 'grease:n', 'egg:n', 'belief:n', 'horn:n', 'tail:n', 'claw:n', 'knee:n', 'neck:n', 'breast:nf', 'liver:n', 'famous:adj', //
  'bite:v', 'swim:v', 'wolf:na', 'moon:n', 'sand:n', 'ash:n', 'burn:v', 'path:n', //
  'route:n', //
  'track:n', //
  'loud:adj', 'noisy:adj', 'stupid:adj', 'hello:interj', 'goodbye:interj', 'welcome:interj', 'yellow:adj', 'round:adj', 'dry:adj', 'tomorrow:adv', 'yesterday:adv', 'please:v', 'balance:v', 'birth:n', // be born
  'blow:v', 'brass:n', 'bread:n', 'burst:v', 'butter:n', 'bathroom:n', 'bedroom:n', 'toilet:n', 'canvas:n', 'chalk:n', 'cloth:n', 'coal:n', 'criminal:na', 'comfort:n', 'comfortable:adj', 'committee:n', 'company:n', 'copper:n', 'bronze:n', 'copy:v', 'cork:n', 'cotton:n', 'cough:v', 'crack:n', //
  'crack:v', 'credit (recognition):n', 'credit (of money):n', 'cry:v', 'curve:n', 'evident:adj', 'damage:v', //
  'damage:n', 'danger:n', 'debt:n', 'desire:v', 'horizon:n', 'distance:n', 'doubt:v', 'mistake:n', 'error:n', 'fiction:n', 'flame:n', 'flower:n', 'fold:v', 'gold:n', 'grass:n', 'grip:v', 'guide:n', 'harbor:n', 'harmony:n', 'dirt:n', 'humor:n', 'ice:n', 'impulse:n', 'ink:n', 'bug:na', 'insect:na', 'instrument:n', 'iron:n', 'journey:n', //
  'judge:v', 'judge:na', 'funny:adj', 'jump:v', 'kick:v', 'leather:n', 'lift:v', 'limit:n', 'appearance (act of appearing):n', 'linen:n', 'machine:n', 'greedy:adj', 'mark:v', 'mass:n', //
  'meal:n', 'hearing:n', 'metal:n', 'milk:n', 'mist:n', 'noise:n', 'valley:n', 'opinion:n', 'ornament:n', 'owner:na', 'paint:n', 'pain:n', 'paste:n', 'poison:n', 'furious:adj', 'polish:v', 'powder:n', 'print:v', 'profit:n', 'poem:n', 'chicken:na', 'fowl:na', 'pool:n', 'punish:v', 'purpose:n', 'sing:v', 'ray (of light):n', //'react:v',untilpolyemized
  'regret:v', 'relate:v', 'religion:n', 'request:v', 'respect:v', 'respect:n', 'reward:n', 'rhythm:n', 'rice:n', 'roll:v', 'rub:v', 'salt:n', 'scale (skin of reptiles):n', 'scale (instrument for weighing):n', 'servant:na', 'slave:na', 'shame:n', 'technological:adj', 'stigma:n', 'shock:v', 'silk:n', 'silver:n', 'recognition:n', 'slip:v', 'slope:n', 'slant:n', 'smash:v', 'smell (emit odor):v', 'stink:v', 'smell (sense with nose):v', 'smile:v', 'sneeze:v', 'snow:n', 'snow:v', 'politician:na', 'soap:n', 'soft:adj', 'soup:n', 'steel:n', 'stitch:n', 'sugar:n', 'surprise:v', //
  'tea:n', 'taste:v', //
  'thunder:n', 'tin:n', 'touch:v', //
  'transport:n', 'trick:v', 'deceive:v', 'twist:v', 'wiggle:v', 'verse:n', 'wash:v', 'waste:v', 'wave (ocean):n', 'wave (salutation):v', 'wax:n', 'reversal:n', 'weather:n', 'winter:n', 'village:n', 'angle:n', 'ant:na', 'apple:n', 'arch:n', 'army:n', 'bag:n', 'heat:n', 'band (musical group):n', //
  'basket:n', 'bath:n', 'bee:na', 'moan:v', 'conquest:n', 'fashionable:adj', 'bell:n', 'berry:n', 'blade:n', 'offensive:adj', 'toy:n', 'prisoner:na', 'doll:n', 'boat:n', 'boot:n', 'bottle:n', 'jar:n', 'brain:n', //'brake (smash into pieces):v',
  //'brake (stop functioning):v',
  'branch (tree part):n', 'brick:n', 'bridge:n', 'bucket:n', 'bulb (plant root):n', 'skilled:adj', 'button (pushbutton):n', 'button (fastener for clothing):n', 'cake:n', 'cart:n', // what kind?
  'cat:na', 'chain:n', 'cheese:n', 'chest:n', 'circle:n', 'clock:n', 'coat:n', 'jacket:n', 'collar:n', 'cord:n', 'cow:na', 'curtain:n', 'cabinet:n', 'broken:adj', 'drawer:n', 'dress:n', 'engine:n', 'motor:n', 'farm:n', 'flag:n', 'frame:n', 'cage:n', 'garden:n', 'glove:n', // hand jacket
  'goat:na', 'hammer:n', 'hat:n', 'helmet:n', 'hook:n', 'horse:na', 'island:n', 'cauldron:n', 'kettle:n', 'key:n', 'victory:n', 'academic:adj', 'knife:n', 'dagger:n', 'knot:n', 'lock:n', 'map:n', 'match (game):n', 'contest:n', 'match (for fire):n', 'muscle:n', 'nail:n', // what kind?
  'needle:n', 'nerve:n', 'net:n', 'web:n', 'parcel:n', 'package:n', 'bundle:n', 'pen:n', 'pencil:n', 'pig:na', 'pin:n', 'pipe:n', 'plane:n', 'fix:v', 'mend:v', 'repair:v', 'pocket:n', 'pot:n', 'potato:n', 'prison:n', 'jail:n', 'magic:n', 'pump:n', 'rail:n', 'ring:v', 'rod:n', 'shaft:n', 'bar:n', //
  'roof:n', 'ceiling:n', 'sail:v', 'bloody:adj', 'settle:v', // what kind?
  'scissors:n', 'screw:n', // nail?
  'sheep:n', 'runner:n', 'shelf:n', 'rack:n', 'exam:n', 'empire:n', 'exotic:adj', 'ship:n', 'tooth:n', 'shirt:n', 'shoe:n', 'skirt:n', 'ass:n', // behind
  'snake:n', 'sock:n', 'secure:v', 'sponge:n', 'spoon:n', 'square:n', 'stamp:v', 'stamp:n', 'stem:n', 'trunk (of tree):n', 'trunk (large box):n', 'stick:n', 'stick:v', 'thread:n', 'thumb:n', 'ticket:n', 'shape:n', 'train:n', //
  'train:v', 'tray:n', 'trousers:n', 'pants:n', 'wheel:n', 'gap:n', //
  'lucky:adj', 'drag:v', 'tow:v', 'library:n', 'factory:n', 'diet:n', 'whistle:v', 'wire:n', 'worm:na', 'acid:n', 'angry:adj', 'mad:adj', 'dealer:n', 'brown:adj', 'cheap:adj', 'chemical:n', 'signal:n', 'clean:v', //
  'clean:adj', //
  'neat:adj', 'pile:n', 'heap:n', 'equal:adj', 'flat:adj', 'frequent:adj', 'gray:adj', 'marry:v', 'item:n', 'normal:adj', 'hotel:n', 'heavy:adj', 'sexual:adj', 'probable:adj', 'quick:adj', 'quiet:adj', 'regular:adj', 'separate:v', // adj
  'intervention:n', 'sharp:adj', 'smooth:adj', 'whore:nfa', 'stiff:adj', 'straight:adj', 'sudden:adj', 'sweet:adj', 'tall:adj', 'thick:adj', 'tight:adj', 'belt:n', 'violent:adj', 'violence:n', 'warm:adj', 'wet:adj', 'wise:adj', 'lounge:n', 'couch:n', 'sofa:n', 'underwear:n', 'gender:n', 'solve:v', 'figure out:v', 'beast:na', 'monster:na', 'shark:na', 'blink:v', 'flood:n', 'supervisor:na', 'travel:v', 'restaurant:n', 'diner:n', 'triangle:n', 'crash:v', 'dictionary:n', 'alphabet:n', 'paradise:n', 'heaven:n', 'hell:n', 'dangerous:adj', 'secret:n', 'confidence:n', 'rumor:n', 'excitement:n', 'soldier:nma', 'boss:na', //
  'pillow:n', 'carpet:n', 'bench:n', 'potion:n', 'elixir:n', 'spirit:na', 'soul:n', 'threat:n', 'spear:n', 'lance:n', 'pike:n', 'shield:n', 'sew:v', 'rag:n', 'service:n', 'uniform:n', 'frown:v', 'tower:n', 'mathematics:n', 'exercise:v', 'erase:v', 'recipe:n', 'reasonable:adj', 'preparation:n', 'assassin:na', 'cloak:n', 'erection:n', //
  'armor:n', 'vocabulary:n', 'brothel:n', 'rank (military):n', // combine these?
  'rank (position):n', //
  'darkness:n', 'delicious:adj', //
  'dragon:na', 'fashion:n', 'giggle:v', 'penis:nm', //
  'vagina:nf', //
  'earthquake:n', 'divide:v', 'execute:v', 'row:n', 'row:v', 'confess:v', 'accent (of language):n', 'thorn:n', 'debate:v', 'dialect:n', 'ancient:adj', 'golden:adj', 'castle:n', 'fort:n', 'citadel:n', 'plot:n', 'combine:v', 'ancestor:na', 'forefather:na', 'destroy:v', 'massage:v', 'torture:v', 'throne:n', 'date:v', 'go out:v', 'crown:n', 'dig:v', 'anxiety:n', 'suck:v', 'edit:v', 'vague:adj', 'foreigner:na', 'curious:adj', 'lend:v', 'loan:v', 'earn:v', 'borrow:v', 'sin:n', // manual WIKTIONARY dervied words done from here down
  'register:v', 'excuse:n', 'climate:n', 'stab:v', 'cafe:n', 'organize:v', 'skeleton:n', 'skull:n', 'wizard:na', 'witch:na', 'puzzle:n', 'drunk (inebriated):adj', 'aroused (sexually):adj', //
  'silence:n', 'gay:adj', 'homosexual:adj', 'attractive:adj', 'hot (attractive):adj', 'axe:n', 'lens:n', 'hag (old woman):na', 'vein:n', 'interrupt:v', 'nest:n', 'moss:n', 'riot:n', 'blasphemy:n', 'heresy:n', 'laboratory:n', 'pink:adj', //
  'purple:adj', //
  'bay:n', 'carcass:n', 'dungeon:n', 'greed:n', 'mask:n', 'hood:n', 'arrow (weapon):n', 'arrow (sign):n', 'bow (weapon):n', 'bow (decorative material):n', 'dance:v', 'masturbate:v', 'blank:adj', 'subtle:adj', 'idiot:na', 'fool:na', 'frog:na', 'lizard:na', 'mouse:na', 'holiday:n', 'vacation:n', 'psychology:n', //
  'excite:v', 'buxom:adj', 'orgasm:n', 'wealth:n', 'flavor:n', 'candle:n', 'hallway:n', 'corridor:n', 'bow (greet):v', 'lean:v', 'balcony:n', 'coffee:n', 'stable:adj', 'steady:adj', 'tide:n', 'offend:v', 'compliment:n', 'bitch:nfa', //
  'plague:n', 'siege:n', 'glasses:n', 'climb:v', 'grandmother:nfa', //derive
  'grandfather:nma', //derive
  'uncle:nma', //derive
  'aunt:nfa', //derive
  'cousin:na', //derive
  'nephew:nma', //derive
  'niece:nfa', //derive
  'advice:n', 'fake:adj', 'promise:v', 'rifle:n', //'conviction:n',
  'silent:adj', 'settlement (village):n', 'cigarette:n', 'snap:v', 'drift:v', 'present (time):n', 'nod:v', 'limp:v', 'file:n', 'torch:n', 'lamp:n', 'gentle:adj', 'stubborn:adj', 'strap:n', 'starve:v', 'sewer:n', 'display:v', 'cool (slightly cold):adj', 'cool (fashionable):adj', //
  'tire:n', 'freeze:v', 'perfect:adj', 'mood:n', //
  'hiss:v', 'count:v', 'deserve:v', 'discovery:n', 'trap:n', 'crystal:n', 'drain:v', 'drain:n', 'warrior:na', 'complain:v', 'tread:v', 'step on:v', 'naked:adj', 'nude:adj', 'gate:n', 'saddle:n', 'bean:n', 'jerk:v', 'pray:v', 'prey:n', 'empty:adj', 'float:v', 'sink:v', 'cream:n', 'mess:n', //'mint:n', what kind?
  'abuse:v', 'abuse:n', 'breeze:n', 'waist:n', 'awful:adj', //
  'terrible:adj', //
  'careful:adj', 'invite:v', //
  'bend:v', 'fan:n', 'fan (enthusiast):na', 'drown:v', 'diamond:n', 'calculate:v', 'vulgar:adj', 'shine:v', 'corner:n', 'bullet:n', 'coast:n', 'accompany:v', 'rib:n', 'logical:adj', 'confident:adj', 'costume:n', 'leak:v', 'menu:n', 'coin:n', 'arrest:v', 'hunter:n', 'reservation:n', 'educate:v', 'painful:adj', 'candy:n', 'upper class:n', 'middle class:n', 'lower class:n', 'species:n', //category group
  'squeeze:v', 'prize:n', 'steep:adj', 'reflect:v', 'cure:v', 'face:v', //'administration:n', //untilpolyemized
  'campaign:n', 'security:n', //derive
  //'democracy:n', //untilpolyemized
  'tradition:n', 'exist:v', // be (exist) ?
  //'ahead:adv', //untilpolyemized
  'collect:v', 'partner:na', 'capital (city):n', 'victim:na', 'none:pron', //
  'forest:n', 'critical:adj', 'neighbor:na', 'attitude:n', 'sorry:adj', 'hurt:v', 'injure:v', //'nobody:pron', //untilpolyemized
  'object:n', 'refer:v', 'therefore:adv', 'thus:adv', 'vote:v', 'afternoon:n', 'possibility:n', 'insurance:n', 'date:n', 'vision:n', 'university:n', 'resident:na', 'target:n', 'text:n', 'tool:n', 'vehicle:n', 'flight:n', 'bright:adj', //
  'guest:na', 'block:n', 'lesson:n', 'unless:conj', 'fit:v', 'equipment:n', //'worth:adj',untilpolyemized
  //'anybody:pron', anyone //untilpolyemized
  'speed:n', //'anyway:adv', //untilpolyemized
  //'quarter:n', //untilpolyemized
  'native:adj', 'excellent:adj', 'fantastic:adj', 'wonderful:adj', 'fabulous:adj', 'terrific:adj', 'location:n', 'chief:n', //
  'average:n', 'fire (detonate weapon):v', // shoot a ball vs shoot a weapon
  'fire (from job):v', //'direct:adj',untilpolyemized
  'justice:n', 'abrupt:adj', 'fair:adj', 'just:adj', 'pair:n', //'duo:n',untilpolyemized
  'search:v', 'look up:v', 'tie:v', //
  'device:n', //
  'ban:v', 'prohibit:v', //'progress:n', //untilpolyemized
  'otherwise:adv', //'domestic:adj',
  'direct:v', //untilpolyemized
  'conduct:v', //
  'weird:adj', 'strange:adj', //'somewhere:adv', // in some part / where there untilpolyemized
  'favorite:adj', 'enemy:na', 'complicated:adj', 'complex:adj', 'athlete:na', 'repeat:v', 'alone:adj', 'emotion:n', 'trail:n', //
  //'somehow:adv', //untilpolyemized
  'storm:n', //'regulate:v', //untilpolyemized
  'last:v', 'ring:n', 'appearance (looks):n', //
  //'basically:adv',untilpolyemized
  //'anymore:adv', //untilpolyemized
  'internal:adj', 'appreciate:v', 'hardly:adv', 'matter:v', //
  'extent:n', 'mix:v', 'slow:adj', 'wake:v', //
  'wake up:v', //
  'get up:v', //
  'capacity:n', 'percent:n', //'neither:adv', //untilpolyemized
  'influence:v', 'investigate:v', 'crazy:adj', 'insane:adj', 'silly:adj', 'manner:n', //
  'except:prep', 'besides:prep', //'meanwhile:adv',untilpolyemized
  'smart:adj', 'intelligent:adj', 'topic:n', 'perception:n', 'rare:adj', //'aside:adv',
  'stand:n', //
  'struggle:v', 'mean:adj', 'somewhat:adv', //
  'fairly:adv', //
  'pretty:adv', //
  'tear:n', 'tear:v', 'rip:v', 'volume:n', 'aim:v', 'beach:n', 'opening:n', 'tie:n', 'employ:v', //'apart:adv', // untilpolyemized
  'barely:adv', 'emphasize:v', 'beside:prep', //
  'flow:v', //
  'experiment:n', //
  'massive:adj', //
  'enormous:adj', // immense
  'narrow:adj', 'achieve:v', 'accomplish:v', 'accuse:v', 'escape:v', //'plenty:pron', //untilpolyemized
  'honor:n', 'live:adj', //alive
  'guilty:adj', 'acquire:v', //'technical:adj', //untilpolyemized
  'compete:v', //'plus:prep', //untilpolyemized
  'column:n', 'forever:adv', 'review:v', //
  //'editor:na',untilpolyemized edit-DOER
  'criticize:v', 'warn:v', 'permit:v', 'define:v', 'graduate:v', 'drama:n', 'perceive:v', 'wedding:n', 'portion:n', 'abandon:v', 'link:n', 'chase:v', 'cast:v', 'lake:n', 'tension:n', 'bother:v', 'enable:v', 'desert:n', 'release:v', 'let go:v', 'let out:v', 'atmosphere:n', 'joint:n', 'expose:v', 'sale:n', 'joke:n', //'foundation:n',untilpolyemized
  'negotiate:v', //'elsewhere:adv', //untilpolyemized
  'carry out:v', //
  'implement:v', //
  'enforce:v', //'independence:n', //untilpolyemized
  'priest:na', 'amazing:adj', //
  'employer:na', 'previously:adv', 'disease:n', 'transfer:v', // hand over
  'attach:v', 'champion:na', // winner
  'enhance:v', 'impose:v', 'emphasis:n', //
  'monitor:v', 'arrange:v', //'approximate:adj', //untilpolyemized
  'vary:v', 'holy:adj', // spiritual religious
  'sacred:adj', 'command:v', 'interpret:v', 'reflection:n', 'clinic:n', 'light:v', 'block:v', 'pure:adj', 'migrate:v', 'perfection:n', 'teenager:na', 'recover:v', 'swing:v', 'heel:n', 'fabric:n', 'textile:n', 'due:adj', 'permanent:adj', 'plant:v', 'favor:v', 'apparent:adj', //'aggressive:adj',untilpolyemized
  'false:adj', 'intend:v', 'fresh:adj', 'publish:v', 'version:n', 'giant:na', 'tent:n', //'substantial:adj',
  'specialist:na', // professional
  'origin:n', 'fast:adj', 'deputy:na', 'criteria:n', 'professor:na', // teacher
  //'via:prep', // fix - problems making it not be on its own
  'nevertheless:adv', //
  'regardless:adv', //
  'even though:adv', //
  'wage:n', 'salary:n', 'schedule:n', 'calendar:n', 'stake:n', 'fiber:n', 'incorporate:v', 'assume:v', 'presume:v', 'assign:v', 'killer:na', 'advocate:v', 'rough:adj', 'survive:v', 'testify:v', 'wind:v', 'found:v', 'cooperate:v', 'string:n', 'bear:na', 'pant:v', 'infect:v', 'literature:n', 'blind:adj', 'electricity:n', //'incentive:n',untilpolyemized
  'translate:v', 'concentrate:v', 'revolution:n', //
  'strip:n', 'recommend:v', 'advise:v', 'innocent:adj', 'pause:v', 'lover:na', 'satisfy:v', 'aware:adj', 'advance:v', 'pride:n', 'dismiss:v', 'deliver:v', 'relevant:adj', 'trend:n', 'visitor:na', //'joy:n', //untilpolyemized
  'evolve:v', //'offense:n',untilpolyemized
  'counter (flat, elevated surface):n', 'justify:v', 'possess:v', 'double:n', 'relax:v', 'adventure:n', 'external:adj', 'proof:n', 'dirty:adj', 'violate:v', 'spot:n', 'introduce:v', 'driver:na', 'present:v', 'appeal:v', 'split:v', 'pollute:v', 'distinct:adj', 'segment:n', 'poet:na', 'nowhere:adv', //
  'minor:adj', 'mere:adj', 'stress:v', 'bank (river):n', 'flee:v', 'coach:v', 'beat (strike):v', 'budget:n', 'fantasy:n', 'organization:n', 'scare:v', 'frighten:v', 'scared:adj', 'afraid:adj', 'mission:n', 'depend:v', 'witness:na', // spectator observer
  'proud:adj', 'divorce:n', 'owe:v', 'differ:v', 'custom:n', 'custom:adj', 'celebrate:v', //'efficient:adj',untilpolyemized
  'galaxy:n', 'explode:v', 'blow up:v', 'reserve:v', 'mall:n', 'sophisticated:adj', 'etcetera:adv', 'entrance:n', 'controversy:n', 'suspect:v', //'sufficient:adj',untilpolyemized
  'scope:n', 'stroke:v', //'downtown:n',untilpolyemized
  'eager:adj', 'romance:n', 'overlook:v', 'sequence:n', 'temporary:adj', 'cabin:n', 'versus:prep', 'complex:n', 'chef:na', 'cook:na', 'dominate:v', 'heritage:n', 'wander:v', 'extend:v', 'fly:na', 'operate:v', 'collapse:v', //'furthermore:adv', // untilpolyemized
  'habitat:n', 'conscious:adj', 'province:n', 'nominate:v', 'frustrate:v', 'medium:n', 'distinguish:v', //
  'discourse:n', //'carrier:n',
  //'lovely:adj',
  'invade:v', 'intense:adj', 'rope:n', 'concrete:n', 'document:n', 'pregnant:adj', //
  'distant:adj', 'slice:n', 'confuse:v', 'attribute:v', 'container:n', //
  'peer:v', 'adolescent:na', 'counsel:n', 'evil:adj', //
  'moral:adj', /////////////////////////////////////////////////////////////// start of uncertain area
  'midnight:n', 'integrity:n', 'essence:n', 'suburb:n', 'interior:n', 'classic:adj', 'estimate:v', 'rely on:v', 'architecture:n', //'render:v',
  //'effective:adj', //
  'array:n', 'encounter:v', 'recession:n', // derive
  'wish:v', 'painter:na', 'scientist:na', 'agreement:n', 'label:n', 'arena:n', 'stadium:n', 'diagnose:v', 'announce:v', 'predict:v', 'germ:n', 'bacteria:n', 'medium:adj', 'temple:n', 'random:adj', 'leap:v', // skip bounce hop?
  'pond:n', // derive AFFIX
  'guilt:n', 'harm:v', //
  'furniture:n', 'ceremony:n', 'cheek:n', 'infection:n', 'replace:v', //
  'innovate:v', //
  //'simultaneous:adj', //
  'trigger:n', //'grace:n',untilpolyemized
  'colony:n', // settlement
  'response:n', 'adopt:v', 'slide:v', 'glance:v', 'boost:v', //
  'govern:v', //
  //'enthusiasm:n', //untilpolyemized
  'wild:adj', 'praise:v', 'beam:n', // pillar:n pole:n shaft:n axle:n column:n pile:n post:n prop:n stay:n strip:n
  'corrupt:adj', // derive infected rotten
  'astronomy:n', 'contract:n', //'unity:n', //
  'compromise:v', //'exclusive:adj',
  'relieve:v', 'footpath:n', // derive
  'sidewalk:n', // derive
  'promote:v', //?
  'bounce:v', //?
  'exit:n', 'noon:n', 'midday:n', // derive - but lunch is a polysemy
  'exhibit:n', 'oxygen:n', 'sum:n', 'wildlife:na', 'clerk:na', 'destination:n', // up to here in uncertain area
  'explore:v', 'volunteer:v', 'strip:v', 'peel:v', 'reception (of office or hotel):n', 'automatic:adj', 'gravity:n', 'prevent:v', 'assemble:v', 'switch:n', //'disappoint:v', untilpolyemized
  'precious:adj', 'rose:n', 'log:n', 'funeral:n', 'gather:v', 'stumble:v', 'dawn:n', 'kit:n', 'spread:v', 'belong:v', //'insight:n', untilpolyemized
  'spring (coil):n', 'trailer:n', 'dynamics:n', 'accurate:adj', 'loyal:adj', 'talent:n', 'mystery:n', 'dignity:n', 'flash:v', 'guard:v', 'look out:v', 'watch out:v', 'gas:n', 'address:n', 'natural:adj', 'glory:n', 'withdraw:v', 'homeland:n', 'motherland:n', 'symbol:n', 'rock (move back and forth):v', 'agriculture:n', 'instant:adj', 'bankrupt:adj', 'broke:adj', 'patient:adj', 'orbit:n', 'ruin:v', 'alongside:prep', 'as well as:prep', 'discourage:v', 'biology:n', //'flexible:adj', untilpolyemized
  //'conspire:v',
  'bush:n', 'pork:n', 'sympathy:n', 'isolate:v', 'ambition:n', 'statistic:n', 'metropolis:n', 'dissolve:v', 'vanish:v', 'disappear:v', 'aesthetic:adj', 'intestine:n', 'lion:na', 'cliff:n', 'illusion:n', 'tolerate:v', //'commission:n', untilpolyemized
  'casino:n', 'scramble:v', 'donate:v', 'sibling:na', //'interact:v', untilpolyemized
  'core:n', 'upset:v', 'rival:n', 'persist:v', 'supply:v', 'icon:n', 'bicycle:n', 'encourage:v', 'argument:n', 'access:v', 'filter:n', 'heal:v', 'rabbit:na', 'exploit:v', 'organism:n', 'crisis:n', //'sensation:n', untilpolyemized
  'stay:n', 'shove:v', 'remind:v', 'surround:v', 'dam:n', 'garbage:n', 'trash:n', 'rubbish:n', 'gross:adj', 'damn:adj', //'hormone:n', untilpolyemized
  //'custody:n', untilpolyemized
  'speculate:v', 'uncover:v', 'attend:v', 'show up:v', 'install:v', 'set up:v', 'mill:n', 'tag:n', //'vertical:adj', untilpolyemized
  'compel:v', //'desperate:adj', untilpolyemized
  'proclaim:v', 'confront:v', 'inherit:v', //'shrink:v', untilpolyemized
  'risky:adj', 'nasty:adj', 'dot:n', 'theme:n', 'envision:v', 'deploy:v', 'pasta:n', //'depressed:adj', untilpolyemized
  //'merit:n', untilpolyemized
  'discount:n', 'ambassador:na', 'formal:adj', 'existence:n', 'sphere:n', 'sole:adj', 'lone:adj', 'valid:adj', 'regard:v', 'authorize:v', 'deem:v', 'sneak:v', 'lightning:n', 'logic:n', 'liberty:n', 'harass:v', 'barrel:n', 'policy:n', 'deliberate:adj', 'carrot:n', 'suspicious:adj', 'sponsor:v', 'defeat:v', 'beat:v', 'demographic:n', 'comply:v', 'scratch:v', 'awake:adj', 'butt:n', 'dumb (speechless):adj', 'dumb:adj', //'bulk:n', // untilpolyemized
  'convert:v', 'customer:na', 'patron:na', 'successful:adj', 'arm:v', 'bless:v', 'palace:n', 'peasant:na', 'mobile:adj', 'portable:adj', 'widow:n', 'remark:v', 'crowd:n', 'deny:v', 'cruel:adj', 'mansion:n', 'invent:v', 'molecule:n', 'jersey:n', 'sweater:n', 'rubber:n', 'veteran:na', 'fatigue:n', //'explicit:adj', untilpolyemized
  'disturb:v', 'depart:v', 'magnet:n', 'severe:adj', 'citizen:na', 'civilian:na', 'contribute:v', 'protection:n', 'dense:adj', 'honest:adj', 'bow:v', //'delight:n', untilpolyemized
  'convenient:adj', 'sustain:v', 'devil:na', //'marine:adj', untilpolyemized
  'myth:n', 'manual:n', 'pistol:n', 'apology:n', 'bore:v', 'crew:n', 'prefer:v', 'chop:v', 'retrieve:v', 'bring back:v', 'tribute:n', 'bizarre:adj', 'devise:v', 'come up with:v', 'anchor:n', 'bargain:n', 'skeptic:na', 'scrutinize:v', 'suppress:v', 'cover up:v', 'rape:v', 'drill:n', 'extract:v', 'betray:v', 'consistent:adj', 'bureaucracy:n', 'clever:adj', 'loser:na', 'critique:n', 'march:v', 'compassion:n', 'reproduce:v', 'awkward:adj', 'legend:n', 'militia:n', 'compose:v', 'authentic:adj', //'restoration:n', untilpolyemized
  'reject:v', 'dome:n', 'thief:na', //'completion:n',untilpolyemized
  'museum:n', 'unique:adj', 'content:n', 'locker:n', 'autumn:n', 'faith:n', 'haunt:v', 'crude:adj', //'objective:adj', untilpolyemized
  'approve:v', 'explanation:n', 'passenger:na', 'evoke:v', 'complete:v', 'surrender:v', 'trader:na', 'scar:n', 'surge:n', 'sailor:na', 'inspect:v', 'quote:v', 'comment:n', //'commentary:n',untilpolyemized
  //'compensate:v', untilpolyemized
  'hover:v', 'fossil:n', //'stunning:adj',untilpolyemized
  //'viable:adj',untilpolyemized
  'clarify:v', 'sketch:n', 'chat:v', 'combat:n', 'foster:v', 'lyrics:n', 'strive:v', 'neglect:v', 'gamble:v', 'wipe:v', 'port:n', 'chart:n', 'raw:adj', 'ward:n', 'pole:n', 'platform:n', 'mound:n', 'bang:v', 'tilt:v', 'rob:v', 'spray:v', 'accumulate:v', 'prosecute:v', 'punch:v', 'intervene:v', 'interfere:v', 'dull:adj', 'rug:n', 'raid:n', 'creep:v', 'crab:n', 'illustrate:v', 'vinegar:n', 'remedy:n', 'fancy:adj', //'mandatory:adj', untilpolyemized
  'dive:v', 'pick:n', 'advertise:v', 'bass:n', 'junk:n', 'stun:v', 'shiny:adj', 'mature:adj', 'manufacture:v', 'affection:n', 'retreat:v', 'clutch:v', 'fade:v', 'load:n', 'honey:n', 'tribe:n', 'lawn:n', 'chapter:n', 'kidney:n', 'extinguish:v', 'put out:v', 'spin:v', 'taxi:n', 'cab:n', 'destiny:n', 'fate:n', 'geography:n', 'trillion:num', 'parliament:n', 'outline:n', 'herd:n', 'passion:n', //'addicted:adj', untilpolyemized
  'fuel:n', 'atom:n', 'ledge:n', 'snack:n', 'charm:v', //'distress:n', untilpolyemized
  'adapt:v', //'pledge:v', untilpolyemized
  'hike:v', 'backward:adj', 'appetite:n', 'hierarchy:n', //'hostile:adj', untilpolyemized
  'master:na', 'comet:n', 'survey:n', 'choke:v', 'saint:na', 'angel:na', 'pea:n', 'tremble:v', 'afford:v', 'robe:n', 'scream:v', 'corn:n', //'crop:n', untilpolyemized
  'quit:v', 'give up:v', //'mercy:n', untilpolyemized
  'cult:n', 'nurse:na', 'pleasure:n', 'diameter:n', 'blast:v', 'rookie:na', //'juvenile:adj',
  'gown:n', 'halt:v', 'roar:v', 'growl:v', 'grunt:v', 'fountain:n', 'revenge:n', 'lure:v', 'seduce:v', 'attract:v', 'erupt:v', 'persuade:v', 'tempt:v', 'trip:v', 'cane:n', 'glow:v', 'sheet:n', //'rear:n', untilpolyemized
  'hut:n', 'title:n', //'grim:adj', untilpolyemized
  'novel:n', 'bead:n', 'drought:n', 'blame:v', 'sweat:v', 'tape:n', 'host:na', 'trust:v', 'merge:v', 'festival:n', 'demon:na', 'canal:n', 'canyon:n', 'award:n', 'gang:n', 'prince:nma', 'shatter:v', 'go down:v', 'descend:v', 'startle:v', 'handsome:adj', 'gorgeous:adj', 'tease:v', 'spider:na', 'jam:n', 'grill:n', 'tub:n', 'goose:na', 'peach:n', 'feed:v', 'hug:v', 'pet:na', 'blanket:n', 'meadow:n', 'cherry:n', 'lamb:na', 'suit:n', 'picnic:n', 'gravel:n', 'creek:n', 'clan:n', 'mat:n', 'hop:v', 'flu:n', 'gasp:v', 'crust:n', 'mosquito:na', 'vine:n', 'herb:n', 'breed:v', 'rich:adj', 'admit:v', 'mafia:n', 'mob:n', 'symptom:n', //'pace:v', untilpolyemized
  'sip:v', 'beg:v', 'melt:v', 'curse:v', 'cruise:v', 'sigh:v', 'shave:v', 'whisper:v', 'sniff:v', 'cone:n', 'urge:n', 'jam:v', 'thrust:v', 'ally:n', 'arc:n', 'owl:na', 'slash:v', 'harvest:n', 'gum:n', 'stool (seat):n', 'tuna:n', 'mattress:n', 'impress:v', 'drip:v', //'clove:n', untilpolyemized
  'chore:n', 'hedge:n', 'tattoo:n', 'coral:n', 'maid:na', 'circus:n', 'ripe:adj', 'snatch:v', 'perch:v', 'ramp:n', 'mug:n', 'hail:v', 'lump:n', 'scarf:n', 'clash:n', 'mammal:na', 'yank:v', 'pat:v', 'swirl:v', 'ham:n', 'fling:v', 'roam:v', 'hero:na', 'bald:adj', 'sausage:n', 'bloom:v', 'tug:v', 'shiver:v', 'hose:n', 'tap (faucet):n', 'bury:v', 'lazy:adj', 'packet:n', 'limb:n', 'eagle:na', 'bastard:na', 'zoo:n', 'stripe:n', 'snip:v', 'trim:v', 'curl:n', 'volcano:n', 'rebel:na', 'pasture:n', 'jealous:adj', 'chuckle:v', 'blur:n', 'fairy:n', 'squint:v', 'breed:n', 'wrestle:v', 'spoil:v', 'click:n', 'wrap:v', 'trench:n', 'knock:v', 'tackle:v', 'craft:n', 'insult:v', 'lettuce:n', 'canoe:n', 'spill:v', 'towel:n', 'lap:n', 'voyage:n', 'scoop:v', 'cheer:v', 'vest:n', 'bust:v', 'splash:v', 'rude:adj', 'clap:v', 'clue:n', 'swear:v', 'dare:v', 'crouch:v', 'deaf:adj', 'duck:v', 'mourn:v', //'hurry:v', untilpolyemized
  //'slump:v', untilpolyemized
  'hum:v', 'mimic:v', 'pierce:v', 'flick:v', 'juice:n', 'panic:v', 'pear:n', 'pluck:v', 'clown:na', //'chant:v', untilpolyemized
  'loaf:n', 'sweep:v', //'pity:v', untilpolyemized
  'dodge:v', 'forgive:v', 'rinse:v', 'annoy:v', 'crumble:v', 'vase:n', 'blunt:adj', 'fungus:n', 'fry:v', 'glide:v', 'pan:n', 'saucepan:n', 'stew:n', 'spy:na', 'stare:v', //'cozy:adj', untilpolyemized
  'knight:na', 'groan:v', 'plug:n', 'attic:n', 'beetle:na', 'wreck:v', 'smack:v', 'dusk:n', 'crumb:n', 'shovel:n', 'puppet:n', 'chapel:n', 'veil:n', 'fuzzy:adj', 'kin:na', 'dine:v', 'raft:n', 'spike:n', 'chaos:n', 'shout:v', 'yell:v', 'pub:n', 'peek:v', 'peak:n', 'camp:n', 'saw:n', 'nap:v', 'fox:na', 'shrug:v', 'orphan:na', 'crunch:v', 'crave:v', 'hire:v', 'rent:v', 'vent:n', 'bruise:n', 'shrub:n', 'hip:n', 'reptile:na', 'mustache:n', 'rodent:na', 'organ:n', 'hoof:n', 'tusk:n', 'cove:n', 'dew:n', 'glacier:n', 'hurricane:n', 'jungle:n', 'maze:n', 'puddle:n', 'shelter:n', 'spine:n', 'tangle:v', 'tunnel:n', 'universe:n', 'code:n', 'dove:na', 'ache:v', 'pedal:n', 'flake:n', 'shuffle:v', 'crate:n', 'launch:v', 'wrinkle:n', 'crease:n', 'knob:n', 'tablet:n', 'channel (of water):n', 'squat:v', 'graph:n', 'shudder:v', 'wink:v', 'pinch:v', 'villain:n', 'paw:n', 'brag:v', 'biscuit:n', 'border:n', 'drench:v', 'weave:v', 'rust:n', 'gag:v', 'nag:v', 'sling:n', 'pulse:n', 'prowl:v', 'eel:na', 'caterpillar:na', 'fluent:adj', 'stir:v', 'prick:v', 'bribe:v', 'post:n', 'post:v', //'gouge:v',untilpolyemized
  'crumple:v', 'skid:v', 'suffocate:v', 'soak:v', 'porch:n', 'veranda:n', //'swipe:v', untilpolyemized
  'hawk:na', 'lid:n', 'ghost:na', 'traffic:n', 'rat:na', 'salad:n', 'ankle:n', 'skip:v', //'carve:v', untilpolyemized
  'slap:v', 'petal:n', 'cuddle:v', 'wagon:n', 'steer:v', 'skim:v', 'fang:n', 'disk:n', 'drum:n', 'faint:v', 'temperature:n', 'frost:n', 'bubble:n', 'blush:v', 'spectate:v', //'litigation:n', untilpolyemized
  'anger:n', //'cocktail:n', untilpolyemized
  'division:n', 'prejudice:n', 'certificate:n', 'spectrum:n', 'enlist:v', //'predecessor:n', untilpolyemized
  'correlate:v', 'update:n', //'exile:n', untilpolyemized
  'chorus:n', 'comic:adj', //'endangered:adj', untilpolyemized
  //'caution:n', untilpolyemized
  'compile:v', //'notable:adj', untilpolyemized
  'endorse:v', 'export:v', //'commerce:n',untilpolyemized
  'forge:v', 'surgery:n', 'disrupt:v', //'breakthrough:n', untilpolyemized
  'remains:n', 'alert:v', 'allege:v', //'urgent:adj', untilpolyemized
  'choir:n', 'pronounce:v', 'banner:n', 'confine:v', //'reform:v',untilpolyemized
  //'outbreak:n',untilpolyemized
  'strand:n', 'author:na', 'writer:na', 'orchestra:n', 'hazard:n', 'confirm:v', 'validate:v', //'accommodation:n',untilpolyemized
  'vanilla:n', 'circulation:n', //'prescribe:v',untilpolyemized
  'courtesy:n', //'graphic:n',untilpolyemized
  'sentence:n', 'sentence:v', //'transplant:n',untilpolyemized
  'illuminate:v', 'venue:n', //'strict:adj',untilpolyemized
  'fraud:n', 'penetrate:v', 'flaw:n', 'skinny:adj', 'posture (bodily position):n', 'rehearse:v', //'despair:n',untilpolyemized
  'lime:n', 'strawberry:n', 'guerrilla:na', 'rally:v', 'moisture:n', 'trophy:n', 'ironic:adj', 'phrase:n', 'barrier:n', 'draft:n', 'rattle:v', 'import:v', 'shower:n', 'vow:v', //'semester:n',untilpolyemized
  'tumble:v', //'backup:n',untilpolyemized
  'modest:adj', 'grid:n', 'rotate:v', 'polite:adj', 'scrape:v', 'long (want for):v', 'audit:v', 'bump:n', 'peculiar:adj', 'sample:n', 'absent:adj', 'absence:n', 'singer:na', 'national:adj', 'urban:adj', 'friendly:adj', 'painting:n', //'retention:n',untilpolyemized
  //'highlight:n',untilpolyemized
  'equivalent:adj', 'concept:n', 'powerful:adj', 'modify:v', 'summary:n', //'nurture:v',untilpolyemized
  'lobby:n', 'gene:n', //'memorial:n',untilpolyemized
  'tenant:na', 'total:n', 'grade:n', 'ruler:na', 'noble:adj', 'obsess:v', 'hang out:v', 'damp:adj', 'moist:adj', 'nutrition:n', 'melody:n', 'tune:n', 'memoir:n', 'diary:n', 'defy:v', 'stack:v', 'wallet:n', ///////////////////////////////////////////////////////////////// end of uncertain area
  'scrap:n', //
  'academy:n', 'inject:v', 'axis:n', 'suitcase:n', 'supervise:v', //
  //'precede:v', //untilpolyemized
  'scandal:n', 'substitute:v', // swap
  //'con:n',untilpolyemized
  'bump:v', //
  //'precedent:n',
  'current:n', 'calf:n', // what kind?
  'nursery:n', 'verify:v', //'encompass:v',
  //'diplomacy:n', //untilpolyemized
  'spice:n', //'dean:na',untilpolyemized
  'umbrella:n', 'millennium:n', //
  'intimate:adj', //
  'obey:v', //
  //'guardian:na', //untilpolyemized
  'divert:v', //
  'passive:adj', 'score:n', //
  //'monopoly:n',untilpolyemized
  'broth:n', 'summon:v', //
  'option:n', // choice
  'dangle:v', 'cigar:n', 'audience:na', 'haven:n', 'spark:n', 'spare:adj', 'weep:v', 'liquor:n', 'affirm:v', //
  'contact:n', //
  'span:n', //
  'linger:v', //
  'applaud:v', 'medal:n', 'cube:n', 'calm:adj', //
  'embassy:n', 'dim:adj', //
  'plantation:n', //'excess:adj', //untilpolyemized
  'echo:n', // reflection
  'antique:adj', 'dairy:n', //
  'gardener:na', 'manipulate:v', //
  'wit:n', 'skate:v', //'deed:n', // untilpolyemized
  'film:n', //
  'closure:n', //
  'luxury:n', // pleasure
  //'institute:n', // untilpolyemized
  'ignore:v', 'competent:adj', // skilled
  //'primitive:adj', //untilpolyemized
  'brow:n', 'recycle:v', //reuse
  //'tuition:n', // untilpolyemized
  'government:n', //
  'bid:v', 'repetition:n', 'niche:n', //courtyard:n', //untilpolyemized
  'terror:n', 'revise:v', //
  'fascinate:v', //
  'generate:v', 'propaganda:n', //disinformation advertisement
  'parallel:adj', // side by side
  'premise:n', //'underscore:v',untilpolyemized
  'formula:n', //'prop:n', //untilpolyemized
  'incident:n', //'fulfill:v', //untilpolyemized
  'specimen:n', //'thorough:adj',untilpolyemized
  //'spectacle:n', //untilpolyemized
  //'thrill:n',untilpolyemized
  //'matrix:n',untilpolyemized
  //'runway:n', //untilpolyemized
  'transparent:adj', 'circulate:v', //
  //'forecast:n',untilpolyemized
  'paragraph:n', 'absurd:adj', 'reservoir:n', 'feast:n', // celebration
  'toddler:na', 'logo:n', 'sway:v', 'maximum:n', 'refuse:v', //
  'flush:v', 'lick:v', 'license:n', //'align:v',untilpolyemized
  'defect:n', //'subjective:adj', // untilpolyemized
  'economic:adj', 'accountant:n', 'valve:n', 'advertisement:n', // announcement
  //'petition:n',untilpolyemized
  'artery:n', 'static:adj', //'curator:n',
  //'nonsense:n',
  'humble:adj', //
  'thesis:n', // belief
  //'audio:adj',untilpolyemized
  'contrast:v', 'qualify:v', //
  'ponder:v', //
  'complicate:v', 'sanctuary:n', //'denounce:v', //untilpolyemized
  //'credible:adj', // untilpolyemized
  'simmer:v', //'wary:adj', // untilpolyemized
  'saturate:v', 'embed:v', 'elevate:v', 'lottery:n', 'fringe:n', 'lease:n', 'murmur:v', 'scan:v', //
  'appliance:n', 'gauge:n', 'census:n', 'rationale:n', 'inhabit:v', //'quota:n',untilpolyemized
  //'stride:n',untilpolyemized
  //'excerpt:n', //untilpolyemized
  'miniature:adj', 'name:v', // derive?
  'dub:v', 'warrant:n', //
  //'copyright:n',untilpolyemized
  //'franchise:n',untilpolyemized
  'slogan:n', //'outrageous:adj', //untilpolyemized
  'shrine:n', 'mold:n', //'misery:n', //untilpolyemized
  'nickname:n', 'avenue:n', 'dial:v', 'margin:n', //'mustard:n', //untilpolyemized
  'fertility:n', //'municipal:adj',
  //'grave:adj',untilpolyemized
  'notify:v', //
  'inform:v', //
  'garment:n', //'activate:v', //untilpolyemized
  'naive:adj', 'exert:v', //'kindergarten:n', //untilpolyemized
  'cereal:n', 'fracture:n', 'connect:v', //
  'quilt:n', 'sensible:adj', //
  'pyramid:n', 'bachelor:na', 'decorate:v', // dress up
  //'doctrine:n', //untilpolyemized
  'descendant:na', 'multiply:v', 'pumpkin:n', 'imitate:v', //
  //'velvet:n',untilpolyemized
  //'notorious:adj',untilpolyemized
  'compost:n', 'fertilizer:n', 'lethal:adj', // deadly
  'fatal:adj', 'olive:n', 'toast:n', 'distract:v', 'jelly:n', 'basin:n', //'industrial:adj',untilpolyemized
  'heir:na', 'foam:n', 'insure:v', 'assure:v', 'guarantee:v', //
  'asteroid:n', 'anticipate:v', 'crisp:adj', 'meditate:v', 'protest:v', 'deprive:v', 'take away:v', 'induce:v', 'compact:adj', //'transcript:n', // untilpolyemized
  'flourish:v', 'lobster:na', 'detect:v', //
  'abundant:adj', //'prone:adj',
  'exclude:v', // leave out
  //'fond:adj',
  //'surplus:n',untilpolyemized
  'poise:v', 'vicious:adj', //
  'drape:v', // dress:v
  'wedge:n', 'coffin:n', 'shed:n', 'tense:adj', 'tense:n', 'leisure:n', 'recreation:n', // fun
  'prototype:n', 'emit:v', //
  'acquaintance:na', //'contempt:n', //untilpolyemized
  'exclaim:v', 'clip:v', //
  'dentist:na', // tooth doctor
  'den:n', 'oyster:n', 'exaggerate:v', 'opposite:adj', //'whisk:v',
  'pastry:n', 'desert:v', //
  'dash:n', // what kind?
  'awesome:adj', //
  'lesbian:na', //
  'bait:n', 'miracle:n', 'sore:adj', 'blend:v', 'reef:n', 'oath:n', // promise
  //'embargo:n', //untilpolyemized
  'erect:v', 'implant:v', //'vintage:n',
  'altitude:n', 'glare:v', 'collaborate:v', //'succession:n', //untilpolyemized
  'waiter:na', 'elk:na', 'remnant:n', 'cement:n', 'recite:v', //
  'situate:v', 'cuisine:n', 'devastate:v', 'clause:n', 'navigate:v', 'darling:n', //
  'parlor:n', 'accessory:n', // up to here with untilpolyemized
  'resent:v', 'terrace:n', //'overseas:adj',
  'petty:adj', 'temper:n', //
  'blossom:v', 'ritual:n', 'generic:adj', 'marathon:n', 'backpack:n', 'massacre:n', 'spur:n', //
  'constitution:n', //
  //'cinnamon:n',
  'devote:v', 'roster:n', 'spawn:v', 'inflict:v', //
  'dump:n', // junk yard
  'compound:n', // mixture
  'turtle:na', 'ferry:n', 'sticky:adj', 'consult:v', 'astonish:v', 'turmoil:n', 'keen:adj', //
  'offspring:na', 'archive:n', // collection
  'receipt:n', //
  'pillar:n', 'mast:n', 'probe:v', //
  'privilege:n', //
  'carriage:n', 'artillery:n', 'cannon:n', // big gun
  'pavement:n', 'postpone:v', 'delay:v', //
  'motif:n', 'hobby:n', //'commodity:n',
  'velocity:n', 'reconcile:v', //
  'compartment:n', 'hub (center of activity):n', 'usher:n', // attendant
  'fury:n', 'embark:v', 'spontaneous:adj', 'tour:n', //'slender:adj',
  'bat (winged mammal):na', 'bat (club):n', //
  'necklace:n', 'perimeter:n', //'brochure:n',
  'blouse:n', 'brace:v', 'perfume:n', 'flock:n', 'firearm:n', 'sermon:n', 'refine:v', 'bond:v', 'volatile:adj', //
  'oval:n', 'mule:na', 'rigorous:adj', //
  'supplement:v', //
  'hurdle:n', 'sturdy:adj', 'propel:v', 'parsley:n', 'replicate:v', 'distort:v', 'discharge:v', //
  'kink (sharp twist):n', 'radical:adj', 'swift:adj', 'manifest:v', 'basic:adj', 'tab:n', // what tab?
  'stalk:v', 'intimidate:v', //
  'verge:n', 'bunch:n', 'lace:n', 'lord:na', 'deter:v', 'expire:v', 'messy:adj', 'catastrophe:n', //'adjacent:adj',
  'embryo:n', //'stark:adj',
  //'lucrative:adj',
  'transcend:v', 'resist:v', 'violin:n', 'piano:n', //'prompt:adj',
  'escort:v', // accompany
  'stall:n', 'detention:n', 'pact:n', //
  'hull:n', 'oblige:v', 'inquire:v', 'deposit:v', 'prestige:n', //
  'elevation:n', 'linguistics:n', 'vibrant:adj', // colorful
  'interrogate:v', 'imminent:adj', 'foil:n', 'landlord:na', 'bunker:n', 'animate:v', 'amuse:v', //'curb:v',
  'imply:v', //'anthropology:n',
  'conquer:v', //
  'dictator:na', //
  'composite:n', 'therapy:n', 'fetch:v', 'inhale:v', 'siren:n', 'vacant:adj', 'width:n', 'referendum:n', 'complement:v', 'allocate:v', 'tiger:na', 'lush:adj', 'scarce:adj', 'charity:n', 'barbecue:n', 'definite:adj', 'discriminate:v', 'nowadays:adv', 'territory:n', 'catalog:n', //'marsh:n',
  //'polar:adj',
  'gradual:adj', //
  'stall:v', 'casual:adj', //'median:adj',
  'shrimp:na', 'pending:adj', 'coconut:n', 'badge:n', 'navy:n', 'void:n', 'infant:na', 'granite:n', 'erode:v', 'restrain:v', 'restrict:v', 'syrup:n', 'beverage:n', 'premiere:n', 'oppress:v', //
  'ammunition:n', 'hybrid:n', 'indulge:v', 'pest:na', 'prairie:n', 'serial:adj', //'dice:n',
  'twin:n', 'dwarf:na', 'surpass:v', //
  'infinite:adj', 'gossip:n', 'contradict:v', 'commute:v', //'patio:n',
  'sincere:adj', 'demise:n', //
  'enrich:v', //
  'crater:n', 'cushion:n', 'princess:nfa', 'twilight:n', // sunset
  'comprehend:v', 'dispose:v', 'squirrel:na', 'superb:adj', //'gear:v',
  'salon:n', 'evacuate:v', 'recruit:v', 'squash:v', //'gesture:n', untilpolyemized
  'affiliate:v', 'elusive:adj', 'bureaucrat:na', //
  'immune:adj', 'nucleus:n', 'cater:v', 'buffalo:na', 'blonde:adj', 'tornado:n', 'camel:na', 'conform:v', 'book:v', 'cuff:n', // what meaning?
  'bud:n', 'admire:v', 'semen:nm', 'withstand:v', 'earring:n', 'irrigate:v', 'pattern:n', 'expel:v', 'extinct:adj', //
  'apparatus:n', 'reluctant:adj', 'excuse:v', 'cabbage:n', 'loose:adj', 'gallery (art):n', 'solid:adj', //
  'convince:v', 'invest:v', //'prevalent:adj',
  //'sovereign:n',
  'benign:adj', 'boulder:n', 'bitter:adj', 'notice:v', 'basement:n', 'kidnap:v', 'rugged:adj', //
  'obscure:adj', 'characteristic:n', //
  'earnest:adj', //'optimal:adj',
  'coherent:adj', 'staple:n', // what kind?
  'plaque:n', // what kind?
  'confidential:adj', // secret adj
  'celebrity:na', // name?
  'sleek:adj', 'elaborate:v', //elaborate:adj? //
  'compatible:adj', 'deduce:v', 'whiskey:n', 'dune:n', 'appropriate:adj', 'ambiguous:adj', 'fixture:n', 'vampire:na', //
  'mold:v', 'canopy:n', 'certify:v', //
  'merchandise:n', 'cynic:na', 'manual:adj', //
  'excel:v', 'accident:n', 'emperor:na', //
  'hue:n', 'intercept:v', 'irony:n', //
  'cylinder:n', 'membrane:n', 'take apart:v', //
  'dismantle:v', //
  'pave:v', 'surface:n', 'nervous:adj', //
  'anxious:adj', //
  'tourist:na', 'pottery:n', 'sauce:n', 'awe:n', 'scout:na', 'metro:n', //
  'assault:v', 'folder:n', 'exempt:adj', 'plausible:adj', //
  //'rep:n',
  //'behalf:n',
  'ethic:n', 'embarrass:v', //'confer:v',
  'paralyze:v', //'precinct:n',
  'arouse:v', //
  'napkin:n', 'consolidate:v', //
  'tribunal:n', 'pornography:n', 'urine:n', 'obese:adj', 'exacerbate:v', 'tangible:adj', //
  //'feat:n', //
  'lurk:v', 'hay:n', 'spinach:n', //
  //'realm:n', //
  'mistress:n', 'terminate:v', //
  'huddle:v', 'tactic:n', 'constellation:n', 'populate:v', //'maneuver:v', //
  'pearl:n', 'civilized:adj', //
  'civilization:n', //
  'pirate:na', 'worship:v', 'sewage:n', //'renowned:adj', //
  'sweetheart:n', //
  'platter:n', 'patent:n', //'disposition:n', //
  'allergy:n', 'triple:adj', //
  'virgin:na', 'express:v', 'provoke:v', //
  //'batter:v',
  'arrival:n', 'dart:n', 'sob:v', 'felony:n', 'retire:v', //
  'disaster:n', 'fuse:n', 'voucher:n', //receipt:n certificate:n check:n ticket:nnote:n
  //'subsidize:v', //
  'intricate:adj', //'pastoral:adj', //
  'orchard:n', 'fingerprint:n', 'mural:n', // painting:n scene:n view:n panorama:n sketch:n art:n canvas:n oil:n picture:n design:n drawing:n
  'burger:n', 'chick (girl):nfa', 'chord:n', // melody:ntune:n unity:n chime:n chorus:n piece:n
  'diaper:n', //'turbine:n', //engine
  'frenzy:n', 'reverse:adj', //
  'apartment:n', 'strength:n', 'shack:n', //'showcase:n', //
  //'eventually:adv', //untilpolyemized
  'insurgent:n', //'bleak:adj', //
  'trauma:n', 'insist:v', 'failure:n', 'crusade:n', 'torso:n', 'diagram:n', 'ginger:n', //'elimination:n',
  'hurl:v', 'luggage:n', 'baggage:n', 'friction:n', 'segregate:v', //'forensic:adj', //
  'foliage:n', 'grasp:v', 'tariff:n', 'examine:v', 'ignorant:adj', //'tick:v',
  'disguise:v', 'hatch:n', //
  'stain:v', 'amend:v', 'lipstick:n', //
  'seizure:n', 'cram:v', 'cathedral:n', //'palette:n',
  'selfish:adj', //
  'lament:v', 'basil:n', 'ignite:v', 'revolve:v', 'alternate:adj', 'spa (mineral spring):n', 'bully:na', 'arsenal:n', 'bracelet:n', 'contaminate:v', 'veto:v', 'inhibit:v', //'alumnus:n',
  //'dilemma:n',
  'hollow:adj', 'default:n', //
  'sickness:n', 'illness:n', 'vibrate:v', //'disperse:v', //
  'sober:adj', 'rainbow:n', //
  'impair:v', 'razor:n', 'charcoal:n', 'fertile:adj', 'slab:n', 'congregate:v', 'disgust:n', 'extreme:adj', 'yogurt:n', 'prose:n', 'absorb:v', 'crest:n', // what kind?
  'layout:n', 'mumble:v', 'capsule:n', 'pose:v', //
  'lever:n', 'abolish:v', //
  'liberate:v', 'yacht:n', //'anonymous:adj',
  //'autonomous:adj',
  //'mandate:n',
  'topple:v', 'rhetoric:n', //'inferior:adj',
  'reinforce:v', //'morale:n',
  'almond:n', 'prophet:na', 'pragmatic:adj', 'aboard:adv', //
  'graze (feed on):v', 'graze (touch):v', 'inn:n', 'lodge:n', 'persona:n', 'brief:adj', 'inspire:v', 'protagonist:na', 'comedy:n', 'ridicule:v', 'mock:v', 'escalate:v', 'scrub:v', 'rubble:n', 'debris:n', 'resemble:v', // look like
  'capture:v', 'seize:v', 'permission:n', 'avert:v', 'cavity:n', 'detain:v', //
  'genocide:n', 'novice:na', 'pedestrian:na', 'whip:n', //'residue:n', //
  'agony:n', //'accustom:v', //
  'empathy:n', 'deteriorate:v', 'collide:v', 'reap:v', 'plow:v', 'haggle:v', 'arrogant:adj', //'dubious:adj', //
  'facade:n', //'telescope:n',
  'eclipse:n', // derive
  'foresee:v', 'premier:adj', //'peril:n',
  'bracket:n', // what kind?
  'bra:n', // corset lingerie bikini
  //'wade:v',
  'poultry:na', 'reign:v', 'patriot:n', 'convict:v', 'patrol:v', 'genetics:n', 'amateur:na', 'cellar:n', 'creature:na', //'paradigm:n', //
  'shooting star:n', //
  'archipelago:n', // derive
  'continent:n', //
  'oasis:n', 'peninsula:n', 'plateau:n', 'lust:n', 'humiliate:v', 'surf:n', //'aspire:v', // hope dream
  'pardon:v', 'bluff:v', 'resort:n', 'destruction:n', 'lecture:n', //'fumble:v', //
  //'sediment:n', //
  'evaporate:v', 'spelling:n', //'whine:v', //
  'fetus:na', 'wardrobe:n', // drive
  'decay:v', 'compass:n', //
  'sprout:v', 'boundary:n', //
  'alarm:n', 'souvenir:n', 'apron:n', 'layer:n', 'description:n', 'venom:n', 'lung:n', //'spook:v', //
  'wholesome:adj', //'pun:n',
  //'fascist:adj',
  'chime:n', //
  'treason:n', 'cartoon:n', //
  'proverb:n', //'flimsy:adj',
  //'redundant:adj',
  'vulture:na', 'mane:n', //'bigotry:n',
  'tailor:na', // derive
  'agitate:v', //
  'hangover:n', // derive
  //'sarcastic:adj',
  'panorama:n', // derive
  //'tranquil:adj',
  //'miscarriage:n', //
  //'bombard:v',
  'zombie:na', //
  //'scapegoat:n', //
  'analogy:n', 'prism:n', 'trumpet:n', 'courier:n', // derive
  'armpit:n', // derive
  //'ovation:n',
  //'quail:na',
  //'appraise:v', //
  //'manic:adj', //
  'stoke:v', 'radius:n', //'heirloom:n',
  //'excruciating:adj', //
  'practical:adj', //
  //'migraine:n', //
  'overdose:n', // derive
  'ribbon:n', 'hoax:n', 'vindicate:v', //
  //'writhe:v',
  'axle:n', //'skirmish:n',
  //'junction:n',
  //'instil:v',
  //'blunder:n',
  'seaweed:n', // derive
  'memento:n', 'urn:n', 'cull:v', 'elite:adj', 'kiosk:n', 'marinate:v', //'angst:n',
  //'savvy:adj',
  'handcuff:n', // derive
  'coil:n', //
  'alibi:n', //
  'tropical:adj', //
  'lava:n', // derive
  //'pamper:v',
  'stereotype:n', // derive
  'muffle:v', //'geek:na', //
  'radiate:v', //
  'show off:v', 'bias:n', 'smuggle:v', //'slit:n',
  //'grit:n',
  'toss:v', 'ministry:n', 'robust:adj', //
  'elf:na', 'stalemate:n', //'veneer:n', //
  'chasm:n', //
  'fathom:v', 'priority:n', 'habit:n', 'idol:na', //'idle:n',
  'ruffle:v', 'coincidence:n', // accident:n fate:n fluke:n chance:n incident:n luck:n
  'acronym:n', // derive
  'trivia:n', 'feign:v', //
  //'kerosene:n', //
  'fluke:n', //
  //'futile:adj',
  'cleavage:nf', // below neck, between breast, between chest
  'laundry:n', // derive
  'smirk:v', 'treasure:n', 'candidate:n', //
  'conference:n', //
  'currency:n', 'scatter:v', //
  'spouse:na', 'fluid:n', 'whisker:n', // derive
  'spank:v', 'tone:n', //
  'pitch:n', //
  'shy:adj', //
  'elegant:adj', //
  'screen:n', //
  'vendor:na', // more derive
  'cling:v', //
  'paradox:n', //
  'puppy:na', 'kitten:na', 'spasm:n', 'abdomen:n', 'midriff:n', 'gadget:n', //
  //'development:n',untilpolyemized
  'florist:na', 'subtlety:n', 'oral:adj', 'stable:n', // derive
  'leverage:n', 'psychologist:na', 'armory:n', 'locksmith:na', 'chemist:na', 'grocer:na', 'graveyard:n', 'winery:n', 'assassinate:v', 'virus:n', 'pandemic:n', 'tragedy:n', //
  'goblin:na', //
  'acute:adj', //
  'cupboard:n' //
];

// test for duplicates
/*
for (let x = 0; x < polysemy.length; x++) {
  for (let y = 0; y < polysemy.length; y++) {
    if (x != y && polysemy[y].includes(polysemy[x][0]) && polysemy[y].includes(polysemy[x][1])) {
      console.log('duplicate', polysemy[x])
    }
  }
  if (!englishListDefault.some(function (a) { return a.includes(polysemy[x][0]) })&& (!polysemy[x][1].includes(',') && !polysemy[x][0].includes(','))) {
    console.log(polysemy[x], 'cant find', polysemy[x][0])
  }
  if (!englishListDefault.some(function (a) { return a.includes(polysemy[x][1]) }) && (!polysemy[x][1].includes(',') && !polysemy[x][0].includes(','))) {
    console.log(polysemy[x], 'cant find', polysemy[x][1])
  }
}

for (let i = 0; i < englishListDefault.length; i++) {
  for (let j = 0; j < englishListDefault.length; j++) {
    if (i != j && englishListDefault[i] == englishListDefault[j]) {
      console.log(i, 'same word twice in English list')
    }
  }
}
*/
let defaultGenders = {}
let defaultAnimateWords = [];

for (let i = 0; i < englishListDefault.length; i++) {
  if (englishListDefault[i].endsWith('a')) {
    defaultAnimateWords.push(englishListDefault[i].split(':')[0]);
    englishListDefault[i] = englishListDefault[i].slice(0, -1);
  }
  if (englishListDefault[i].endsWith('nm') || englishListDefault[i].endsWith('nf')) {
    let entry = englishListDefault[i].split(':');
    let gender = englishListDefault[i].slice(-1);
    englishListDefault[i] = entry[0] + ':n';
    defaultGenders[entry[0]] = gender;
  }
}

//Object.defineProperties(Array.prototype, { count: { value: function(value) { return this.filter(x => x==value).length; }}});
//for (let i of englishListDefault) { if (englishListDefault.count(i) > 1) consol.log(i) }

/**********************************
 !-- Regex patterns for phonemes and syllabes
 ***********************************/
// u = unicode set; p = string regex pattern; rg = regex type, global

const uSuperConsonant = 'ᵐᶬⁿᶯᶮᵑᶰᵖᵇᵗᵈᶜᶡᵏᶢˀᶲᵝᶠᵛᶿᶞˢᶻᶴᶝᶾᶽᶳᶼᶜᶨˣˠᵡʶˤˁʰʱᶹʴʵʲᶣᶭʷʳᵸˡᶩᶫ';
// can be IIF
const uConsonant = 'bɓβʙcçdɖɗᶑfɟʄɸgɠɢʛɰhɦħɧɥʜjʝklɫɬɮɭʟmɱnɳɲŋɴpqrɹɾɽɻɺʁʀsʂɕʃtʈvⱱʋwʍxɣχʎzʐʑʒθðʔʡʕʢʦʣʧʤʨʥʘǀǃǂǁ';
const uConsonant_Mn = '̴̥̬̤̰̪̺̼̻̟̠̝̞̆̊̃͆̚';
// no tie bars u0361 u035C
// extra short u0306 voiceless u0325 voiceless above u030A vocied u032C breathy u0324 creaky u0330 dental below u032A aptical u033A linguolabial u033C laminal u033B nasal u0303 advanced u031F retracted u0320 raised u031D lowered u031E unreleased stop u031A velar.pharygran overlay u0334 dental above u0346
const uConsonant_Mc = 'ʼːˑ˖˗˔˕⌠⌡' + uSuperConsonant;
const pConsonant_M = '[' + uConsonant_Mn + ']*[' + uConsonant_Mc + ']*';
const pNonTieBarConsonant = '[' + uSuperConsonant + ']*[' + uConsonant + ']' + pConsonant_M;
// can be IIF
const pTieBarConsonant = pNonTieBarConsonant + '͡' + pNonTieBarConsonant;
const pConsonant = pTieBarConsonant + '|' + pNonTieBarConsonant;
const rgConsonant = new RegExp(pConsonant, 'g');

const uSuperVowel = 'ⁱʸᶤᶶᵚᵘᶦᶧᶷᵉᶱᵒᵊᵋꟹᶟᶺᵓᵆᵄᵅᶛᵃ';
// non-displaying symbol is œ  // can be IIF
const uVowel = 'iyɨʉɯuɪʏʊeøɘɵɤoəɛœɜʌɞɶɔæɐaɑɒʊ' + uSuperVowel;

const uVowel_Mn = '̟̠̝̞̹̜̘̙̈̽̆˞̥̤̰̊̃̋́̄̀̏̂̌͗͑';
// excludes dipthong u032F
// has advanced u031F retracted u0320 raised u031D lowered u031E centralised u0308 mid centralised u033D more rounded u0339 less rounded u031C advanced tongue root u0318 retracted tongue root u0319 extra short u0306 roticised u02DE voiceless u0325 voiceless above u030A breathy u0324 creaky u0330 nasal u0303 tones \u030B\u0301\u0304\u0300\u030F\u0302\u030C more rounded above u0357 less rounded above u0351
const uVowel_Mc = 'ːˑ˥˦˧˨˩¹²³⁴⁵⌠⌡' + uSuperVowel;
const pVowel_M = '[' + uVowel_Mn + ']*[' + uVowel_Mc + ']*';
const pSyllabicConsonant = '[' + uSuperConsonant + ']*[' + uConsonant + '][' + uConsonant_Mn + ']*̩[' + uConsonant_Mc + ']*';
const pNonSyllabicVowel = '[' + uVowel + '][' + uVowel_Mn + ']*̯[' + uVowel_Mc + ']*';
// u032F is dippthong symbol
const pSyllabicVowel = '[' + uVowel + ']' + pVowel_M;
const pVowel = '(?:' + pNonSyllabicVowel + ')*' + pSyllabicVowel + '(?:' + pNonSyllabicVowel + ')*';
const pSyllabicNucleus = pVowel + '|' + pSyllabicConsonant;
const rgSyllabicNucleus = new RegExp(pSyllabicNucleus, 'g');

const uDiacritics = (function () {
  let allMnMc = uConsonant_Mn + uConsonant_Mc + uVowel_Mn + uVowel_Mc;
  return allMnMc.split('').filter((v, i) => allMnMc.indexOf(v) == i).join('');
})();
const direplace = new RegExp('[' + uDiacritics.replace(/[\u033A\u032A\u0346\u033B\u033C\u031D\u031E\u031F\u0320\u0308\u0361\u030A]/g, '') + ']', 'g');
// aptical dental_below dental_above laminal raised lowered advanced retracted
const mp3replace = new RegExp('[' + uDiacritics.replace(/[\u033A\u032A\u0346\u033B\u033C\u031D\u031E\u031F\u0320ʼ]/g, '') + ']', 'g');

// rgSyllable must be const! This should never be a dynamic pattern
// Needs syllabify() function to match all consosant clusters at end of word properly
const pSyllable = '(?:(?:' + pConsonant + ')*(?:' + pSyllabicNucleus + '))(?:' + pConsonant + '(?![̩' + uVowel + uDiacritics + 'rɾɹljw]+))*';
const rgSyllable = new RegExp(pSyllable, 'g');

const rgStressedSyllable = new RegExp('(ˌ|ˈ)?' + pSyllable, 'g');

const pDiphthong = '(?:(?:' + pNonSyllabicVowel + ')*' + pSyllabicVowel + '(?:' + pNonSyllabicVowel + ')+|(?:' + pNonSyllabicVowel + ')+' + pSyllabicVowel + '(?:' + pNonSyllabicVowel + ')*)';
// fix - is this unnecessary?

const inputMultiplier = String.raw`(\*\d{0,3}(\.\d)?)?`;
// can be IIF
const rgValidConsonantInput = new RegExp('(' + pConsonant + ')+' + inputMultiplier, 'g');
const rgValidVowelInput = new RegExp('(' + pNonTieBarConsonant + ')?(' + pSyllabicConsonant + '|(' + pDiphthong + ')|(' + pSyllabicVowel + ')+)(' + pNonTieBarConsonant + ')?' + inputMultiplier, 'g');

const diphthongSegments = new RegExp('(' + pNonTieBarConsonant + ')|[' + uVowel + '][' + uVowel_Mn + ']*|[' + uVowel_Mc + ']+', 'g');
const rawVowel = new RegExp('[' + uVowel + ']', 'g');

const findAlpha = new RegExp('\\[.*?\\]|[CDXV]|' + pSyllabicNucleus + '|' + pConsonant, 'g');
const findUnder = new RegExp('\\[.*?\\]\\*?|{.*?}\\*?|\\(.*?\\)\\*?|[CDXV]\\*?|_|#|,|' + pSyllabicNucleus + '\\*?|' + pConsonant + '\\*?', 'g');
const fAssimilation_rg = / *@(place|manner|voice|height|backness|roundness) */;

let alphaLocation;
let underscoreLocation;
let featureAssimilation;

const LOWER_SET = String.raw`[\p{Ll}\d]+`;
const UPPER_SET = String.raw`[\p{Lu}\d]+`;
const AFFIX_TAG = String.raw`${UPPER_SET}(\.${UPPER_SET})*(:${UPPER_SET})?`;

const gu = 'gu';
// can be IIF
const rg_upperTag = new RegExp(String.raw`${UPPER_SET}|[. ]`, gu);
const rg_affixTag = new RegExp('^' + AFFIX_TAG + '$', 'u');
const rg_getAffixes_default = new RegExp(`${AFFIX_TAG} *=`, gu);
const rg_getAffixes_inTables = new RegExp(`${AFFIX_TAG} *(~|=)`, gu);
const rg_getAffixes_pos = new RegExp(`${LOWER_SET} *=`, gu);
const rg_nameOfAffix = new RegExp(String.raw`^(\p{Ll}[\p{Ll}\d]*|${AFFIX_TAG})`, gu);
const rg_allLowerCase = new RegExp(String.raw`^\p{Ll}(${LOWER_SET})?$`, 'u');
// must not be global -- causes bug
const rg_phrasalWord = new RegExp(String.raw`(\p{Ll})\.(\p{Ll})`, gu);
const compound_lastIndex = new RegExp(String.raw` +|[\p{Ll})]([\-.][\p{Lu}\d]+)*(?=[\-.]\p{Ll})`, gu);
// String.raw` +|[\p{Ll}\d] ???
const rg_word_or_affix = new RegExp(String.raw`${AFFIX_TAG}|[^\-.]+`, gu);
const deltaCheckForAffixTag = new RegExp(String.raw`^${AFFIX_TAG} *(~.*?)? *= *`, gu);

/**********************************
 !-- Naturalistic segment frequencies and vowel inventories
 ***********************************/
// consonants by frequency in natural languages
// fix - what about tie bars?
const mostCommonC = ['m', 'k', 'j', 'p', 'w', 'n', 's', 't', 'b', 'l', 'h', 'g', 'ŋ', 'd', 'ɲ', 'f', 'ʧ', 'ʔ', 'ʃ', 'r', 'z', 'ɾ', 'ʤ', 'dʒ', 'v', 't̪', 'ʦ', 'x', 'd̪', 'kʰ', 'gb', 'kp', 'n̪', 'pʰ', 'kʷ', 'ʒ', 'c', 'ɣ', 'ɓ', 'mb', 'ɟ', 'ŋg', 'nd', 'β', 'tʰ', 'ɗ', 'l̪', 'ʣ', 's̪', 'q', 'kʼ', 'ʈ', 'gʷ', 'ɖ', 't̪ʰ', 'ʧʰ', 'ʧʼ', 'tʼ', 'ɸ', 'pʼ', 'ndʒ', 'χ', 'ʂ', 'ɽ', 'ɳ', 'cç', 'ɬ', 'ŋʷ', 'ç', 'ɟʝ', 'ʎ', 'ɭ', 'ð', 'ʦʼ', 'ʦʰ', 'ŋm', 'θ', 'kʲ', 'z̪', 'ɦ', 'mː', 'ʈʰ', 'nː', 't̪s̪', 'xʷ', 'r̪', 'kː', 'hʷ', 'qʼ', 'ʁ', 'lː', 'tʲ', 'gʲ', 'mʷ', 'ŋgʷ', 'ħ', 'ʈʂ', 't̪ʼ', 'bʷ', 'b̤', 'cʰ', 'bː', 'ndz', 'sː', 'kʷʼ', 'ʝ', 'pː', 'tː', 'nz', 'ɱv', 'gʰ', 'cçʰ', 'qʷ', 'n̠', 'gː', 'm̥', 'ʄ', 'qʰ', 'pʲ', 'mʲ', 'ɮ', 'fʷ', 'ɥ', 'dʲ', 'ʕ', 'jː', 'pʷ', 'χʷ', 'ɹ', 'ŋk', 'd̪z̪', 'ɖ̤', 'd̪̤', 'ʐ', 'ɻ', 'nt', 'rː', 'kʷʰ', 'bʲ', 'pf', 'dː', 'ɲː', 'ɲɟ', 't̪s̪ʰ', 'sʷ', 'n̥', 'mp', 'n̪d̪', 'tʷ', 'lʲ', 'ʋ', 'ɰ', 'ɾ̪', 'wː', 'j̰', 'w̰', 'ʍ', 'fː', 'ɢ', 'ŋː', 'ɺ', 'hʲ', 'ɬ̪', 'ʧː', 'ʃː', 'nʲ', 'ʃʷ', 'ⱱ', 'ŋ̥', 'ɕ', 'β̞', 'l̥', 'm̰', 'ɟ̤ʝ', 'ɲ̥', 'tɬʼ', 'ʧʷ', 't̪s̪ʼ', 'tɕ', 'cʼ', 'b̰', 'j̥', 'ɣʷ', 'nʷ', 'sʲ', 'ʤː', 't̠', 'bv', 'qʷʼ', 'ʔʷ', 'zː', 'fʲ', 'm̤', 'ʔʲ', 'ns', 'ʈʂʰ', 'g̤', 'ɠ', 'nʧ', 'ɗ̪', 'dʷ', 'lʷ', 'w̃', 'ʤʷ', 'ɾʲ', 'ɱ', 'ɲʷ', 'l̤', 'n̰', 'ʔː', 't̪ː', 'd̤', 'ɲ̟', 't̪ʲ', 'zʷ', 's̻', 'ʁʷ', 'mbʷ', 'tɬ', 'sʼ', 'ɟː', 'kǃ', 'vʲ', 'l̰', 'jʷ', 'ʤ̤', 'ʈː', 'kʼː', 'rʲ', 'l̠', 'ʑ', 'ʥ', 'k̰', 'p̰', 'bʰ', 'kʼʲ', 'ɗː', 'r̥', 'ʀ', 'ʧʼː', 'kǀ', 't̪ɬ̪ʼ', 'ɱf', 't̰', 'lˠ', 'hː', 'tʼː', 'ʒː', 'ɓ̥', 'n̪̥', 'l̪̥', 'd̰', 'rʷ', 'ɓː', 'd̪ː', 'xː', 'tɬʰ', 'ʈʂʼ', 'j̃', 'l̪ˠ', 'ɽ̤', 'n̪̰', 'tsʷ', 'r̃', 'ɢʷ', 'qʷʰ', 'ʃʼ', 'ɖʐ', 'qː', 'jˀ', 'ndʲ', 'ʃʲ', 'ᶑ', 'βʲ', 'ʧʲ', 'n̪̤', 'n̤', 'ʒʷ', 's̪ʲ', 'l̪ʲ', 'vʷ', 'cː', 'dʰ', 'ʐ̠', 'ɖː', 'nts', 'pʼː', 'pʲʰ', 'kǁ', 'zʲ', 'tsʲ', 'd̪ʲ', 't̪ɬ̪', 'ŋkʷ', 'ɺ̠', 's̪ʼ', 'ŋǃ', 'kǃʰ', 'ŋgʲ', 'kˀ', 'sˀ', 'qχ', 'sʰ', 'χː', 'sˤ', 'kʲʼ', 'ɗ̥', 'cɕ', 'l̪̰', 'ndʷ', 'kǀʰ', 'q̰', 'd̪ʰ', 'cʷ', 'wʲ', 'pˀ', 'ʧʷʰ', 'n̻', 's̪ː', 'tsː', 'nˀ', 'mˀ', 'ŋʲ', 'kʲʰ', 't̻', 'c̟', 'wˀ', 'ɸʲ', 'zˤ', 'lˤ', 'tˤ', 'dˤ', 'ʤʲ', 'vː', 'n̪t̪', 'd̠', 'l̃', 'n̪ʲ', 'gǃ', 'tr', 'dr', 'gǀ', 'ts̰', 'mʰ', 'nʰ', 'ʨʰ', 'r̤', 'ʧˀ', 'ʧʷʼ', 't̻s̻', 'dzː', 'l̻', 'ɳɖ', 'tx', 't̪θʼ', 't̪θ', 'kx', 'h̃', 't͉', 'p͉', 'k͉', 'ʰt', 'ʰk', 'ɳɖʐ', 'ʕː', 'ħː', 'kʷː', 'pfʰ', 'kxʰ', 'ɮ̪', 't̪ɬ̪ʰ', 'mbʲ', 'kǀ͓', 'ŋǀ͓', 'd̪ɮ̪', 'ŋ̰', 'kpʷ', 'ndr', 'n̠ʃ', 'ɲʒ', 'ŋmkp', 'dzʷ', 'ʤʰ', 'd̃', 'b̃', 'ɖʰ', 'ŋǁ', 'kǁʰ', 'ŋǀ', 'ɲ̤', 'k̟', 'd̻', 't̻ʰ', 'z̻', 'ɬʲ', 'r̠', 'ɴ', 't̪θʰ', 'ʔˤ', 'xʼ', 'kʰː', 'ʧʰː', 'tsʼː', 'ʰp', 'n̠ʒ', 'ʧʲʰ', 'dˤː', 'zˤː', 'sˤː', 'tˤː', 'ɟʝʷ', 'kǂ', 'tʲʰ', 'ɽ̃', 'ɾ̤', 'dɮ', 'n̠d̠', 't̪ˤ', 'kpʰ', 't̪s̪ʲ', 'mpʰ', 'kǁ͓', 'kǃ̠', 'v̤', 'd̪̰', 'ɲ̰', 'ɻʲ', 'βʷ', 'ɟʷ', 'ɽʰ', 'ɠɓ', 'k̰ʷ', 'g̰', 'ʈʼ', 'ʰm', 'ð̞', 'kpʲ', 'ps', 'ɥ̃', 'ɾʷ', 'kǀʼ', 'gǁ', 'cçʼ', 'β̃', 'w̤', 'tˀ', 'tsʷʰ', 'fʼ', 'd̻z̻', 'qχʷ', 'ɮʲ', 'tːs', 'ɬʼ', 'ʰt̠ʃ', 'rˤ', 'çʷ', 'g̤ʷ', 'd̪ð', 'mʷˠ', 'g̟', 'ʁ̞', 'cçʷ', 's̪ʷ', 'ɬ̪ː', 't̪s̪ʷʰ', 't̪s̪ʷʼ', 'z̪ˤ', 's̪ˤ', 'd̪ˤ', 't̪s̪ː', 'ʕ̝', 'z̪ʲ', 't̪ˀ', 'cɕʰ', 'ɲc', 'ɴq', 'ŋkʰ', 'ɺ̪', 'l̪̤', 'ŋǃ̠', 'ŋ̥ǀ͓ˀ', 'kǀ͓ʰ', 'ŋǁ͓', 't̪ʷ', 'ɳʈ', 'xʲ', 's̪ʰ', 'gǃx', 'gǂ', 'kǃx', 'ŋ̥ǃ', 'g̤ǃ', 'n̪d̪z̪', 'ɟ̰', 'r̪ʲ', 'nsʷ', 'ntʷ', 'ndʑ', 'ʄ̥', 'ɻʷ', 'kʰʷ', 'tʲʼ', 'ʕʷ', 'lʼ', 'ŋɣ', 'ng', 'cʲ', 'ɟʲ', 'ja', 'q̰ʷ', 's̺', 'c̰', 'bz', 'tç', 't̺', 'gbʲ', 'gᶣ', 'ɖr', 'ʈr', 'kxʼ', 'ɟ̤', 'ᶑʼ', 'cʼː', 'nɗ', 'kǁʼ', 'kǃʼ', 'ɗʲ', 'r̠ʲ', 't̪̰', 'c̤', 'd̤z', 'ʰɾ', 't͈', 'p͈', 'k͈', 't̻s̻ʼ', 'qχʷʼ', 'qχʼ', 'β̞ː', 'b̤̥', 'tz̤̥', 'g̤̥', 'd̤̥', 'k̟ʰ', 'ɾˀ', 'ŋ̥ʲ', 'gɣ', 'ʎ̟', 'ɸʷ', 'ɬː', 's̻ː', 'dl', 'ʃ͈ː', 'k͈ː', 's͈ː', 't͈ː', 'ɸʼ', 'ʰkʷ', 'çʲ', 'ɺʲ', 'bˀ', 'dˀ', 'kˤ', 'sʼː', 'ʁː', 'ħʷ', 'l̪ː', 'ɾˤ', 'lˤː', 'ʃ͉', 's͉', 'b̤ʲ', 'l̥ˠ', 'bʷˠ', 'ɾˠ', 'nˠ', 'n̥ʲ', 'n̥ˠ', 'ɸʷˠ', 'pʷˠʰ', 'l̥ʲ', 'ɾ̥ʲ', 'ɾ̥ˠ', 'ʃˠ', 'ʒˠ', 'ʒʲ', 'ʈʰː', 'pʰː', 'n̪ː', 't̪ʰː', 'ɟʝː', 'cçː', 'z͇', 'ɹ̪', 'ʃʷː', 'ʁʷˤ', 'qχʼː', 't̪s̪ʼː', 'χʷˤ', 'χʷː', 'χˤ', 'ʁˤ', 'z͇̪', 'n̠̥', 'ɬ̪ʲ', 'n̪t̪ʰ', 'n̪t̪s̪', 'ɳʈʂ', 'ŋ̥ʷ', 'nr', 'kǃ̠ʰ', 'ŋ̥ǁ͓ˀ', 'ŋ̥ǃ̠ˀ', 'kǁ͓ʰ', 'ɭ̥', 'gbʷ', 'ŋkʲ', 't̪ɦ', 'pɦ', 'kɦ', 'ɣʲ', 'ɟʑ', 'gʼ', 'gǀ͓', 'dʼ', 'tˠ', 'dˠ', 'gǂx', 'd̠ʒʼ', 'kǂʰ', 'ŋ̤ǃ', 'dz̤', 'ŋ̥ǀ͓ʰ', 'ŋǂ', 'ŋ̥ǃˀ', 'kǂx', 'b̪', 'ts', 'ɲɟʑ', 'n̪ʷ', 'ŋ̤', 'kʷˀ', 'ɰ̰', 'ɬ̪ʼ', 'ɓʲ', 'n̪z̪', 'ðʲ', 'nzʷ', 'n̠d̠ʒʷ', 'gv', 'kf', 'ɠ̥', 'ɗʒ', 'nh', 'nl', 'r̝', 'dʲʷ', 'tʰʷ', 'cʷʰ', 'mʼ', 'nʼ', 'wʰ', 'ɾʰ', 'ɗʰ', 'ɾ̥', 'ɟʰ', 'dzʰ', 'k̃', 'g̃', 'ntʰ', 'ṽ', 'nɟ', 'ju', 'wə', 'vʰ', 's̰', 'lʰ', 'w̥', 'ts̪', 'ⱱ̟', 'wa', 'ɥ̥', 'ɲj', 'ʰn̪', 'gbː', 'kpː', 't̪s', 'ɲʰ', 't̪n̪', 'tn', 'pm', 'kŋ', 'ʈɳ', 'tl', 'nd̪', 'tɕᶣ', 'ɕᶣ', 'sᶣ', 'dʑᶣ', 'ɲᶣ', 'ʙ', 'ɦʷ', 'ɗʷ', 'ɓʷ', 'm̤b̤', 'n̤d̤ɮ̤', 'ɦ̤', 'mbv', 'n̤d̤', 'ntsʼ', 'n̠t̠ʃʼ', 'z̤', 'kᶣ', 'mɓ', 'dx', 'kǁxʼ', 'gǁx', 'kǁx', 'kʘ', 'gǀx', 'kǀx', 'kǃxʼ', 'kǀxʼ', 'bβ', 'tɾ', 'dɾ', 'ndɾ', 'mpʲ', 'gʲʷ', 'lˀ', 'k̙', 'l̠˞', 'ʰw', 'ʰn', 'ʰd'];

// vowels by frequency in natural languages
const mostCommonV = ['ie̯', 'i', 'a', 'u', 'o', 'e', 'ɛ', 'ɔ', 'iː', 'aː', 'uː', 'ə', 'oː', 'eː', 'ĩ', 'ã', 'ũ', 'ɨ', 'ɪ', 'ʊ', 'õ', 'ẽ', 'ɔː', 'ɛː', 'o̞', 'e̞', 'ɛ̃', 'ɔ̃', 'æ', 'ɯ', 'ɨ̃', 'ɑ', 'ʌ', 'əː', 'ɪ̃', 'y', 'ʊ̃', 'ʊː', 'ũː', 'ĩː', 'ɪː', 'ə̃', 'ɨː', 'õ̞', 'ãː', 'ai̯', 'ø', 'ẽ̞', 'ʉ', 'ɑː', 'au̯', 'ɤ', 'œ', 'õː', 'æː', 'a̟', 'ɐ', 'ɒ', 'ɘ', 'æ̃', 'ẽː', 'ɯ̃', 'o̞ː', 'ɛ̃ː', 'ɔ̃ː', 'ɯː', 'ɜ', 'ɑ̃', 'e̞ː', 'æ̞̃', 'ia̯', 'ui̯', 'a̰', 'øː', 'yː', 'ḭ', 'o̤', 'ua̯', 'ə̃ː', 'oi̯', 'ei̯', 'ṵ', 'o̰', 'ḛ', 'e̤', 'i̤', 'ʌ̃', 'ʌː', 'ṳ', 'a̤', 'uə̯', 'ou̯', 'ɔ̤', 'ɵ', 'ɔi̯', 'u̞', 'a̟ː', /*'ie',*/
  'ʏ', 'ɛ̤', 'ə̆', 'ˀm', 'ˀj', 'ɑ̃ː', 'iə̯', 'ɵ̞', 'ɒː', 'ˀn', 'ɯ̞', 'ɤ̞', 'œː', 'ɤː', 'ˀw', 'ʉː', 'ɨ̃ː', 'iu̯', 'uo̯', 'ã̟', 'ɐː', 'ɒ̃', 'ie̞', 'əi̯', 'ĭ', 'ɤ̃', 'e̞i̯', 'ɯa̯', 'i̤ː', 'ã̰', 'ɔ̰', 'ŭ', 'ă', 'æ̃ː', 'ɯ̤', 'ɯə̯', 'əu̯', 'o̞i̯', 'ɨi̯', 'ea̯', 'ṳː', 'a̤ː', 'ɛ̤ː', 'ɔ̤ː', 'ḭ̃', 'iˑ', 'aˑ', 'uˑ', 'oˑ', 'e̞ˤ', 'ɛ̰', 'u̥', 'i̥', 'ɘː', 'iɛ̯', 'ø̞', 'ɜ̃', 'aˤ', 'o̞u̯', 'oa̯', 'ao̯', 'eu̯', 'o̤ː', 'e̝', 'e̤ː', 'eˑ', 'ɵ̞ː', 'ɪ̈', 'ə˞', 'ɯ̃ː', 'ɤ̞̃', 'ɐ̃', 'uˤ', 'ɨ̞', 'ɛi̯', 'ao̞', 'aɛ̯', 'ɤ̤', 'ae̞', 'ue̯', 'ʊ̤', 'ae̯', 'ɑ̤', 'ṵ̃', 'aɪ̯', 'õ̰', 'ë', 'õ̞ː', 'ẽ̞ː', 'a˞', 'ɛ̆', 'ɪ̃ː', 'ɨ˞', 'ʌ̃ː', 'ø̞ː', 'œ̃', 'ɨ̆', 'ɵ̞̆', 'ɔ̆', 'iˤ', 'o̞ˤ', 'aɯ̯', 'e̞u̯', 'e̞o̞', 'ɯi̯', 'æi̯', 'iˠ', 'ö', 'ia̯ː', 'oe̯', 'o̝', 'eo̯', 'ɯ̰', 'ə̰', 'ɵː', 'i̞', 'ɔ̝', 'ï', 'üː', 'ḛ̃', 'ø̞ˤ', 'æˤ', 'ĕ', 'ɤ̞ː', 'ʊ̃ː', 'ɪ̈ː', 'ʊ̈', 'uɔ̯', 'o̯', 'ĕ̞', 'ɒ̆', 'ŏ̞', 'ʊ̙', 'ʊ̙ː', 'ɪ̙', 'ɔˤ', 'ɪˤ', 'ʊˤ', 'ɤ̟', 'ɯ͓', 'ɞ', 'ʌ̤', 'ɒ̤', 'ɘ̃', 'ỹ', 'aɨ̯', 'ɔ̃ĩ̯', 'ʊi̯', 'e̠', 'õ̞ĩ̯', 'ũĩ̯', 'ɨa̯', 'ɜː', 'aˤː', 'ãˤ', 'o̞a̯', 'ẽ̞ĩ̯', 'ɨə̯', 'uʌ̯', 'eˠ', 'ua̯ː', 'ʉ̃', 'æ̤ː', 'æ̤', 'ɵ̤', 'ʊ̤ː', 'ay̯', 'iã̯', 'ʌi̯', 'ʊa̯', 'u̯ai̯', 'i̯au̯', 'ɔu̯', 'aʊ̯', 'io̯', 'ʊu̯', 'ʊɪ̯', 'ɔɪ̯', 'ɛə̯', 'iɔ̯', 'ɑi̯', 'ə̰̃', 'uj', 'aj', 'aw', 'eɪ̯', 'i̤ˑ', 'ɔ̤ˑ', 'ṳˑ', 'e̤ˑ', 'a̤ˑ', 'ɛ̤ˑ', 'ɪ̤', 'oˤ', 'u̞ː', 'ɔ̝ː', 'ɛ̝ː', 'i̞ː', 'ɛ̝', 'u̜', 'i̜', 'ə̤', 'ë̞', 'ä', 'aʲ', 'm̩', 'n̩', 'ŋ̩', 'l̩', 'r̩', 'z̩', 'ɲ̩', 'ɽ̩'
];
// fix - remember syllabic consonants are here

// list of vowel inventories for when phonemes are randomly chosen

let vowelDict = {
  0: 'aː|eː|iː|oː|uː|ɜ|ɨ'
  , 1: 'aː|e|eː|i|iː|o|oː|u|uː|æː|ɑ|ɒː|ɔː|ə|ɛ|ɛː|ɪ|ɪː|ʊ|ʊː'
  , 2: 'a|aː|e|i|o|u|ə|ɪ|ʊ'
  , 3: 'a|aː|e|i|o|u|æ|ɔ'
  , 4: 'a|e|i|o|ʉ'
  , 5: 'a|aː|i|u|ɔ|ə|ɛ|ɯ'
  , 6: 'a|e|i|u|ɔ|ə'
  , 7: 'a|e|i|o|u|ɔ|ə|ɛ'
  , 8: 'a|aː|e|eː|i|iː|o|oː|u|uː'
  , 9: 'a|aː|i|iː|uː|ʊ'
  , 10: 'a|i|u|ɔ|ɛ'
  , 11: 'a|e|i|u|ɔ|ə|ɛ'
  , 12: 'aː|eː|i|oː|u|ɜ'
  , 13: 'a|aː|i|iː|o|oː|u|uː|ɛ|ɛː'
  , 14: 'a|aː|ã|ãː|e|eː|i|iː|ĩ|ĩː|u|uː|ũ|ũː|ə'
  , 15: 'a|aː|e|eː|o|oː|ə'
  , 16: 'a|aː|ãː|iː|ĩː|oː|õː|ɛː|ɛ̃ː|ɪ|ʊ'
  , 17: 'a|aː|e|eː|i|iː|o|oː|u|uː|æ|æː|ɔ̃|ɔ̃ː|ɛ̃|ɛ̃ː'
  , 18: 'a|e|i|o|u|ɔ|ɛ'
  , 19: 'aː|i|iː|u|uː|ɐ'
  , 20: 'a|aː|ã|eː|i|iː|ĩ|oː|ɛ|ʊ|ʊː'
  , 21: 'e|i|o|u|ɑ|ə'
  , 22: 'a|aː|i|iː|u|uː|ɔ|ɔː|ɨ|ɨː'
  , 23: 'a|e|i|o|u'
  , 24: 'a|ɔ|ɛ|ɪ|ʊ'
  , 25: 'a|aː|ã|i|iː|ĩ|u|uː|ũ|ɨ|ɨː|ɨ̃'
  , 26: 'a|aː|e|eː|o|oː'
  , 27: 'eː|i|iː|o|oː|u|uː|ɐ|ɐː|ɛ|ɯ|ɯː'
  , 28: 'a|o|ɪ|ɯ'
  , 29: 'aː|e|eː|iː|o|oː|uː|ə|ɪ|ʊ'
  , 30: 'a|e|i|o|u|æ|ɨ'
  , 31: 'a|eː|iː|oː|uː|æː|ə|ɪ|ʊ'
  , 32: 'a|ã|e|i|ĩ|o|u|ũ|øː|œː|ɔ|ɪ|ɪ̃|ʊ|ʊ̃'
  , 33: 'a|aː|i|iː|u|uː|ɔ|ɔː|ɛ|ɛː'
  , 34: 'a|ã|e|i|ĩ|o|u|ũ|æ|ɔ|ɔ̃|ɛ'
  , 35: 'aː|e|iː|oː|uː|æ|ɐ|ɒ|ɔ|ə|əː|ɪ|ʊ'
  , 36: 'a|aː|eː|iː|oː|uː|æ|æː|ɔ|ɪ|ʊ'
  , 37: 'a|e|i|o|u|ɑ'
  , 38: 'aː|ãː|eː|ẽː|iː|ĩː|oː|õː|uː|ũː|æe̯|æẽ̯|ɑ|ɔo̯|ɔõ̯|ɔ̤|ɜ|ɜ̃|ɪ|ɪ̃|ɪ̈|ʊ|ʊ̃'
  , 39: 'a|aː|e|eː|i|iː|o|oː|u|uː|y|yː|æ|æː|ø|øː|ɛ'
  , 40: 'a|e|i|o|u|æ|ɒ|ɯ|ɵ|ʉ'
  , 41: 'a|o|oː|y|yː|ø|øː|ɒː|ɛ|ɛː|ɪ|ɪː|ɪ̈|ɪ̈ː|ʊ|ʊː'
  , 42: 'a|aː|ie̯|io̯ː|iæ̯|iː|iː|o|u|uː|ɔ|ɔː|ɛ|ɛː|ɪ|ɪ|ʊ|ʊː'
  , 43: 'a|aː|i|iː|o|oː|ɯ'
  , 44: 'a|e|i|o|u|ɒ|ɔ|ɛ|ɪ|ʊ'
  , 45: 'a|ã|e|i|ĩ|o|u|ũ|ɔ|ɛ|ɪ|ɪ̃|ʊ|ʊ̃'
  , 46: 'a|ã|e|i|o|u|ɔ|ɔ̃|ɛ|ɛ̃|ɪ'
  , 47: 'a|e|i|o|u|ɐ|ɔ|ɛ|ɪ|ʊ'
  , 48: 'a|ã|e|ẽ|i|ĩ|o|õ|u|ɑ|ɒ|ə|ə̃|ɜ|ɨ'
  , 49: 'a|e|i|o|æ'
  , 50: 'a|o|ø|ɑ|ɛ|ɪ|ʊ|ʏ'
  , 51: 'a|ã|e|i|ĩ|o|u|ũ|ɔ|ɔ̃|ɛ|ɛ̃'
  , 52: 'a|e|i|o|u|ɔ|ɛ|ɞ|ɯ|ɵ'
  , 53: 'a|e|i|u'
  , 54: 'a|e|i|o|u|ɔ|ɘ|ɛ|ɜ|ɨ|ɪ|ʊ'
  , 55: 'a|i|o|u|ɛ|ɨ'
  , 56: 'ao̯|au̯|aɛ̯|e|ẽ|i|o|o|u|y|ø|ɑ|ɑɔ̯|ɔ̃|ɛ|ɛi̯|ɛo̯|ɛɔ̯|ɛ̃'
  , 57: 'i|u|ɐ|ɔ|ɛ|ɯ'
  , 58: 'a|i|u|y|œ|ɔ|ɛ'
  , 59: 'a|e|i|o|u|ə̃'
  , 60: 'a|e|i|o'
  , 61: 'a|ã|i|ĩ|o|o|u|ũ|æ|ɔ|ɔ̃|ɛ|ɛ̃|ɨ|ɨ̃'
  , 62: 'ai̯|au̯|aː|eː|iː|oː|uː|yː|øː|œ|ɐ|ɔ|ɔi̯|ə|ɛ|ɛː|ɪ|ʊ|ʏ'
  , 63: 'a|ai̯|au̯|e|ei̯|i|o|oi̯|ou̯|u|ɪ|ʊ'
  , 64: 'a|e|i|u|y|ɔ|ə'
  , 65: 'a|i|u|y|ɔ|ɛ|ʌ'
  , 66: 'a|e|i|o|u|ɔ|ɘ|ɛ'
  , 67: 'a|ai̯|au̯|e|ei̯|eu̯|i|o|oi̯|ou̯|u'
  , 68: 'a|ã|e|ẽ|i|ĩ|o|õ|u|ũ|ɔ|ɛ'
  , 69: 'a|ai̯|au̯|e|ei̯|i|o|u|ɒ|əu̯|əɯ̯|ə˞'
  , 70: 'a|e|i|u|ɔ|ɛ'
  , 71: 'a|i|o|u|ɛ'
  , 72: 'a|i|o|ou̯|æ|ø'
  , 73: 'a|e|i|o|u|ə'
  , 74: 'a|ḁ|e|e̥|i|i̥|o|o̥|u|u̥|ɔ|ɛ|ɪ'
  , 75: 'a|e|i|o|u|ɔ|ɛ|ɪ|ʊ'
  , 76: 'a|i|u|ə'
  , 77: 'a|i|ɔ|ɛ|ɯ'
  , 78: 'a|i|u'
  , 79: 'a|e|i|o|u|ɨ'
  , 80: 'a|e|i|o|u|ɔ|ɛ|ɯ'
  , 81: 'a|aː|e|eː|i|ia̯|iː|o|oː|u|ua̯|uː|ɔː|ɘː|ɛː|ɜː|ɨa̯|ɨː'
  , 82: 'a|aː|e|eː|i|iː|o|oː|u|uː|ə'
  , 83: 'a|e|i|o|u|ɐ|ɔ|ə|ɵ|ʉ'
  , 84: 'a|aː|e|i|iː|u|uː|æ|ø'
  , 85: 'a|ai̯|au̯|eː|ie̯|iː|oː|ui̯|uo̯|uː|æ|æi̯|æː|ɑː|ɪ|ʊ'
  , 86: 'a|e|i|o|u|æ|ɒ|ɪ|ʊ'
  , 87: 'a|ã|e|ẽ|i|ĩ|o|õ|u|ũ|ɐ|ɔ|ə|ə̃|ɛ'
  , 88: 'i|o|u|y|ø|ə|ɛ|ʌ'
  , 89: 'a|e|i|o|u|æ|ɔ|ə|ɨ'
  , 90: 'a|e|ẽĩ̯|i|o|õũ̯|u|æ|ɔ|ə|ɛ|ɪ̃|ʊ̃'
  , 91: 'a|a|ã|ã|e|e|ẽ|i|i|ĩ|ĩ|o|õ|u|u'
  , 92: 'a|aː|iː|oː|ɔ|ɛ|ɛː|ɪ'
  , 93: 'a|aː|eː|i|iː|o|oː|uː|ɔ|ɔː|ə|ɛ|ɛː|ʊ'
  , 94: 'a|u|ɔ|ɛ|ɪ|ɪe̯|ʌ'
  , 95: 'a|i|o|ɔ|ɛ'
  , 96: 'a|e|i|i̥|o|u|u̥'
  , 97: 'a|e|i|o|u|æ|ɔ̃|ɛ̃'
  , 98: 'a|e|i|æ|ɔ|ɛ|ɪ|ɵ|ʉ|ʊ'
  , 99: 'a|e|i|o|u|ə|ɜ'
  , 100: 'a|e|i|o|u|ɔ|ə|ɛ|ɪ'
  , 101: 'aː|e|eː|i|iː|o|oː|u|uː|æː|ɜ'
  , 102: 'i|u|ɐ|ɔ|ɛ'
  , 103: 'aː|eː|iː|oː|uː|ə|ɜ'
  , 104: 'a|i|u|ɔ|ɛ|ɪ|ʊ'
  , 105: 'a|i|o|u|ɘ|ɛ'
  , 106: 'a|e|o|y|ɪ|ʊ'
  , 107: 'a|e|i|o|u|ɔ|ɛ|ɵ'
  , 108: 'a|i|ɔ|ɛ|ʊ'
  , 109: 'a|i|u|ɔ|ɛ|ʌ'
  , 110: 'a|e|i|o|u|ɯ'
  , 111: 'a|e|i|ɔ|ɨ|ʊ'
  , 112: 'a|ae̯|ao̯|i|o|ou̯|u|ɛ|ɛi̯'
  , 113: 'a|e|i|ĩ|o|u|ũ|ɔ|ɔ̃|ɛ|ɛ̃'
  , 114: 'a|aː|e|eː|i|iː|o|oː|u|uː|ɒː|ɔ|ɔː|ə|əː|ɛ|ɛː'
  , 115: 'a|aː|i|iː|u|uː|ɔ|ɔː|ə|əː|ɛ|ɛː|ɪ|ɪː'
  , 116: 'a|aː|ã|e|eː|ẽ|i|iː|ĩ|o|oː|õ|u|uː|ũ|ɔ|ɔː|ɔ̃|ɛ|ɛː|ɛ̃'
  , 117: 'a|eː|i|oː|u|ɔ'
  , 118: 'a|aː|ã|e|eː|i|iː|ĩ|o|oː|u|uː|ũ|ɔ|ɔː|ɔ̃|ɛ|ɛː|ɛ̃'
  , 119: 'a|ã|e|ẽ|i|ĩ|o|õ|u|ũ|ɔ|ə|ɛ|ɪ|ʊ'
  , 120: 'a|e|i|o|u|ɔ|ə'
  , 121: 'a|aː|ã|e|eː|ẽ|i|iː|ĩ|o|oː|õ|u|uː|ũ|ɔ|ɔː|ɔ̃|ɛ|ɛː|ɛ̃|ɪ|ɪː|ɪ̃|ʊ|ʊː|ʊ̃'
  , 122: 'a|e|i|o|u|ɔ|ə|ɛ|ɪ|ʊ'
  , 123: 'a|aː|e|eː|i|iː|o|oː|u|uː|ɔ|ɔː|ɛ|ɛː'
  , 124: 'a|u|ɔ|ɛ|ɪ|ʊ'
  , 125: 'a|i|o|u|ɔ|ɛ|ɪ|ʊ'
  , 126: 'a|e|i|o|u|ɔ'
  , 127: 'a|aː|e|eː|i|iː|o|oː|u|uː|ɔ|ɔː'
  , 128: 'a|ai̯|au̯|e|i|o|u|ɔ|ɔi̯|ɛ'
  , 129: 'a|aː|ã|e|eː|ẽ|i|iː|ĩ|o|oː|õ|u|uː|ũ|ɔ|ɔː|ɔ̃|ə|əː|ə̃|ɛ|ɛː|ɛ̃|ɨ|ɨː|ɨ̃|ɪ|ɪː|ɪ̃|ʊ|ʊː|ʊ̃'
  , 130: 'a|i|o|u|ɔ|ɛ|ɪ|ɵ|ʊ'
  , 131: 'a|aː|e|eː|i|u|ə'
  , 132: 'a|aː|i|iː|u|uː|ɔ|ɔː|ə|əː|ɛ|ɛː'
  , 133: 'a|aː|a̠|a̠ː|e|eː|i|iː|o|u|ɔ|ɔː|ɛ|ɛː|ɪ|ɪː|ʊ|ʊː'
  , 134: 'a|aː|ã|e|eː|ẽ|i|iː|ĩ|o|oː|õ|u|uː|ũ'
  , 135: 'e|eː|i|iː|o|oː|u|uː|ɑ|ɑː|ɨ|ɨː|ʌ|ʌː'
  , 136: 'a|e|i|o|u|ɔ|ə|ɛ|ɪ|ʉ|ʊ'
  , 137: 'a|aː|e|eː|i|iː|o|oː|u|uː|æ|æː|ɔ|ɛ'
  , 138: 'a|aː|ã|e|eː|ẽ|i|iː|ĩ|o|oː|õ|u|uː|ũ|ɔ|ɔː|ɔ̃|ɛ|ɛː|ɛ̃|ɪ|ɪː|ɪ̃|ʊ|ʊː|ʊ̃|ʌ|ʌː|ʌ̃'
  , 139: 'a|e|ẽ|i|ĩ|o|õ|u|ũ|ɔ|ɛ'
  , 140: 'a|aː|i|ĩ|u|uː|ɔ|ɔː|ɛ|ɛ̃'
  , 141: 'a|aː|e|eː|i|iː|o|oː|u|uː|ʊ|ʊː'
  , 142: 'e|i|o|u|ɑ|ɨ'
  , 143: 'eː|i|oː|u|ɑ'
  , 144: 'a|e|i|o|u|ɛ|ɪ'
  , 145: 'a|e|i|o|u|æ|ɒ|ɔ|ə|ɛ'
  , 146: 'a|e|i|o|o̤|u|ṳ|ɑ|ɔ|ə|ɛ'
  , 147: 'ɑ|ɪ|ʊ'
  , 148: 'a|e|i|o|u|y|æ'
  , 149: 'a|e|i|o|u|ɔ|ə|ɛ|ɨ|ɯ'
  , 150: 'a|aː|e|eː|i|ia̯|iː|o|oː|u|ua̯|uː|ɑ|ɑː|ɔ|ɔː|ə|əː|ɛ|ɛː|ɯ|ɯa̯|ɯː|ʌ|ʌː'
  , 151: 'a|e|i|ia̯|o|u|uə̯|ɔ|ɛ|ɯ|ɯə̯'
  , 152: 'a|aː|e|eː|o|oː|ɪ|ɪː|ʊ|ʊː'
  , 153: 'a|e|i|o|u|ɔ|ɛ|ɨ|ʊ'
  , 154: 'a|e|i|o|u|ɔ|ə|ɛ|ɨ'
  , 155: 'a|e|i|o|u|ɑ|ɔ|ə|ʉ'
  , 156: 'a|e|i|iː|o|ə'
  , 157: 'a|e|i|o|u|ɪ|ʊ'
  , 158: 'a|aː|e|eː|o|oː|u|uː|ɪ|ɪː'
  , 159: 'a|aː|eː|iː|uː|ɔ|ɔː|ɛ|ɪ|ʊ'
  , 160: 'e|i|o|u|ɑ|ə|ɛ|ɨ|ɪ'
  , 161: 'a|i|u|ɔ|ɛ|ɨ|ʌ'
  , 162: 'a|e|i|o|u|æ|ɒ|ɨ'
  , 163: 'a|e|i|u|ə'
  , 164: 'a|a˞|e|i|o|o˞|u|ɨ|ɨ˞'
  , 165: 'a|aː|e|i|iː|o'
  , 166: 'a|aː|eː|iː|æ|æː|œ|œː|ɑː|ɔ|ɔː|ɛ|ɪ|ʊ|ʊː|ʌ'
  , 167: 'a|ai̯|ao̯|e|i|ia̯|ia̯u̯|iu̯|o|oi|u|ua̯|ua̯i̯|ui̯|ɔ|ɔi̯|ə|əi̯|ɛ|ɯ|ɯa̯|ɯi̯'
  , 168: 'a|e|i|o|u|ʉ'
  , 169: 'a|e|i|o|u|ə|ɨ'
  , 170: 'a|au̯|aɪ̯|aː|i|iː|u|uː|ɐ|ɐi̯|ɐu̯|ɐː|ɔ|ɔɪ̯|ɔː|ɛ|ɛʊ̯|ɛː|ɪ|ɪː|ʊ|ʊu̯|ʊɪ̯|ʊː'
  , 171: 'a|ã|e|i|ĩ|o|u|y|œ|ɑ|ɔ|ɔ̃|ɛ|ɛ̃|ɪ|ʊ'
  , 172: 'a|aː|ã|e|eː|ẽ|i|iː|ĩ|o|oː|õ|ɨ|ɨ̃'
  , 173: 'i|iː|o|oː|u|uː|æ|æː|ø|øː|ɑ|ɑː|ɛ|ɛː|ɨ|ɨː|ɯ|ɯː'
  , 174: 'e|i|o|u|ɑ'
  , 175: 'a|ai̯|ao̯|aː|ã|ãː|e|ei̯|eo̯|eː|ẽ|ẽː|i|io̯|iː|ĩ|ĩː|o|oi̯|oː|õ|õː|ɨ|ɨː|ɨ̃|ɨ̃ː'
  , 176: 'a|e|ei̯|i|ia̯|o|ou̯|u|ua̯|ue̯|ui̯|uə̯|uɨ̯|ə|ɨ'
  , 177: 'a|ã|e|i|ĩ|o|õ|u'
  , 178: 'aː|ãː|eː|ẽː|iː|ĩː|oː|õː|u|uː|ũː|æ|ɔː|ɔ̃ː|ə|ɛː|ɛ̃ː|ɪ'
  , 179: 'a|aː|eː|i|iː|oː|uː|ɔ|ɛ|ʊ'
  , 180: 'a|i|i̥|u|u̥|ɨ|ɨ̥'
  , 181: 'a|e|i|o|ɨ|ɯ'
  , 182: 'e|ẽ|i|ĩ|u|ũ|æ|ɑ|ə|ə̃'
  , 183: 'a|aː|u|uː|ɔ|ɔː|ɛ|ɛː|ɨ|ɨː'
  , 184: 'a|au̯|aː|iː|o|ou|oː|u|uː|ɛ|ɛu̯|ɛː|ɪ'
  , 185: 'a|ai̯|au̯|e|i|o|oi̯|u|ə'
  , 186: 'e|i|o|u|ɑ|ɔ|ə|ɛ|ɪ|ʊ'
  , 187: 'a|i|o|ɛ|ɯ'
  , 188: 'a|aː|ã|e|eː|ẽ|i|iː|ĩ|o|u|uː|ũ|ɛ'
  , 189: 'a|aː|e|eː|i|iː|o|oː|u|ɔ|ɔː|ə|əː|ɛ|ɛː|ɨ|ɨː'
  , 190: 'a|e|i|o|u|y|ɔ|ɛ'
  , 191: 'a|aː|i|iː|u|uː'
  , 192: 'a|aː|e|eː|i|iː|u|uː|y|ɔ|ɔː'
  , 193: 'a|aː|e|eː|i|iː|o|oː|u|uː|ɔ|ɔː|ə|əː|ɛ|ɨ|ɨː|ʉ'
  , 194: 'a|e|i|o|u|y|ɯ'
  , 195: 'a|aː|e|eː|i|ia̯|iː|o|oː|u|ua̯|uː|ɔ|ɔː|ə|əː|ɛ|ɛː|ɨ|ɨa̯|ɨː|ʌ|ʌː'
  , 196: 'a|e|i|o|u|y|ɔ|ɯ'
  , 197: 'a|ai̯|au̯|e|i|o|u|ɔ|ɔ̃|ə|əi̯|əu̯|ə̃|ɛ|ɨ'
  , 198: 'a|aː|ã|ãː|i|iː|o|oː|õ|õː|ə|ɛ|ɛː|ɛ̃|ɛ̃ː|ɪ|ɪ̃|ɪ̃ː|ʊ'
  , 199: 'ə|ɛ|ɨ'
  , 200: 'a|aː|ã|ãː|e|o|ɔ|ɔː|ɔ̃|ɔ̃ː|ɛ|ɛː|ɛ̃'
  , 201: 'a|aː|i|iː|u|uː|ũ|ɔ|ɔː|ɛ|ɛː|ɛ̃|ɨ|ɨː|ɨ̃'
  , 202: 'a|aː|ãː|e|eː|ẽː|i|iː|ĩ|ĩː|o|oː|õː|u|uː|ũː|ɔ|ɔː|ɔ̃ː'
  , 203: 'a|ã|e|i|ĩ|o|u|ũ|ɔ|ɔ̃|ə|ɛ|ɛ̃'
  , 204: 'a|ã|eʲ|i|ĩ|o|u|ũ|ɔ|ɔ̃|ə|ɛ|ɛ̃'
  , 205: 'a|i|ə|ɨ|ɯ'
  , 206: 'a|e|ea̯|i|o|oa̯|u|ɔ|ə|ɨ'
  , 207: 'a|aː|i|iː|u|uː|ɔ|ɔː|ɛ|ɛː|ɪ|ɪː|ʊ|ʊː|ʌ|ʌː'
  , 208: 'a|aː|e|eː|i|ie̯|iɛ̯|iː|iːe̯|iːɛ̯|u|ua̯|uʌ̯|uː|uːa̯|uːʌ̯|ɔ|ɔː|ɛ|ɛː|ʌ|ʌː'
  , 209: 'a|aː|aˑ|e|eː|eˑ|i|iː|iˑ|o|oː|oˑ|u|uː|uˑ|ʉ|ʌ'
  , 210: 'a|aː|ã|ãː|e|eː|ẽ|ẽː|i|iː|ĩ|ĩː|o|oː|õ|u|uː|ũ|ũː|ɔ|ɔː|ɔ̃ː|ɛː|ɛ̃ː'
  , 211: 'a|aː|ã|ãː|e|eː|ẽ|i|iː|ĩ|ĩː|o|oː|õ|u|uː|ũ|ũː|ɔ|ɔː|ɔ̃ː|ɛː'
  , 212: 'a|e|i|o|u|ɘ|ɛ'
  , 213: 'a|aː|e|eː|i|iː|o|oː|u|uː|ɐ|ɐː|ɔ|ɔː|ɛ|ɛː'
  , 214: 'a|aː|e|i|iː|o|oː|u|uː|ɐ|ɐː|ɔ|ɔː|ə|ɛ|ɛː|ʉ|ʉː'
  , 215: 'a|aː|e|eː|i|iː|o|oː|u|uː|ə|əː'
  , 216: 'a|aː|e|i|o|u|ɨ|ʌ'
  , 217: 'a|e|i|o|u|y|œ|ə'
  , 218: 'e|i|o|u|ɔ|ə|ɛ|ɜ'
  , 219: 'a|aː|e|eː|i|iː|o|oː|u|ɔ|ɔː|ə|əː|ɛ|ɛː|ɪ|ɪː|ʊ|ʊː'
  , 220: 'a|aː|e|eː|i|iː|o|oː|u|uː|ɔ|ɔː|ə|əː|ɛ|ɛː|ɪ|ɪː|ʊ|ʊː'
  , 221: 'e|i|u|ɑ|ɔ|ə|ɛ|ɪ|ɵ|ʊ'
  , 222: 'eː|i|oː|u|ɑ|ɔ|ə|ɛ|ɪ|ʊ'
  , 223: 'a|ai̯|aː|e|ei̯|eː|i|iː|o|oi̯|oː|u|ui̯|uː|ɔ|ə|ɛ|ɨ'
  , 224: 'a|aː|e|eː|i|iː|o|oː|u|uː|ɔ|ɔː|ə|əː|ɛ|ɛː|ɜ|ɜː|ɨ|ɨː'
  , 225: 'a|e|i|o|u|œ|ʌ'
  , 226: 'a|e|i|o|u|ʌ'
  , 227: 'a|aː|ã|ãː|e|eː|ẽː|i|iː|ĩ|ĩː|o|oː|õː|u|uː|ũ|ũː|ɔ|ɔː|ɔ̃|ɔ̃ː|ɛ|ɛː|ɛ̃|ɛ̃ː'
  , 228: 'a|e|i|o|u|ɔ|ɛ|ɪ|ʊ|ʌ'
  , 229: 'a|e|i|o|u|ɔ|ɛ|ɨ|ɪ|ʊ'
  , 230: 'a|aː|ã|ãː|e|eː|ẽ|i|iː|ĩ|o|oː|õ|u|uː|ũ|ũː|ɔ|ɔː|ɔ̃|ɔ̃ː|ɛ|ɛː|ɛ̃'
  , 231: 'a|e|i|o|u|y|œ|ɔ|ɛ'
  , 232: 'a|aː|å|eː|i|iː|o|oː|u|uː|ɔ|ɔː|ɨ|ʌː'
  , 233: 'a|ã|e|ẽ|i|ĩ|o|õ|u|ũ|ɔ|ə|ɛ'
  , 234: 'a|aː|e|eː|i|iː|o|oː|u|uː|ɒ|ɒː|ɔ|ɔː|ɛ|ɛː|ɪ|ɪː|ʊ'
  , 235: 'a|e|i|o|ɔ|ɛ|ɪ|ʊ'
  , 236: 'a|ã|e|i|o|u|ɔ|ɔ̃|ɛ|ɛ̃'
  , 237: 'a|aː|ã|e|eː|ẽ|i|iː|ĩ|o|oː|õ|u|uː|ũ|ɔ|ɔː|ɔ̃|ɛ|ɛː|ɛ̃|ɪ|ʊ'
  , 238: 'a|aː|e|eː|i|o|oː|u|ɔ|ɔː|ɛ|ɛː'
  , 239: 'a|e|i|iː|o|u|uː|ø|ɔ|ə|əː|ɛ|ɛː'
  , 240: 'a|ã|e|ẽ|ë|i|iː|ï|o|õ|u|uː'
  , 241: 'a|aː|ã|e|eː|ẽ|i|iː|ĩ|o|oː|õ|u|uː|ũ|æ|ɔ|ɔː|ɔ̃|ɛ|ɛː|ɛ̃|ɪ|ɪː|ɪ̃|ʊ|ʊː|ʊ̃'
  , 242: 'a|i|u|ɔ|ɛ|ɨ'
  , 243: 'a|i|u|y|œ|ɔ|ə|ɛ'
  , 244: 'a|aː|ã|e|i|iː|ĩ|o|oː|õ|u|ũ|ɔ|ɔː|ɔ̃|ɛ|ɛː|ɛ̃'
  , 245: 'a|aː|e|eː|i|iː|u|uː|ɔ|ɔː'
  , 246: 'a|e|i|i̜|u|u̜|æ|ɔ|ə|ɛ|ɨ̜'
  , 247: 'a|e|o'
  , 248: 'a|aː|i|iə̯|iɛ̯|iː|u|uə̯|uː|y|yə̯|ɔ|ɔː|ə|əː|ɛ|ɨ|ɨə̯|ɨː'
  , 249: 'a|e|i|o|u|œ|ɔ|ɛ|ɪ|ʊ'
  , 250: 'a|aː|ãː|e|eː|ẽː|i|iː|ĩː|o|oː|õː|u|uː|ũː'
  , 251: 'a|aː|ã|e|eː|ẽ|i|iː|ĩ|o|oː|õ|u|uː|ũ|ɐ|ɐː|ɔ|ɔː|ɔ̃|ə|əː|ə̃|ɛ|ɛː|ɛ̃|ɯ|ɯː|ɯ̃'
  , 252: 'a|e|i|o|u|u|ɔ|ɛ|ɪ'
  , 253: 'a|i|o|u|ɔ|ə|ɛ'
  , 254: 'a|au̯|ay̯|aː|e|eː|i|ia̯|iː|o|oː|u|uy̯|uə̯|uː|y|ɔ|ɔː|ə|əy̯|əː|ɛ|ɛo̯|ɛː|ɯ|ɯə̯|ɯː'
  , 255: 'a|e|i|o|u|y'
  , 256: 'e|e̤|i|i̤|o|o̤|u|ṳ|ɑ|ɑ̤|ɒ|ɒ̤|ɔ|ɔ̤|ə|ə̤|ɛ|ɛ̤|ɪ|ɪ̤|ʊ|ʊ̤'
  , 257: 'a|e|i|o|u|ɔ|ə|ɯ'
  , 258: 'a|aː|e|eː|i|o|oː|u|uː|ə|ɛ|ɨ|ʌ'
  , 259: 'a|aː|aˑ|e|eː|eˑ|ẽ|i|iː|iˑ|o|oː|oˑ|õ|u|uː|uˑ|ũː|ə|əː|əˑ|ɛ|ɛː|ɨ|ɨː|ɨˑ|ʊ̃'
  , 260: 'ã|e|eː|i|iː|o|oː|u|uː|ũː|æ|ɑ|ɑː|ɔ|ɛ̃|ʊ̃'
  , 261: 'a|e|i|o|õ|u|ũː|æ|ɔ|ə|ɛ|ɪ|ʊ'
  , 262: 'a|e|ẽ|i|ĩ|o|õ|u|ũː|æ|ɑ|ɔ|ə|ə̃|ɛ|ɪ|ɪ̃|ʊ|ʊ̃'
  , 263: 'a|e|ẽ|i|ĩ|o|õ|õ|u|ũː|æ|ɑ|ɔ|ə|ə̃|ɛ|ɪ|ɪ̃|ʊ|ʊ̃'
  , 264: 'a|e|i|o|õ|u|ũː|æ|ɔ|ɛ|ɪ̃|ʊ̃'
  , 265: 'a|e|eː|i|iː|o|oː|õ|u|uː|ũː|æ|ɪ̃|ʊ̃'
  , 266: 'a|aː|e|eː|i|iː|o|oː|u|uː|ə|əː|ɨː'
  , 267: 'a|aː|e|eː|i|iː|o|oː|u|uː|ɛ|ɛː|ɨ'
  , 268: 'a|aː|ãː|e|eː|i|iː|ĩː|u|uː|ũ|ũː|æ|ɑ|ɔ|ɔː|ə̃ː|ɪ̃|ʊ̃'
  , 269: 'a|aː|eː|i|iː|oː|u|uː'
  , 270: 'a|e|i|u|ɔ|ɛ|ɪ|ɯ|ʊ'
  , 271: 'a|aː|e|eː|i|iː|o|oː|u|uː|ɛ|ʌ'
  , 272: 'a|e|i|o|u|u|ə|ɨ|ɯ|ʌ'
  , 273: 'a|aː|e|eː|i|iː|o|oː|u|uː|ɨ'
  , 274: 'a|e|i|o|u|ɔ|ɛ|ʌ'
  , 275: 'e|e|i|iː|o|u|u|uː|ɑ|ɛ|ɪ|ʊ|ʌ'
  , 276: 'a|aː|e|eː|i|iː|ĩː|o|oː|õ|u|uː|æ|ɑː|ə̃ː|ɨ|ɪ̃|ʊ̃'
  , 277: 'a|aː|e|eː|i|iː|o|oː|ɨ|ɨː'
  , 278: 'a|aː|e|eː|i|iː|u|uː'
  , 279: 'a|aː|e|eː|i|iː|o|oː|ɨi̯'
  , 280: 'a|i|u|ɨ'
  , 281: 'a|aː|e|eː|i|iː|o|oː|u|uː|ə|əː|ɨ|ɨː'
  , 282: 'a|ã|e|ẽ|i|ĩ|o|u|ũ|ə|ɨ|ɨ̃'
  , 283: 'a|aː|e|eː|i|iː|o|oː'
  , 284: 'a|aː|ã|ãː|e|eː|ẽ|ẽː|i|iː|ĩ|ĩː|o|oː|õ|õː|ɨ|ɨː'
  , 285: 'a|i|o|u|ɨ'
  , 286: 'a|e|i|u|ʉ'
  , 287: 'a|i|u|ɯ'
  , 288: 'a|aː|i|iː|u|uː|ɯ|ɯː'
  , 289: 'a|ã|e|i|ĩ|o|u|ũ|ɔ|ɔ̃|ə|ɛ|ɛ̃|ɜ|ɨ|ɨ̃'
  , 290: 'a|ã|i|ĩ|o|õ|u|ə|ɛ|ɛ̃'
  , 291: 'a|ã|e|ẽ|i|ĩ|o|õ|ə|ɛ'
  , 292: 'a|e|ẽ|i|ĩ|o|õ|u|ɐ|ɔ|ə|ɛ|ɨ'
  , 293: 'a|e|i|ĩ|o|õ|u|ɔ|ə|ə̃|ɛ|ɛ̃|ɨ|ɨ̃'
  , 294: 'a|e|eː|i|iː|o|ə|əː|ɨ'
  , 295: 'a|ã|e|i|ĩ|o|u|ũ|ɔ|ɔ̃|ɛ|ɛ̃|ɯ|ɯ̃|ʌ|ʌ̃'
  , 296: 'a|aː|i|iː|u|uː|ɨ|ɨː'
  , 297: 'a|e|i|ʊ'
  , 298: 'a|e|i|o|ɨ'
  , 299: 'a|ã|e|ẽ|i|ĩ|o|õ|u|ə|ɨ'
  , 300: 'a|e|i|o|ə'
  , 301: 'a|aː|ã|e|eː|ẽ|i|iː|ĩ|o|oː|õ|ɨ|ɨː|ɨ̃'
  , 302: 'a|e|i|o|u|ɘ|ɨ'
  , 303: 'a|e|i|o|u|ɛ|ɨ|ʉ'
  , 304: 'a|e|i|o|ə|ɯ'
  , 305: 'a|ã|e|ẽ|i|ĩ|u|ũ|ɑ|ɔ|ɔ̃|ə|ɨ|ɨ̃|ɪ|ɪ̃'
  , 306: 'a|e|i|o|u|æ'
  , 307: 'a|aː|ã|e|eː|ẽ|i|iː|ĩː|o|oː|õ|u|uː|ũ|ə|əː|ə̃|ɨ|ɨː|ɨ̃'
  , 308: 'a|i|o|ɨ'
}

const vowelChoices = Object.entries(vowelDict).map(a => a[1].split('|'));

let vowelIndex = [0, 1, 2, 3, 4, 5, 6, 6, 7, 7, 7, 7, 7, 7, 7, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 9, 10, 10, 10, 10, 10, 10, 11, 11, 12, 12, 13, 13, 14, 15, 16, 16, 17, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 19, 20, 21, 22, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 24, 24, 24, 24, 24, 25, 26, 26, 27, 28, 28, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 37, 38, 39, 40, 40, 41, 42, 43, 44, 45, 45, 45, 46, 47, 48, 49, 50, 51, 51, 51, 51, 51, 51, 51, 51, 52, 53, 53, 53, 53, 54, 55, 56, 57, 58, 59, 60, 60, 60, 60, 60, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 73, 73, 73, 73, 73, 74, 75, 75, 75, 75, 75, 75, 75, 75, 75, 76, 76, 76, 76, 76, 77, 78, 78, 78, 78, 78, 78, 78, 78, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 80, 81, 82, 82, 83, 84, 85, 86, 87, 88, 89, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 110, 111, 112, 113, 114, 115, 116, 116, 117, 118, 119, 120, 121, 121, 121, 122, 122, 122, 122, 123, 123, 123, 123, 123, 123, 123, 123, 123, 124, 125, 126, 126, 126, 127, 127, 128, 129, 130, 131, 132, 132, 133, 134, 134, 135, 136, 137, 138, 139, 140, 141, 142, 143, 144, 145, 146, 147, 148, 149, 150, 151, 152, 153, 154, 155, 156, 157, 158, 159, 160, 161, 162, 163, 164, 165, 166, 167, 168, 168, 169, 169, 169, 169, 169, 169, 170, 171, 172, 173, 174, 174, 175, 176, 177, 178, 179, 180, 181, 181, 182, 183, 184, 185, 186, 187, 188, 189, 190, 191, 191, 192, 193, 194, 195, 196, 197, 198, 199, 200, 201, 202, 203, 204, 205, 206, 207, 208, 209, 210, 211, 212, 213, 214, 215, 216, 217, 218, 219, 220, 220, 221, 222, 223, 224, 225, 226, 226, 227, 228, 229, 230, 231, 232, 233, 234, 235, 236, 237, 238, 239, 240, 241, 242, 242, 243, 244, 245, 246, 247, 248, 249, 250, 251, 252, 253, 254, 255, 256, 257, 258, 259, 260, 261, 262, 262, 263, 264, 265, 266, 267, 268, 269, 270, 271, 272, 273, 274, 275, 276, 277, 277, 278, 279, 280, 280, 281, 282, 283, 284, 285, 286, 287, 288, 289, 290, 291, 292, 293, 294, 295, 296, 296, 297, 298, 298, 298, 299, 300, 301, 302, 303, 304, 305, 306, 307, 308];

let poss_C_onset = ['k', 'm', 's', 'p', 't', 'd', 'b', 'n', 'l', 'v', 'f', 'h', 'ɹ', 'j', 'ʃ', 'g', 'w', 'ʨ', 'z', 'r', 'x', 'tʰ', 'ʋ', 'ʔ', 'sʰ', 'ʦ', 'ʁ', 'ʤ', 'ʧ', 'ɦ', 'ɣ', 'ʨʰ', 'nʲ', 'kʰ', 'c', 'tʲ', 'ʒ', 'ʂ', 'lʲ', 'pʰ', 'ɟ', 'ɕʰ', 'θ', 'mʲ', 'ð', 'bˠ', 'dʲ', 'fˠ', 'd̪ˠ', 'vʲ', 'ɾˠ', 'mˠ', 'ɕ', 'ɲ', 'pʲ', 'ɾ', 't̪ˠ', 'fʲ', 'd̪', 'q', 'bʱ', 'l̠ʲ', 'ʦʰ', 'kʲ', 'bʲ', 'l̪ˠ', 'sʲ', 'sˠ', 't̪', 'ç', 'ʐ', 'ʧʰ', 'kʷ', 'n̪ˠ', 'ħ', 'ʀ', 'ʕ', 'rʲ', 't̪ʰ', 'χ', 'pˠ', 'ɥ', 'ɧ', 'ɬ', 'ɰ', 'ʍ', 'sˤ', 'tˤ', 'ɸʷ', 'd̪ʱ', 'ŋ', 'ʝ', 'ʥ', 'ǀ', 'ɸ', 'r̝', 'r̥', 'ɢ', 'ɰᵝ', 'gʲ', 'zʲ', 'ɕː', 'nˠ', 'ɖ', 'ɲ̟', 'ǃʰ', 'ʎ', 'dˤ', 'gʱ', 'vˠ', 'xʷ', 'ǃ', 'ɖʱ', 'ɹʷ', 'ɾʲ', 'ʣ', 'jʷ', 'k̟', 'nʷ', 'n̥', 'pʷ', 'tʷ', 't̚', 'vʲː', 'zː', 'ðˤ', 'ǀʰ', 'ǂ', 'ǂʰ', 'ɮ', 'ʦʼ', 'ʧʼ', 'ᵑǀ', 'ᵑǃʱ'];

let poss_CC_onset = ['pɹ', 'st', 'kw', 'pr', 'tɹ', 'kl', 'dʒ', 'sp', 'pl', 'pɾ', 'bɹ', 'bl', 'gɹ', 'tʃ', 'kɹ', 'fl', 'sk', 'ʈʂ', 'sl', 'dɹ', 'fɹ', 'prʲ', 'kj', 'pʁ', 'gl', 'tr', 'sw', 'ʔɗ', 'ʨj', 'ng', 'pj', 'kr', 'xj', 'ʔɓ', 'br', 'fr', 'ʈʂʰ', 'dr', 'ʃt', 'sm', 'tw', 'θɹ', 'vr', 'tʁ', 'mj', 'sn', 'th', 'çj', 'vj', 'gʁ', 'ɸw', 'pʰj', 'ts', 'xw', 'ʃl', 'gr', 'fʁ', 'hw', 'klˠ', 'kɾˠ', 'tj', 'tɾ', 'fj', 'gw', 'pr̝̊', 'sv', 'hj', 'kɾ', 'kʁ', 'sx', 'vl', 'ɣr', 'bj', 'dj', 'mn', 'nj', 'vw', 'bʁ', 'fʲɾʲ', 'kv', 'mɲ', 'sˠɾˠ', 'ʃɹ', 'zn', 'ʃp', 'ʦw', 'dw', 'lj', 'mw', 'sj', 'spʲ', 'tʲɾʲ', 'vɾ', 'zʋ', 'ʋj', 'bɾ', 'dv', 'lw', 'sɥ', 'tʃʰ', 'ʂt', 'ʃc', 'ʃv', 'dvʲ', 'dʁ', 'glˠ', 'gɾ', 'gɾˠ', 'krʲ', 'sh', 'svʲ', 'sʲtʲ', 'sˠk', 'sˠt̪ˠ', 'trʲ', 'tʋ', 't̪ˠɾˠ', 'zd', 'ʨʰj', 'blʲ', 'dn', 'fsʲ', 'fʀ', 'fʃ', 'gd', 'ml', 'nd', 'pw', 'tv', 'tʰw', 'zv', 'ɲʤ', 'bw', 'bʲɾʲ', 'bˠɾˠ', 'cɾʲ', 'dʲɾʲ', 'fw', 'gj', 'kn', 'ks', 'kʃ', 'kʰw', 'mb', 'smʲ', 'srʲ', 'st̪ʰ', 'sʋ', 'vd', 'vz', 'xlˠ', 'xʦ', 'ɲj', 'ʁj', 'ʂw', 'ʃʁ', 'ʨw', 'ʨʰw', 'd̪ɾ', 'jd', 'km', 'kt', 'kç', 'mp', 'nt', 'nw', 'nz', 'pɥ', 'sr', 'sʲnʲ', 'tʰj', 'vn', 'vnʲ', 'vrʲ', 'xr', 'xv', 'xɾ', 'zl', 'ŋk', 'ʃn', 'ʤj', 'brʲ', 'bʲlʲ', 'bˠl̪ˠ', 'dlʲ', 'dʲlʲ', 'd̪ʋ', 'd̪ʱʋ', 'd̪ˠɾˠ', 'fx', 'fɾ', 'fˠɾˠ', 'glʲ', 'gn̪ˠ', 'grʲ', 'js', 'jɾʲ', 'klʲ', 'kl̪ˠ', 'knʲ', 'kn̪ˠ', 'kx', 'kʋ', 'md', 'mkʰ', 'ms', 'mz', 'mɾ', 'mˠnˠ', 'ntʰ', 'nɬ', 'pç', 'pʲɾʲ', 'pˠl̪ˠ', 'pˠɾˠ', 'rw', 'sc', 'sʈ', 'sʦ', 'sˠl̪ˠ', 'sˠn̪ˠ', 'sˠpʲ', 'sˠpˠ', 'tr̝̊', 'tʀ', 't̪ʋ', 'vmʲ', 'vzʲ', 'vʁ', 'vʲɾʲ', 'xc', 'xl', 'zb', 'zj', 'zrʲ', 'zvʲ', 'zw', 'zʲdʲ', 'ðʝ', 'ŋw', 'ɟlʲ', 'ɟnʲ', 'ɦl', 'ɦr', 'ɦɾ', 'ʃlʲ', 'ʃm', 'ʃnʲ', 'ʃw', 'ʃɾ', 'ʒɥ', 'ʦv', 'ʦvʲ', 'ʧl', 'bn', 'bɮ', 'bʼbʲ', 'df', 'dl', 'drʲ', 'dr̝', 'dz', 'dɲ', 'dɾ', 'dʀ', 'd̪ʱj', 'fk', 'fp', 'fs', 'ft', 'gdʲ', 'jm', 'jɟ', 'kh', 'kɥ', 'kʰtʰ', 'ld', 'lz', 'lɥ', 'mf', 'mnʲ', 'mpʰ', 'mɬ', 'mɮ', 'mᵑǀ', 'nl', 'nr', 'nǂ', 'nɥ', 'nɮ', 'pf', 'plʲ', 'ps', 'ptʲ', 'pʀ', 'pʰr', 'rj', 'rt', 'sd', 'sf', 'spʰ', 'sç', 'tk', 'tm', 'tvʲ', 'vlʲ', 'vð', 'vʃ', 'vʧ', 'wh', 'xlʲ', 'zm', 'zr', 'ǃʰw', 'ɣl', 'ɣn', 'ɣɾ', 'ɦn', 'ʁw', 'ʂk', 'ʂlʲ', 'ʃk', 'ʋɾ', 'ʐd', 'ʒw', 'ʤd', 'ʦh', 'ʦʰw', 'ʧh', 'ʧt', 'ʨlʲ', 'θl', 'ᵑǀw', 'ᶢǀʱw'];

let poss_CCC_onset = ['stɹ', 'str', 'skɹ', 'spr', 'skw', 'spɹ', 'ʃpr', 'stj', 'spl', 'sxr', 'ʃcɾʲ', 'ʈʂw', 'kʁw', 'scr', 'tsv', 'vʒd', 'ʔɗw', 'dʁw', 'fsk', 'fsp', 'fst', 'mgn', 'skr', 'strʲ', 'stʁ', 'st̪ɾ', 'sˠpˠɾˠ', 'ʃtr', 'ʈʂʰw', 'dvj', 'dʒd', 'fklʲ', 'fpr', 'fʁɥ', 'gwl', 'gwn', 'gwr', 'jsm', 'jst', 'kst', 'kçj', 'ldz', 'pɾj', 'skv', 'spj', 'sprʲ', 'stv', 'stʃ', 'svj', 'sxv', 'tʁw', 'tʃt', 'vdr', 'vzd', 'vzr', 'zdr', 'zvl', 'ʃtɾ'];

let poss_C_mid = ['l', 't', 'n', 'd', 'm', 's', 'k', 'r', 'v', 'z', 'b', 'ɹ', 'g', 'ʃ', 'p', 'ɾ', 'j', 'f', 'h', 'ð', 'tʰ', 'x', 'w', 'ɦ', 'ŋ', 'ɲ', 'ʥ', 'nʲ', 'ʁ', 'ʦ', 'ɮ', 'ɣ', 'ʨ', 'ʤ', 'ʒ', 'kʰ', 'ʧ', 'lʲ', 'dʲ', 'ʦː', 'lː', 'tʲ', 'nː', 'vʲ', 'pʰ', 'ʋ', 'rʲ', 'ɟ', 'ʂ', 'mʲ', 'sʰ', 'tː', 'ɾˠ', 'ɬ', 'θ', 'ʐ', 'ʔ', 'ʨʰ', 'ɾʲ', 'kʲ', 'ʎ', 'ç', 'sʲ', 'ɕː', 'β', 'n̪ˠ', 'ǃ', 'bʱ', 'bʲ', 't̪', 'd̪', 'q', 'c', 'χ', 'ɕ', 'ɕʰ', 'mː', 'sˠ', 'sː', 'kː', 'ᵝt', 'ʕ', 'bː', 'pʲ', 'l̪ˠ', 'nˠ', 'lˠ', 'vˠ', 'ǀ', 'ɫ', 't̪ˠ', 'ħ', 'ɟː', 'ʈ', 'rː', 't̪ʰ', 'zʲ', 'ʀ', 'l̠ʲ', 'pˠ', 'ɲː', 'gʲ', 'ʑ', 'ᵝk', 'ᵝs', 'bˠ', 'dː', 'd̪ʱ', 'fʲ', 'mˠ', 'pː', 'r̝', 'ʝ', 'ʦʰ', 'ʧʰ', 'ʧʼ', 'd̪ˠ', 'jː', 'n̠ʲ', 'zː', 'ǂ', 'ᵝɾ', 'ᵝʦ', 'ᶢǀʱ', 'dˤ', 'ɥ', 'ɧ', 'ɰ', 'ɰᵝ', 'ɽ', 'ʃː', 'ʧː', 'ᵑǂʱ', 'dʲː', 'fˠ', 'kʷ', 'tˤ', 'ɖ', 'ʈʰ', 'ʱs', 'ᵑǀ', 'ᵝd', 'ᵝʨ', 'gː', 'nʲː', 'sˤ', 'ðˤ', 'ɸ', 'ʨː', 'ᵑǃ', 'ᵝg', 'ᵝp', 'ᵝz', 'ᶢǃʱ', 'cː', 'dʱ', 'fː', 'gʱ', 'vː', 'xʲ', 'ŋː', 'ǀʰ', 'ǃʰ', 'ɫ̪', 'ɲ̟', 'ʦʼ', 'ʱj', 'ʱk', 'ʱɾ', 'ʱʧ', 'ᵑǃʱ', 'ᵝh', 'ᵝn', 'ᵝç', 'ᵝɕ', 'ᵝɲ̟', 'ᵝɾʲ', 'dˤː', 'gʷ', 'n̪', 'rʷ', 'tʲː', 'tʷ', 'tˀ', 't̪ʰː', 'ɳ', 'ɸː', 'ʂː', 'ʎː', 'ʐː', 'ˣk', 'ˣt', 'ᵑǀʱ', 'ᵝb', 'ᵝgʲ', 'ᵝj', 'ᵝm', 'ᵝmʲ', 'ᵝsː', 'ᵝɕː', 'ᵝɰᵝ', 'ᵝɸ'];

let poss_CC_mid = ['nd', 'st', 'nt', 'ns', 'mb', 'ng', 'kt', 'mp', 'ŋk', 'ks', 'dʒ', 'lt', 'sp', 'rt', 'ʃt', 'sj', 'sk', 'rd', 'kw', 'kʃ', 'tʃ', 'ŋg', 'lm', 'lj', 'nf', 'nl', 'sl', 'bl', 'tl', 'nj', 'pɹ', 'nɦ', 'ld', 'nz', 'rm', 'ŋɦ', 'nv', 'ts', 'kj', 'nk', 'lk', 'll', 'ɾj', 'pl', 'ss', 'rg', 'nʃ', 'rk', 'sn', 'kl', 'ʁt', 'p̚t', 'ɹt', 'ft', 'ɾt', 'dn', 'nm', 'sʲtʲ', 'gj', 'tn', 'ɲʥ', 'gn', 'tk', 'ɭd', 'ʎʎ', 'gɹ', 'rs', 'tɹ', 'dl', 'pt', 'bj', 'br', 'nn', 'rn', 'ɹm', 'dv', 'gz', 'mj', 'mn', 't̚t', 'rl', 'tj', 'nʤ', 'ɭɭ', 'ʃk', 'ntʰ', 'tt', 'tɾ', 'ɾm', 'lw', 'lʲn', 'xt', 'ɮg', 'dm', 'ŋsʰ', 'ʃp', 'kn', 'kɹ', 'nw', 'nʧ', 'pj', 'rb', 'mt', 'nɮ', 'vn', 'zd', 'ɾɦ', 'jt', 'ln', 'ml', 'nsʰ', 'pʃ', 'rv', 'st̪', 'vl', 'zn', 'ŋʥ', 'ɹd', 'ɹl', 'jtʲ', 'k̚t', 'k̚ʨ', 'lg', 'sm', 'ɹs', 'ʈʂ', 'dj', 'kr', 'ɲj', 'bɹ', 'fɹ', 'ht', 'lf', 'lv', 'rj', 'tm', 'ŋj', 'ʎʨ', 'mm', 'nh', 'pɾ', 'tf', 'tr', 'vlʲ', 'ɹn', 'ɾð', 'ʁm', 'ʃm', 'ʨn', 'fl', 'gl', 'kk', 'lʃ', 'mg', 'nb', 'nʦ', 'pr', 'sf', 'xj', 'zw', 'ʃtʲ', 'ʨj', 'bs', 'dr', 'jɾ', 'ps', 'rr', 'tw', 'ŋn', 'ɮb', 'ɾn', 'dɹ', 'jn', 'mf', 'pk', 'rf', 'rɣ', 'sˠt̪ˠ', 'vj', 'xw', 'ŋd', 'ŋl', 'ŋm', 'ŋɕʰ', 'ɫt', 'ɲʤ', 'ɾk', 'ʃʧ', 'dʲnʲ', 'gd', 'gɮ', 'hk', 'jʃ', 'md', 'ms', 'mz', 'nʂ', 'rx', 'rʃ', 'sg', 'sw', 'tʁ', 'vɹ', 'xn', 'zv', 'ɭg', 'ɲʨʰ', 'ɹb', 'ɹg', 'ɹk', 'ʈʂʰ', 'ʦt', 'dw', 'gr', 'hd', 'jj', 'k̚k', 'lp', 'mw', 'nx', 'skʲ', 't̪ɾ', 'vm', 'xt̪ˠ', 'zj', 'zm', 'ŋb', 'ɭs', 'ʁj', 'ʁn', 'ʂk', 'dd', 'fj', 'gw', 'kt̪', 'kɾ', 'mɦ', 'mʥ', 'pʧ', 'rp', 'rw', 'sʧ', 'çt', 'ŋʂ', 'ɫm', 'ɭm', 'ɾs', 'ʐd', 'bn', 'ff', 'kç', 'lb', 'ls', 'mʧ', 'nd̪', 'nʝ', 'n̪ˠt̪ˠ', 'rh', 'rz', 'rɮ', 'tv', 'ŋʨʰ', 'ɭb', 'ɭt', 'ɮtʰ', 'ɮx', 'ʁb', 'ʧn', 'βɾ', 'gs', 'gt', 'jl', 'kɕ', 'lh', 'lʲk', 'mkʰ', 'mr', 'nɹ', 'rʤ', 'trʲ', 'wv', 'zl', 'zvʲ', 'ŋt', 'ŋx', 'ɮs', 'ɮt', 'ɹf', 'ɾʃ', 'ʁd', 'ʨk', 'bʤ', 'd̪j', 'gm', 'gtʰ', 'gɾ', 'hw', 'hɾˠ', 'lɹ', 'lʨ', 'mnʲ', 'mv', 'mʨʰ', 'nr', 'nɥ', 'pv', 'pʁ', 'p̚ʨ', 'rʂ', 'stʰ', 'sv', 'sx', 'tvʲ', 't̪j', 'vnʲ', 'vɲ', 'ws', 'zb', 'zʲnʲ', 'ɣr', 'ɲɲ', 'ɲʨ', 'ɹʃ', 'ɾɣ', 'ʁl', 'ʁs', 'ʃl', 'ʎʨʰ', 'ʐn', 'ʧm', 'ʨʰj', 'bb', 'bz', 'bʁ', 'hm', 'kf', 'kh', 'mh', 'mk', 'mɬ', 'mʃ', 'np', 'nt̪', 'nɕʰ', 'nɬ', 'nʨʰ', 'pn', 'pɕː', 'rtʰ', 'rʋ', 'rʐ', 'rʧ', 'sc', 'sd', 'sɾ', 'tg', 'tʦ', 'vɾ', 'vʁ', 'zg', 'zz', 'ðj', 'ŋf', 'ŋh', 'ŋs', 'ŋw', 'ɣɾ', 'ɭtʰ', 'ɭɕ', 'ɹʧ', 'ɾd', 'ɾt̪ʰ', 'ɾw', 'ʁv', 'ʃj', 'ʃv', 'ʃʋ', 'ʒm', 'bm', 'bɾ', 'cs', 'ct', 'df', 'dɥ', 'd̪d̪ʱ', 'glʲ', 'glˠ', 'gʃ', 'jd', 'j̃t', 'kɲ', 'kʰw', 'lnʲ', 'lç', 'lɦ', 'lʋ', 'lʲʂ', 'l̪ˠt̪ˠ', 'lθ', 'mbʱ', 'mpʰ', 'msʰ', 'mɕʰ', 'mɹ', 'mɾ', 'mˠpˠ', 'nd̪ʱ', 'nʦʰ', 'nʲtʲ', 'nʲʃ', 'pp', 'prʲ', 'px', 'pɕ', 'rtʲ', 'rʦ', 'sh', 'st̪ʰ', 'sʲnʲ', 'sˠk', 'tb', 'tlʲ', 'tʧ', 't̪n', 'vd', 'vr', 'vw', 'wk', 'wt', 'xg', 'zmʲ', 'zr', 'zt', 'ŋpʰ', 'ŋtʰ', 'ŋʨ', 'ɫs', 'ɮɮ', 'ɰ̃s', 'ɹv', 'ɾb', 'ɾd̪', 'ɾv', 'ɾʤ', 'ɾˠl̪ˠ', 'ɾˠsˠ', 'ʁf', 'ʁg', 'ʁk', 'ʂt', 'ʃn', 'ʝj', 'ʦr', 'θf', 'bd', 'blʲ', 'bt', 'cl', 'db', 'dɲ', 'dʁ', 'dʃ', 'dʤ', 'd̪ʱj', 'fh', 'fn', 'fsʲ', 'gb', 'gʁ', 'jg', 'jr', 'jv', 'jz', 'jɲ', 'jʒ', 'km', 'ktʲ', 'kv', 'kʁ', 'kʧ', 'lʔ', 'lʤ', 'lʲnʲ', 'lʲt', 'nɲ', 'nɾ', 'nʋ', 'nʨ', 'nʲʨ', 'pm', 'p̚k', 'rc', 'rɦ', 'rʧʰ', 'sr', 'sɮ', 'th', 'tz', 'tç', 'tɥ', 'tɮ', 'tʰɮ', 'tʲnʲ', 't̚ʨʰ', 't̪t̪', 'vrʲ', 'wp', 'wtʰ', 'ww', 'wz', 'ŋr', 'ŋʝ', 'ŋʦ', 'ɟm', 'ɟʃ', 'ɣm', 'ɫd', 'ɫv', 'ɮʦʰ', 'ɰɫ', 'ɰ̃ɕ', 'ɲc', 'ɲɟ', 'ɲʧʼ', 'ɹð', 'ɾc', 'ɾf', 'ɾh', 'ɾkʲ', 'ɾz', 'ɾʒ', 'ʂn', 'ʂnʲ', 'ʃb', 'ʃc', 'ʋs', 'ʐdʲ', 'ʐnʲ', 'ʤl', 'ʤm', 'ʦw', 'ʧk', 'ʨt', 'βl', 'θl', 'bd̪', 'bv', 'bʒ', 'bˠlˠ', 'ctʲ', 'dlʲ', 'ds', 'dɾ', 'dʲw', 'd̪ˠɾˠ', 'fd', 'fg', 'fk', 'fx', 'fʁ', 'gbʱ', 'gf', 'gh', 'gt̪', 'gʒ', 'gʧ', 'hj', 'hɾ', 'jf', 'jk', 'jm', 'js', 'jʂ', 'kd', 'klˠ', 'krʲ', 'kz', 'kɾˠ', 'kʈ', 'kʦ', 'kʰj', 'kʰn', 'k̚pʰ', 'ld̪', 'lpː', 'lr', 'lz', 'lɟ', 'lɣ', 'lɥ', 'lʐ', 'lʲtʲ', 'lʲz', 'lʲʦ', 'lʲʨ', 'lːj', 'l̠ʲtʲ', 'mǀ', 'mǃ', 'mɕ', 'mɲ', 'mʲʃ', 'mˠɾˠ', 'nkʰ', 'npʰ', 'ntː', 'ntˤ', 'nð', 'nɣ', 'nʁ', 'nʒ', 'nːs', 'nˠsˠ', 'n̪k', 'pbʱ', 'pf', 'plʲ', 'pt̪', 'pw', 'pz', 'pʰj', 'pˠt̪ˠ', 'p̚p', 'p̚ʨʰ', 'qq', 'rɧ', 'rʒ', 'rʦʰ', 'rʲj', 'smʲ', 'spʲ', 'sz', 'sɲ', 'sʋ', 'sʲm', 'sːt', 'td', 'tkʲ', 'tɲ', 'tʤ', 'tʰg', 'tʰw', 'tʲj', 'tˤtˤ', 't̚k', 't̚ʨ', 't̪ʰm', 't̪ˠɾˠ', 't͡ʂʂ', 'wg', 'wl', 'wx', 'wɮ', 'wɾ', 'wʃ', 'wʤ', 'wʦʰ', 'xk', 'xnʲ', 'xn̪ˠ', 'xr', 'xtʰ', 'xɮ', 'xʁ', 'zk', 'zɟ', 'zʲdʲ', 'ðɾ', 'ŋz', 'ŋɥ', 'ǀʰw', 'ǃʰw', 'ɕːn', 'ɣj', 'ɣn', 'ɦl', 'ɫg', 'ɫp', 'ɫɫ', 'ɭk', 'ɭpʰ', 'ɮʧ', 'ɲb', 'ɲz', 'ɹp', 'ɹʒ', 'ɹʤ', 'ɾl', 'ɾp', 'ɾʔ', 'ɾˠdʲ', 'ɾˠd̪ˠ', 'ɾˠk', 'ɾˠmˠ', 'ɾˠtʲ', 'ɾˠt̪ˠ', 'ɾˠʃ', 'ɾβ', 'ʁh', 'ʁz', 'ʁʃ', 'ʁʒ', 'ʂl', 'ʃh', 'ʃkʲ', 'ʃlʲ', 'ʃr', 'ʃs', 'ʈn', 'ʈʈ', 'ʋj', 'ʋn', 'ʋɾ', 'ʋʤ', 'ʐb', 'ʒj', 'ʒl', 'ʔɾ', 'ʕl', 'ʕt', 'ʕtˤ', 'ʤt', 'ʤʱs', 'ʦk', 'ʦkʲ', 'ʦʰs', 'ʦʲsʲ', 'ʧɲ', 'ʧʰs', 'βw', 'θj', 'θɹ', 'χt', 'ᶢǀʱw', 'br̝', 'bw', 'bɥ', 'bʃ', 'bʕ', 'cʃ', 'dg', 'dmʲ', 'dt', 'dvʲ', 'dx', 'dʣ', 'dʲb', 'd̪ɾ', 'd͡ʐʐ', 'fm', 'fp', 'fr', 'ft̪ʰ', 'fw', 'fħ', 'fɣ', 'fʂ', 'fʃ', 'fʨ', 'gg', 'gk', 'gv', 'gx', 'gʐ', 'gʤ', 'gʧʰ', 'hb', 'hd̪', 'hl', 'hr', 'hv', 'hɫ', 'hʋ', 'jb', 'jd̪', 'jð', 'jʎ', 'jʔ', 'kb', 'klʲ', 'kɦ', 'kʰtʰ', 'kːt', 'k̚p', 'k̚tʰ', 'k̚ʨʰ', 'k̚ʲkʲ', 'lc', 'lgʲ', 'lkʲ', 'lq', 'ltː', 'lð', 'lħ', 'lɲ', 'lʒ', 'lʧ', 'lʲzʲ', 'mlʲ', 'mn̪', 'mpʲ', 'mpː', 'mtʰ', 'mt̪ʰ', 'mɫ', 'mɮ', 'mʒ', 'mʔ', 'mʝ', 'mʤ', 'mʦ', 'mʦʰ', 'mʨ', 'mʲt', 'mθ', 'mᵑǀ', 'nkʲ', 'nr̥', 'nsː', 'nsˤ', 'nt̪ʰ', 'nǂ', 'nɟ', 'nɧ', 'nɫ', 'nʐ', 'nʔ', 'nʦʼ', 'nʧʰ', 'nʲdʲ', 'nʲgʲ', 'nʲkʲ', 'nʲɕː', 'nːt', 'n̪j', 'ppʰ', 'pɥ', 'pɫ', 'p̚ʲpʲ', 'qd', 'qsˤ', 'qt', 'qtˤ', 'qʕ', 'rdʲ', 'rgʲ', 'rkː', 'rmʲ', 'rnʲ', 'rpʲ', 'rsʲ', 'rç', 'rɬ', 'rɲ', 'rʨ', 'rʲb', 'rʲm', 'rʲs', 'rʲʦʰ', 'rːj', 'sb', 'spʰ', 'sç', 'sɥ', 'sɹ', 'sʈ', 'sʔ', 'sʕ', 'sːm', 'sˤb', 'sˤm', 'sˤn', 'sˤtˤ', 'sθ', 'sχ', 'tc', 'tmʲ', 'tp', 'tpʲ', 'tr̝̊', 'tx', 'tɕ', 'tɧ', 'tɫ', 'tʀ', 'tʃʰ', 'tʔ', 'tʰn', 'tʰr', 'tːn', 'tːvʲ', 'tˤʕ', 't̚f', 't̚p', 't̪m', 't̪r', 't̪ʰʋ', 'vb', 'vg', 'vv', 'vð', 'vχ', 'wb', 'wd', 'wdˤ', 'wm', 'wq', 'wð', 'wɫ', 'wʧʰ', 'wβ', 'xd', 'xf', 'xh', 'xl', 'xm', 'xs', 'xt̪ʰ', 'xv', 'xz', 'xɲ', 'xʦ', 'xʦʰ', 'zgʲ', 'zh', 'zp', 'zrʲ', 'zr̝', 'zɦ', 'zɫ', 'zɲ', 'zɹ', 'zʲb', 'zʲj', 'çk', 'çl', 'ðɹ', 'ħd', 'ħm', 'ħn', 'ħr', 'ħt', 'ŋgʲ', 'ŋkː', 'ŋp', 'ŋɟ', 'ŋʦʰ', 'ŋʲgʲ', 'ŋθ', 'ɟb', 'ɟl', 'ɟn', 'ɟr', 'ɣw', 'ɫk', 'ɫn', 'ɫɟ', 'ɫɣ', 'ɬw', 'ɭkʰ', 'ɭp', 'ɭsʰ', 'ɭɕʰ', 'ɮn', 'ɰ̃j', 'ɱf', 'ɲl', 'ɲt', 'ɲʃ', 'ɲʧ', 'ɲ̟ʨ', 'ɴɕʲ', 'ɴɣ', 'ɹw', 'ɹɖ', 'ɹɾ', 'ɹθ', 'ɻk', 'ɻn', 'ɾgʲ', 'ɾx', 'ɾʝ', 'ɾʧ', 'ʁw', 'ʁç', 'ʂʈ', 'ʃx', 'ʃɣ', 'ʃɲ', 'ʃʈ', 'ʎʥ', 'ʒb', 'ʒd', 'ʒn', 'ʒt̪ʰ', 'ʒɲ', 'ʔd', 'ʔm', 'ʔn', 'ʔz', 'ʔθ', 'ʤr', 'ʦl', 'ʦn', 'ʦs', 'ʦç', 'ʦɮ', 'ʦʰn', 'ʦʰw', 'ʦːj', 'ʧc', 'ʧf', 'ʧg', 'ʧl', 'ʧʰn', 'ʧʰtʰ', 'ʧʰɮ', 'ʨnʲ', 'ʨtʲ', 'βɟ', 'θd', 'θh', 'θm', 'θw', 'θç', 'χk', 'χm', 'χn', 'χr', 'ᵑǀw', 'ᵝk̚k', 'ᵝnɽ', 'ᵝŋg', 'ᵝɰ̃j'];

let poss_CCC_mid = ['stɹ', 'ntɹ', 'mpl', 'ntl', 'ksp', 'ndʒ', 'nst', 'str', 'mpɹ', 'ntʃ', 'kst', 'nkl', 'stv', 'ksj', 'ntr', 'nts', 'ŋɲj', 'ktʃ', 'ŋkw', 'ndɹ', 'nsp', 'stl', 'stʃ', 'ʃtɾ', 'mpt', 'nkw', 'nβw', 'skɹ', 'ŋkʃ', 'ktɹ', 'ŋgj', 'ŋgw', 'ŋʈʂʰ', 'ʎʎj', 'bst', 'mbl', 'mbɹ', 'mpj', 'skl', 'stj', 'ŋβw', 'bdʒ', 'ktl', 'ndl', 'nfl', 'ntm', 'nʈʂ', 'nʨj', 'spl', 'stʁ', 'ŋgɾ', 'ʁsj', 'ʦtv', 'ltr', 'mɲj', 'ndr', 'ngj', 'nmj', 'nsj', 'nsm', 'ntv', 'tst', 'dʒm', 'ldl', 'mpʃ', 'ngw', 'nkɹ', 'nsf', 'nsk', 'ntw', 'ntʋ', 'nxw', 'pst', 'rtʃ', 'skj', 'stw', 'tʃm', 'wtɾ', 'ðdɹ', 'ŋxj', 'ŋʈʂ', 'ɭgw', 'ɭpʰj', 'ddʒ', 'kkj', 'ktɥ', 'k̚kj', 'ldʒ', 'lgɹ', 'lkj', 'ltʃ', 'mst', 'mʧɮ', 'ndj', 'nfɹ', 'ngl', 'ngɹ', 'nskʲ', 'nsl', 'ntk', 'nzl', 'nʈʂʰ', 'rst', 'rtr', 'spr', 'stk', 'stm', 'sʲtʲj', 'tkr', 'ŋgɹ', 'ŋkt', 'ŋmj', 'ŋʝj', 'ɭgj', 'ɮtʰg', 'ɮʧʰɮ', 'ɹml', 'ɹst', 'ɹtj', 'ʃkɾ', 'dʒj', 'ftl', 'gts', 'jskʲ', 'kkw', 'ktf', 'ktr', 'k̚pj', 'lfd', 'lst', 'ltj', 'ltɹ', 'lʐn', 'mbj', 'mbʀ', 'mft', 'mpʰj', 'mɦl', 'ndf', 'ndm', 'ndt', 'nfj', 'ngz', 'nkx', 'npl', 'nst̪ʰ', 'ntf', 'nzp', 'nçm', 'nɲj', 'nʝj', 'nʤm', 'nʦj', 'nʨʰw', 'nθj', 'ptʃ', 'rsg', 'rsm', 'rsx', 'rtv', 'rtɮ', 'rxn', 'sgɹ', 'skv', 'spj', 'stɲ', 'tpr', 'tsm', 'ttr', 'tts', 't̪ɾk', 'wʧʰɮ', 'ðst', 'ŋgl', 'ŋkr', 'ŋkʰw', 'ŋpʰj', 'ŋʦw', 'ŋʨj', 'ɮtw', 'ɮtʰtʰ', 'ɹdʒ', 'ɹpl', 'ɹtl', 'ɹtʃ', 'ɹθw', 'ɾdʒ', 'ɾtʃ', 'ɾʋʤ', 'ɾˠsˠk', 'ʁkl', 'ʃpʁ', 'ʃʈɾ', 'ʦtvʲ', 'bvj', 'dbʁ', 'dgɹ', 'dkw', 'fskʲ', 'fst', 'fsx', 'ftr', 'ftw', 'ftʁ', 'gdʒ', 'gtt', 'gɦl', 'jdn', 'jmɲ', 'jsk', 'jvj', 'jɟm', 'kgɹ', 'ksf', 'ksk', 'ksm', 'ksw', 'kts', 'ktʁ', 'kçj', 'k̚kw', 'k̚pʰj', 'ldf', 'ldh', 'ldn', 'ldr', 'ldɹ', 'lfm', 'lft', 'lgʁ', 'llg', 'llv', 'lmn', 'lpf', 'lpl', 'lsh', 'lsk', 'lsʍ', 'lts', 'ltz', 'mbr', 'mdʒ', 'mfl', 'mfɹ', 'mgw', 'mnd', 'mng', 'mpf', 'mpʧ', 'mtʃ', 'mtʰt', 'mtʰɮ', 'mʧtʰ', 'mʲtr', 'mʲtʰn', 'nbl', 'nbɹ', 'ndb', 'ndk', 'ndn', 'nds', 'ndz', 'ndʃ', 'nglʲ', 'ngr', 'ngʀ', 'nkj', 'nkt', 'nkʃ', 'nlj', 'nnj', 'npj', 'npʰj', 'nspʲ', 'nsɫ', 'nsɮ', 'ntb', 'nth', 'ntj', 'ntʔ', 'ntʰr', 'nt̪ɾ', 'nxj', 'nxr', 'nɦl', 'nʃs', 'nʦg', 'nʧr', 'nʧɮ', 'nʨʰj', 'nːts', 'nθl', 'nθɾ', 'nχr', 'pdr', 'plw', 'ppl', 'prj', 'psj', 'pɾj', 'p̚kw', 'rbr', 'rdn', 'rdʋ', 'rkt', 'rpl', 'rsd', 'rsk', 'rtk', 'rtn', 'rtrʲ', 'rts', 'rxnʲ', 'rxɮ', 'rðʝ', 'rʃs', 'rʃɮ', 'rʐd', 'rʧʰɮ', 'rʨʰj', 'rːkn', 'sdʒ', 'sklʲ', 'skr', 'stf', 'stg', 'stn', 'strʲ', 'stvʲ', 'sxr', 'sːtr', 'tbl', 'tbʁ', 'tch', 'tlm', 'tprʲ', 'tsd', 'tsj', 'tsx', 'tsç', 'tth', 'tʃl', 'tʃn̪', 'tʃw', 'tʦj', 'wsr', 'wts', 'wtʰg', 'wʧʰr', 'xtx', 'xtʃ', 'zdv', 'zdʒ', 'zglʲ', 'zvr', 'çst', 'çtl', 'ŋgz', 'ŋkf', 'ŋkj', 'ŋkl', 'ŋkn', 'ŋkɹ', 'ŋkθ', 'ŋtj', 'ŋts', 'ŋxw', 'ŋɣn', 'ŋʨʰj', 'ǀtr', 'ɫdʒ', 'ɭkç', 'ɭmj', 'ɮtt', 'ɮtɮ', 'ɮʧɮ', 'ɰɫs', 'ɲʤw', 'ɹdl', 'ɹdʃ', 'ɹfl', 'ɹkj', 'ɹnf', 'ɹnj', 'ɹsb', 'ɹsl', 'ɹtf', 'ɹtm', 'ɾkɫ', 'ʁdn', 'ʁdɥ', 'ʁfw', 'ʁkw', 'ʁnj', 'ʁnz', 'ʁpɾ', 'ʁpʁ', 'ʁsp', 'ʁsɥ', 'ʁtj', 'ʁtl', 'ʁtʃ', 'ʁʃl', 'ʂsk', 'ʃpl', 'ʃpʀ', 'ʃtv', 'ʃtɲ', 'ʃtʃ', 'ʈʂw', 'ʱt̪t̪ʋ', 'θkw'];

let poss_C_coda = ['n', 't', 'l', 'ŋ', 's', 'd', 'k', 'm', 'r', 'ʃ', 'z', 'j', 'tʲ', 'x', 'ɾ', 'g', 'ɹ', 'ʁ', 'p', 'v', 'k̚', 'f', 'ɭ', 'h', 'w', 'ɾˠ', 'ɮ', 'ɾʲ', 'b', 'ç', 'sˠ', 'ɟ', 'nʲ', 't̪', 'ɫ', 'w̃', 'ʧ', 'n̪ˠ', 'θ', 'ɲ', 'd̪ˠ', 't̚', 'lʲ', 'nˠ', 'p̚', 'tː', 'vˠ', 'ʤ', 'ʦ', 'j̃', 'l̪ˠ', 'ʔ', 'mʲ', 'bː', 'c', 'χ', 'lˠ', 'ɴ', 'ð', 'd̪', 'ʒ', 'tʰ', 'ʕ', 'ʋ', 'ʨ', 'kʰ', 'q', 'sʲ', 'ʈ', 'd̪ʱ', 'mˠ', 'rʲ', 't̪ʰ', 'ʂ', 'dʲ', 'n̠ʲ', 'ʧʰ', 'nː', 'vʲ', 'ħ', 'ɮʲ', 'fʲ', 'ɬ', 'kː', 'lː', 'ɕː', 'ɖ', 'ɟː', 'ɽ', 'jˀ', 'pː', 'rː', 'wʲ', 'ɾ̝̊', 'ʦʰ', 'kʲ', 'k̟̚', 'l̠ʲ', 'nʱ', 'nˀ', 'sː', 'tˤ', 't̪ˠ', 'xʲ', 'ʈʰ', 'ʱɾ', 'ᵝɴ', 'dˤ', 'gː', 'mː', 'r̝̊', 'wˀ', 'ŋˀ', 'ǀ', 'ɣ', 'ɻ', 'ʦː'];

let poss_CC_coda = ['nt', 'st', 'nd', 'ns', 'nz', 'rm', 'kt', 'ts', 'lt', 'ks', 'ld', 'rt', 'lz', 'dz', 'pt', 'dʒ', 'ŋk', 'mz', 'zd', 'ʃt', 'ft', 'sʲtʲ', 'tt', 'ɹd', 'xt', 'ɹz', 'tʃ', 'ŋz', 'ps', 'wŋ͡m', 'vd', 'xt̪ˠ', 'bl', 'md', 'sk', 'vz', 'mp', 'çt', 'lf', 'ŋg', 'lk', 'tʁ', 'll', 'ls', 'rk', 'ʁt', 'gz', 'jŋ̟', 'rb', 'ɹt', 'dʁ', 'jʔ', 'lv', 'nʃ', 'rs', 't̚ʔ', 'ɮtʰ', 'bb', 'lm', 'ɹs', 'jʃ', 'k̚ʔ', 'nʔ', 't̪ɾ', 'bz', 'bʁ', 'jj', 'n̠ʲtʲ', 'rd', 'ɹk', 'ɹm', 'ɾn', 'js', 'lp', 'nʧ', 'rn', 'wʃ', 'wʔ', 'ŋʔ', 'ɾj', 'ʁs', 'd̪d̪ʱ', 'mt', 'mʧ', 'nθ', 'rtʰ', 'ɮʧ', 'ɹn', 'ɾʃ', 'ɾˠd̪ˠ', 'ɾˠtʲ', 'ɾˠt̪ˠ', 'ʁm', 'ʧt', 'bd', 'fs', 'gtʰ', 'jt', 'nf', 'ng', 'nk', 'nʦ', 'p̚ʔ', 'rʃ', 'sp', 'vʁ', 'ɮs', 'ɾg', 'ʁk', 'ʁʃ', 'ʤd', 'j̃ʃ', 'kt̪', 'lʃ', 'lθ', 'ms', 'nd̪', 'nd̪ʱ', 'nt̪', 'rx', 'rʦ', 'ss', 'sˠt̪ˠ', 'wʧʰ', 'ŋd', 'ɾbʱ', 'ɾt̪ʰ', 'ɾʧ', 'ɾʲtʲ', 'ʁʒ', 'ʃtʲ', 'ff', 'fl', 'fʁ', 'gd', 'gʧʰ', 'j̃s', 'kl', 'kʃ', 'nn', 'pl', 'rj', 'sl', 'stʰ', 'zt', 'ðz', 'ɾd̪', 'ʁl', 'ʁn', 'ʃk', 'bd̪', 'bd̪ʱ', 'blʲ', 'ch', 'd̪j', 'gʧ', 'hn', 'hɾ', 'jd', 'jk̟̚', 'k̟̚ʔ', 'lɟ', 'lʒ', 'lʦ', 'lʧ', 'l̪ˠt̪ˠ', 'nx', 'nʤ', 'nʲtʲ', 'n̪ˠsˠ', 'n̪ˠt̪ˠ', 'pt̪', 'rdˤ', 'rf', 'rr', 'rɟ', 'rʧ', 'rʧʰ', 'sm', 'sɾ', 'sˠk', 'tr', 'tr̝̊', 't̪j', 't̪n', 't̪ʋ', 'wn', 'ws', 'w̃ʃ', 'zm', 'zʔ', 'zʲnʲ', 'ðd', 'ŋgʱ', 'ŋs', 'ŋt', 'ɫd', 'ɫt', 'ɲv', 'ɹf', 'ɹʃ', 'ɹθ', 'ɾk', 'ɾm', 'ɾs', 'ɾɖ', 'ɾʈ', 'ɾʋ', 'ɾˠk', 'ʁç', 'ʂtʲ', 'ʃj', 'ʃn', 'ʃʈ', 'ʦt', 'θs', 'bn', 'brʲ', 'dd', 'dl', 'dn', 'dv', 'dθ', 'ftʰ', 'ft̪', 'fθ', 'gg', 'gh', 'gs', 'gŋ', 'gʃ', 'gʦʰ', 'hl', 'jc', 'jf', 'jk', 'jl', 'jɾ', 'kk', 'kʰtʰ', 'lb', 'lx', 'lħ', 'lʤ', 'lʲm', 'mb', 'mf', 'ml', 'mn', 'mr', 'mɾ', 'mʔ', 'mʧʰ', 'mθ', 'nj', 'nkʰ', 'nl', 'ntʰ', 'nv', 'nw', 'nʦʰ', 'pf', 'pj', 'pp', 'pʁ', 'pʃ', 'pθ', 'ql', 'qt', 'rg', 'rl', 'rp', 'rtʲ', 'rv', 'rɲ', 'rʦʰ', 'rʲs', 'rθ', 'sg', 'sʦ', 'sʲnʲ', 'sːt', 'th', 'tl', 'tm', 'tˤħ', 'tθ', 'vn', 'vr', 'wf', 'wk͡p̚', 'wl', 'wm', 'wŋ͡mˀ', 'wɾ', 'wʤ', 'wʦʰ', 'wʲʧ', 'xt̪ʰ', 'zv', 'çʦ', 'ħr', 'ŋn', 'ǀk', 'ɮt', 'ɮx', 'ɮɮ', 'ɹb', 'ɹʧ', 'ɾb', 'ɾd', 'ɾt', 'ʁd', 'ʁv', 'ʁʦ', 'ʂʈ', 'ʃd', 'ʃm', 'ʃq', 'ʃt̪', 'ʔd', 'ʔj', 'ʔɾ', 'ʕdˤ', 'ʤm'];

let poss_CCC_coda = ['nts', 'ndz', 'sts', 'nst', 'kst', 'kts', 'ŋks', 'ŋkt', 'ndʒ', 'dʒd', 'mpt', 'ntʃ', 'tʃt', 'ɹts', 'wŋ͡mʔ', 'ɹdz', 'ɹmd', 'ɹmz', 'lvz', 'tst', 'ŋst', 'ɹst', 'ʁts', 'dst', 'ldz', 'lts', 'lvd', 'rst', 'spt', 'stʁ', 'wk͡p̚ʔ', 'xts', 'ɹks', 'ɹnd', 'mps', 'tʧh', 'çts', 'ŋkθ', 'ɹkt', 'ʁdʁ', 'ʁsk', 'fts', 'jnd', 'jŋ̟ʔ', 'ldʒ', 'lfs', 'lft', 'llt', 'lmd', 'lps', 'lpt', 'lst', 'mpf', 'mst', 'ndd', 'ndl', 'nds', 'nft', 'nkt', 'ntl', 'ntr', 'nʃl', 'nʧh', 'nʧt', 'nːsk', 'nθs', 'pts', 'pθs', 'rkt', 'rmt', 'rts', 'rxt', 'sks', 'skt', 'str', 'ŋgz', 'ɹbd', 'ɹdʒ', 'ɹlz', 'ɹnz', 'ɹvd'];

let static_posAbbreviations = {
  'noun': 'n'
  , 'numeral': 'num'
  , 'verb': 'v'
  , 'adjective': 'adj'
  , 'adverb': 'adv'
  , 'pronoun': 'pron'
  , 'determiner': 'det'
  , 'article': 'art'
  , 'preposition': 'prep'
  , 'conjunction': 'conj'
  , 'interjection': 'interj'
}

function fixCommas(string) {
  const rg = /({[^}]*?,) /g;
  while (rg.test(string)) {
    string = string.replace(rg, '$1');
  }
  string = string.replace(/ +,/g, ',').replace(/{ +/g, '{').replace(/ +}/g, '}')
  return string;
}

let lastLang = undefined;

// fix - better name. Is located in other files!
/***********************************************************************************************************************************************************
 !-- Main function
 ***********************************************************************************************************************************************************/
function generate() {
  irrSpellRules = {};
  hasIrregularSeplling = false;
  notEnoughWarning = false;
  hashedSoundChanges = {};
  // fix - move closer down
  morphRules = {};
  // fix - move closer down
  morphRulesOrder = [];
  // fix - move closer down, or, can this be removed as a global? is currently needed by translator
  grammarWords = {};
  // fix - move closer down
  warnings = '';
  // fix - move closer down

  /******************************
   Word order stuff
   *******************************/

    // do word order stuff before vocab generation

  let randmainOrder = rand();
  // keep outside to preserve word order choices

  if (randmainOrder < 0.47) {
    svo = 'SOV';
  } else if (randmainOrder < 0.88) {
    svo = 'SVO';
  } else if (randmainOrder < 0.9663) {
    svo = 'VSO';
  } else if (randmainOrder < 0.9873) {
    svo = 'VOS';
  } else if (randmainOrder < 0.9966) {
    svo = 'OVS';
  } else {
    svo = 'OSV';
  }

  let mainOrder = getRadioValue('wordOrder_rb');

  if (mainOrder == 'random')
    mainOrder = svo;
  // if 'random' selected

  let OV = false;
  S = 'n';
  // can this be hoisted up? depends if it needs to be reset to 'n' at this point
  VP = 'n';
  switch (mainOrder) {
    case 'SOV':
      VP = 'r';
      OV = true;
      break;
    case 'SVO':
      break;
    case 'VSO':
      S = 'r';
      break;
    case 'VOS':
      S = 'r';
      break;
    case 'OVS':
      S = 'r';
      VP = 'r';
      OV = true;
      break;
    case 'OSV':
      break;
  }

  // determine word order of Oblique phrase (X)
  let obliqueOrder = rand();

  if (mainOrder.indexOf('O') < mainOrder.indexOf('V')) {
    if (obliqueOrder < 0.4) {
      obliqueOrder = 'XOV';
    } else if (obliqueOrder < 0.625) {
      obliqueOrder = 'OXV';
    } else {
      obliqueOrder = 'OVX';
    }
  } else {
    obliqueOrder = (obliqueOrder < 0.985) ? 'VOX' : 'XVO';
  }

  let marker, obliqueX;
  switch (obliqueOrder.indexOf('X')) {
    case 2:
      marker = obliqueOrder[1];
      obliqueX = obliqueOrder[1] + 'X';
      break;
    case 1:
      marker = obliqueOrder[0];
      obliqueX = obliqueOrder[0] + 'X';
      break;
    case 0:
      marker = obliqueOrder[1];
      obliqueX = 'X' + obliqueOrder[1];
  }

  let constructit = mainOrder.split(marker);
  constructit = constructit[0] + obliqueX + constructit[1];
  let spellOutWordOrder = [];
  let sentence = [];

  for (let letter of constructit) {
    let phrase, phraseEnglish;
    switch (letter) {
      case 'S':
        phrase = 'Subject';
        phraseEnglish = 'Mary';
        break;
      case 'V':
        phrase = 'Verb';
        phraseEnglish = 'opened';
        break;
      case 'O':
        phrase = 'Object';
        phraseEnglish = 'the door';
        break;
      case 'X':
        phrase = '(Prepositional phrase)';
        phraseEnglish = 'with a key';
    }
    spellOutWordOrder.push(phrase);
    sentence.push(phraseEnglish);
  }

  spellOutWordOrder = spellOutWordOrder.join(' ');
  sentence = sentence.join(' ');

  let randModifierOrder = rand();
  let prepost = rand();

  let indexofS = mainOrder.indexOf('S');
  let indexofO = mainOrder.indexOf('O');
  let indexofV = mainOrder.indexOf('V');

  let adposition = getRadioValue('prePostPosition_rb');

  if (adposition == 'random') {
    if (indexofS < indexofO && indexofO < indexofV) {
      modifierOrder = 'before';
      adposition = 'postposition';
    } else if (indexofV < indexofS && indexofS < indexofO) {
      modifierOrder = 'after';
      adposition = 'preposition';
    } else {
      modifierOrder = (randModifierOrder < 0.3) ? 'after' : 'before';
      adposition = (prepost < 0.3) ? 'postposition' : 'preposition';
    }
  }
  PP = (adposition == 'preposition') ? 'n' : 'r';

  let adjOrder = getRadioValue('adjectiveOrder_rb');

  switch (adjOrder) {
    case 'before':
      modifierOrder = 'before';
      NAP = 'n';
      break;
    case 'after':
      modifierOrder = 'after';
      NAP = 'r';
  }

  (function () {
    let forcedAffix = getRadioValue('forceAffixes_rb');

    if (['suffix', 'prefix'].includes(forcedAffix)) {
      globalAffix = forcedAffix;
    } else {
      let randGlobalAffix = rand();

      if (randGlobalAffix < 0.7) {
        switch (adposition) {
          case 'preposition':
            globalAffix = (randGlobalAffix < 0.2) ? 'suffix' : 'prefix';
            break;
          case 'postposition':
            globalAffix = (randGlobalAffix < 0.45) ? 'suffix' : 'prefix';
        }
      } else {
        globalAffix = 'either';
      }
    }
  })();

  /************************
   Gender stuff for vocab list
   ************************/

  genderLables = [];
  let hasGenderMuliplier;

  if (isChecked('nounGenderCheck')) {
    let nounGenderText = getInput('nounGenders');
    hasGenderMuliplier = /\* *\d{1,3} *$/m.test(nounGenderText);
    for (let line of nounGenderText.split('\n')) {
      line = line.trim();
      if (line)
        genderLables.push(line.replaceAll(' ', ''));
    }

    if (genderLables.length == 1) {
      genderLables = [];
      warnings += '<li>You only added a single noun gender! Languages must have at least two genders, or else it is the same as having no gender at all.</li>';
    }

    hasAnimacy = genderLables.length == 2 && genderLables.includes('ANimate') && genderLables.includes('INanimate');
  } else {
    // random noun gender
    let randGender = rand();
    if (randGender < 0.77) { // pass
    } else if (randGender < 0.91) {
      genderLables.push('Masculine', 'Feminine');
    } else {
      genderLables.push('Masculine', 'Feminine', 'NeuTer');
    }
  }

  hasGenders = genderLables.length;

  gendersYuled = [];

  let posAbbreviations = JSON.parse(JSON.stringify(static_posAbbreviations));

  for (let i of range(genderLables)) {
    let multiplier;
    if (hasGenderMuliplier) {
      multiplier = parseInt(genderLables[i].match(/\* *\d{1,3} *$/)?.[0].match(/\d{1,3}/)[0]) || '1';
      genderLables[i] = genderLables[i].replace(/ *\* *\d{1,3} *$/, '');
    } else {
      multiplier = dropoff('medium', i + 1, genderLables.length);
    }

    let abbreviation = genderLables[i].match(rg_upperTag)?.join('').toLowerCase() || genderLables[i].toLowerCase();

    for (let j = 0; j < multiplier; j++) {
      gendersYuled.push(abbreviation);
    }

    posAbbreviations[genderLables[i].toLowerCase() + ' noun'] = 'n' + abbreviation;
  }

  let abbreviationsExplained = [];

  for (let [key, value] of Object.entries(posAbbreviations)) {
    abbreviationsExplained.push(`<ps>${value}.</ps> ${key}`);
  }

  abbreviationsExplained = abbreviationsExplained.sort().join(' <span class="vl__vert-div">|</span> ');

  let removeDefaultWords = isChecked('removeDefaultWords');

  englishList = (!removeDefaultWords) ? [...englishListDefault] : [];

  /************************
   Dropoff rate
   ************************/
  let dropoffType = getRadioValue('dropoffRate_rb');

  /************************
   Advanced Word Structure stuff
   ************************/

  AWSclasses = {};
  countWords = 0;
  globalWordPatterns = {};
  awsAffixes = {};

  let advancedConsonants, advancedVowels;
  if (isSelected.advancedWordStructure) {
    const M = '[' + uConsonant_Mn + uConsonant_Mc + uVowel_Mn + uVowel_Mc + ']+';

    rg_AWS_classes = '';
    // reset to nothing

    let classesInput = getInput('phonemeClasses').replace(/[ˈˌ]/g, '');
    if (classesInput.includes('(')) {
      classesInput = classesInput.replace(/[()]/g, '');
      warnings += '<li>Optional brackets cannot be used in Phoneme Classes. They can only be used in Word Patterns and Affix Patterns</li>';
    }
    classesInput = cleanIPA(classesInput);

    wordPatterns = cleanIPA(getInput('wordPatterns').replace(/[ˈˌ]/g, ''));

    let phonemesInWP = wordPatterns.replace(/\w+ *=/g, '');

    advancedConsonants = classesInput + phonemesInWP;
    advancedConsonants = advancedConsonants.match(rgConsonant);
    advancedVowels = classesInput + phonemesInWP;
    advancedVowels = advancedVowels.match(rgSyllabicNucleus);

    wordPatterns = wordPatterns.replace(/\)(?!\d\d?%)/g, ')20%').replace(/number(?= *=)/, 'numeral').split(/\s(?=\w+ *=)/);

    classesInput = classesInput.match(/[A-ZΓΔΘΛΞΠΣΦΨΩ] *=.*/g);
    // must not be \p{Lu}
    for (let line of classesInput) {
      line = line.split(/ *= */);
      let key = line[0].match(/[A-ZΓΔΘΛΞΠΣΦΨΩ]/)[0];
      let phonemeList = line[1];
      let times10 = /\.\d/.test(phonemeList) ? 10 : 1;
      phonemeList = phonemeList.replace(/ *, */g, ' ').trim().split(/ +/);
      phonemeList = multiply(phonemeList, times10);

      AWSclasses[key] = dropoffDist(phonemeList, dropoffType).list;
      rg_AWS_classes += key;
    }
    rg_AWS_classes = new RegExp('[' + rg_AWS_classes + ']');

    const rg_symbols_with_probabilities = new RegExp(String.raw`(-|\(.*?\)|(${pSyllabicNucleus})|(${pConsonant})|[A-ZΓΔΘΛΞΠΣΦΨΩ]|${M})(\d\d?%)?`, 'g');
    const rg_symbolsOnly = new RegExp(String.raw`(\(.*?\)|(${pSyllabicNucleus})|(${pConsonant})|[A-ZΓΔΘΛΞΠΣΦΨΩ]|${M})`, 'g');

    let wordPatternProbabilities = function (a) {
      let symbols_with_probabilities = a.match(rg_symbols_with_probabilities);
      let symbols = [];
      let probabilities = [];
      for (let i of symbols_with_probabilities) {
        if (/\d%/.test(i)) {
          symbols.push(i.match(rg_symbolsOnly)[0].replace(/[()]/g, ''));
          probabilities.push(parseFloat(i.match(/\d\d?(?=%)/)[0]) / 100);
        } else {
          symbols.push(i);
          probabilities.push(1);
        }
      }
      return [symbols, probabilities];
      // returns table of symbols to probabilities
    }

    let badPatterns = function (string) {
      return /^.\d+$|^\([^(]*\)\d+$/.test(string) == false;
    }

    let nonDefaultPats = [];
    let hasDefault = false;
    for (let i of range(wordPatterns)) {
      let POS, pats;
      if (i == 0 && !/\p{L}+(?= *=)/u.test(wordPatterns[i])) {
        // if first default block
        POS = 'default';
        pats = wordPatterns[i];
        hasDefault = true;
      } else {
        // if "pos =" block
        POS = wordPatterns[i].match(/\p{L}+(?= *=)/u)[0];
        pats = wordPatterns[i].replace(/\p{L}+ *=/u, '');
      }
      POS = POS.toLowerCase();
      if (posAbbreviations[POS])
        POS = posAbbreviations[POS];

      let phonemeClassesUsed = pats.match(/[A-ZΓΔΘΛΞΠΣΦΨΩ]/g);
      for (let upperClass of phonemeClassesUsed) {
        if (!AWSclasses[upperClass])
          warnings += '<li>Phoneme class <b>' + upperClass + '</b> was used in Word Patterns, but was not defined in Phoneme Classes</li>';
      }
      let times10 = /\.\d/.test(pats) ? 10 : 1;
      pats = pats.trim().split(/\s+/);
      pats = multiply(pats, times10);

      if (!hasDefault)
        nonDefaultPats.push(...pats);

      pats = pats.filter(badPatterns).map(wordPatternProbabilities);

      globalWordPatterns[POS] = pats;
    }

    if (!hasDefault) {
      globalWordPatterns['default'] = nonDefaultPats.filter(badPatterns).map(wordPatternProbabilities);
    }

    let affixPatterns = cleanIPA(getInput('affixPatterns'));

    if (!affixPatterns.length)
      affixPatterns = '-';

    let phonemeClassesUsed = affixPatterns.replace(/IF.*?THEN|ELSE/g, '').match(/[A-ZΓΔΘΛΞΠΣΦΨΩ]/g);
    if (phonemeClassesUsed) {
      for (let upperClass of phonemeClassesUsed) {
        if (!AWSclasses[upperClass])
          warnings += '<li>Phoneme class <b>' + upperClass + '</b> was used in Affix Patterns, but was not defined in Phoneme Classes</li>';
      }
    }

    let patternAffixProbabilities = function (a) {
      const rg_AWS_affix = new RegExp(String.raw`IF .*? THEN|ELSE| ?- ?|;|,|[^ ]+ *[→»«] *|(\(.*?\)|(${pSyllabicNucleus})|(${pConsonant})|[A-ZΓΔΘΛΞΠΣΦΨΩ]|${M})(\d\d?%)?`, 'g');
      let symbols_with_probabilities = a.match(rg_AWS_affix);
      let symbols = [];
      let probabilities = [];
      for (let i of symbols_with_probabilities) {
        if (!/IF |^ELSE$|>|</.test(i)) {
          i = i.replace(/\)(?!\d\d?%)/g, ')20%');
        }
        if (/\d%/.test(i)) {
          symbols.push(i.match(rg_symbolsOnly)[0].replace(/[()]/g, ''));
          probabilities.push(parseFloat(i.match(/\d\d?(?=%)/)[0]) / 100);
        } else {
          symbols.push(i);
          probabilities.push(1);
        }
      }
      return [symbols, probabilities];
      // returns table of symbols to probabilities
    }

    affixPatterns = affixPatterns.replace(/\n+/g, '\n').split('\n').map(a => a.trim());
    awsAffixes['default'] = affixPatterns.map(patternAffixProbabilities);
  }

  /********************************

   ********************************/

  let addRandomPhonemes = isChecked('addRandomPhonemes');
  applyPhonologicalChanges = isSelected.soundChangesCheck;
  // needs to be global

  reflectSoundChangesInSpelling = isChecked('reflectSoundChangesInSpelling');
  squareBracketChanges = isChecked('squareBracketChanges');
  spellingSensitiveToStress = isChecked('spellingSensitiveToStress');

  let customConsonants = createInventory(getInput('customConsonants'), rgValidConsonantInput);

  let illegalsGiven = getInput('illegalCombinations').replaceAll('∅', '');
  // null

  if (illegalsGiven.includes('[')) {
    // change [V +high] to [V+high]
    const rg = /(\[[^\]]*?) /g;
    while (rg.test(illegalsGiven)) {
      illegalsGiven = illegalsGiven.replace(rg, '$1');
    }
  }

  illegalsGiven = subscriptToDigit(fixCommas(cleanIPA(illegalsGiven))).replace(/,?\s+/g, ' ').split(/ +/g).map(a => a.replace(/^,/, '')) // repalce commas at beginning and end, which turn into optional "" and ban everything
    .map(a => a.replace(/,$/, ''));

  let customVowels = isSelected.basicWordStructure ? getInput('bwsVowels') : getInput('customVowels');

  customVowels = createInventory(customVowels, rgValidVowelInput);

  if (isSelected.customPhonemes && !customConsonants.length && !customVowels.length) {
    // revert to random selection
    document.getElementById('customPhonemes').click();
  }

  /*********************************
   Random consonant inventory stuff
   *********************************/
  let vowels;
  let consonants;

  if ((!isSelected.customPhonemes && !isSelected.wordStructure) || addRandomPhonemes && isSelected.customPhonemes) {
    // randmly chosen
    vowels = vowelDict[choice(vowelIndex)].split('|');
    let defaultStop = ['p', 't', 'k'];
    let defaultFric = [];
    let defaultClick = [];
    let cInvent = [];

    const voicedPair = {
      'p': 'b'
      , 't': 'd'
      , 'k': 'g'
      , 's': 'z'
      , 'f': 'v'
      , 'ʃ': 'ʒ'
      , 'ʂ': 'ʐ'
      , 'ɕ': 'ʑ'
      , 'ç': 'ʝ'
      , 'x': 'ɣ'
      , 'ʈ': 'ɖ'
      , 'c': 'ɟ'
      , 'q': 'ɢ'
      , 'ɸ': 'β'
      , 'θ': 'ð'
      , 'χ': 'ʁ'
      , 'ħ': 'ʕ'
      , 'h': 'ɦ'
      , 'ʧ': 'ʤ'
      , 'ʦ': 'ʣ'
      , 'ʨ': 'ʥ'
      , 'ʘ': 'ʘ̬'
      , 'ǀ': 'ǀ̬'
      , 'ǃ': 'ǃ̬'
      , 'ǂ': 'ǃ̬'
      , 'ǁ': 'ǁ̬'
      ,
    }

    let aspiration = rand();
    let s = rand();
    let q = rand();
    letɲ = rand();
    let l = rand();
    let mb = rand();
    let gb = rand();
    letβ = rand();
    letʈ = rand();
    letʂ = rand();
    let c = rand();
    let r = rand();
    letɾ = rand();
    let nd = rand();

    let voicing = rand();
    if (voicing < 0.32) {
      voicing = [];
    } else if (voicing < 0.66) {
      voicing = ['s'];
      if (rand() < 0.3)
        voicing.push('c');
    } else if (voicing < 0.93) {
      voicing = ['s', 'f'];
      if (rand() < 0.3)
        voicing.push('c');
    } else {
      voicing = ['f'];
    }

    if (isSelected.customPhonemes) {
      // if user has selected Add random phonemes and selected some phonemes of thier own

      let yesClicks = 'ʘǀǃǂǁ';

      for (let consonant of customConsonants) {

        if ('bdgɟɢ'.includes(consonant[0]))
          voicing.push('s');
        if ('zvʒʐʑʝɣβðʁʕɦʤʣ'.includes(consonant[0]))
          voicing.push('f');
        if (['pʰ', 'tʰ', 'kʰ', 'ʦʰ'].includes(consonant))
          aspiration = 0;

        if (consonant[0] == 'c')
          ɲ = 0;
        if ('ʎrɾ'.includes(consonant[0]))
          l = 0;

        if (consonant == 'n͡d')
          mb = 0;
        if (consonant == 'k͡p')
          gb = 0;
        if (consonant == 'z')
          s = 0;
        if (consonant[0] == 'χ')
          q = 0;
        if (consonant[0] == 'ɸ')
          β = 0;
        if (consonant[0] == 'ɳ' || consonant[0] == 'ʂ')
          ʈ = 0;

        if (yesClicks.includes(consonant[0])) {
          // if clicks are in custom input
          for (let i of range(5)) {
            // magic number
            let randClick = choice(yesClicks);
            if (!defaultClick.includes(randClick))
              defaultClick.push(randClick);
          }

          if (voicing.includes('c')) {
            for (let click of defaultClick) {
              cInvent.push(voicedPair[click]);
            }
          }
          if (rand() > 0.5) {
            for (let click of defaultClick) {
              cInvent.push('ŋ' + click);
            }
          }
          if (rand() > 0.5) {
            for (let click of defaultClick) {
              cInvent.push('k' + click);
            }
          }
          if (rand() > 0.5) {
            for (let click of defaultClick) {
              cInvent.push(click + 'ˀ');
            }
          }
          if (rand() > 0.5) {
            for (let click of defaultClick) {
              cInvent.push(click + 'q');
            }
          }
          if (rand() > 0.5) {
            for (let click of defaultClick) {
              cInvent.push(click + 'χ');
            }
          }
          if (rand() > 0.5) {
            for (let click of defaultClick) {
              cInvent.push(click + 'ʼ');
            }
          }
          if (rand() > 0.5) {
            for (let click of defaultClick) {
              cInvent.push(click + 'ʢ');
            }
          }
          if (rand() > 0.5) {
            for (let click of defaultClick) {
              cInvent.push('k' + click + 'x');
            }
          }

          cInvent = cInvent.concat(defaultClick);
        }
      }
    }

    if (rand() < 0.95)
      cInvent.push('m');
    if (rand() < 0.81)
      cInvent.push('n');
    if (rand() < 0.40)
      cInvent.push('ŋ');
    if (rand() < 0.05)
      cInvent.push('ɬ');
    if (ɲ < 0.30) {
      cInvent.push('ɲ');
      if (c < 0.40)
        defaultStop.push('c');
    } else if (c < 0.02) {
      defaultStop.push('c');
    }

    if (l < 0.66) {
      cInvent.push('l');
      if (rand() < 0.09)
        cInvent.push('ʎ');
      if (r < 0.6)
        cInvent.push('r');
    } else if (r < 0.04) {
      cInvent.push('r');
    }
    if (cInvent.includes('r')) {
      if (ɾ < 0.1)
        cInvent.push('ɾ');
    } else if (ɾ < 0.3) {
      cInvent.push('ɾ');
    }

    if (mb < 0.13) {
      cInvent.push('ᵐb');
      if (nd < 0.90)
        cInvent.push('ⁿd');
      if (rand() < 0.90)
        cInvent.push('ᵑg');
    }

    if (gb < 0.08) {
      // used to be 0.13 but was changed for aesthetic reasons
      cInvent.push('g͡b');
      if (nd < 0.99)
        cInvent.push('k͡p');
    }

    if (rand() < 0.49)
      defaultFric.push('f');
    if (rand() < 0.40)
      defaultFric.push('ʃ');
    if (rand() < 0.47)
      defaultFric.push('ʧ');
    if (rand() < 0.24)
      defaultFric.push('ʦ');
    if (rand() < 0.01)
      defaultFric.push('ɕ');
    if (s < 0.77)
      defaultFric.push('s');
    if (rand() < 0.18)
      defaultFric.push('x');
    if (rand() < 0.04)
      defaultFric.push('θ');
    if (rand() < 0.88)
      cInvent.push('j');
    if (rand() < 0.84)
      cInvent.push('w');

    if (q < 0.09) {
      defaultStop.push('q');
      if (rand() < 0.60)
        defaultFric.push('χ');
    }

    if (ʈ < 0.08) {
      defaultStop.push('ʈ');
      if (rand() < 0.62)
        cInvent.push('ɳ');
      if (ʂ < 0.6)
        defaultFric.push('ʂ');
      if (rand() < 0.6)
        cInvent.push('ɻ');
      if (rand() < 0.6)
        cInvent.push('ɭ');
      if (rand() < 0.6)
        cInvent.push('ɽ');
    }

    if (ʂ < 0.06)
      defaultFric.push('ʂ');

    if (β < 0.04) {
      cInvent.push('β');
      if (β < 0.2)
        cInvent.push('ɸ');
    }

    if (rand() < 0.03)
      cInvent.push('ɸ');
    if (rand() < 0.05)
      defaultFric.push('ç');

    if (rand() < 0.01)
      defaultFric.push('ɕ');
    if (rand() < 0.01)
      defaultFric.push('ʨ');

    if (rand() < 0.8 && defaultFric.includes('ʨ') && !defaultFric.includes('ɕ')) {
      defaultFric.push('ɕ');
    }

    if (rand() < 0.8 && defaultFric.includes('ɕ') && !defaultFric.includes('ʨ')) {
      defaultFric.push('ʨ');
    }

    let voicedStops = [];
    let voicedFrics = [];

    if (!voicing.includes('s') && !voicing.includes('f')) {
      voicing = 'noStopNoFric';
      cInvent = cInvent.concat(defaultStop, defaultFric);
    } else if (voicing.includes('s') && !voicing.includes('f')) {
      voicing = 'stopOnly';
      for (let stop of defaultStop) {
        voicedStops.push(voicedPair[stop]);
      }
      cInvent = cInvent.concat(defaultStop, voicedStops, defaultFric);

    } else if (voicing.includes('s') && voicing.includes('f')) {
      voicing = 'stopAndFric';
      for (let stop of defaultStop) {
        voicedStops.push(voicedPair[stop]);
      }
      for (let fric of defaultFric) {
        voicedFrics.push(voicedPair[fric]);
      }
      cInvent = cInvent.concat(defaultStop, voicedStops, defaultFric, voicedFrics);

    } else {
      voicing = 'fricOnly';
      for (let fric of defaultFric) {
        voicedFrics.push(voicedPair[fric]);
      }
      cInvent = cInvent.concat(defaultStop, voicedStops, defaultFric, voicedFrics);
    }

    let replace_and_deduplicate = function (list, replaced, replacer) {
      let index = list.indexOf(replaced);
      if (index > -1)
        list[index] = replacer;

      for (let i = index + 1; i < list.length; i++) {
        if (list[i] == replacer) {
          list.splice(i, 1);
          break;
        }
      }
      return list;
    };

    if (voicing == 'stopOnly' || voicing == 'stopAndFric') {
      let missingStop = rand();
      if (missingStop > 0.87) {
        cInvent = replace_and_deduplicate(cInvent, 'p', 'f');
      }
    }
    if (voicing == 'stopAndFric') {
      let missingStop = rand();
      if (missingStop > 0.6) {
        cInvent = replace_and_deduplicate(cInvent, 'g', 'ɣ');
      }
    }

    if (gb < 0.25 && cInvent.includes('g') && !cInvent.includes('g͡b')) {
      cInvent.push('g͡b');
      if (nd < 0.99)
        cInvent.push('k͡p');
    }

    if (cInvent.includes('d') && cInvent.includes('b')) {
      if (rand() < 0.3) {
        // implosives
        cInvent.push('ɓ');
        cInvent.push('ɗ');
        if (cInvent.includes('j') || cInvent.includes('ɲ') && rand() < 0.6) {
          cInvent.push('ʄ');
        }
        if (cInvent.includes('g') && rand() < 0.1)
          cInvent.push('ɠ');
      }
    }

    if (rand() < 0.07) {
      for (let i of 'ptʈckq') {
        if (cInvent.includes(i))
          cInvent.push(i + 'ʼ');
      }
    }

    if (cInvent.includes('j') && rand() < 0.05) {
      cInvent.push('c͡ç');
      if (voicing == 'stopAndFric' || voicing == 'fricOnly')
        cInvent.push('ɟ͡ʝ');
    }

    if (rand() < 0.65)
      cInvent.push('h');
    if (rand() < 0.04)
      cInvent.push('ɦ');
    if (rand() < 0.44)
      cInvent.push('ʔ');
    if (rand() < 0.015)
      cInvent.push('ʋ');

    if (rand() < 0.02)
      cInvent.push('ħ');
    if (rand() < 0.02)
      cInvent.push('ʕ');
    if (rand() < 0.02)
      cInvent.push('ɹ');
    if (rand() < 0.02)
      cInvent.push('ɥ');
    if (rand() < 0.02)
      cInvent.push('ɮ');
    if (rand() < 0.01)
      cInvent.push('ʍ');
    if (rand() < 0.01)
      cInvent.push('ⱱ');
    if (!cInvent.includes('l') && rand() < 0.02)
      cInvent.push('ɺ');

    if (rand() < 0.2 && cInvent.includes('ħ') && !cInvent.includes('ʕ')) {
      cInvent.push('ʕ');
    }
    if (rand() < 0.2 && cInvent.includes('ʕ') && !cInvent.includes('ħ')) {
      cInvent.push('ħ');
    }

    if (aspiration < 0.05) {
      for (let a of 'ptkʦʘǀǃǂǁ') {
        if (cInvent.includes(a))
          cInvent.push(a + 'ʰ');
      }
    }

    if (rand() < 0.05) {
      // geminate
      let thresh = (rand() < 0.5) ? 0.25 : 0.75;
      let possGeminates = [...cInvent];
      for (let i of possGeminates) {
        if (rand() < thresh)
          cInvent.push(i + 'ː');
      }
    }

    consonants = cInvent.filter(function (value) {
      return !illegalsGiven.includes(value);
      // filter out exact matches in illegal combinations
    });

    vowels = freqSort(vowels, mostCommonV, 'random');
    consonants = freqSort(consonants, mostCommonC, 'random');
  }

  let wordInitialConsonants, midWordConsonants, wordFinalConsonants;

  let hasNoVowels = function () {
    popup('generic-popup', '<h2>Error</h2><p>Please enter some vowels!</p>');
    document.getElementById('loader').style.display = 'none';
  }

  if (isSelected.basicWordStructure) {
    wordInitialConsonants = createInventory(getInput('wordInitialConsonants'), rgValidConsonantInput);
    midWordConsonants = createInventory(getInput('midWordConsonants'), rgValidConsonantInput);
    wordFinalConsonants = createInventory(getInput('wordFinalConsonants'), rgValidConsonantInput);
    vowels = [...customVowels];
    if (vowels.length == 0) {
      hasNoVowels();
      // needed because it fails instantly at word()
      return;
      // return does not work inside hasNoVowels()
    }
    consonants = set(wordInitialConsonants.concat(midWordConsonants.concat(wordFinalConsonants)));
  } else if (isSelected.customPhonemes && !addRandomPhonemes) {
    // custom phonemes (top)
    consonants = [...customConsonants];
    vowels = [...customVowels];
    if (vowels.length == 0) {
      hasNoVowels();
      // needed because it fails instantly at word()
      return;
      // return does not work inside hasNoVowels()
    }
  } else if (isSelected.customPhonemes && addRandomPhonemes) {
    // custom phonemes (top) with random
    consonants = consonants.concat(customConsonants);
    let compatibleInventories = [...vowelChoices];
    for (let vowel of customVowels) {
      compatibleInventories = compatibleInventories.filter(inventory => inventory.includes(vowel));
    }

    vowels = (compatibleInventories.length) ? choice(compatibleInventories) : vowels.concat(customVowels);

    consonants = set(consonants);
    vowels = set(vowels);
  } else if (isSelected.advancedWordStructure) {
    consonants = set(advancedConsonants);
    vowels = set(advancedVowels);
  }

  // else, totally random and already defined

  let possibleSyllableStructures = [
    [1, 0]
    , [1, 0]
    , [1, 0]
    , [1, 0]
    , [1, 0]
    , [1, 0]
    , [1, 0]
    , [1, 0]
    , [1, 0]
    , [1, 0]
    , [1, 0]
    , [1, 0]
    , [1, 0]
    , [1, 0]
    , [1, 0]
    , [1, 0]
    , [1, 0]
    , [1, 0]
    , [1, 0]
    , [1, 0]
    , [1, 0]
    , [1, 0]
    , [1, 0]
    , [1, 0]
    , [1, 0]
    , [1, 0]
    , [1, 0]
    , [1, 0]
    , [1, 1]
    , [1, 1]
    , [1, 1]
    , [1, 1]
    , [1, 1]
    , [1, 1]
    , [1, 1]
    , [1, 1]
    , [1, 1]
    , [1, 1]
    , [1, 1]
    , [1, 1]
    , [1, 1]
    , [1, 1]
    , [1, 1]
    , [1, 1]
    , [1, 1]
    , [1, 1]
    , [1, 1]
    , [1, 1]
    , [1, 1]
    , [1, 1]
    , [1, 1]
    , [1, 1]
    , [1, 1]
    , [1, 1]
    , [1, 1]
    , [1, 1]
    , [1, 1]
    , [1, 1]
    , [1, 1]
    , [1, 1]
    , [1, 1]
    , [1, 1]
    , [1, 1]
    , [1, 1]
    , [1, 1]
    , [1, 1]
    , [1, 1]
    , [1, 1]
    , [1, 1]
    , [1, 1]
    , [1, 1]
    , [1, 1]
    , [1, 1]
    , [1, 1]
    , [1, 1]
    , [1, 1]
    , [1, 1]
    , [1, 1]
    , [1, 1]
    , [1, 1]
    , [1, 1]
    , [1, 1]
    , [1, 1]
    , [1, 1]
    , [1, 1]
    , [1, 1]
    , [1, 1]
    , [1, 1]
    , [1, 1]
    , [1, 1]
    , [1, 1]
    , [1, 1]
    , [1, 1]
    , [1, 1]
    , [1, 1]
    , [1, 2]
    , [1, 2]
    , [1, 2]
    , [1, 2]
    , [1, 2]
    , [1, 2]
    , [1, 2]
    , [1, 2]
    , [1, 2]
    , [1, 2]
    , [1, 3]
    , [2, 0]
    , [2, 0]
    , [2, 0]
    , [2, 0]
    , [2, 1]
    , [2, 1]
    , [2, 1]
    , [2, 1]
    , [2, 1]
    , [2, 1]
    , [2, 1]
    , [2, 1]
    , [2, 1]
    , [2, 1]
    , [2, 1]
    , [2, 1]
    , [2, 1]
    , [2, 1]
    , [2, 1]
    , [2, 1]
    , [2, 1]
    , [2, 1]
    , [2, 1]
    , [2, 1]
    , [2, 1]
    , [2, 1]
    , [2, 1]
    , [2, 1]
    , [2, 1]
    , [2, 1]
    , [2, 1]
    , [2, 1]
    , [2, 1]
    , [2, 1]
    , [2, 1]
    , [2, 1]
    , [2, 1]
    , [2, 1]
    , [2, 1]
    , [2, 2]
    , [2, 2]
    , [2, 2]
    , [2, 2]
    , [2, 2]
    , [2, 2]
    , [2, 2]
    , [2, 2]
    , [2, 2]
    , [2, 2]
    , [2, 2]
    , [2, 3]
    , [3, 0]
    , [3, 1]
    , [3, 1]
    , [3, 1]
    , [3, 1]
    , [3, 1]
    , [3, 1]
    , [3, 1]
    , [3, 1]
    , [3, 2]
    , [3, 2]
    , [3, 2]
    , [3, 3]
    , [3, 3]
    , [3, 3]
    , [3, 3]
    , [3, 3]
  ];

  if (!isSelected.wordStructure) {
    const givenOC = [parseInt(getInput('maxOnset')), parseInt(getInput('maxCoda'))];
    let maxOnsetCodaSettings = function (OC) {
      let gg = givenOC[0] ? 'a' : 'b'

      let givenO = isNaN(givenOC[0]) ? false : givenOC[0];
      let givenC = isNaN(givenOC[1]) ? false : givenOC[1];
      let hasNan = (givenO === false || givenC === false);

      let O = OC[0];
      let C = OC[1];
      if (givenO === false && givenC === false) {
        return true;
      } else if (hasNan && (givenO === O || givenC === C)) {
        return true;
      } else if (givenO === O && givenC === C) {
        return true;
      }
      return false;
    }
    possibleSyllableStructures = possibleSyllableStructures.filter(maxOnsetCodaSettings);
  }

  let displaySyllStructure = choice(possibleSyllableStructures);

  let maxOnset = displaySyllStructure[0];
  maxCoda = displaySyllStructure[1];
  // must be global for randomAffix

  let displayConsonants = [];

  // fix -- what does this do? it still extracts for AWS!
  if (isSelected.basicWordStructure) {
    // extract individual consonants from consonants clusters to display
    for (let consonant of consonants) {
      for (let i of consonant.match(rgConsonant)) {
        displayConsonants.push(i);
      }
    }
  } else {
    // no consonants clusters to begin with
    displayConsonants = [...consonants];
  }

  displayConsonants = set(displayConsonants);

  cOnset = [];
  cMidd = [];
  cCoda = [];

  orderedOnsets_forWS = []
    , orderedMids_forWS = []
    , orderedCodas_forWS = [];

  if (isSelected.basicWordStructure) {
    let w = dropoffDist(wordInitialConsonants, dropoffType);
    cOnset = w.list;
    orderedOnsets_forWS = w.stats;

    let m = dropoffDist(midWordConsonants, dropoffType);
    cMidd = m.list;
    orderedMids_forWS = m.stats;

    let f = dropoffDist(wordFinalConsonants, dropoffType);
    cCoda = f.list;
    orderedCodas_forWS = f.stats;

    maxCoda = (wordFinalConsonants.length) ? 1 : 0;

  } else if (!isSelected.wordStructure) {
    // custom consonants or random

    let SSP = function (cluster, direction) {
      // sonority sequencing principle
      let previousManner;
      for (let phoneme of cluster.match(rgConsonant)) {
        let bareConsonant = phoneme.replace(direplace, '');
        let coord = IPAcoord(bareConsonant, conMatrix);
        if (coord == undefined)
          return true;
        let thisManner = consonantFeatures[0][coord[0]].slice(1);
        if (!previousManner) {
          previousManner = thisManner;
        } else {
          let pair = previousManner + '+' + thisManner;
          let violation;
          if (direction == 'onset') {
            if (allowedOnset.includes(pair))
              continue;
            if (notAllowedOnset.includes(pair))
              return false;
            violation = sonHier.indexOf(previousManner) > sonHier.indexOf(thisManner);
          } else {
            if (allowedCoda.includes(pair))
              continue;
            if (notAllowedCoda.includes(pair))
              return false;
            violation = sonHier.indexOf(previousManner) < sonHier.indexOf(thisManner);
          }

          if (violation)
            return false;

          previousManner = sonHier.indexOf(thisManner);
        }
      }
      return true;
    }

    let sonHier = ['stop', 'fricative', 'nasal', 'lateral approximant', 'trill', 'tap', 'approximant'];
    let allowedOnset = [];
    let notAllowedOnset = [];
    let allowedCoda = [];
    let notAllowedCoda = [];

    if (rand() < 0.5) {
      allowedOnset.push('fricative+stop');
      if (rand() < 0.5) {
        notAllowedOnset.push('stop+fricative')
      }
    }
    if (rand() < 0.5) {
      allowedOnset.push('nasal+stop');
      if (rand() < 0.5) {
        notAllowedOnset.push('stop+nasal')
      }
    }
    if (rand() < 0.8)
      notAllowedOnset.push('stop+stop');
    if (rand() < 0.8)
      notAllowedOnset.push('fricative+fricative');
    if (rand() < 0.8)
      notAllowedOnset.push('nasal+nasal');

    if (rand() < 0.5) {
      allowedCoda.push('stop+fricative');
      if (rand() < 0.5) {
        notAllowedCoda.push('fricative+stop')
      }
    }
    if (rand() < 0.5) {
      allowedCoda.push('stop+nasal');
      if (rand() < 0.5) {
        notAllowedCoda.push('nasal+stop')
      }
    }
    if (rand() < 0.8)
      notAllowedCoda.push('stop+stop');
    if (rand() < 0.8)
      notAllowedCoda.push('fricative+fricative');
    if (rand() < 0.8)
      notAllowedCoda.push('nasal+nasal');

    // figure out possible clusters
    let CC_initials = []
      , CCC_initials = []
      , CC_mids = []
      , CCC_mids = []
      , CC_finals = []
      , CCC_finals = [];

    let possibleClusters = function (inventory, clusterList) {
      let clusters = [];
      for (let cluster of clusterList) {
        if (cluster.match(rgConsonant).every(a => inventory.includes(a))) {
          clusters.push(cluster);
        }
      }
      return clusters;
    }

    // onsets
    if (maxOnset > 1)
      CC_initials = possibleClusters(consonants, poss_CC_onset);
    if (maxOnset == 3)
      CCC_initials = possibleClusters(consonants, poss_CCC_onset);
    // mids
    if (maxCoda > 1 || maxOnset > 1 || (maxCoda == 1 && maxOnset == 1))
      CC_mids = possibleClusters(consonants, poss_CC_mid);
    if (maxCoda == 3 || maxOnset == 3)
      CCC_mids = possibleClusters(consonants, poss_CCC_mid);
    // codas
    if (maxCoda > 1)
      CC_finals = possibleClusters(consonants, poss_CC_coda);
    if (maxCoda == 3)
      CCC_finals = possibleClusters(consonants, poss_CCC_coda);

    // determines distribution of consonants

    let initials = consonants.concat(CC_initials, CCC_initials);
    initials = freqSort(initials, mostCommonC, 'random');

    let limit = function (segment, position) {
      // limits certain phonemes in coda position
      let toLimit = {
        'initial': ['ŋ', 'ʔ']
        , 'final': ['pʰ', 'h', 'tʰ', 'kʰ', 'j', 'ʔ']
        ,
      }
      return toLimit[position].includes(segment) ? 0.2 : 0.8;
    }

    for (let i of range(initials)) {
      let multiplier;
      if (poss_C_onset.includes(initials[i])) {
        multiplier = (rand() < limit(initials[i], 'initial')) ? dropoff(dropoffType, i + 1, initials.length) : 0;
      } else if (poss_CC_onset.includes(initials[i])) {
        if (SSP(initials[i], 'onset')) {
          multiplier = (rand() < normalDistribution(0.2, 20)) ? dropoff(dropoffType, i + 1, initials.length) : 0;
        } else {
          multiplier = 0;
        }
      } else {
        if (SSP(initials[i], 'onset')) {
          multiplier = dropoff(dropoffType, i + 1, initials.length);
        } else {
          multiplier = 0;
        }
      }

      if (multiplier)
        orderedOnsets_forWS.push(initials[i]);
      for (let x of range(multiplier)) {
        cOnset.push(initials[i]);
      }
    }

    let shuffledMidds = consonants.concat(CC_mids, CCC_mids);
    shuffledMidds = freqSort(shuffledMidds, mostCommonC, 'random');

    for (let i of range(shuffledMidds)) {
      let multiplier;
      if (poss_C_mid.includes(shuffledMidds[i])) {
        multiplier = dropoff(dropoffType, i + 1, shuffledMidds.length);
      } else if (poss_CC_mid.includes(shuffledMidds[i])) {
        multiplier = (rand() < normalDistribution(0.2, 20)) ? dropoff(dropoffType, i + 1, shuffledMidds.length) : 0;
      } else {
        multiplier = dropoff(dropoffType, i + 1, shuffledMidds.length);
      }

      if (multiplier)
        orderedMids_forWS.push(shuffledMidds[i]);
      for (let x of range(multiplier)) {
        cMidd.push(shuffledMidds[i]);
      }
    }

    if (maxCoda > 0) {
      let shuffledEnds = consonants.concat(CC_finals, CCC_finals);
      shuffledEnds = freqSort(shuffledEnds, mostCommonC, 'random');

      for (let i of range(shuffledEnds)) {
        let multiplier;
        if (poss_C_coda.includes(shuffledEnds[i])) {
          multiplier = (rand() < limit(shuffledEnds[i], 'final')) ? dropoff(dropoffType, i + 1, shuffledEnds.length) : 0;
        } else if (poss_CC_coda.includes(shuffledEnds[i])) {
          if (SSP(shuffledEnds[i], 'coda')) {
            multiplier = (rand() < normalDistribution(0.2, 20)) ? dropoff(dropoffType, i + 1, shuffledEnds.length) : 0;
          } else {
            multiplier = 0;
          }
        } else {
          if (SSP(shuffledEnds[i], 'coda')) {
            multiplier = dropoff(dropoffType, i + 1, shuffledEnds.length);
          } else {
            multiplier = 0;
          }
        }

        if (multiplier)
          orderedCodas_forWS.push(shuffledEnds[i]);
        for (let x of range(multiplier)) {
          cCoda.push(shuffledEnds[i]);
        }
      }
    }
  }

  if (!cOnset.length)
    cOnset = [''];
  if (!cMidd.length)
    cMidd = [''];
  if (!cCoda.length)
    cCoda = [''];

  let tones = [];
  let toneDisplay = '';
  let hasDiacriticTones = false;

  if (isSelected.vowelToneCheck) {
    let toneInput = getInput('vowelTones');
    hasDiacriticTones = /[\u030B\u0301\u0304\u0300\u030F\u0302\u030C]/.test(toneInput);
    toneInput = toneInput.replaceAll('◌', '').split(/ +/);
    for (let i = 0; i < toneInput.length; i++) {
      let multiplier = dropoff(dropoffType, i + 1, toneInput.length);
      for (let j = 0; j < multiplier; j++) {
        tones.push(toneInput[i]);
      }
    }
    toneDisplay = '<div id="tones"><b>Tones</b><ph>: ' + toneInput.join(' ') + '</ph></div>';
  }

  vOnset = [];

  orderedVowels_forWS = [];
  // global for editLanguage()

  // determines distribution of vowels
  let createVowelDist = function (vowelPostion, vowel) {
    if (!isSelected.vowelToneCheck) {
      vowelPostion.push(vowel);
    } else {
      for (let tone of tones) {
        if (hasDiacriticTones) {
          // add diacritics tones before long symbols
          let longs = vowel.match(/[ːˑ]$/) || '';
          let v = longs ? vowel.replace(longs, '') : vowel;
          vowelPostion.push(v + tone + longs);
        } else {
          vowelPostion.push(vowel + tone);
        }
      }
    }
  }

  for (let i = 0, rank = 1; i < vowels.length; i++
    , rank++) {
    let multiplier = dropoff(dropoffType, rank, vowels.length);

    for (let j = 0; j < multiplier; j++) {
      createVowelDist(vOnset, vowels[i]);
    }
    orderedVowels_forWS.push(vowels[i]);
  }

  let bws2ndVowels = [];
  harmonyCheck = false;
  if (harmonyClicked && isSelected.basicWordStructure && getInput('bws2ndVowels')) {
    // if vowel harmony
    harmonyCheck = true;
    bws2ndVowels = createInventory(getInput('bws2ndVowels'), rgValidVowelInput);
    uniqueToSecondGroup = '{' + bws2ndVowels.filter(a => !vowels.includes(a)).join(',') + '}';

    vHarmOnset = [];

    let rank = 1;
    for (let vowel of bws2ndVowels) {
      let multiplier = dropoff(dropoffType, rank, bws2ndVowels.length);

      for (let j = 0; j < multiplier; j++) {
        // fix - range()
        createVowelDist(vHarmOnset, vowel);
      }
      rank++;
    }
  }

  let displayVowels = set(vowels.concat(bws2ndVowels));

  let allPhonemes = displayConsonants.concat(displayVowels).join('');

  orderedVowels_forWS = orderedVowels_forWS.join(' ');
  orderedOnsets_forWS = orderedOnsets_forWS.join(' ');
  orderedMids_forWS = orderedMids_forWS.join(' ');

  orderedCodas_forWS = (displaySyllStructure[1] == 0) ? '' : orderedCodas_forWS.join(' ');

  if (isChecked('vowelProbabilities')) {
    onsetProb = parseInt(getInput('vowelStartProb')) / 100;
    codaProb = parseInt(getInput('vowelEndProb')) / 100;
  } else {
    onsetProb = normalDistribution(13, 40) / 100;
    codaProb = normalDistribution(60, 40) / 100;
  }

  if (onsetProb < 0)
    onsetProb = 0;
  if (codaProb > 1)
    codaProb = 1;

  midBlankProb = normalDistribution(3, 2) / 100;

  /**********************************
   Illegal rules stuff
   **********************************/

  illegalRules = [];

  if (isChecked('banDoubleVowel')) {
    // If 'Make same vowel twice in a row illegal' checked
    let allVowles = vowels.join(' ') + bws2ndVowels.join(' ');

    let illDiacritic = '';

    if (allVowles.includes('̯'))
      illDiacritic = '̯';
    // dipthong u032F
    if (allVowles.includes('ː'))
      illDiacritic += 'ː';
    if (allVowles.includes('ˑ'))
      illDiacritic += 'ˑ';
    if (allVowles.includes('̆'))
      illDiacritic += '̆';
    // extra short
    if (allVowles.includes('̩'))
      illDiacritic += '̩';

    illDiacritic = (illDiacritic) ? '[' + illDiacritic + ']*' : '';

    for (let vowel of vowels) {
      if (!vowel.includes('̯')) {
        vowel = vowel.replace(/[ːˑ\u0306\u0329]/g, '');
        vowel = vowel + illDiacritic + vowel;
      } else {
        // just make double dipthong
        vowel += vowel;
      }
      illegalRules.push(vowel);
    }
    for (let vowel of bws2ndVowels) {
      if (!vowel.includes('̯')) {
        vowel = vowel.replace(/[ːˑ\u0306\u0329]/g, '');
        vowel = vowel + illDiacritic + vowel;
      } else {
        // just make double dipthong
        vowel += vowel;
      }
      illegalRules.push(vowel);
    }
  }

  if (isChecked('banDoubleSyllable')) {
    illegalRules.push(regexify('{CC*VC*}1{CC*VC*}1'), regexify('#{VCC*}1{VCC*}1'));
  }

  for (let rule of illegalsGiven) {
    // test for invalid or overly broad illegal rules
    if (rule == '') { // pass
    } else if (/[ABE-UWYZΓΔΘΛΞΠΣΦΨΩ]/.test(rule)) {
      // no CDVX
      warnings += `<li>Illegal combination <b>${rule}</b> is invalid. Advanced Word Structure (AWS) phoneme classes carry no meaning outside of the AWS. Use curly brackets instead. For example, if you have the class <b>N = m n</b> in AWS, write <b>{m,n}</b> instead of <b>N</b>.</li>`;
    } else if (/^\.+({[0-6],?(,\d+)?})?$/.test(rule) || /^[VC]$/.test(rule) || /^VCV?$/.test(rule) || /^CVC?$/.test(rule) || /^(CV){1,3}$/.test(rule) || /^(VC){1,3}$/.test(rule)) {
      warnings += `<li>Illegal combination <b>${rule}</b> matched too many words and was excluded</li>`;
    } else {
      try {
        let testRule = negativeLA_diacritics(regexify(rule))
        new RegExp(testRule);
        illegalRules.push(testRule);
      } catch {
        warnings += `<li>Illegal combination <b>${rule}</b> is an invalid pattern</li>`;
      }
    }
  }

  illegalRules = set(illegalRules).map(rule => new RegExp(rule));

  let phonemeInventory = consonants.concat(vowels);

  /*********************************
   Phonological rule stuff
   *********************************/
  synchronicChanges = [];
  // global for editThisLanguage

  if (isSelected.soundChangesCheck) {
    // if custom phonological rules given
    let customPhonRules = getInput('soundChanges').replaceAll('=', '→').replaceAll('Ø', '∅');
    // \u2205 ∅ is correct IPA null sign
    customPhonRules = cleanIPA(arrows(customPhonRules)).split('\n');

    for (let rule of customPhonRules) {
      rule = rule.trim().replace(/  +/g, ' ');
      if (rule.includes('→') || rule.includes('»') || rule.includes('«')) {
        // check if phonological rule // fix - should be generalized!
        if (/[ABE-UWYZΓΔΘΛΞΠΣΦΨΩ]/.test(rule.replace(/\b(IF|ELSE|THEN)\b/g, ''))) {
          warnings += '<li>Sound change rule <b>' + rule + '</b> is invalid: Advanced Word Structure (AWS) phoneme classes carry no meaning outside of the AWS. Use curly brackets instead: if you have the class <b>N = m n</b> in AWS, write <b>{m,n}</b>, not <b>N</b>.</li>';
          continue;
        } else if ((rule.includes('/') || rule.includes('!')) && !/[\/!].*_/.test(rule)) {
          // fix
          warnings += '<li>Sound change rule <b>' + rule + '</b> is invalid: no underscore after forward slash</li>';
          continue;
        }
        synchronicChanges.push(rule);
      }
    }
  }

  globalSoundChanges = [];

  let soundChangeList = '';

  for (let rule of synchronicChanges) {
    let rgMatch = '';
    let changeTo, hasStress, hasFeaturalStress, hasSyllBoundary, rgLookbehind, stringMatch, stringLookbehind
    let isMorphRule = false;
    if (/\bIF\b|»|«/.test(rule)) {
      isMorphRule = buildRandomMorphRule(rule);
    } else {
      let SCN = SCNtoRegex(rule).split('→');

      stringMatch = SCN[0];
      changeTo = splitOrs(SCN[1]);

      let LBinfo = getLBinfo(stringMatch);
      stringLookbehind = LBinfo['string'];
      rgLookbehind = new RegExp(LBinfo['rg'], 'g');

      hasStress = stringMatch.includes('ˈ') || stringMatch.includes('ˌ');
      hasFeaturalStress = rule.includes('+stress') || rule.includes('-stress');
      hasSyllBoundary = stringMatch.includes('%');

      stringMatch = negativeLA_diacritics(stringMatch);

      try {
        // if lookbehind or (?<= not in..
        if (lookbehindSupported || !stringMatch.includes('(?<=')) {
          new RegExp(stringMatch);
          // test regexp
          rgMatch = new RegExp(stringMatch, 'g');
        } else {
          LBreplace('aaa', stringMatch, changeTo);
          // test regexp
        }
        soundChangeList += '<li class="vl__sound-change-list">' + htmlEntities(rule).replace('→', ' → ').replace('/', ' / ') + '</li>';
      } catch {
        warnings += '<li>Sound change rule <b>' + rule + '</b> is invalid and was excluded</li>';
        continue;
      }
    }
    globalSoundChanges.push({
      'rgMatch': rgMatch
      , 'replaceWith': changeTo
      , 'hasStress': hasStress
      , 'hasFeaturalStress': hasFeaturalStress
      , 'hasSyllBoundary': hasSyllBoundary
      , 'stringMatch': stringMatch
      , 'stringLookbehind': stringLookbehind
      , 'rgLookbehind': rgLookbehind
      , 'isMorphRule': isMorphRule
      , 'originalRule': rule
    });

  }
  soundChangeList = '<ul>' + soundChangeList + '</ul>';
  let soundChangeDiv = (globalSoundChanges.length == 0 || isChecked('permanentSoundChanges')) ? '' : '<div class="vl__grammar-block"><div id="phonological_rules"><b>Sound changes (in order of application)</b>:</div><div>' + soundChangeList + '</div></div>';

  /****************************
   Spelling rules stuff
   *****************************/

  hasHangul = isChecked('hangul');
  let lengther = rand();

  defaultSpellings = [
    ['ʲ', '']
    , ['ʈ͡ʂ', 'ṭṣ']
    , ['ɖ͡ʐ', 'ḍẓ']
    , ['ⁿd', 'nd']
    , ['ᵑg', 'ng']
    , ['ᵐb', 'mb']
    , ['ʔ', 'ʻ']
  ];

  let vowelCand = {
    'ay': ['', 'eɪ̯']
    , 'ou': ['', 'aʊ̯']
    , 'ie': ['', 'aɪ̯']
    , 'ia': ['', 'ɪə̯']
    , 'oi': ['', 'ɔɪ̯']
    , 'a': ['a', 'ɐ', 'æ', 'ɑ', 'ɒ', 'ɛ', 'ɜ', 'ə']
    , 'e': ['e', 'ɛ', 'œ', 'ɘ', 'æ', 'ɐ', 'ɪ', 'ɜ', 'ɤ', 'ə']
    , 'i': ['i', 'ɪ', 'ɵ', '', '', '', '', 'ɨ', '', '', 'ə']
    , 'o': ['o', 'ɔ', 'ɞ', 'ɒ', 'ɑ', 'ɶ', 'ø', 'ɒ̈', 'ʌ', 'ɤ', 'ʊ', 'ə']
    , 'aw': ['', 'ɔ']
    , 'u': ['u', 'ʊ', 'ʉ', 'ɯ', 'ʏ', 'ʌ', 'ɐ', 'ɶ', 'ɨ', 'ɞ', 'ɜ', 'y', 'ɵ', 'ə']
  }

  let consoCand = {
    't': ['t', 'ʈ', 'tʰ']
    , 'p': ['p', '', '', 'pʰ', 'ʙ', 'ɓ', 'ɸ']
    , 'b': ['b', 'ʙ', 'ɓ', 'β']
    , 'b’': ['', '', 'ɓ']
    , 'ṭ': ['', 'ʈ']
    , 'th': ['', 'θ', 'ð', 'tʰ']
    , 'ph': ['', 'pʰ', 'ɸ']
    , 'ṛ': ['', '', '', 'ɽ']
    , 'r': ['r', 'ɹ', 'ɾ', 'ɽ', 'ɺ', 'ɻ', 'ʀ', 'ʁ']
    , 'd': ['d', 'ɖ', 'ɗ', '', 'ɾ', 'ð']
    , 'd’': ['', '', '', 'ɗ']
    , 'ḍ': ['', 'ɖ']
    , 'dz': ['', 'ʣ']
    , 'z': ['z', 'ʑ', 'ʐ', 'ʒ', '', 'ð']
    , 'ẓ': ['', '', 'ʐ']
    , 'zh': ['', '', '', 'ʒ', 'ɮ']
    , 'y': ['', 'j', 'ʎ', 'ʝ']
    , 'j': ['', 'ʤ', 'ʥ', 'ɟ͡ʝ', 'ɟ', 'ʄ', 'ʝ', 'ʒ']
    , 'ch': ['', 'ʧ', 'ʨ', 'ɕ', 'c͡ç', 'c', 'ɟ']
    , 'chy': ['', 'ʨ', '', '', '', 'c']
    , 'sh': ['', 'ʃ', 'ɕ', 'ç', 'ɬ']
    , 'dh': ['', '', '', 'ð']
    , 's': ['s', 'ʂ', 'ɕ']
    , 'ṣ': ['', 'ʂ']
    , 'v': ['v', 'β', 'ʋ', 'ⱱ', 'ɸ']
    , 'f': ['f', 'ɸ', 'β']
    , 'm': ['m', 'ɱ']
    , 'ng': ['', 'ŋ', 'ɴ']
    , 'n': ['n', 'ɳ', 'ɲ', 'ɴ']
    , 'ṇ': ['', 'ɳ']
    , 'ny': ['', '', 'ɲ']
    , 'j’': ['', '', '', '', '', 'ʄ']
    , 'g': ['g', 'ɢ', 'ɠ', 'ʛ', 'ɣ', 'ɰ', 'ʒ', 'ʝ', 'ʁ']
    , 'q': ['q', '', '', 'ɢ']
    , 'gb': ['', 'g͡b']
    , 'kp': ['', 'k͡p']
    , 'g’': ['', '', 'ɠ', 'ʛ']
    , 'k': ['k', 'kʰ']
    , 'kh': ['', 'x', 'χ', 'kʰ', 'ħ']
    , 'gh': ['', '', '', '', 'χ', 'ʕ', 'ɦ']
    , 'h': ['h', 'ħ', 'ʜ', 'ʕ']
    , 'l': ['l', 'ɭ', 'ɺ', 'ʟ', 'ɫ', 'ɹ', 'ɬ']
    , 'll': ['', '', '', 'ʟ', 'ɫ']
    , 'ḷ': ['', 'ɭ']
    , 'w': ['w', 'ʍ', 'β', 'ʋ']
    , 'hw': ['', 'ʍ']
    , 'ts': ['', 'ʦ']
    , 'dz': [' ', 'ʣ']
  }

  smartSpelling(vowelCand, displayVowels);
  // pushes into defaultSpellings
  smartSpelling(consoCand, displayConsonants);
  // pushes into defaultSpellings

  for (let i = 0; i < defaultSpellings.length; i++) {
    let testing = defaultSpellings[i][0];
    for (let j = 0; j < defaultSpellings.length; j++) {
      let against = defaultSpellings[j][1];
      if (against.includes(testing) && i > j) {
        defaultSpellings.splice(j, 0, defaultSpellings[i]);
        defaultSpellings.splice(i + 1, 1);
        break;
      }
    }
  }

  function getSpelling(ID) {
    // fix - does not allow >>, <<, IF/ELSE
    let rules = [];
    let customSpelling = arrows(getInput(ID).replaceAll('◌', '')).split('\n');

    for (let originalRule of customSpelling) {
      originalRule = originalRule.replace('=', '→').trim();
      // fix - SCNtoRegex could go here
      if (originalRule == '') {

      } else if ((originalRule.includes('/') || originalRule.includes('!')) && !/[\/!].*_/.test(originalRule)) {
        // fix
        warnings += '<li>Sound change rule <b>' + originalRule + '</b> is invalid: no underscore after forward slash</li>';

      } else if (originalRule.includes('→')) {
        let transformedRule = SCNtoRegex(originalRule).split(/ *→ */);
        let changeFrom = transformedRule[0];
        let ORchoices = transformedRule[1];

        if (changeFrom != ORchoices) {
          // do not apply redundant rules
          if (ID == 'spellingRules')
            dedupSpelling.push(changeFrom);

          if (isChecked('composeSpelling'))
            ORchoices = ORchoices.normalize('NFC');

          ORchoices = splitOrs(ORchoices);
          changeFrom = changeFrom.replaceAll('(?:', 'NONCAPTURINGGROUP').replaceAll('?', 'QUESTIONM');
          // needed because SCNtoRegex has already applied non-capturing groups
          changeFrom = cleanIPA(changeFrom, 'spelling') // fix - what if : is a part of the spelling system?
            .replaceAll('NONCAPTURINGGROUP', '(?:').replaceAll('QUESTIONM', '?').replace(/^\?/, 'ʔ');
          // stops /?/ which crashes app
          try {
            rules.push([changeFrom, ORchoices, new RegExp(changeFrom, 'g')]);
          } catch {
            try {
              LBreplace('aaa', changeFrom, 'ZZZ');
              // fix this is missing the 6th argument
              rules.push([changeFrom, ORchoices]);
            } catch {
              warnings += `<li>Spelling rule <b>${originalRule}</b> uses invalid sound change notation and was excluded</li>`;
            }
          }
        }
        if (ID == 'spellingRules')
          spellingRulesString.push(originalRule);
      } else {
        warnings += `<li>Spelling rule <b>${originalRule}</b> is invalid (missing <b>&gt;</b> symbol)</li>`;
      }
    }
    return rules;
  }

  spellingRulesString = [];
  spellingRules = [];
  // global for createConSentence
  let dedupSpelling = [];

  if (isSelected.spellingCheck && (lec != 'd' || lastLang)) {
    if (getInput('spellingRules').includes('|'))
      hasIrregularSeplling = true;
    spellingRules = getSpelling('spellingRules');
  }

  if (isSelected.secondSpellingCheck)
    secSpellingRules = getSpelling('secondSpellingRules');

  if (isChecked('composeSpelling')) {
    defaultSpellings = defaultSpellings.map(i => [i[0], i[1].normalize('NFC')]);
  }

  if (!isSelected.spellingCheck || isChecked('addRandomSpellingRules')) {
    // random spelling rules
    let seen = [];
    let hasDiacriticsInSpelling = false;
    let rg_allDiacritics = new RegExp('[' + uDiacritics + '̗̖̭̮̯̱̣̌̑̂̇]');
    // + other spelling diacritics
    for (let spelling of defaultSpellings) {
      if (allPhonemes.includes(spelling[0]) && spelling[0] != spelling[1]) {
        // check if relevant?
        let changeFrom = spelling[0];
        let ORchoices = [spelling[1]];

        if (ORchoices.some(a => a.search(rg_allDiacritics) > -1)) {
          // has no advanced flags
          hasDiacriticsInSpelling = true;
        }

        let regblock = [changeFrom, ORchoices, new RegExp(changeFrom, 'g')];
        if (!seen.includes(changeFrom)) {
          spellingRules.push(regblock);
          seen.push(changeFrom);
          if (!dedupSpelling.includes(changeFrom)) {
            let stringForm = (changeFrom == '̯') ? '◌̯' : changeFrom;
            spellingRulesString.push(stringForm + ' > ' + ORchoices)
            dedupSpelling.push(changeFrom);
          }
        }
      }
    }

    if (allPhonemes.search('[' + uVowel + ']ː') > -1) {
      let longChange = (hasDiacriticsInSpelling || lengther > 0.65) ? 'V1V1' : 'V1̄';
      spellingRules.push(['V1ː', [nameCaptureReplace(longChange)], new RegExp(regexify('V1ː'), 'g')]);
      spellingRulesString.push('Vː → ' + longChange.replaceAll('1', ''));
    }
    if (allPhonemes.search('[' + uConsonant + ']ː') > -1) {
      let longChange = (hasDiacriticsInSpelling || lengther > 0.65) ? 'C1C1' : 'C1̄';
      spellingRules.push(['C1ː', [nameCaptureReplace(longChange)], new RegExp(regexify('C1ː'), 'g')]);
      spellingRulesString.push('Cː → ' + longChange.replaceAll('1', ''));
    }

    if (allPhonemes.includes('̯')) {
      // diphthong
      spellingRules.push(['̯', [''], new RegExp('̯', 'g')]);
      spellingRulesString.push('◌̯ → ');
    }
  }

  let displaySpelling = spellingRulesString.map(a => '<tr><td><ph>' + a.split(/ *[→>] */)[0] + '</ph></td><td><s1>' + a.split(/ *[→>] */)[1] + '</s1></td></tr>')
  displaySpelling = '<table><tr><th>Pronunciation</th><th>Spelling</th></tr>' + displaySpelling.join('') + '</table>';

  spellingRuleslength = spellingRules.length;

  const penstress = 'Penultimate — stress is on the second last syllable';
  const ulstres = 'Ultimate — stress is on the last syllable';
  const instres = 'Initial — stress is on the first syllable';
  const secstress = 'Second — stress is on the second syllable';

  valstress = (lec == 'd') ? 'random' : document.getElementById('stressDropdown').value;

  if (valstress == 'random') {
    let stressr = rand();
    if (stressr < 0) {
      // old 0.4498
      valstress = 'noFixed';
      stress = 'No fixed stress';
    } else if (stressr < 0.2) {
      // old 0.6378
      valstress = 'inital';
      stress = instres;
    } else if (stressr < 0.35) {
      // old 0.6705
      valstress = 'second';
      stress = secstress;
    } else if (stressr < 0.8) {
      // old 0.8954
      valstress = 'penultimate';
      stress = penstress;
    } else {
      valstress = 'ultimate';
      stress = ulstres;
    }
  }

  if (valstress == 'noFixed') {
    stress = 'No fixed stress';
    footDefinitionRB = 2;
    feetBuildFromRB = (rand() > 0.5) ? 'left' : 'right';
    mainStressRB = (rand() > 0.5) ? 'left' : 'right';
  } else if (valstress == 'inital') {
    stress = instres;
    footDefinitionRB = 2;
    feetBuildFromRB = 'left';
    feetStressedOnRB = 1;
    mainStressRB = 'left';
  } else if (valstress == 'second') {
    stress = secstress;
    footDefinitionRB = 2;
    feetBuildFromRB = 'left';
    feetStressedOnRB = 2;
    mainStressRB = 'left';
  } else if (valstress == 'penultimate') {
    stress = penstress;
    footDefinitionRB = 2;
    feetBuildFromRB = 'right';
    feetStressedOnRB = 1;
    mainStressRB = 'right';
  } else if (valstress == 'ultimate') {
    stress = ulstres;
    footDefinitionRB = 2;
    feetBuildFromRB = 'right';
    feetStressedOnRB = 2;
    mainStressRB = 'right';
  } else if (valstress == 'antepenult') {
    stress = 'Antepenult — stress is on the third last syllable';
    footDefinitionRB = 3;
    feetBuildFromRB = 'right';
    feetStressedOnRB = 1;
    mainStressRB = 'right';
  } else if (valstress == 'advanced') {
    stress = 'advanced';
    footDefinitionRB = parseInt(getRadioValue('footDefinition_rb'));
    feetBuildFromRB = getRadioValue('feetBuildFrom_rb');
    feetStressedOnRB = parseInt(getRadioValue('feetStressedOn_rb'));
    mainStressRB = getRadioValue('mainStress_rb');
  } else {
    stress = 'No stress';
  }

  /****************************
   XXXXXXXXXXXXXXXXXXXXXXXX
   ****************************/

  finalDictionary = [];

  /************************
   Display grammar stuff
   ************************/

  let diphthongs = displayVowels.filter(a => a.includes('̯') || rgConsonant.test(a) && !a.includes('̩'));

  let diphthongsDisplay = (diphthongs.length) ? '<div id="diphthongs"><b>Diphthongs</b><ph>: ' + diphthongs.sort().join(' ') + `</ph> <a onclick="popup('generic-popup', message.diphthongs)"><span class="vl__question">?</span></a></div>` : '';

  let displayCoart = displayConsonants.filter(a => rgCoart.test(a));

  let consonantTable = phonemeTable('consonants', displayConsonants.filter(a => !rgCoart.test(a)));

  consonantTable += (displayCoart.length) ? '<p><b>Co-articulated phonemes</b></p><p>' + phonemeTable('coart', displayCoart) + '</p>' : '';

  let vowelTable = phonemeTable('vowels', displayVowels);

  let definiteOptions = ['Definite article can be omitted: ‘I am going to supermarket’', 'Used to talk about countable nouns in general: English’s ‘I like cats’ would translate to ‘I like the cats’', 'Not used for mass (uncountable) nouns: ‘Walking in the mud’ would always translate to ‘Walking in mud’.', 'Used for personal names in third person: ‘The Maria has left for school’', 'Used for languages: ‘The English’', 'Used with place names: ‘The London’'];

  let definiteRules = [];

  for (let i of definiteOptions) {
    if (rand() < 0.4) {
      definiteRules.push({
        insert: i
      }, {
        attributes: {
          list: 'bullet'
        }
        , insert: '\n'
      });
    }
  }

  if (definiteRules.length) {
    definiteRules.splice(0, 0, {
      insert: 'Uses of definite article that differ from English:\n'
    });
  }

  let indefiniteOptions = ['Not used for non-specific countable nouns: non-specific means ‘I am looking for a (any) girl in a red dress’, whereas specific means ‘I am looking for a (particular) girl in a red dress’', 'Not used for non-specific mass (uncountable) nouns: non-specific means ‘Would you like some (any) tea?’ whereas specific means ‘Some tea (a specific amount) fell off the truck’'];

  let indefiniteRules = [];

  for (let indef of indefiniteOptions) {
    if (rand() < 0.4) {
      indefiniteRules.push({
        insert: indef
      }, {
        attributes: {
          list: 'bullet'
        }
        , insert: '\n'
      });
    }
  }

  if (indefiniteRules.length) {
    indefiniteRules.splice(0, 0, {
      insert: 'Uses of indefinite article that differ from English:\n'
    });
  }

  /************************
   Add More Words stuff
   ************************/

    // default dervied words
  let allderivs = [];
  // fix - better name
  let derivFormulas = '';
  // needed so that we don't get (graveyard = grave-PLACE, grave = death place) where grave is not defined for the first entry

  for (let choices of choiceDerivs) {
    if (typeof choices[choices.length - 1] == 'number') {
      if (rand() > choices[choices.length - 1]) {
        // 0.2 means it's it gets through 20% of the time
        continue;
      }
      choices = choices.slice(0, -1);
    }

    let multiplied = [];
    for (let deriv of choices) {
      if (deriv[3]) {
        // if it has a multiplier
        let n = 0;
        while (n < deriv[3]) {
          multiplied.push([deriv[0], deriv[1], deriv[2]]);
          n++;
        }
      } else {
        multiplied.push(deriv);
      }
    }

    let chosen = choice(multiplied);

    if (derivFormulas.includes(chosen[1]) && derivFormulas.search('\\b' + chosen[1] + '\\b') > -1) {
      continue;
    }
    derivFormulas += ' ' + chosen[0];
    if (chosen[0].includes(' ')) {
      if (modifierOrder == 'after' && chosen[2] == 'n' || OV && chosen[2] == 'v') {
        let swap = chosen[0].split(' ');
        swap = swap[1] + ' ' + swap[0];
        allderivs.push([swap, chosen[1], chosen[2]]);
      } else {
        allderivs.push(chosen);
      }
    } else {
      allderivs.push(chosen);
    }
  }

  conlangWords = [];
  let addedEnglishWords = [];
  // to stop colexification of addedEnglishWords
  boundRoots = {};

  let appendCustomEntires = [];
  let removedWords = [];

  let wordsCheck = isChecked('wordsCheck');
  let derivedWords;
  let doubledConwords = [];

  if (wordsCheck) {
    // adds custom words to englishList and conlangWords
    let lines = getInput('words').split('\n').map(a => a.trim()).filter(function (a) {
      if (a) {
        return a;
      }
    });
    // filter out blank lines
    for (let line of lines) {
      if (line[0] == '-') {
        // remove word
        line = line.replace(/^- */, '').split(':');
        let removeThis = line[0];
        let POS = line[1];
        removedWords.push(removeThis);

        for (let i = 0; i < englishList.length; i++) {
          if (englishList[i].includes(removeThis)) {
            if (POS && !englishList[i].endsWith(POS))
              continue;
            // if it does not match the POS, skip to next word in englishList

            if (englishList[i].indexOf(removeThis + ':') == 0) {
              englishList.splice(i, 1);
              i--;
              // don't break
            }
          }
        }

        for (let i = 0; i < allderivs.length; i++) {
          // also check derived words
          if (allderivs[i][1] == removeThis) {
            allderivs.splice(i, 1);
            break;
          }
        }
      } else {
        // add word
        if (!line.includes(':')) {
          warnings += `<li>Add and Remove Words: no part-of-speech given for <b>${line}</b></li>`;
          line = line + ':';
        }
        line = line.replace(/ *: */, ':').replace(/= *(Random|RANDOM)? *$/, '');
        if (/= *random *$/.test(line))
          warnings += `<li><b>${line}</b> makes the word literally "random". For a random word, write <b>= Random</b> with capital R</li>`;
        if (/:root( *=|$)/.test(line)) {
          line = line.split(/ *= */);
          let name = line[0].slice(0, -5);
          // -5 is :root
          boundRoots[name] = line[1] || WORD('root');
          continue;
        }
        let english = line;
        if (!line.includes('=')) {
          // if conlang side not given, i.e. "queen:n"
          /* !post
         if (english.endsWith(':post')) { // if post
           let word = english.slice(0, english.indexOf(':post'));
           if (englishList.includes(word + ':prep')) {
             englishList[englishList.indexOf(word + ':prep')] = word + ':post';
           } else {
             englishList.push(english);
           }
         } else */
          english = english.replace(/ *<.*>$/, '');
          if (!englishList.includes(english)) {
            // not :post
            englishList.push(english);
          }
        } else if (line.indexOf(':') < line.indexOf('=')) {
          // if conlang side given, i.e. "queen:n = kalisi"
          english = english.slice(0, english.indexOf('=') - 1).trim();
          let doubleEng = removeDefaultWords;

          if (english[english.length - 1] == '+') {
            // if +=
            english = english.replace(/ *\+$/, '');
            doubleEng = true;
          }
          let conlang = line.slice(line.indexOf('=') + 1).trim();
          let irregularSpelling = conlang.match(/ *<.*>$/)?.[0].replace(/[<>]/g, '').trim();
          // fix slice
          if (irregularSpelling) {
            hasIrregularSeplling = true;
            conlang = cleanIPA(conlang.replace(/ *<.*>$/, '').toLowerCase());
            irrSpellRules[english] = irregularSpelling;
          } else {
            conlang = conlang.toLowerCase();
          }
          let doubleCon = removeDefaultWords;
          if (conlang[0] == '+') {
            // if =+
            conlang = conlang.slice(1).trim();
            doubleCon = true;
          } else if (!doubleCon && doubledConwords.includes(conlang)) {
            doubleCon = true;
          }
          doubledConwords.push(conlang)
          appendCustomEntires.push([english, cleanIPA(conlang), doubleEng, doubleCon]);
        }
        addedEnglishWords.push(english);
      }
    }
  }

  (function () {
    let combineDefinitions = function (A, B, combineProb, keep_B_Prob) {
      // creates polysemy for pre-defined words
      if (rand() < combineProb) {
        if (addedEnglishWords.includes(A) || addedEnglishWords.includes(B)) {
          // if user hasn't made custom words for these
          return;
        }
        for (let word of removedWords) {
          if (B.includes(word) || A.includes(word))
            return;
          // fix - this is overly restrictive, but perhaps that's a good thing?
        }
        let POS = A.split(':')[1];
        let wordB = B.split(':')[0];

        let i = englishList.indexOf(A);
        let wordA = A.split(':')[0];
        if (i == -1) {
          let foundA;
          let rgSafeWordA = '\\b' + wordA.replace(/\(/g, '\\(').replace(/\)/g, '\\)') + '\\b';
          let L = englishList.length;
          for (i = 0; i < L; i++) {
            let english = englishList[i];
            if (english.includes(wordA) && english.endsWith(':' + POS) && // check includes first for optimization
              english.includes(wordB) == false && // make sure B isn't already in there
              english.search(rgSafeWordA) > -1 // now check for actaul word
            ) {
              if (english.includes('(') && english.indexOf('(') < english.indexOf(wordA)) {
                // fix - possible errors here?
                continue;
                // avoids entries like "cook (prepare food), assemble"
              }
              foundA = english;
              break;
            }
          }
          if (foundA == undefined)
            return;
          // end function
          wordA = foundA.split(':')[0];
        }

        let indexB = englishList.indexOf(B);
        if (indexB > -1) {
          englishList[i] = wordA + ', ' + wordB + ':' + POS;
          if (rand() > keep_B_Prob) {
            if (!englishList[indexB].includes(',')) {
              // don't leave dangling definitions
              englishList.splice(indexB, 1);
            }
          }
        } else {
          englishList[i] = wordA + ', ' + wordB + ':' + POS;
        }
      }
    }

    if (!removeDefaultWords) {
      for (let i of polysemy) {
        combineDefinitions(...i);
      }
    }

    let colorStage = rand();
    // fix https://wals.info/chapter/132
    if (colorStage < 0.1) {
      combineDefinitions('white:adj', 'yellow:adj', 1, 0);
      combineDefinitions('white:adj', 'orange:adj', 1, 0);
      combineDefinitions('white:adj', 'brown:adj', 1, 0);
      combineDefinitions('white:adj', 'red:adj', 1, 0);
      combineDefinitions('white:adj', 'pink:adj', 1, 0);
      combineDefinitions('black:adj', 'blue:adj', 1, 0);
      combineDefinitions('black:adj', 'purple:adj', 1, 0);
      combineDefinitions('black:adj', 'green:adj', 1, 0);
    } else if (colorStage < 0.2) {
      combineDefinitions('red:adj', 'yellow:adj', 1, 0);
      combineDefinitions('red:adj', 'orange:adj', 1, 0);
      combineDefinitions('red:adj', 'brown:adj', 1, 0);
      combineDefinitions('black:adj', 'blue:adj', 1, 0);
      combineDefinitions('black:adj', 'purple:adj', 1, 0);
      combineDefinitions('black:adj', 'green:adj', 1, 0);
    } else if (colorStage < 0.3) {
      combineDefinitions('yellow:adj', 'orange:adj', 1, 0);
      combineDefinitions('yellow:adj', 'brown:adj', 1, 0);
      combineDefinitions('black:adj', 'blue:adj', 1, 0);
      combineDefinitions('black:adj', 'purple:adj', 1, 0);
      combineDefinitions('black:adj', 'green:adj', 1, 0);
    } else if (colorStage < 0.4) {
      combineDefinitions('red:adj', 'yellow:adj', 1, 0);
      combineDefinitions('red:adj', 'orange:adj', 1, 0);
      combineDefinitions('red:adj', 'brown:adj', 1, 0);
      combineDefinitions('black:adj', 'purple:adj', 1, 0);
      combineDefinitions('black:adj', 'green:adj', 1, 0);
    } else if (colorStage < 0.5) {
      combineDefinitions('yellow:adj', 'green:adj', 1, 0);
      combineDefinitions('yellow:adj', 'blue:adj', 1, 0);
      combineDefinitions('yellow:adj', 'orange:adj', 1, 0);
      combineDefinitions('yellow:adj', 'brown:adj', 1, 0);
      combineDefinitions('red:adj', 'purple:adj', 1, 0);
    } else if (colorStage < 0.6) {
      combineDefinitions('black:adj', 'blue:adj', 1, 0);
      combineDefinitions('yellow:adj', 'orange:adj', 1, 0);
      combineDefinitions('yellow:adj', 'brown:adj', 1, 0);
      combineDefinitions('red:adj', 'purple:adj', 1, 0);
    } else if (colorStage < 0.7) {
      combineDefinitions('green:adj', 'blue:adj', 1, 0);
      combineDefinitions('yellow:adj', 'orange:adj', 1, 0);
      combineDefinitions('yellow:adj', 'brown:adj', 1, 0);
      combineDefinitions('red:adj', 'purple:adj', 1, 0);
    } else if (colorStage < 0.8) {
      combineDefinitions('yellow:adj', 'orange:adj', 1, 0);
      combineDefinitions('yellow:adj', 'brown:adj', 1, 0);
      combineDefinitions('red:adj', 'purple:adj', 1, 0);
    } else if (colorStage < 0.9) { // same as enlgish colors
    } else if (!removeDefaultWords) {
      englishList[englishList.indexOf('blue:adj')] = 'blue, dark blue:adj';
      englishList.push('light blue:adj', 'violet:adj');
    }
  })();

  numberBase = getRadioValue('numberBase_rb');
  if (numberBase == 'either') {
    numberBase = (rand() < 0.25) ? '20' : '10';
  }

  if (!removeDefaultWords && numberBase == '20') {
    englishList.push('eleven:num', 'twelve:num', 'thirteen:num', 'fourteen:num', 'fifteen:num', 'sixteen:num', 'seventeen:num', 'eighteen:num', 'nineteen:num', 'twenty:num');
  }

  if (!removeDefaultWords && isChecked('sciFiVocab')) {
    englishList.push('computer:n', 'radio:n', 'video:n', 'television:n', 'cell (biology):n', 'application:n', 'plastic:n', 'software:n', 'code (computer):n', 'dimension:n', 'protein:n', 'carbon:n', 'jet:n', 'battery:n', 'database:n', 'radiation:n', 'virtual:adj', 'particle:n', 'shuttle:n', 'carbohydrate:n', 'laser:n', 'alien:n', 'hardware:n', 'circuit:n', 'output:n', 'rocket:n', 'input:n', 'robot:n', 'processor:n', 'radar:n', 'hydrogen:n', 'keyboard:n', 'electron:n', 'x-ray:n', 'microwave:n', 'nitrogen:n', 'interface:n', 'reactor:n', 'download:n', 'synthetic:adj', 'thermal:adj', 'fusion:n', 'uranium:n', 'nebula:n', 'hack:v', 'algorithm:n', 'plasma:n', 'microscope:n', 'lag:n', 'clone:n', 'browse:v', 'photon:n', 'password:n', 'neutron:n', 'ion:n', 'plutonium:n', 'binary:n', 'titanium:n', 'elastic:n', 'proton:n', 'meltdown:n', 'silicone:n', 'sync:v', 'download:v', 'airlock:n', 'sonar:n', 'isotope:n', 'pulsar:n', 'mutate:v', 'avatar:n', 'upload:v', 'quark:n', 'hologram:n', 'nuclear:adj', 'nova:n', 'quantum:n');
  }

  if (genderLables.length) {
    // apply gender to nouns
    for (let i of range(englishList)) {
      englishList[i] = chooseNounGender(englishList[i]);
    }
  }

  function validateRule(line, sectionName, irregulars) {
    if (/= *-?random-? *$/.test(line)) {
      warnings += `<li><b>${line}</b> literally produces "random". For a random affix, write <b>= Random</b> with capital R</li>`;
    }
    if (/= *-?(Random|RANDOM)-?$/.test(line)) {
      let localAffix = undefined;
      if (/-(Random|RANDOM)/.test(line)) {
        localAffix = 'suffix';
      } else if (/(Random|RANDOM)-/.test(line)) {
        localAffix = 'prefix';
      }
      line = line.replace(/-?(Random|RANDOM)-?/, randomAffix(localAffix));
      buildMorphRule(line);
    } else if (/-|→|»|«/.test(line)) {
      let tokens = capture(line, /\b(IF|THEN|ELSE)\b/g);
      let valid = true;

      if (tokens.length > 0 && tokens[tokens.length - 1] == 'IF') {
        valid = false;
      } else {
        let need = 'IF';
        for (let token of tokens) {
          if (need && token != need) {
            valid = false;
            break;
          }

          if (token == 'IF') {
            need = 'THEN';
          } else if (token == 'THEN') {
            need = false;
          } else if (token == 'ELSE') {
            need = 'IF';
          }
        }
      }
      if (valid) {
        buildMorphRule(line, irregulars);
      } else {
        buildMorphRule(line.replace(/=.*/, '='), irregulars);
        warnings += '<li>' + sectionName + ': syntax error in rule <b>' + line + '</b></li>';
      }
    } else if (line.endsWith('=')) {
      buildMorphRule(line, irregulars);
    } else {
      // = something with no hyphen or sound chane
      buildMorphRule(line.replace(/= */, '= -'), irregulars);
      warnings += '<li>' + sectionName + ': syntax error in rule <b>' + line + '</b>. Possibly missing a hyphen.</li>';
    }
  }

  ////////////////////////////////////

  let derivationalAffixes = getAffixesFromInput(arrows(getInput('derivationalAffixes')));

  barDerivationals = [];

  for (let line of derivationalAffixes) {
    // fix - this should be abstracted for other uses?
    if (line.includes('|') && line.includes('=')) {
      barDerivationals.push(line.slice(0, line.search(' ?=')));
    }
    validateRule(line, 'Derivational affixes');
  }

  editableDerivRules = [];
  let derivRulesInEnglish = [];

  for (let [key, value] of Object.entries(morphRules)) {
    editableDerivRules.push(key + ' = ' + value.code.join('; ').replace(/,(?=IF|ELSE)/g, ' '));
    // fix - hacky
    derivRulesInEnglish.push('<b>' + sentenceCase(key.replaceAll('.', ' ').toLowerCase()) + '</b> = ' + morphReader(value.english));
  }

  derivRulesInEnglish = derivRulesInEnglish.join('<br>').replace('Adverb', 'Adjective → adverb').replace('Quality of being', 'Adjective → noun (the quality of being [adj])').replace('To make', 'Adjective → verb (to make something [adj])').replace('Having quality of', 'Noun → adjective (having the quality of [noun])').replace('Relating to', 'Noun → adjective relating to noun (e.g. economy → economic)').replace('To create', 'Noun → verb (to create [noun])').replace('Result of doing', 'Verb → adjective (result of doing [verb])').replace('Likely to', 'Verb → adjective (likely to do [verb])').replace('Act of', 'Verb → noun (the act of [verb])').replace('Product of', 'Verb → noun that verb produces (e.g. know → knowledge)').replace('Doer', 'One who [verb]s (e.g. paint → painter)').replace('Place of', 'Place of (e.g. wine → winery)').replace('Dim', 'Diminutive').replace('Aug', 'Augmentative');

  derivRulesInEnglish = '<div class="vl__grammar-block"><h3>Derivational morphology</h3><p>' + derivRulesInEnglish + '</div>';

  if (!isChecked('displayDerivationalAffixes'))
    derivRulesInEnglish = '';

  if (isChecked('removeDefaultDerivedWords'))
    allderivs = [];

  if (wordsCheck) {
    let derivedWords = getInput('derivedWords').replace(/ *- */g, '-') // fix - *- * should be generalized to other areas
      .split('\n').map(a => a.trim()) // trim first in order to filter blank lines
      .filter(function (a) {
        if (a) {
          return a;
        }
      });
    // filter out blank lines
    for (let line of derivedWords) {
      if (!line.includes('=') || /= *$/.test(line)) {
        warnings += '<li>Derived words: <b>' + line + '</b> is missing an equals sign</li>';
        continue;
      }
      if (!line.includes(':')) {
        line = line.replace('=', ':=');
        warnings += '<li>Derived words: no part-of-speech given for <b>' + line + '</b></li>';
      }
      line = line.replace(/ *: */g, ':');
      let lineSplit = line.split(/ *= */);
      let english = lineSplit[0].split(':');
      let formula = lineSplit[1].replace(/, +/g, ',_').replace(/ +\(/g, '_(');
      allderivs.push([formula, english[0], english[1], true /*custom added*/]);
    }
  }

  let POSmorphologyCheck = isChecked('POSmorphologyCheck');

  if (POSmorphologyCheck) {
    let affixes = getAffixesFromInput(arrows(getInput('POSmorphology')), 'pos');
    for (let line of affixes) {
      validateRule(line, 'Part-of-speech morphology');
    }
  }

  languageIPA = '';
  // needs to remain ''
  if (getInput('ipaLangName')) {
    languageIPA = cleanIPA(getInput('ipaLangName').toLowerCase());
  } else {
    let languageIPA_count = 0;
    breakOne: while (languageIPA.length < 5 && languageIPA_count < 1000) {
      breakTwo: while (true) {
        languageIPA = WORD();
        if (countWords > 1000000) {
          break breakOne;
        }
        if (illegalRules.every(rule => rule.test(languageIPA) == false)) {
          break;
        }
      }
      languageIPA_count++;
    }
  }

  let nativelyKnownAs = multiEntry(languageIPA);

  anglicizedName = getInput('anglicizedName');

  if (!anglicizedName) {
    let languageNameOrtho = nativelyKnownAs.replace(/<\/?s1>/g, '').replace(/ ?<ph.*ph>/, '').replace(/<s2.*s2>/, '').trim();
    languageNameOrtho = sentenceCase(languageNameOrtho.split(' '));

    let angloEnding = 'ian';
    if (/[ni]$/.test(languageNameOrtho)) {
      angloEnding = '';
    } else if (/[ae]$/.test(languageNameOrtho)) {
      angloEnding = 'n';
    } else if (/[ht]$/.test(languageNameOrtho)) {
      angloEnding = 'i';
    } else if (/[lmr]$/.test(languageNameOrtho)) {
      angloEnding = 'ish';
    }
    anglicizedName = languageNameOrtho + angloEnding;
  }

  underlyingIPA = [];

  const abortLimit = 300;
  (function () {
    let englishLength = englishList.length;
    let lexicNoStress = [];
    const commonWordsNumber = removeDefaultWords ? 0 : 33;
    let Ccount = 0 + conlangWords.length;

    hasStress = illegalRules.map(rule => rule.source.includes('ˈ'));
    // create ture or false array // fix - what about secondary stress?

    let abortCount = 0;
    if (stress !== 'No fixed stress' || isChecked('allowContrastiveStress')) {
      // Fixed stress OR allow identical words that only differ by stress location

      if (englishLength > commonWordsNumber) {
        while (conlangWords.length < commonWordsNumber) {
          let thisPOS = englishList[Ccount].split(':')[1];
          let unstressed = legalShortWord(thisPOS);
          let stressedWord = applyStress(unstressed);

          if (!POSmorphologyCheck) {
            if (abortCount > abortLimit || !conlangWords.includes(stressedWord)) {
              conlangWords.push(stressedWord);
              underlyingIPA.push('<ph>/' + stressedWord + '/</ph> <e><ps>' + thisPOS + '.</ps> ' + englishList[Ccount].slice(0, englishList[Ccount].indexOf(':')) + '</e>');
              Ccount++;
            }
          } else {
            if (morphRules[thisPOS] != undefined) {
              stressedWord = morph(unstressed, morphRules[thisPOS]['code']);
            }
            if (abortCount > abortLimit || !conlangWords.includes(stressedWord)) {
              conlangWords.push(stressedWord);
              underlyingIPA.push('<ph>/' + stressedWord + '/</ph> <e><ps>' + thisPOS + '.</ps> ' + englishList[Ccount].slice(0, englishList[Ccount].indexOf(':')) + '</e>');
              Ccount++;
            }
          }
          abortCount++;
        }
      }

      while (conlangWords.length < englishLength) {
        // generates as many con-words as there are english words
        let thisPOS = englishList[Ccount].split(':')[1];
        let unstressed = WORD(thisPOS);
        let stressedWord = applyStress(unstressed);

        if (foundIllegal(unstressed, stressedWord))
          continue;
        // skip back to 'while'

        if (!POSmorphologyCheck) {
          // no part of speech rules
          if (countWords > 1000000 || !conlangWords.includes(stressedWord)) {
            conlangWords.push(stressedWord);
            underlyingIPA.push('<ph>/' + stressedWord + '/</ph> <e><ps>' + thisPOS + '.</ps> ' + englishList[Ccount].slice(0, englishList[Ccount].indexOf(':')) + '</e>');
            Ccount++;
          }
        } else {
          // part of speech rules

          if (morphRules[thisPOS] != undefined) {
            stressedWord = morph(unstressed, morphRules[thisPOS]['code']);
          }
          if (countWords > 1000000 || !conlangWords.includes(stressedWord)) {
            conlangWords.push(stressedWord);
            underlyingIPA.push('<ph>/' + stressedWord + '/</ph> <e><ps>' + thisPOS + '.</ps> ' + englishList[Ccount].slice(0, englishList[Ccount].indexOf(':')) + '</e>');
            Ccount++;
          }
        }
      }
    } else {
      // No contrastive stress for no fixed stress

      if (englishLength > commonWordsNumber) {
        while (conlangWords.length < commonWordsNumber) {
          let thisPOS = englishList[Ccount].split(':')[1];
          let unstressed = legalShortWord(thisPOS);
          let stressedWord = applyStress(unstressed);

          if (!POSmorphologyCheck) {
            if (abortCount > abortLimit || !conlangWords.includes(stressedWord)) {
              conlangWords.push(stressedWord);
              underlyingIPA.push('<ph>/' + stressedWord + '/</ph> <e><ps>' + thisPOS + '.</ps> ' + englishList[Ccount].slice(0, englishList[Ccount].indexOf(':')) + '</e>');
              Ccount++;
            }
          } else {

            if (morphRules[thisPOS] != undefined) {
              stressedWord = morph(unstressed, morphRules[thisPOS]['code']);
            }
            if (abortCount > abortLimit || !conlangWords.includes(stressedWord)) {
              conlangWords.push(stressedWord);
              underlyingIPA.push('<ph>/' + stressedWord + '/</ph> <e><ps>' + thisPOS + '.</ps> ' + englishList[Ccount].slice(0, englishList[Ccount].indexOf(':')) + '</e>');
              Ccount++;
            }
          }
          abortCount++;
        }
      }

      while (conlangWords.length < englishLength) {
        // generates as many con-words as there are english words
        let thisPOS = englishList[Ccount].split(':')[1];
        let unstressed = WORD(thisPOS);
        let stressedWord = applyStress(unstressed);

        if (foundIllegal(unstressed, stressedWord))
          continue;
        // skip back to 'while'

        if (!POSmorphologyCheck) {
          if (countWords > 1000000 || !lexicNoStress.includes(unstressed)) {
            conlangWords.push(stressedWord);
            lexicNoStress.push(unstressed);
            underlyingIPA.push('<ph>/' + stressedWord + '/</ph> <e><ps>' + thisPOS + '.</ps> ' + englishList[Ccount].slice(0, englishList[Ccount].indexOf(':')) + '</e>');
            Ccount++;
          }
        } else {
          if (morphRules[thisPOS] != undefined) {
            stressedWord = morph(unstressed, morphRules[thisPOS]['code']);
            unstressed = stressedWord.replace(/[ˈˌ]/g, '');
          }
          if (countWords > 1000000 || !lexicNoStress.includes(unstressed)) {
            conlangWords.push(stressedWord);
            lexicNoStress.push(unstressed);
            underlyingIPA.push('<ph>/' + stressedWord + '/</ph> <e><ps>' + thisPOS + '.</ps> ' + englishList[Ccount].slice(0, englishList[Ccount].indexOf(':')) + '</e>');
            Ccount++;
          }
        }
      }
    }
  })();

  (function () {
    let checkDerivs = allderivs.map(a => a[1]);

    for (let customWord of appendCustomEntires) {
      let englishSide = customWord[0];
      let conlangSide = customWord[1];
      let doubleEnglish = customWord[2];
      let doubleConlang = customWord[3];

      if (!doubleEnglish) {
        // if =
        let wordToFind = englishSide.split(':')[0];
        let posToFind = ':' + englishSide.split(':')[1];
        let rgFreindly_wordToFind = wordToFind.replace(/[()]/g, '\\$&');
        let isDeriv = checkDerivs.indexOf(wordToFind);
        if (isDeriv > -1 && !allderivs[isDeriv][3]) {
          // remove from allderivs too
          allderivs.splice(isDeriv, 1);
          checkDerivs.splice(isDeriv, 1);
        }
        let searchablePOS = (hasGenders && posToFind[1] == 'n' && posToFind != 'num') ? ':' + posToFind[1] : posToFind;

        let L = englishList.length;
        let eL;
        for (eL = 0; eL < L; eL++) {
          // if in default englishList
          if (englishList[eL].includes(wordToFind) && englishList[eL].includes(searchablePOS)) {
            if (englishList[eL].search('(^| )' + rgFreindly_wordToFind + ':') > -1) {
              if (!doubleConlang && conlangWords.includes(conlangSide)) {
                let ind = conlangWords.indexOf(conlangSide);
                let newWord;
                do {
                  // deduplicate kalisis
                  newWord = WORD();
                  // fix - does this take the custom word pos or the conlangWords?
                } while (conlangWords.includes(newWord));
                conlangWords[ind] = newWord;
              }
              englishList[eL] = chooseNounGender(englishSide);
              conlangWords[eL] = conlangSide;
              underlyingIPA[eL] = '<ph>/' + conlangSide + '/</ph> <e><ps>' + englishSide.slice(englishSide.indexOf(':') + 1) + '.</ps> ' + wordToFind + '</e>';
              break;
            }
          }
        }
        if (eL == L) {
          // if not in default englishList
          englishList.push(chooseNounGender(englishSide));

          if (!doubleConlang && conlangWords.includes(conlangSide)) {
            let ind = conlangWords.indexOf(conlangSide);
            let newWord;
            do {
              // deduplicate kalisis
              newWord = WORD();
              // fix - does this take the custom word pos or the conlangWords? // fix - does this apply illegls?
            } while (conlangWords.includes(newWord));
            conlangWords[ind] = newWord;
            underlyingIPA[ind] = '<ph>/' + newWord + '/</ph> <e><ps>' + englishSide.slice(englishSide.indexOf(':') + 1) + '.</ps> ' + wordToFind + '</e>';
          }
          conlangWords.push(conlangSide);
          underlyingIPA.push('<ph>/' + conlangSide + '/</ph> <e><ps>' + englishSide.slice(englishSide.indexOf(':') + 1) + '.</ps> ' + wordToFind + '</e>');
        }
      } else {
        // if +=
        if (!doubleConlang && conlangWords.indexOf(conlangSide) > -1) {
          // if it's actually in the default list
          let ind = conlangWords.indexOf(conlangSide);
          let newWord;
          do {
            // deduplicate kalisis
            newWord = WORD();
            // fix - does this take the custom word pos or the conlangWords?
          } while (conlangWords.includes(newWord));
          conlangWords[ind] = newWord;
          underlyingIPA[ind] = '<ph>/' + newWord + '/</ph> <e><ps>' + englishSide.slice(englishSide.indexOf(':') + 1) + '.</ps> ' + englishSide.slice(0, englishSide.indexOf(':')) + '</e>';
        } else {
          // if it's not even in the default list anyway
          englishList.push(chooseNounGender(englishSide));
          conlangWords.push(conlangSide);
          underlyingIPA.push('<ph>/' + conlangSide + '/</ph> <e><ps>' + englishSide.slice(englishSide.indexOf(':') + 1) + '.</ps> ' + englishSide.slice(0, englishSide.indexOf(':')) + '</e>');
        }
      }
    }
  })();

  originalIPA = [];

  hasTempSoundChanges = isSelected.soundChangesCheck && getInput('soundChanges').length > 0 && !document.getElementById('squareBracketChanges').checked && !document.getElementById('permanentSoundChanges').checked;

  for (let i = 0, L = conlangWords.length; i < L; i++) {
    let englishEntry = englishList[i].split(':');
    let mutli_entry = multiEntry(conlangWords[i]);

    if (hasIrregularSeplling) {
      // new 10.8.5
      if (irrSpellRules[englishEntry[0] + ':' + englishEntry[1]]) {
        mutli_entry = mutli_entry.replace(/<s1>.*?(?= <s2>|<\/s1>)/, '<s1>' + irrSpellRules[englishEntry[0] + ':' + englishEntry[1]]);
      }
    }

    finalDictionary.push(mutli_entry + '<e><ps>' + englishEntry[1] + '.</ps> ' + englishEntry[0] + '</e>');

    if (hasTempSoundChanges) {
      let irregularSpelling = (hasIrregularSeplling) ? ' <' + mutli_entry.slice(mutli_entry.indexOf('<s1>') + 4, mutli_entry.indexOf('</s1>')) + '>' : '';

      originalIPA.push(englishEntry[0] + ' : ' + englishEntry[1] + ' = ' + conlangWords[i] + irregularSpelling);
    }
  }

  function doubleBrackets(string, type) {
    let replaceWords = capture(string, /\(\(.+?\)\)(?!\))|{{.+?}}|‹‹.+?››/g);

    for (let word of replaceWords) {
      if (type != 'IPA') {
        type = (word.startsWith('‹‹')) ? 'table' : undefined;
      }
      let replacingWord = word;
      // needed for if .replace(/ /g, '_')
      if (word.startsWith('{{'))
        word = word.replaceAll(' ', '_');

      try {
        let wordStart = string.indexOf(replacingWord);
        let wordEnd = wordStart + word.length;
        word = word.slice(2, -2).trim();
        if (grammarWords[word]) {
          word = grammarWords[word];
        } else {
          word = compoundWord(word);
        }
        word = multiEntry(word);
        if (type == 'table') { // pass
        } else if (type == 'IPA') {
          word = word.match(/<ph>\/.*?\//)[0].slice(5, -1);
        } else if (!type) {
          word = word.match(/<s1>.*<\/s1>/)[0];
        }
        string = string.slice(0, wordStart) + word + string.slice(wordEnd);
      } catch {
      }
    }
    return string;
  }

  let finsystruc = (isSelected.wordStructure) ? 'Custom defined' : '(C)'.repeat(displaySyllStructure[0]) + 'V' + '(C)'.repeat(displaySyllStructure[1]);

  /*****************************
   Random Grammar
   *****************************/
  let randomDelta;
  if (!isSelected.grammarCheck) {
    let nounSection = [{
      insert: 'Nouns'
    }, {
      attributes: {
        header: 2
      }
      , insert: '\n'
    }];

    let pronounCaseHeadings = [];
    let pronounHeadings = [];

    let pronounSection = [{
      insert: '---\n'
    }, {
      insert: 'Pronouns'
    }, {
      attributes: {
        header: 2
      }
      , insert: '\n'
    }];
    let possessiveSection = [{
      insert: '---\n'
    }, {
      insert: 'Possessive determiners'
    }, {
      attributes: {
        header: 2
      }
      , insert: '\n'
    }];
    let caseHeadings = [];

    let inflectGenderedWords = [];
    // CASE stuff----------------------------------------------------------------------------
    let nOfCases = rand();

    let abbrNomErg, abbrAccAbs;
    if (mainOrder == 'SVO' || mainOrder == 'OVS') {
      if (rand() < 0.2) {
        // no case in nouns, but case in pronouns
        pronounCaseHeadings.push('NOMinative', 'ACCusative');
      }
    } else {
      let numeral = '';
      let nomErg, accAbs;
      if (rand() > 0.2) {
        nomErg = 'NOMinative';
        accAbs = 'ACCusative';
        abbrNomErg = 'NOM';
        abbrAccAbs = 'ACC';
        nounSection.push({
          insert: 'Nominative'
          , attributes: {
            bold: true
          }
        }, {
          insert: ' is the doer of a verb: '
        }, {
          insert: 'dog'
          , attributes: {
            bold: true
          }
        }, {
          insert: ' bites man.'
        }, {
          attributes: {
            list: 'bullet'
          }
          , insert: '\n'
        }, {
          insert: 'Accusative'
          , attributes: {
            bold: true
          }
        }, {
          insert: ' is the done-to of a verb: man bites '
        }, {
          insert: 'dog'
          , attributes: {
            bold: true
          }
        }, {
          insert: '.'
        }, {
          attributes: {
            list: 'bullet'
          }
          , insert: '\n'
        },);
      } else {
        nomErg = 'ERGative';
        accAbs = 'ABSolutive';
        abbrNomErg = 'ERG';
        abbrAccAbs = 'ABS';
        nounSection.push({
          insert: 'Ergative'
          , attributes: {
            bold: true
          }
        }, {
          insert: ' is the doer of a verb, when the verb is '
        }, {
          insert: 'done to something'
          , attributes: {
            italic: true
          }
        }, {
          insert: ': '
        }, {
          insert: 'dog'
          , attributes: {
            bold: true
          }
        }, {
          insert: ' bites man.'
        }, {
          attributes: {
            list: 'bullet'
          }
          , insert: '\n'
        }, {
          insert: 'Absolutive'
          , attributes: {
            bold: true
          }
        }, {
          insert: ' is used in two scenarios: the doer of a verb when not done to something ('
        }, {
          insert: 'dog'
          , attributes: {
            bold: true
          }
        }, {
          insert: ' bites), and the done-to of a verb (man bites '
        }, {
          insert: 'dog'
          , attributes: {
            bold: true
          }
        }, {
          insert: ').'
        }, {
          attributes: {
            list: 'bullet'
          }
          , insert: '\n'
        },);
      }
      caseHeadings.push(nomErg, accAbs);
      pronounCaseHeadings.push(nomErg, accAbs);
      numeral = 'two';

      if (nOfCases > 2 / 7) {
        caseHeadings.push('GENitive');
        pronounCaseHeadings.push('GENitive');
        numeral = 'three';
        nounSection.push({
          insert: 'Genitive'
          , attributes: {
            bold: true
          }
        }, {
          insert: ' is the possessor of something: '
        }, {
          insert: 'dog’s'
          , attributes: {
            bold: true
          }
        }, {
          insert: ' tail hits man.'
        }, {
          attributes: {
            list: 'bullet'
          }
          , insert: '\n'
        },);
      }
      if (nOfCases > 3 / 7) {
        caseHeadings.push('DATive');
        pronounCaseHeadings.push('DATive');
        numeral = 'four';
        nounSection.push({
          insert: 'Dative'
          , attributes: {
            bold: true
          }
        }, {
          insert: ' is the recipient of something: man gives ball '
        }, {
          insert: 'to dog'
          , attributes: {
            bold: true
          }
        }, {
          insert: '.'
        }, {
          attributes: {
            list: 'bullet'
          }
          , insert: '\n'
        },);
      }
      if (nOfCases > 4 / 7) {
        caseHeadings.push('LOCative');
        pronounCaseHeadings.push('LOCative');
        numeral = 'five';
        nounSection.push({
          insert: 'Locative'
          , attributes: {
            bold: true
          }
        }, {
          insert: ' is the location of something: man goes '
        }, {
          insert: 'to town'
          , attributes: {
            bold: true
          }
        }, {
          insert: '.'
        }, {
          attributes: {
            list: 'bullet'
          }
          , insert: '\n'
        },);
      }
      if (nOfCases > 5 / 7) {
        caseHeadings.push('ABLative');
        pronounCaseHeadings.push('ABLative');
        numeral = 'six';
        nounSection.push({
          insert: 'Ablative'
          , attributes: {
            bold: true
          }
        }, {
          insert: ' is movement away from something: man walks '
        }, {
          insert: 'from town'
          , attributes: {
            bold: 'true'
          }
        }, {
          insert: '.'
        }, {
          attributes: {
            list: 'bullet'
          }
          , insert: '\n'
        },);
      }
      if (nOfCases > 6 / 7) {
        caseHeadings.push('INStrumental');
        pronounCaseHeadings.push('INStrumental');
        numeral = 'seven';
        nounSection.push({
          insert: 'Instrumental'
          , attributes: {
            bold: true
          }
        }, {
          insert: ' is the use of something: man writes '
        }, {
          insert: 'with (using) pen'
          , attributes: {
            bold: true
          }
        }, {
          insert: '.'
        }, {
          attributes: {
            list: 'bullet'
          }
          , insert: '\n'
        },);
      }
      nounSection.splice(2, 0, {
        insert: 'Nouns have ' + numeral + ' cases:\n'
      });
    }

    // NOUN number --------------------------------------------------------------------------------------------
    let nOfNumber = rand();

    let numberHeadings = [];

    if (nOfNumber < 1 / 10) {
      nounSection.push({
        insert: 'Nouns form plural with separate plural word:\n'
      });
      nounSection = nounSection.concat(codeBlockTable('affixword', [
        ['PLural']
      ], 'n', 'dog', false, {
        'PL': 'dogs'
      }));
    } else if (nOfNumber < 9 / 10) {
      numberHeadings.push('SinGular', 'PLural');
    } else if (nOfNumber < 9.5 / 10) {
      if (rand() > 0.5) {
        nounSection.push({
          insert: 'Nouns have both a plural affix and dual affix for precisely two things.\n'
        });
        numberHeadings.push('SinGular', 'PLural', 'DUal');
      } else {
        nounSection.push({
          insert: 'Nouns have both a plural affix and ‘paucal’ affix for referring to a few of something.\n'
        });
        numberHeadings.push('SinGular', 'PLural', 'PAUCal');
      }
    }

    let caseSeparate = rand() > 0.2;

    let nounHeadings = [];
    let dynamicnounStack = JSON.parse(JSON.stringify(nounStack));
    if (genderLables.length) {
      nounHeadings.push(genderLables);

      if (genderLables.includes('Masculine') && genderLables.includes('Feminine')) {
        inflectGenderedWords.push('man', 'woman');
      } else if (hasAnimacy) {
        let inanimate = 'tree';
        inflectGenderedWords.push('man', inanimate);
        for (let [tag, translation] of Object.entries(nounStack)) {
          tag = tag.replace(/\.M$/, '.AN').replace(/\.F$/, '.IN');
          translation = translation.replace('woman', inanimate).replace('women', inanimate + 's');
          dynamicnounStack[tag] = translation;
        }
      }
      if (genderLables.includes('NeuTer')) {
        inflectGenderedWords.push('dog');
      }
    } else {
      inflectGenderedWords = 'dog';
    }

    if (!caseSeparate) {
      if (caseHeadings.length)
        nounHeadings.push(caseHeadings);
    } else if (caseHeadings.length) {
      // case separate
      let nounMorph = codeBlockTable('affix', [caseHeadings], 'n', 'dog', true, dynamicnounStack);
      nounSection = nounSection.concat(nounMorph);
    }

    if (numberHeadings.length)
      nounHeadings.push(numberHeadings);

    let definiteAffix = rand();
    let articleSection = [{
      insert: '---\n'
    }, {
      insert: 'Articles'
    }, {
      attributes: {
        header: 2
      }
      , insert: '\n'
    }];

    if (definiteAffix < 0.2 && nounHeadings.length < 3) {
      // definite
      nounHeadings.push(['DEFinite', 'INDEFinite']);

      articleSection.push({
        insert: '{{Langname}} encodes definite article ‘the’, and indefinite article ‘a’ in noun affixes. See Noun section.\n'
      })
    } else if (definiteAffix < 0.8) {
      let artPlural = rand();
      let artTable;
      if (artPlural < 0.5) {
        artTable = codeBlockTable('word', [
          ['DEFinite', 'INDEFinite']
          , ['SinGular', 'PLural']
        ], 'det', false, undefined, {
          'DEF.SG': 'the'
          , 'DEF.PL': 'the'
          , 'INDEF.SG': 'a'
          , 'INDEF.PL': 'some'
        });
      } else {
        artTable = codeBlockTable('word', [
          ['DEFinite', 'INDEFinite']
        ], 'det', false, undefined, {
          'DEF': 'the'
          , 'INDEF': 'a, some'
        });
      }
      articleSection = articleSection.concat(artTable);

      for (let i of definiteRules) {
        articleSection.push(i)
      }
      for (let i of indefiniteRules) {
        articleSection.push(i)
      }

    } else {
      articleSection.push({
        insert: '{{Langname}} has no definite article ‘the’, or indefinite article ‘a’.\n'
      })
    }

    if (nounHeadings.length == 1 && nounHeadings[0].includes('Masculine')) {
      // remove gender only tables
      nounHeadings = [];
      // gender needs to be reflected somewhere?
    }

    let nounMorph = codeBlockTable('affix', nounHeadings, 'n', inflectGenderedWords, /*conTrans*/
      true, dynamicnounStack);
    nounSection = nounSection.concat(nounMorph);

    // **************** Pronouns

    let pronNumGenderHeadings = ['1st SinGular', '2nd SinGular'];

    let possessiveDeterminers = ['1st SinGular', '2nd SinGular'];

    let sing_pronouns_without_gender = rand() < 0.8;

    if (genderLables.includes('Masculine') && genderLables.includes('Feminine') || sing_pronouns_without_gender) {
      pronNumGenderHeadings.push('3rd SinGular Masc', '3rd SinGular Fem');
      possessiveDeterminers.push('3rd SinGular Masc', '3rd SinGular Fem');
      if (genderLables.includes('NeuTer')) {
        pronNumGenderHeadings.push('3rd SinGular NeuTer');
        possessiveDeterminers.push('3rd SinGular NeuTer');
      }
    } else {
      pronNumGenderHeadings.push('3rd SinGular');
      possessiveDeterminers.push('3rd SinGular');
    }

    if (rand() < 0.2) {
      pronNumGenderHeadings.push('1st PLural INCLusive', '1st PLural EXCLusive');
      possessiveDeterminers.push('1st PLural INCLusive', '1st PLural EXCLusive');
    } else {
      pronNumGenderHeadings.push('1st PLural');
      possessiveDeterminers.push('1st PLural');
    }

    pronNumGenderHeadings.push('2nd PLural');
    possessiveDeterminers.push('2nd PLural');

    let usablePronounStack = JSON.parse(JSON.stringify(pronounStack));
    let usablePossDetStack = JSON.parse(JSON.stringify(possDetStack));

    if (genderLables.includes('Masculine') && genderLables.includes('Feminine')) {
      pronNumGenderHeadings.push('3rd PLural Masc', '3rd PLural Fem');
      possessiveDeterminers.push('3rd PLural Masc', '3rd PLural Fem');
      if (genderLables.includes('NeuTer')) {
        pronNumGenderHeadings.push('3rd PLural NeuTer');
        possessiveDeterminers.push('3rd PLural NeuTer');
      } else {
        usablePronounStack['3.SG.M'] = 'he, him, his, it, its';
        usablePronounStack['3.SG.F'] = 'she, her, hers, it, its';
        usablePronounStack['3.SG.M.NOM'] = 'he, it';
        usablePronounStack['3.SG.F.NOM'] = 'she, it';
        usablePronounStack['3.SG.M.ACC'] = 'him, it';
        usablePronounStack['3.SG.F.ACC'] = 'her, it';
        usablePronounStack['3.SG.M.ERG'] = 'he, it';
        usablePronounStack['3.SG.F.ERG'] = 'she, it';
        usablePronounStack['3.SG.M.ABS'] = 'him, it';
        usablePronounStack['3.SG.F.ABS'] = 'her, it';
        usablePronounStack['3.SG.M.GEN'] = 'his, its';
        usablePronounStack['3.SG.F.GEN'] = 'hers, its';
        usablePronounStack['3.SG.M.DAT'] = 'to him, at it';
        usablePronounStack['3.SG.F.DAT'] = 'to her, at it';
        usablePronounStack['3.SG.M.LOC'] = 'at him, at it';
        usablePronounStack['3.SG.F.LOC'] = 'at her, at it';
        usablePronounStack['3.SG.M.ABL'] = 'from him, from it';
        usablePronounStack['3.SG.F.ABL'] = 'from her, from it';
        usablePronounStack['3.SG.M.INS'] = 'with/using him/it';
        usablePronounStack['3.SG.F.INS'] = 'with/using her/it';
      }
    } else {
      pronNumGenderHeadings.push('3rd PLural');
      possessiveDeterminers.push('3rd PLural');
      if (pronNumGenderHeadings.includes('3rd SinGular Masc') && !pronNumGenderHeadings.includes('3rd SinGular NeuTer')) {
        usablePronounStack['3.SG.M'] = 'he, him, his, it, its';
        usablePronounStack['3.SG.F'] = 'she, her, hers, it, its';
        usablePronounStack['3.SG.M.NOM'] = 'he, it';
        usablePronounStack['3.SG.F.NOM'] = 'she, it';
        usablePronounStack['3.SG.M.ACC'] = 'him, it';
        usablePronounStack['3.SG.F.ACC'] = 'her, it';
        usablePronounStack['3.SG.M.ERG'] = 'he, it';
        usablePronounStack['3.SG.F.ERG'] = 'she, it';
        usablePronounStack['3.SG.M.ABS'] = 'him, it';
        usablePronounStack['3.SG.F.ABS'] = 'her, it';
        usablePronounStack['3.SG.M.GEN'] = 'his, its';
        usablePronounStack['3.SG.F.GEN'] = 'hers, its';
        usablePronounStack['3.SG.M.DAT'] = 'to him, at it';
        usablePronounStack['3.SG.F.DAT'] = 'to her, at it';
        usablePronounStack['3.SG.M.LOC'] = 'at him, at it';
        usablePronounStack['3.SG.F.LOC'] = 'at her, at it';
        usablePronounStack['3.SG.M.ABL'] = 'from him, from it';
        usablePronounStack['3.SG.F.ABL'] = 'from her, from it';
        usablePronounStack['3.SG.M.INS'] = 'with/using him/it';
        usablePronounStack['3.SG.F.INS'] = 'with/using her/it';
      }
    }

    pronounHeadings.push(pronNumGenderHeadings);

    if (pronounCaseHeadings.length)
      pronounHeadings.push(pronounCaseHeadings);

    let PronounTab = codeBlockTable('word', pronounHeadings, 'pron', undefined, false, usablePronounStack);
    pronounSection = pronounSection.concat(PronounTab);

    let possDetStack2 = {
      '1.SG': 'I'
      , '1.SG.M': 'I (masc)'
      , '1.SG.F': 'I (fem)'
      , '2.SG': 'you'
      , '2.SG.M': 'you (masc)'
      , '2.SG.F': 'you (fem)'
      , '3.SG': 'he'
      , '3.SG.M': 'he'
      , '3.SG.F': 'she'
      , '3.SG.NT': 'it'
      , '1.PL': 'we'
      , '1.PL.M': 'we (masc)'
      , '1.PL.F': 'we (fem)'
      , '1.PL.INCL': 'we (including you)'
      , '1.PL.EXCL': 'we (excluding you)'
      , '2.PL': 'you all'
      , '2.PL.M': 'you all (masc)'
      , '2.PL.F': 'you all (fem)'
      , '3.PL': 'they'
      , '3.PL.M': 'they (masc)'
      , '3.PL.F': 'they (fem)'
      , '3.PL.NT': 'they (neut)'
      ,
    }

    if (pronounCaseHeadings.includes('GENitive')) {
      possDetStack2 = {
        '1.SG': 'mine'
        , '1.SG.M': 'mine (masc)'
        , '1.SG.F': 'mine (fem)'
        , '2.SG': 'yours'
        , '2.SG.M': 'yours (masc)'
        , '2.SG.F': 'yours (fem)'
        , '3.SG': 'his'
        , '3.SG.M': 'his'
        , '3.SG.F': 'hers'
        , '3.SG.NT': 'its'
        , '1.PL': 'ours'
        , '1.PL.M': 'ours (masc)'
        , '1.PL.F': 'ours (fem)'
        , '1.PL.INCL': 'ours (including you)'
        , '1.PL.EXCL': 'ours (excluding you)'
        , '2.PL': 'yours (pl)'
        , '2.PL.M': 'yours (pl masc)'
        , '2.PL.F': 'yours (pl fem)'
        , '3.PL': 'theirs'
        , '3.PL.M': 'theirs (masc)'
        , '3.PL.F': 'theirs (fem)'
        , '3.PL.NT': 'theirs (neut)'
        ,
      }
    }

    if (rand() > 0.5)
      possDetStack2 = undefined;

    let possessiveTab = codeBlockTable('word', [possessiveDeterminers], 'det', undefined, false, usablePossDetStack, possDetStack2);
    possessiveSection = possessiveSection.concat(possessiveTab);

    // **************** Verbs
    let verbHeadings = [];
    let verbSection = [{
      insert: '---\n'
    }, {
      insert: 'Verbs'
    }, {
      attributes: {
        header: 2
      }
      , insert: '\n'
    }];
    let tenseHeadings = [];

    let pastNess = rand();
    let pastExplanation = [];
    if (pastNess < 0.4) {
      tenseHeadings.push('PReSent', 'PaST');
    } else if (pastNess < 0.8) {
      tenseHeadings.push('PReSent', 'PaST', 'REMote past');
    } else {
      let pastTable = codeBlockTable('affixword', [
        ['PaST']
      ], 'v', 'learn', false, {
        'PST': 'learned'
      });
      pastExplanation.push({
        insert: '{{Langname}} uses a standalone particle word for past tense:\n'
      });
      pastExplanation = pastExplanation.concat(pastTable);
    }

    let futreExplanation = [];
    if (rand() > 0.5) {
      tenseHeadings.push('FUTure');
    } else {
      let futureTable = codeBlockTable('affixword', [
        ['FUTure']
      ], 'v', 'learn', false, {
        'FUT': 'will learn'
      });
      futreExplanation.push({
        insert: '{{Langname}} uses a standalone particle word for future tense:\n'
      });
      futreExplanation = futreExplanation.concat(futureTable);
    }

    if (tenseHeadings.length)
      verbHeadings.push(tenseHeadings);

    let typeofPronoun = rand();

    let nonTenseAxis;
    if (typeofPronoun < 0.2) {
      nonTenseAxis = [...pronNumGenderHeadings];
      if (!genderLables.includes('Masculine') && sing_pronouns_without_gender) {
        // remove 3rd SinGular Masc and 3rd SinGular Fem
        nonTenseAxis[nonTenseAxis.indexOf('3rd SinGular Masc')] = '3rd SinGular';
        nonTenseAxis.splice(nonTenseAxis.indexOf('3rd SinGular Fem'), 1);
      }
      verbHeadings.push(nonTenseAxis);
    } else if (typeofPronoun < 0.3) {
      nonTenseAxis = ['1st person', '2nd person', '3rd person'];
      verbHeadings.push(nonTenseAxis);
    } else if (typeofPronoun < 0.4) {
      nonTenseAxis = ['SinGular', 'PLural'];
      verbHeadings.push(nonTenseAxis);
    } else {
      nonTenseAxis = [];
    }

    let genderVerbs = '';
    if (genderLables.length && rand() < 0.2 && verbHeadings.length < 3) {
      genderVerbs = '\n\n<p>Verbs are conjugated depending on the gender of the doer of the verb.';
      verbHeadings.push(genderLables);
    }

    // IMPERFECT
    let imperfectiveTable;
    let imperfective = [{
      insert: '---\n'
    }];
    let imperfectiveProb = rand();
    if (imperfectiveProb < 0.3) {
      imperfective.push({
        attributes: {
          size: 'large'
        }
        , insert: 'Imperfective aspect\n\n'
      }, {
        insert: 'The ‘imperfective’ aspect refers to ongoing actions, such as '
      }, {
        attributes: {
          italic: true
        }
        , insert: 'I am learning'
      }, {
        insert: ' and habitual actions, such as '
      }, {
        attributes: {
          italic: true
        }
        , insert: 'I learn (something new every day)'
      }, {
        insert: '.\n\n'
      })
      if (rand() < 0.5) {
        imperfectiveTable = codeBlockTable('affix', [
          ['ImPerFectiVe']
        ], 'v', 'learn', false, {
          'IPFV': 'learns/is learning'
        });
        imperfective.push({
          insert: '{{Langname}} uses an affix for imperfective:\n'
        });
      } else {
        imperfectiveTable = codeBlockTable('affixword', [
          ['ImPerFectiVe']
        ], 'v', 'learn', false, {
          'IPFV': 'learns/is learning'
        });
        imperfective.push({
          insert: '{{Langname}} uses a standalone particle word for imperfective:\n'
        });
      }
      imperfective = imperfective.concat(imperfectiveTable);
    } else if (imperfectiveProb < 0.6) {
      imperfective.push({
        attributes: {
          size: 'large'
        }
        , insert: 'Progressive aspect\n\n'
      }, {
        insert: 'The ‘progressive’ aspect refers to actions that are happening at the time of speaking, such as '
      }, {
        attributes: {
          italic: true
        }
        , insert: 'I am learning'
      }, {
        insert: '.\n\n'
      });
      let progressiveTable;
      if (rand() < 0.5) {
        progressiveTable = codeBlockTable('affix', [
          ['PROGressive']
        ], 'v', 'learn', false, {
          'PROG': 'is learning'
        });
        imperfective.push({
          insert: '{{Langname}} uses an affix for progressive:\n'
        });
      } else {
        progressiveTable = codeBlockTable('affixword', [
          ['PROGressive']
        ], 'v', 'learn', false, {
          'PROG': 'is learning'
        });
        imperfective.push({
          insert: '{{Langname}} uses a standalone particle word for progressive:\n'
        });
      }
      imperfective = imperfective.concat(progressiveTable);

      imperfective.push({
        attributes: {
          size: 'large'
        }
        , insert: 'Habitual aspect\n\n'
      }, {
        insert: 'The ‘habitual’ aspect refers to actions that happen habitually, such as '
      }, {
        attributes: {
          italic: true
        }
        , insert: 'I learn (something new every day)'
      }, {
        insert: ', as opposed to actions that happen once ('
      }, {
        attributes: {
          italic: true
        }
        , insert: 'I learned something'
      }, {
        insert: ').\n\n'
      });
      let habitualTable;
      if (rand() < 0.5) {
        habitualTable = codeBlockTable('affix', [
          ['HABitual']
        ], 'v', 'learn', false, {
          'HAB': 'learns'
        });
        imperfective.push({
          insert: '{{Langname}} uses an affix for habitual:\n'
        });
      } else {
        habitualTable = codeBlockTable('affixword', [
          ['HABitual']
        ], 'v', 'learn', false, {
          'HAB': 'learns'
        });
        imperfective.push({
          insert: '{{Langname}} uses a standalone particle word for habitual:\n'
        });
      }
      imperfective = imperfective.concat(habitualTable);

    } else {
      imperfective = [];
    }

    // PERFECT
    let perfectRand = rand();
    let perfect = [{
      insert: '---\n'
    }, {
      attributes: {
        size: 'large'
      }
      , insert: 'Perfect aspect\n\n'
    }];
    let perfectTable = [];
    let perfectExpained = 'The perfect aspect in English is exemplified in ‘I have read this book’, which expresses an event that took place before the time spoken but which has an effect on or is in some way still relevant to the present.\n\n';
    if (perfectRand < 0.5) {
      perfect = []
    } else if (perfectRand < 0.9) {
      perfectTable = codeBlockTable('affix', [
        ['PeRFect']
      ], 'v', 'learn', false, {
        'PRF': 'have learned'
      });
      perfect.push({
        insert: perfectExpained
      }, {
        insert: '{{Langname}} uses an affix for the perfect aspect:\n'
      });
    } else if (perfectRand < 0.95) {
      perfect.push({
        insert: perfectExpained
      }, {
        insert: '{{Langname}} uses the word for ‘already’ {{already}} for the perfect aspect.\n'
      });
    } else {
      perfect.push({
        insert: perfectExpained
      }, {
        insert: '{{Langname}} uses the word for ‘finish’ {{finish}} for the perfect aspect.\n'
      });
    }
    perfect = perfect.concat(perfectTable);

    let verbMorph = codeBlockTable('affix', verbHeadings, 'v', 'learn', true, verbStack);
    verbSection = verbSection.concat(verbMorph, pastExplanation, futreExplanation);

    randomDelta = nounSection.concat(articleSection, pronounSection, possessiveSection, verbSection, imperfective, perfect);
  } else {
    // grammarEditor.checked
    randomDelta = quill.getContents().ops;
  }

  concreteDelta = [];

  let customUniqueForms = [];
  let uniqueForms = [];
  let codeblock = false;
  let pos;
  let isAffix;
  let isWord;
  let tableAffixType;
  const eqRandom = /= *-?(Random|RANDOM)-? *$/;

  for (let x of randomDelta) {
    // loop through to find custom words/affixes first, for later deduplication purposes
    if (deltaCheckForAffixTag.test(x.insert) && !eqRandom.test(x.insert)) {
      let rightSide = x.insert.slice(x.insert.indexOf('=') + 1).trim();
      customUniqueForms.push(rightSide);
    }
  }

  for (let x of randomDelta) {
    if (x.insert) {
      if (/TABLE *TYPE *= *suffix/i.test(x.insert)) {
        uniqueForms = [...customUniqueForms];
        tableAffixType = 'suffix';
        isAffix = true;
        isWord = false;
      } else if (/TABLE *TYPE *= *prefix/i.test(x.insert)) {
        uniqueForms = [...customUniqueForms];
        tableAffixType = 'prefix';
        isAffix = true;
        isWord = false;
      } else if (/TABLE *TYPE *= *affixword/i.test(x.insert)) {
        uniqueForms = [...customUniqueForms];
        isWord = true;
        isAffix = true;
        x.insert = 'TABLE TYPE = affix';
      } else if (/TABLE *TYPE *= *affix/i.test(x.insert)) {
        uniqueForms = [...customUniqueForms];
        tableAffixType = 'affix';
        isAffix = true;
        isWord = false;
      } else if (/TABLE *TYPE *= *word/i.test(x.insert)) {
        uniqueForms = [...customUniqueForms];
        tableAffixType = 'word';
        pos = undefined;
        isWord = true;
        isAffix = false;
      } else if (x.insert.search('^ *part-of-speech *=') > -1) {
        // fix - what scenario is this?
        pos = x.insert.split(/ *= */)[1];
      }
      if (x.attributes) {
        codeblock = (x.attributes['code-block']) ? true : false;
      }

      if (codeblock) {
        x.insert = x.insert.replaceAll(' ', ' ');
        // replace non-breaking space // to update
        if (/= *-?random-? *$/.test(x.insert)) {
          warnings += `<li><b>${x.insert}</b> literally produces "random". For a random word/affix, write <b>= Random</b> with capital R</li>`;
        }
        if (eqRandom.test(x.insert)) {
          if (isAffix && isWord) {
            // is affixword
            let particle;
            let Counter = 0;
            do {
              particle = legalShortWord(pos);
              Counter++;
            } while (uniqueForms.includes(particle) && Counter < abortLimit);
            uniqueForms.push(particle);
            x = {
              insert: x.insert.replace(eqRandom, '= ' + particle + ' -')
            };
          } else if (isAffix) {
            let Counter = 0;
            let randRule;
            let superLocalAffix = tableAffixType || globalAffix;

            if (/-(Random|RANDOM)/.test(x.insert)) {
              superLocalAffix = 'suffix';
            } else if (/(Random|RANDOM)-/.test(x.insert)) {
              superLocalAffix = 'prefix';
            }

            do {
              randRule = randomAffix(superLocalAffix);
              Counter++;
            } while (uniqueForms.includes(randRule) && Counter < abortLimit);
            uniqueForms.push(randRule);
            if (!isSelected.advancedWordStructure && rand() < 0.4 && /^(PL|INDEF|CONT|PRF) /.test(x.insert)) {
              // reduplication
              let partial = '#(C)*V > __';
              if (superLocalAffix == 'suffix') {
                partial = '#(C)*V > __';
              } else if (superLocalAffix == 'prefix') {
                partial = 'V(C)*# > __';
              } else if (globalAffix == 'suffix') {
                partial = '#(C)*V > __';
              } else if (globalAffix == 'prefix') {
                partial = 'V(C)*# > __';
              } else {
                partial = rand() < 0.5 ? 'V(C)*# > __' : '#(C)*V > __';
              }

              let redup = rand() < 0.2 ? 'X* > __' : partial;
              // fix - may choose full reduplication when user wants a suffix/prefix

              x = {
                insert: x.insert.replace(eqRandom, '= ' + redup)
              };
            } else {
              // no reduplication
              x = {
                insert: x.insert.replace(eqRandom, '= ' + randRule)
              };
            }
          } else if (isWord) {
            let particle;
            let Counter = 0;
            do {
              particle = legalShortWord(pos);
              Counter++;
            } while (uniqueForms.includes(particle) && Counter < abortLimit);
            uniqueForms.push(particle);
            x = {
              insert: x.insert.replace(eqRandom, '= ' + particle)
            };
          }
        } else if (deltaCheckForAffixTag.test(x.insert)) {
          // not = Random
          let rightSide = x.insert.slice(x.insert.indexOf('=') + 1).trim();
          if (!rightSide.includes('-') && !rightSide.includes('>') && !rightSide.includes('<')) {
            let leftSide = x.insert.slice(0, x.insert.indexOf('=')).trim();
            if (tableAffixType == 'prefix') {
              x = {
                insert: leftSide + ' = ' + rightSide + '-'
              };
            } else if (tableAffixType == 'suffix') {
              x = {
                insert: leftSide + ' = -' + rightSide
              };
            }
          }
          uniqueForms.push(rightSide);
        }
      }
    }
    concreteDelta.push(x);
  }

  let grammarSecton = new QuillDeltaToHtmlConverter(concreteDelta, {}).convert().replace('<pre>Consonant table</pre>', consonantTable.replaceAll('\n', '')).replace('<pre>Vowel table</pre>', vowelTable.replaceAll('\n', '')).replace('<pre>Phonological rules</pre>', soundChangeList) // historical
    .replace('<pre>Sound change list</pre>', soundChangeList).replace('<pre>Spelling table</pre>', displaySpelling.replaceAll('\n', ''));

  ////
  tabledWords = [];

  let grammarTables = function (freeformGrammar) {
    let htmlTables = [];
    let matchedTables = capture(freeformGrammar, /<pre>.*?<\/pre>/gs);

    //let freeCount = true;

    for (let matchedTable of matchedTables) {
      matchedTable = matchedTable.slice(5, -6) // <pre>, </pre>
        .trim();

      let tableType, localAffix;
      if (/^TABLE *TYPE *= *affix/.test(matchedTable)) {
        tableType = 'affix';
        localAffix = 'affix';
      } else if (/^TABLE *TYPE *= *word/.test(matchedTable)) {
        tableType = 'word';
      } else if (/^TABLE *TYPE *= *suffix/.test(matchedTable)) {
        tableType = 'suffix';
        localAffix = 'suffix';
      } else if (/^TABLE *TYPE *= *prefix/.test(matchedTable)) {
        tableType = 'prefix';
        localAffix = 'prefix';
      } else {
        if (matchedTable.includes('|')) {
          // markdown table
          let converter = new showdown.Converter({
            tables: true
          });
          let table = converter.makeHtml(matchedTable).replace('<table>', '<table class="markdown-table">').replaceAll('&nbsp;', '');
          htmlTables.push(table);
          continue;
        }

        // gloss
        matchedTable = matchedTable.trim().split(/\n+/);
        if (matchedTable.length < 2)
          continue;
        let trans = '<tr><td class="vl__unpad">' + matchedTable[0].replace(/ |\t/g, '</td><td class="vl__unpad">') + '</td></tr>';
        let remainingLines = [];
        for (let i = 1; i < matchedTable.length; i++) {
          let line = (matchedTable.length > 2 && i == matchedTable.length - 1) ? '<tr><td class="vl__unpad" colspan="' + matchedTable[0].length + '">“' + matchedTable[i] + '”</td></tr>' : '<tr><td class="vl__unpad">' + matchedTable[i].replace(/ |\t/g, '</td><td class="vl__unpad">') + '</td></tr>';
          remainingLines.push(line);
        }

        htmlTables.push('<table class="table-no-border vl__gloss-table">' + trans + remainingLines.join('') + '</table>')
        continue;
      }
      //if (!isSelected.grammarCheck || freeCount && isSelected.grammarCheck) { //xxx
      matchedTable = matchedTable.replaceAll('&gt;', '>').replaceAll('&lt;&lt;', '<<') //.replaceAll('(?&lt;', '(?<') // fix - is this necessary anymore since users dont in upt regex?
        .replaceAll('&#x2F;', '/').replaceAll('&nbsp;', '');
      matchedTable = arrows(matchedTable);
      let gotAffixes = matchedTable.split(/(example-word|part-of-speech).*/i);
      gotAffixes = gotAffixes[gotAffixes.length - 1];
      gotAffixes = getAffixesFromInput(gotAffixes, 'tables');

      let cols = getAxis(matchedTable, /cols *=(.*)/i);
      let rows = getAxis(matchedTable, /rows *=(.*)/i);
      let blocks = getAxis(matchedTable, /blocks *=(.*)/i);
      if (blocks.length == 0)
        blocks = [''];

      let irregulars = matchedTable.match(/irregulars? *=(.*)/i)?.[1].trim().split(/ *, */);

      let exampleWords = {};

      let exampleWordsMatch = capture(matchedTable, /example-word *([\p{L}\d][.\p{L}\d]*)? *=.*/gu);
      for (let example of exampleWordsMatch) {
        example = example.replace(/example-word */i, '').split(/ *= */);
        if (example[0] == '') {
          exampleWords['default'] = example[1].trim();
        } else {
          exampleWords[example[0]] = example[1].trim();
        }
      }

      let POSes = matchedTable.match(/part-of-speech *=(.*)/i);

      if (!POSes && tableType == 'word') {
        warnings += '<li>No part-of-speech given for Word Table. Table was not generated.</li>';
        // fix - don't we allow words with no POS?
        continue;
      } else {
        POSes = POSes[1].trim().split(/ *, */g)
      }

      let firstPOS = true;
      for (pos of POSes) {
        // new 10.8.4

        let categtories = (blocks.length == 1 && blocks[0] == '') ? [cols, rows] : [cols, rows, blocks];
        let categtoriesOldOrder = [...categtories];

        let shiftRows = 1;
        let shiftCols = 1;
        if (!cols.length) {
          cols = [''];
          shiftRows = 0;
        }
        if (!rows.length) {
          rows = [''];
          shiftCols = 0;
        }

        let tableBlock = [];
        for (let block of blocks) {

          let upperB = block.match(rg_upperTag);
          upperB = (upperB) ? upperB.join('').replace(/ +/g, '.').replace(/^\.+|\.+$/g, '') : upperB;
          let blockHeading = block ? '<h3>' + sentenceCase(block.toLowerCase()) + '</h3>\n' : '';
          let table = blockHeading + '<table>';

          for (let i = 0; i < rows.length + shiftRows; i++) {
            let tr = '<tr>';
            if (i == 0 && shiftRows == 1) {
              // add top row, if cols exist
              for (let j = 0; j < cols.length + shiftCols; j++) {
                if (j == 0 && shiftCols == 1) {
                  tr += '\t<th></th>';
                } else {
                  tr += '\t<th>' + sentenceCase(cols[j - shiftCols].toLowerCase()) + '</th>';
                }
              }
              tr += '</tr>';
            } else {
              for (let j = 0; j < cols.length + shiftCols; j++) {
                if (j == 0 && shiftCols == 1) {
                  // header stuff -- put in first col and shift
                  tr += '\t<td><b>' + sentenceCase(rows[i - shiftRows].toLowerCase()) + '</b></td>';
                } else {
                  // non-header stuff -- where the magic happens
                  let upperR = rows[i - shiftRows].match(rg_upperTag);
                  upperR = (upperR) ? upperR.join('').replace(/ +/g, '.').replace(/^\.+|\.+$/g, '') : rows[i - shiftRows];
                  let name, upperC;

                  if (rows.length == 0) {
                    name = upperR;
                  } else {
                    upperC = cols[j - shiftCols].match(rg_upperTag)?.join('').replace(/ +/g, '.').replace(/^\.+|\.+$/g, '') || cols[j - shiftCols];

                    let reconstructOrder = [];
                    // fix does this even do anything anymore?

                    categtoriesOldOrder.forEach(function (element) {
                      if (element.includes(rows[i - shiftRows])) {
                        reconstructOrder[categtoriesOldOrder.indexOf(element)] = upperR;
                      }
                    });

                    categtoriesOldOrder.forEach(function (element) {
                      if (element.includes(cols[j - shiftCols])) {
                        reconstructOrder[categtoriesOldOrder.indexOf(element)] = upperC;
                      }
                    });

                    categtoriesOldOrder.forEach(function (element) {
                      if (element.includes(block)) {
                        reconstructOrder[categtoriesOldOrder.indexOf(element)] = upperB;
                      }
                    });

                    name = reconstructOrder.join('.');
                    name = name.replace(/^\.|\.\.|\.$/g, '');
                    // fix - this is a hack
                  }

                  let posPrefix = (pos) ? ':' + pos.toUpperCase() : '';

                  if (['affix', 'suffix', 'prefix'].includes(tableType)) {
                    // TABLE TYPE = affix

                    let translatesTo = '';
                    name = name.toUpperCase();
                    let nameAndPOS = name + posPrefix;
                    let found = false;

                    for (let line of gotAffixes) {
                      line = line.trim().normalize('NFC');
                      // is NFD'd during buildMorph
                      translatesTo = line.match(/~.*?=/)?.[0].slice(1, -1) || '';
                      // trim later
                      if (line.search('^' + name + ' *[~=]') > -1) {
                        // positive match
                        found = true;
                        let fullRule = line.replace(name, nameAndPOS);
                        translatesTo = translatesTo.trim();
                        validateRule(fullRule, 'Affix table', irregulars);
                        break;
                        // do not read the rest of the lines -- fix - do we need this?
                      }
                    }

                    if (found) {
                      //warnings += '<li>Affix table error: no affix information found for <b>' + nameAndPOS + '</b></li>';
                      //buildMorphRule(nameAndPOS + ' = ' + randomAffix(localAffix), irregulars);
                      translatesTo = translatesTo ? '<div class="vl__translates-to">' + translatesTo + '</div>' : '';

                      let exampleWord = '';
                      if (upperR && exampleWords[upperR])
                        exampleWord = exampleWords[upperR];
                      if (upperC && exampleWords[upperC])
                        exampleWord = exampleWords[upperC];
                      if (upperB && exampleWords[upperB])
                        exampleWord = exampleWords[upperB];
                      if (exampleWords[name])
                        exampleWord = exampleWords[name];
                      if (exampleWord == '')
                        exampleWord = exampleWords['default'];
                      let irregularTag = irregulars ? irregulars[0].replace(/[ˈˌ]/g, '') + '-' : '';

                      let exampleBlock = (exampleWord == '') // if still no example word
                        ?
                        '' : doubleBrackets('<br>‹‹' + exampleWord + '-' + nameAndPOS + '››').replace(/<br>‹‹.*?››/, '');
                      translatesTo = (exampleBlock == '') ? '' : translatesTo;
                      tr += '\t<td>' + morphReader(morphRules[irregularTag + nameAndPOS]['english'], pos) + exampleBlock + translatesTo + '</td>';
                    } else {
                      warnings += '<li>Affix table error: no affix information found for <b>' + nameAndPOS + '</b></li>';
                      tr += '\t<td style="background: #f2f2f2"></td>';
                    }

                  } else {
                    // TABLE TYPE = word
                    let translationForThisWord = '';
                    let particle;
                    let regPOSprefix = name + '(:' + pos.toUpperCase() + ')?';
                    // :POS optional because of legacy versions

                    if (matchedTable.search('\\s' + regPOSprefix + ' *[~=]') > -1) {
                      // NAME.TAG = word is defined in code block
                      let matchedLine = new RegExp('\n' + regPOSprefix + ' *~?.*=.*');
                      particle = matchedTable.match(matchedLine);
                      // \s and uppercase pos

                      if (particle && particle[0].includes('~') && particle[0].includes('=')) {
                        // new 10.8.5
                        translationForThisWord = particle[0].slice(particle[0].indexOf('~') + 1, particle[0].indexOf('=')).trim();
                      }

                      let irregularSpelling = false;
                      // new 10.8.5
                      if (particle) {
                        particle = particle[0].split('=')[1].trim();
                        irregularSpelling = particle.match(/ *(&lt;|<).*[>→]$/)?.[0].replace(/<|>|&lt;|→/g, '').trim();
                        if (irregularSpelling) {
                          // new 10.8.5
                          hasIrregularSeplling = true;
                          particle = particle.replace(/ *(&lt;|<).*[>→]$/, '');
                          particle = doubleBrackets(particle, 'IPA');
                          particle = cleanIPA(particle.toLowerCase());
                          irrSpellRules[translationForThisWord + ':' + pos.replace(':', '')] = irregularSpelling;
                        } else {
                          particle = doubleBrackets(particle, 'IPA');
                          particle = cleanIPA(particle.toLowerCase());
                        }
                      }

                      let builtEntry = multiEntry(particle);
                      if (irregularSpelling) {
                        // new 10.8.5
                        builtEntry = builtEntry.replace(/<s1>.*?(?= <s2>|<\/s1>)/, '<s1>' + irregularSpelling);
                      }
                      let definition = name;
                      // fix - arent translationForThisWord and definition the same thing?
                      grammarWords[name + ':' + pos.toUpperCase()] = particle;
                      // fix - this will cause inconsistent stress!
                      if (translationForThisWord) {
                        definition = translationForThisWord;
                      }

                      tabledWords.push(translationForThisWord + ' : ' + pos + ' = ' + particle);
                      // fix - pushes untransformed particles
                      tr += '\t<td>' + builtEntry + '<div class="vl__translates-to">' + translationForThisWord + '</div></td>';
                      finalDictionary.push(builtEntry + '<e><ps>' + pos + '.</ps> ' + definition + '</e>');
                      underlyingIPA.push(builtEntry + '<e><ps>' + pos + '.</ps> ' + definition + '</e>');
                    } else {
                      // NAME.TAG = word is missing from code block
                      warnings += '<li>Word table error: no word information found for <b>' + name + '</b></li>';
                      tr += '\t<td style="background: #f2f2f2"></td>';
                    }
                  }
                }
              }
              tr += '</tr>';
            }
            table += tr;
          }
          table += '</table>';
          tableBlock.push(table);
        }
        if (firstPOS)
          htmlTables.push(tableBlock.join('\n\n'));
        firstPOS = false;
      }
      //freeCount = false} //xxx
    }

    for (let i = 0; i < matchedTables.length; i++) {
      if (htmlTables[i] == undefined) {
        // made undefined by freeCount
        htmlTables[i] = (lec == 'd') ? 'You can only create one grammar table in the Demo version. <a href="buy" target="_blank" rel="noopener">Sign up</a> to create more!' : '';
      }
      freeformGrammar = freeformGrammar.replace(matchedTables[i], htmlTables[i]);
    }

    freeformGrammar = freeformGrammar.replace(/(--|—)[\-—]+/g, '</div><div class="vl__grammar-block">').replaceAll('<p><h3></h3>', '').replace(/<\/h3>\s*<br>/g, '</h3>').replace(/<\/h2>\s*<br>/g, '</h2>').replaceAll('<div class="vl__grammar-block"><br>', '<div class="vl__grammar-block">').replace('<h2>Noun</h2><p></div><div class="vl__grammar-block">', '').replace(/{{Langname}}/gi, anglicizedName);

    return '<div class="vl__grammar-block">' + freeformGrammar + '</div>';
  }

  ////

  grammarSecton = grammarTables(grammarSecton);

  derivsForEdit = [];

  for (let derivation of allderivs) {
    // do allderivs
    let compoundingPart = derivation[0];
    let newWord = derivation[1];
    let givenPOS = derivation[2];

    let doubleWord = false;
    if (givenPOS.endsWith('+')) {
      // if +=
      givenPOS = givenPOS.replace(/ *\+$/, '');
      doubleWord = true;
    }

    let compound = compoundWord(compoundingPart);

    if (!compound) {
      if (derivation[3]) {
        // if custom added
        warnings += `<li>Derived word <b>${newWord} : ${derivation[2]} = ${compoundingPart}</b> was not generated because one of the root words was not found in the dictionary. <a href="derived-words-error" target="_blank" rel="noopener">Learn about this error</a></li>`;
      }
      continue;
    } else {
      if (!/\b(AF|SUF|PRE)FIX\b/.test(compoundingPart)) {
        derivsForEdit.push([newWord, derivation[2] /*original POS*/
          , compoundingPart
        ]);
      }
    }
    if (givenPOS == 'root') {
      boundRoots[newWord] = compound;
      continue;
    }
    let genderedPoS;
    if (givenPOS == 'n') {
      let getGendered = chooseNounGender(newWord + ':' + givenPOS);
      genderedPoS = getGendered.split(':')[1];
      newWord = getGendered.split(':')[0];
    } else {
      genderedPoS = givenPOS;
    }
    let posSearch = (hasGenders && givenPOS[0] == 'n' && givenPOS != 'num') ? givenPOS[0] + '\\p{Ll}+\\.<' : genderedPoS + '\\.<';
    posSearch = new RegExp(posSearch, 'u');
    let entryLine = multiEntry(compound) + '<e><ps>' + genderedPoS + '.</ps> ' + newWord + '</e>';

    if (!doubleWord) {
      // remove frist duplicate from dicitonary
      for (let i = 0; i < finalDictionary.length; i++) {
        if (finalDictionary[i].includes(newWord)) {
          // search includes first because RegEx is too slow
          if (finalDictionary[i].search(' ' + newWord.replace(/[()]/g, '\\$&') + '[<,]') > -1 && posSearch.test(finalDictionary[i])) {
            // now search RegEx and givenPOS
            finalDictionary[i] = finalDictionary[i].replace(newWord, '').replace(' , ', ' ').replace(', <', '<');
            underlyingIPA[i] = finalDictionary[i].replace(newWord, '').replace(' , ', ' ').replace(', <', '<');
            if (finalDictionary[i].includes('</ps> </e>')) {
              finalDictionary.splice(i, 1);
              underlyingIPA.splice(i, 1);
            }
            break;
            // will not remove subsequent duplicates?
          }
        }
      }
      finalDictionary.push(entryLine);
      underlyingIPA.push(entryLine);

    } else {
      // not doubleword, just push to dictionary
      finalDictionary.push(entryLine);
      underlyingIPA.push(entryLine);
    }
  }

  //Numbers
  let numberSystem = '<h2>Numbers</h2>';
  let removeSpelling = isChecked('removeAllSpelling');

  if (numberBase == '20') {
    // base 20 // new 10.8.5_2
    numberSystem += `<p>${anglicizedName} has a base-20 number system:</p><p>1 - {{one:num}}<br>2 - {{two}}<br>3 - {{three}}<br>4 - {{four}}<br>5 - {{five}}<br>6 - {{six}}<br>7 - {{seven}}<br>8 - {{eight}}<br>9 - {{nine}}<br>10 - {{ten}}<br>11 - {{eleven}}<br>12 - {{twelve}}<br>13 - {{thirteen}}<br>14 - {{fourteen}}<br>15 - {{fifteen}}<br>16 - {{sixteen}}<br>17 - {{seventeen}}<br>18 - {{eighteen}}<br>19 - {{nineteen}}<br>20 - {{twenty}}<br>(Four) hundred - {{hundred}}<br>(Eight) thousand - {{thousand}}`;
  } else {
    // base 10
    numberSystem += `<p>${anglicizedName} has a base-10 number system:</p><p>1 - {{one:num}}<br>2 - {{two}}<br>3 - {{three}}<br>4 - {{four}}<br>5 - {{five}}<br>6 - {{six}}<br>7 - {{seven}}<br>8 - {{eight}}<br>9 - {{nine}}<br>10 - {{ten}}<br>Hundred - {{hundred}}<br>Thousand - {{thousand}}`;
  }
  numberSystem = (document.getElementById('displayNumbers').checked && removeSpelling == false) ? '<div class="vl__grammar-block">' + doubleBrackets(numberSystem) + '</p></div>' : '';

  grammarSecton = doubleBrackets(grammarSecton);
  // fix - is this supposed to be after allderivs ?

  /*************************
   Example sentence
   *************************/
  let exampleSentenceConlang = '';
  let exampleSentenceEnglish = '';

  let and = pullWord('and');
  let he = pullWord('he');
  let stand = pullWord('stand:v');
  let hold = pullWord('hold:v');
  let hat = pullWord('hat');
  let turn = pullWord('turn:v');
  let wet = pullWord('wet');
  let face = pullWord('face:n');
  let wind = pullWord('wind:n');
  let to = pullWord('to, towards');
  let his = pullWord('his:det');
  let him = pullWord('him');
  let hishat, hiswetface, hishate, hiswetfacee;

  if (modifierOrder == 'before') {
    if (his == undefined) {
      if (him == undefined)
        him = he;
      let ovv = pullWord('of');
      hishat = hat + ' ' + ovv + ' ' + him;
      hiswetface = wet + ' ' + face + ' ' + ovv + ' ' + him;
    } else {
      hishat = his + ' ' + hat;
      hiswetface = his + ' ' + wet + ' ' + face;
    }
    hishate = 'his hat';
    hiswetfacee = 'his wet face';
  } else {
    if (his == undefined) {
      if (him == undefined)
        him = he;

      let ovv = pullWord('of');
      hishat = hat + ' ' + pullWord('of') + ' ' + him;
      hiswetface = face + ' ' + wet + ' ' + ovv + ' ' + him;
    } else {
      hishat = his + ' ' + hat;
      hiswetface = his + ' ' + face + ' ' + wet;
    }
    hishate = 'hat his';
    hiswetfacee = 'his face wet';
  }
  let tothewind, tothewinde;
  if (adposition == 'preposition') {
    tothewind = to + ' ' + wind;
    tothewinde = 'to the wind';
  } else {
    tothewind = wind + ' ' + to;
    tothewinde = 'the wind to';
  }

  let aux1 = senStr(constructit, '', hold, hishat, '');
  let aux1e = senStr(constructit, '', 'holding', hishate, '');
  let part1 = senStr(constructit, he, stand, '', aux1);
  let part1e = senStr(constructit, 'he', 'stood', '', aux1e);
  let part2 = senStr(constructit, '', turn, hiswetface, tothewind);
  let part2e = senStr(constructit, '', 'turned', hiswetfacee, tothewinde);

  let pulledSentence = and + ' ' + part1 + ' ' + and + ' ' + part2;
  exampleSentenceConlang = '<i>...and he stood holding his hat and turned his wet face to the wind...</i><br>' + multiEntry(pulledSentence.replace(/[ˈˌ]?un[ˈˌ]?de[ˈˌ]?fi[ˈˌ]?ned/g, ''));
  exampleSentenceConlang = exampleSentenceConlang.replace(' <ph>/', '<alt><br><b>Pronunciation</b>: <ph>/').replace('/ [', '/<br><b>Narrow pronunciation</b>: [');
  exampleSentenceEnglish = '<b>' + anglicizedName + ' word order</b>: and ' + part1e + ' and ' + part2e;

  /*************************
   Alphabet order
   *************************/

  finalDictionary = alphabetizeDictionary(finalDictionary);
  /*
(function() {
  let divided = [];
  let i = 0;
  let L = finalDictionary.length;

  while (i < L) {
    let E = finalDictionary[i];
    if (E.includes(' dog') || E.includes(' cat') || E.includes(' chase') || E.includes(' like') || E.includes(' big')) {
      divided.push(E);
    } else if (i % 9 == 0) {
      divided.push(E);
    }
    i++;
  }
  finalDictionary = [...divided];
})();
*/

  let hidePhonologySection = isChecked('hidePhonologySection');

  const preamble = hidePhonologySection ? '' : '<h1 class="vl__the-language-of">The Language of ' + anglicizedName + '</h1><h2><center> Natively known as: <span class="notoserif">' + nativelyKnownAs + '</span></center></h2>' + '<div class="vl__sample-sentence">' + exampleSentenceConlang + '<br>' + exampleSentenceEnglish + '</div>';

  const translatorDisplay = `<div class="vl__translator--container">
<button class="vl__button--big--center" id="displayText2" onclick="toggleDiv('togTrans', 'displayText2', 'Smart Translator', 'Hide Smart Translator'); setInput('toTranslate', storedTranslation); loadTranslator();">Smart Translator <img src='/images/translation.svg' style='padding-left:3px;width:20px;height:20px'></img></button>
  <div id="togTrans" style="display: none">
    <div class="vl__translator--note cabin-height">Note: Vulgar's Smart Translator can currently only translate particular kinds of sentences. If it can't translate the sentence, you can turn off the Smart Translation and manually attach the correct affixes to the words in the sentence. Use underscore to hook compound words, e.g. <b>show_up</b> for "show up" (as in "attend") and not "show" + "up". This is also required for different senses of a word: <b>letter_(of_an_alphabet)</b> vs <b>letter_(written_document)</b>.</div>
    <div class="pretty p-default">
    <input type="checkbox" id="manualTranslate" onchange="changeSmartTranslate();" ${uncheckSmartTranslate} />
    <div class="state p-danger">
    <label>Turn off Smart Translation</label>
    </div>
    </div>
    <div class="vl__translator--main">
    <p>Sentence:</p>
    <textarea class="" rows="5" type="textarea" name="in" id="toTranslate" spellcheck="false" onchange="storeTranslation();"></textarea>
    <p><button class="vl__button--small" id="doTranslateButton" onclick="doTrans()">Loading Smart Translator ...</button></p>
    <div id="unableToTranslate"></div>
    <p id="translated"></p>
    <div id ="otherTranslations"></div>
    <div id ="notFound"></div>
    </div>
    <div id="grammarButtonsDiv"></div>
  </div>
</div>
<div class="vl__generate-name" id="nameWord">
<button class="vl__button--small" onclick="generateName()">Generate character/place names</button>
<div class="vl__generate-name" id="generated-name"></div>
</div>`;

  const spellingAndPhonology = hidePhonologySection ? '' : '<h2 class="vl__red-h2">Spelling & Phonology</h2><div class="vl__grammar-block"><b>Consonant inventory</b>: <ph>' + displayConsonants.sort().join(' ') + '</ph><p><span style="color: #D80036;">Click IPA symbols for audio</span> <img src="/images/playb.svg" style="width:20px;height:20px"><p>' + consonantTable + '</div><div class="vl__grammar-block" id="vowels"><div id="vow-inv"><p><b>Vowel inventory</b>: <ph>' + displayVowels.sort().join(' ') + '</ph></div>' + diphthongsDisplay + toneDisplay + '<div id="bigvowtab"><br>' + vowelTable + '</div></div><div id="phon-other"><div class="vl__grammar-block"><b>Syllable structure</b>: ' + finsystruc + ` <a onclick="popup('generic-popup', message.syllableStructure)"><span class="vl__question">?</span></a><br><b>Stress pattern</b>: ` + stress + ` <a onclick="popup('generic-popup', message.stressPattern)"><span class="vl__question">?</span></a>` + //initialMidFinalInfo +
    '</div>' + soundChangeDiv + '<div class="vl__grammar-block"><div><div id="spelling_rules"><b>Spelling rules</b>:</div><div><p>' + displaySpelling + '</div></div></div></div></div><hr><div><h2 class="vl__red-h2">Grammar</h2><div id="main-word-order"><b>Main word order</b>: ' + spellOutWordOrder + '. “Mary opened the door with a key” turns into <ps>' + sentenceCase(sentence) + '</ps>.<br><b>Adjective order</b>: Adjectives are positioned ' + modifierOrder + ' the noun.<br><b>Adposition</b>: ' + adposition + `s <a onclick="popup('generic-popup', message.adposition)"><span class="vl__question">?</span></a></div><br>`;

  if (notEnoughWarning) {
    if (isSelected.advancedWordStructure) {
      warnings += message.notEnoughAWS;
    } else {
      warnings += message.notEnough;
    }
  }

  if (warnings) {
    setHTML('warnings-list', '<ul>' + warnings + '</ul>');
    popup('warnings-popup');
  }

  let finalHTML = '<div id="lang-name">' + preamble + translatorDisplay + `<div class="vl__seed"><button class="vl__button--small" onclick="editLanguage('edit')">Edit this language <img src="/images/pencil.svg" style="padding-left:3px;width:15px;height:15px"></button></div>` + '</div><div id="lang-phon">' + spellingAndPhonology + '<div class="vl__content-visible-grammar">' + grammarSecton + numberSystem + derivRulesInEnglish + '</div></div><div class="vl__dictionary-container"><h2 class="vl__red-h2">' + anglicizedName + ' - English Dictionary</h2><center><p>Key: <s1>spelling</s1> <ph>/pronunciation/</ph> <e><ps>part of speech.</ps> definition(s)<p>' + abbreviationsExplained + '</center></e><ul id="dictionaryList" class="vl__dictionary-list vl__dictionary-list--' + (finalDictionary.length < 2000 ? 'short' : 'long') + '"><li>' + finalDictionary.join('</li><li>') + '</li></ul></div>';

  if (isChecked('removeForwardslash')) {
    finalHTML = finalHTML.replace(/<ph> *\//g, '<ph>').replace(/\/ *<\/ph>/g, '</ph>').replace(/\/ \[/g, ' [');
  }

  if (removeSpelling)
    finalHTML = finalHTML.replace(/<s1>.*?<\/s1>/g, '');
  if (isChecked('removeTranslations'))
    finalHTML = finalHTML.replaceAll('<e>', '<e style="display:none">');
  // need to account for this in createJSON()

  /*for (let i of ['undefined', 'null', 'NaN', '{{']) { if (finalHTML.includes(i)) { console.log(i + ' DETECTED!!! ', finalHTML.slice(finalHTML.indexOf(i) - 10, i.length + finalHTML.indexOf(i) + 10)); } }*/

  setHTML('output-container', finalHTML);
  document.getElementById('output-container').style.display = 'block';
  window.scrollTo(0, document.getElementById('output-container').offsetTop);
  // scroll to top
}

/*********************************************************************************************************************************************************************
 main function end here
 **********************************************************************************************************************************************************************/

/**********************************
 Random seed functions and math functions
 ***********************************/

// various random functions are needed to make seed number produce consistent output. In various scenarios, random numbers need to split off from other random numbers in order to keep the path of the first line of random numbers consistent

function choice(x) {
  return x[Math.floor(rand() * x.length)];
}

function rand() {
  // main random function
  return Math.random();
}

function normalDistribution(mean, variance) {
  let V1, V2, S;
  do {
    let U1 = rand();
    let U2 = rand();
    V1 = 2 * U1 - 1;
    V2 = 2 * U2 - 1;
    S = V1 * V1 + V2 * V2;
  } while (S > 1);

  let X = Math.sqrt(-2 * Math.log(S) / S) * V1;
  X = mean + Math.sqrt(variance) * X;
  return X;
}

function AWSreplacer(match) {
  return choice(AWSclasses[match]);
}

function advancedWord(patterns, POS = 'default') {
  if (globalWordPatterns['n'] && hasGenders && !patterns[POS] && POS.startsWith('n') && POS != 'num') {
    POS = 'n';
  } else if (!patterns[POS]) {
    POS = 'default';
  }

  let pattern = choice(patterns[POS]);

  let word = '';
  for (let i = 0; i < pattern[1].length; i++) {
    if (rand() < pattern[1][i]) {
      // if less than 1 probability
      let phoneme = pattern[0][i];
      while (rg_AWS_classes.test(phoneme)) {
        phoneme = phoneme.replace(rg_AWS_classes, AWSreplacer);
      }
      word += phoneme;
    }
  }
  return word;
}

function word(POS) {
  if (!isSelected.advancedWordStructure) {
    let mids = function (harm) {
      let nucleus;
      if (!harmonyCheck) {
        nucleus = choice(vOnset);
      } else {
        nucleus = (harm < 0.5) ? choice(vOnset) : choice(vHarmOnset);
      }
      if (nucleus.length > 1)
        clusterNum += nucleus.length;
      if (rand() > midBlankProb) {
        let mid = choice(cMidd);
        clusterNum += mid.length;
        return mid + nucleus;
      } else {
        return nucleus;
      }
    }
    let onset = (rand() > onsetProb) ? choice(cOnset) : '';
    // choose main vowel
    clusterNum += onset.length;
    let mainVowel;
    let VH1OR2 = 0;
    // new 10.8.13
    if (!harmonyCheck) {
      mainVowel = choice(vOnset);
    } else {
      VH1OR2 = rand();
      // new 10.8.13
      mainVowel = (VH1OR2 < 0.5) ? choice(vOnset) : choice(vHarmOnset);
    }
    if (mainVowel.length > 1)
      clusterNum += mainVowel.length;
    // choose extra syllables
    let syllprob = rand();
    let extraSyllables;
    if (0.80 >= syllprob) {
      // 0.80 is singleSyllable
      extraSyllables = '';
    } else if (0.97 >= syllprob > 0.80) {
      // 0.97 is doubleSyllable
      extraSyllables = mids(VH1OR2);
    } else {
      // triple syllable
      extraSyllables = mids(VH1OR2) + mids(VH1OR2);
    }

    let coda = (rand() > codaProb) ? choice(cCoda) : '';
    clusterNum += coda.length;
    return onset + mainVowel + extraSyllables + coda;

  } else {
    return advancedWord(globalWordPatterns, POS);
  }
}

function countMillion() {
  if (countWords > 1000000) {
    notEnoughWarning = true;
  }
  countWords++;
}

function WORD(POS) {
  countMillion();
  let tryWord, r;
  do {
    r = rand();
    clusterNum = 0;
    tryWord = word(POS);
  } while (clusterNum > 4 && 2 / clusterNum < r);
  // when 3/clusterNum < r is true it goes again

  return tryWord;
}

function legalShortWord(POS) {
  // creates a legal 1 syllable word
  countMillion();
  let shortWord = function (POS) {
    if (!isSelected.advancedWordStructure) {
      let onset = (rand() > onsetProb) ? choice(cOnset) : '';

      let mainVowel;
      // choose main vowel
      if (!harmonyCheck) {
        mainVowel = choice(vOnset);
      } else {
        mainVowel = (rand() < 0.5) ? choice(vOnset) : choice(vHarmOnset);
      }

      let coda = (rand() > codaProb) ? choice(cCoda) : '';

      return onset + mainVowel + coda;
    } else {
      return advancedWord(globalWordPatterns, POS);
    }
  }
  while (true) {
    let word = shortWord(POS);
    if (illegalRules.every(rule => rule.test(word) == false) || countWords > 1000000) {
      return word;
    }
  }
}

/**********************
 Affix stuff
 ***********************/

function randomAffix(localAffix) {
  //let upperMatch = {}; // new 10.6.6
  let validAffix = function (randomStructure) {

    let affixTryer = function (structure) {
      if (isSelected.advancedWordStructure) {
        let advancedMorphology = function (patterns, POS = 'default') {
          if (!patterns[POS])
            POS = 'default';
          let pattern = choice(patterns[POS]);
          let word = '';
          for (let i = 0; i < pattern[1].length; i++) {
            if (rand() < pattern[1][i]) {
              // if less than 1 probability
              let phoneme = pattern[0][i];
              if (!/IF |^ELSE$|>|</.test(phoneme)) {
                while (rg_AWS_classes.test(phoneme)) {
                  phoneme = phoneme.replace(rg_AWS_classes, AWSreplacer);
                }
              }
              word += phoneme;
            }
          }
          return word.replaceAll('ELSE', ' ELSE ').replaceAll('IF ', ' IF ').replaceAll('THEN', ' THEN ');
        }
        return advancedMorphology(structure);
      }

      let finalTryer = '';
      for (let i of structure) {
        switch (i) {
          case 'V':
            finalTryer += choice(vOnset);
            break;
          case 'O':
            finalTryer += choice(cOnset);
            break;
          case 'M':
            finalTryer += choice(cMidd);
            break;
          case 'C':
            finalTryer += choice(cCoda);
            break;
          case 'H':
            finalTryer += choice(vHarmOnset);
            break;
          default:
            finalTryer += i;
        }
      }
      return finalTryer;
    }

    while (true) {
      countMillion();
      // fix - short term solution. Illegal combination #C and randomStructure = CV- bans everything and causes infinite loop
      let trythisAffix = affixTryer(randomStructure);
      if (illegalRules.every(rule => rule.test(trythisAffix) == false) || countWords > 1000000) {
        return trythisAffix;
      }
    }
  }

  if (isSelected.advancedWordStructure) {
    if (localAffix == 'suffix') {
      let suffixes = awsAffixes['default'].filter(a => a[0][0] == '-' || a[0].join('').includes('THEN -'));
      // remove prefixes // fix - what about 'ELSE -'
      suffixes = suffixes.length ? suffixes : awsAffixes['default'];
      // fallback if no suffixes
      return validAffix({
        'default': suffixes
      });
    } else if (localAffix == 'prefix') {
      let prefixes = awsAffixes['default'].filter(a => a[0][0] != '-' && !a[0].join('').includes('THEN -'));
      // remove suffixes
      prefixes = prefixes.length ? prefixes : awsAffixes['default'];
      // fallback if no prefixes
      return validAffix({
        'default': prefixes
      });
    }
    return validAffix(awsAffixes);
  }

  let s_or_p = rand();

  if (!harmonyCheck) {
    // new 10.8.15
    let structure = choice(['V', 'V', 'VC', 'VC', 'ifVC', 'ifVC', 'ifVC', 'ifVCV']);
    // if suffixing
    if (localAffix == 'suffix' || globalAffix == 'suffix' && localAffix != 'prefix' || !localAffix && globalAffix == 'either' && s_or_p > 0.3) {
      if (maxCoda > 0) {
        // if not (C)V language
        switch (structure) {
          case 'V':
            return validAffix('-V');
          case 'VC':
            return validAffix('-VC');
          case 'ifVC':
            let C = validAffix('C');
            return 'IF V# THEN -' + C + ' ELSE ' + validAffix('-V' + C);
          case 'ifVCV':
            let MV = validAffix('MV');
            return 'IF V# THEN -' + MV + ' ELSE ' + validAffix('-V' + MV);
        }
      } else {
        // if (C)V language
        return validAffix('-MV');
      }

    } else {
      // if prefixing
      if (maxCoda > 0) {
        // if not (C)V language
        switch (structure) {
          case 'V':
            return validAffix('V-');
          case 'VC':
            return validAffix('OV-');
          case 'ifVC':
            let O = validAffix('O');
            return 'IF #V THEN ' + O + '- ELSE ' + validAffix(O + 'V-');
          case 'ifVCV':
            let VM = validAffix('VM');
            return 'IF #V THEN ' + VM + '- ELSE ' + validAffix(VM + 'V-');
        }
      } else {
        // if (C)V language
        return validAffix('OV-');
      }
    }
  } else {
    // if harmonyCheck // new 10.8.15
    let structure = choice(['V', 'VC']);
    // if suffixing
    if (localAffix == 'suffix' || globalAffix == 'suffix' && localAffix != 'prefix' || !localAffix && globalAffix == 'either' && s_or_p > 0.3) {
      if (maxCoda > 0) {
        // if not (C)V language

        if (structure == 'V') {
          return 'IF ' + uniqueToSecondGroup + ' THEN ' + validAffix('-H') + ' ELSE ' + validAffix('-V');
        } else if (structure == 'VC') {
          let C = validAffix('C');
          return 'IF ' + uniqueToSecondGroup + ' THEN ' + validAffix('-H' + C) + ' ELSE ' + validAffix('-V' + C);
        }
      } else {
        // if (C)V language
        let M = validAffix('M');
        return 'IF ' + uniqueToSecondGroup + ' THEN ' + validAffix('-' + M + 'H') + ' ELSE ' + validAffix('-' + M + 'V');
      }
    } else {
      // if prefixing
      if (maxCoda > 0) {
        // if not (C)V language

        if (structure == 'V') {
          return 'IF ' + uniqueToSecondGroup + ' THEN ' + validAffix('H-') + ' ELSE ' + validAffix('V-');
        } else if (structure == 'VC') {
          let O = validAffix('O');
          return 'IF ' + uniqueToSecondGroup + ' THEN ' + validAffix(O + 'H-') + ' ELSE ' + validAffix(O + 'V-');
        }
      } else {
        // if (C)V language
        let O = validAffix('O');
        return 'IF ' + uniqueToSecondGroup + ' THEN ' + validAffix(O + 'H-') + ' ELSE ' + validAffix(O + 'V-');
      }
    }
  }
}

/**************************
 Phoneme frequency functions
 **************************/

function cleanIPA(IPA, ID) {
  IPA = IPA.replaceAll('ç', '!VOICELESS PALATAL FRICATIVE');
  // ç should not be normalized
  if (ID == 'spelling') {
    if (!isChecked('composeSpelling')) {
      IPA = IPA.normalize('NFD');
    }
  } else {
    IPA = IPA.normalize('NFD');
  }
  IPA = IPA.replaceAll('ɡ', 'g').replaceAll(':', 'ː').replaceAll('’', 'ʼ').replaceAll('ʱ', '̤').replaceAll('ɚ', 'ə˞').replaceAll('?', 'ʔ').replaceAll('!VOICELESS PALATAL FRICATIVE', 'ç');
  return IPA;
}

function applyDiphthongSymbols(list) {
  // used in phonology file
  if (!list)
    return;

  for (let i = 0; i < list.length; i++) {
    let number_of_vowels = list[i].match(rawVowel)?.length || 0;
    if (number_of_vowels > 1) {
      if (list[i].match(/\u032F/g)?.length == number_of_vowels - 1) {
        // no. of diphthong symbols = no. of vowels - 1
        continue;
        // no need to add the diphthong symbol
      }
      let segments = list[i].match(diphthongSegments);
      let newDiphthong = '';
      let firstVowel = true;

      for (let segment of segments) {
        if (uVowel.includes(segment[0]) && firstVowel) {
          newDiphthong += segment;
          firstVowel = false;
        } else if (uConsonant.includes(segment[0]) || uVowel_Mc.includes(segment[0])) {
          newDiphthong += segment;
        } else if (!firstVowel) {
          // add next vowel with diphthong diacritic
          newDiphthong += segment + '̯';
        }
      }
      list[i] = newDiphthong;
    }
  }
  return list;
}

function freqSort(oldlist, mostCommonCV, typeOfSort) {
  // sorts user input by most common phonemes, with some randmonness
  try {
    let newlist = [...oldlist];

    if (['natural', 'random'].includes(typeOfSort)) {
      let randThreshold = (typeOfSort == 'natural') ? 0 : 0.22;

      newlist.sort(function (a, b) {
        let aIndex = mostCommonCV.indexOf(a);
        let bIndex = mostCommonCV.indexOf(b);

        if (aIndex == -1)
          aIndex = mostCommonCV.length;
        if (bIndex == -1)
          bIndex = mostCommonCV.length;

        let random = rand();
        return (random > randThreshold) ? aIndex - bIndex : bIndex - aIndex;
      });
      return newlist;
      // fix - does this ever get met?
    } else if (typeOfSort == 'alpha') {
      newlist.sort(function (a, b) {
        return a.localeCompare(b);
      });
      return newlist;
    } else {
      return oldlist;
    }
  } catch {
    return oldlist;
  }
}

function multiply(oldList, times10) {
  // multiplies phonemes by X number and returns new array
  // times10 cannot be inside the function because it's already split
  let newList = [];
  let rg_multiplier = /\*\d{0,3}(\.\d)?/;
  if (oldList) {
    for (let phoneme of oldList) {
      let phonemeGroup = phoneme.replace(rg_multiplier, '');
      let multiplier = phoneme.match(rg_multiplier);
      // fix - ?.
      if (!multiplier) {
        for (let i = 0; i < times10; i++) {
          newList.push(phonemeGroup);
        }
      } else {
        multiplier = parseFloat(multiplier[0].replace('*', ''));
        for (let i = 0; i < multiplier * times10; i++) {
          newList.push(phonemeGroup);
        }
      }
    }
  }
  return newList;
}

function createInventory(inventory, CONSONANTorVOWEL) {
  let times10 = /\.\d/.test(inventory) ? 10 : 1;
  inventory = cleanIPA(inventory).match(CONSONANTorVOWEL);
  inventory = applyDiphthongSymbols(inventory);
  return multiply(inventory, times10);
}

function dropoff(rate, rank, arrayLength) {
  if (rate == 'medium') {
    return Math.ceil(((30 / Math.pow(rank, 0.4)) * arrayLength * 3) / 70);
  } else if (rate == 'fast') {
    return Math.ceil((Math.pow(0.865, rank) / Math.pow(rank, 0.5 /*aRange*/)) * arrayLength * 2);
    // Yule like
  } else {
    return 1;
  }
}

function dropoffDist(oldlist, rate) {
  let list = [];
  let stats = [];
  let L = oldlist.length;
  for (let i = 0; i < L; i++) {
    let multiplier = dropoff(rate, i + 1, L);
    stats.push(oldlist[i] + '*' + multiplier);
    for (let j = 0; j < multiplier; j++) {
      list.push(oldlist[i]);
    }
  }
  return {
    'list': list
    , 'stats': stats
  };
}

/**********************************
 Phonological Rule functions and RegEx Lookbehind functions
 ***********************************/
let lookbehindSupported = false;
try {
  // check if broswer supports positive lookbehind RegEx
  lookbehindSupported = !!new RegExp('(?<=)');
  lookbehindSupported = true;
} catch {
}

function getLBinfo(environment) {
  let stringLookbehind, rgLookbehind;
  if (!lookbehindSupported && environment.includes('(?<=')) {
    let closeBracket = 0;
    let openBracket = 0;
    let lookbehindEnd;
    for (let i = 0; i < environment.length; i++) {
      if (environment[i] == '(')
        openBracket += 1;
      if (environment[i] == ')')
        closeBracket += 1;

      if (closeBracket == openBracket) {
        lookbehindEnd = i + 1;
        break;
      }
    }

    stringLookbehind = environment.slice(0, lookbehindEnd);

    rgLookbehind = stringLookbehind.replace('(?<=', '');
    rgLookbehind = rgLookbehind.slice(0, -1);
  } else {
    rgLookbehind = '.';
    stringLookbehind = undefined;
  }
  return {
    'string': stringLookbehind
    , 'rg': rgLookbehind
  }
}

// positive Lookbehind function for browsers that do not already support it
function LBreplace(updatethis, expression, replaceWith) {
  let openBracket = 0;
  let closeBracket = 0;
  let lookbehindEnd;
  for (let i = 0; i < expression.length; i++) {
    if (expression[i] == '(')
      openBracket += 1;
    if (expression[i] == ')')
      closeBracket += 1;
    if (closeBracket == openBracket) {
      lookbehindEnd = i + 1;
      // index of end of lookbehind syntax
      break;
    }
  }

  let lookbehind = new RegExp(expression.slice(4, lookbehindEnd - 1), 'g');
  let mainRegEx = new RegExp('^' + expression.slice(lookbehindEnd));

  let match;
  while (match = lookbehind.exec(updatethis)) {
    let temp = updatethis.slice(lookbehind.lastIndex).replace(mainRegEx, replaceWith);
    updatethis = updatethis.slice(0, lookbehind.lastIndex) + temp;
    if (lookbehind.lastIndex === 0 && updatethis.match(lookbehind)[0] === '') {
      // new 10.8.4
      if (lookbehind.source.replace(/\^\(\?:.*?\)[\?\*]$/, '') === '') {
        break;
      }
    }
  }
  return updatethis;
}

const consonantFeatures = [
  ['+nasal', '+stop', '+implosive', '+affricate', '+fricative', '+approximant', '+tap', '+trill', '+lateral affricate', '+lateral fricative', '+lateral approximant', '+lateral flap', '+click', '+lateral click']
  , ['+bilabial', '+labiodental', '+linguo-labial', '+apical', '+dental', '+laminal', '+alveolar', '+palato-alveolar', '+retroflex', '+alveolo-palatal', '+palatal', '+velar', '+uvular', '+pharyngeal', '+glottal']
  , ['-voice', '+voice']
];

const conMatrix = [ // fix - '_' vs ''. has implications for if (changed == '_' || changed == '')
                    //  bilabial       labioden      linguo-lab    apical      dental        laminal     alveolar     palato-alve retroflex      Alve-pal    palatal       velar         uvular        pharyngeal  glottal
  /*nasal*/
  [
    ['m̥', 'm']
    , ['ɱ̊', 'ɱ']
    , ['n̼̊', 'n̼']
    , ['n̺̊', 'n̺']
    , ['n̪̊', 'n̪']
    , ['n̻̊', 'n̻']
    , ['n̥', 'n']
    , ['n̠̊', 'n̠']
    , ['ɳ̊', 'ɳ']
    , ['', '']
    , ['ɲ̊', 'ɲ']
    , ['ŋ̊', 'ŋ']
    , ['ɴ̥', 'ɴ']
    , ['_', '_']
    , ['_', '_']
  ], /*stop*/
  [
    ['p', 'b']
    , ['p̪', 'b̪']
    , ['t̼', 'd̼']
    , ['t̺', 'd̺']
    , ['t̪', 'd̪']
    , ['t̻', 'd̻']
    , ['t', 'd']
    , ['t̠', 'd̠']
    , ['ʈ', 'ɖ']
    , ['', '']
    , ['c', 'ɟ']
    , ['k', 'g']
    , ['q', 'ɢ']
    , ['ʡ', '_']
    , ['ʔ', '_']
  ], /*implosive*/
  [
    ['ɓ̥', 'ɓ']
    , ['', '']
    , ['', '']
    , ['', '']
    , ['', '']
    , ['', '']
    , ['ɗ̥', 'ɗ']
    , ['', '']
    , ['ᶑ̊', 'ᶑ']
    , ['', '']
    , ['ʄ̊', 'ʄ']
    , ['ɠ̊', 'ɠ']
    , ['ʛ̥', 'ʛ']
    , ['', '']
    , ['', '']
    ,], /*affricate*/
  [
    ['p͡ɸ', 'b͡β']
    , ['p̪͡f', 'b̪͡v']
    , ['t̼͡θ̼', 'd̼͡ð̼']
    , ['', '']
    , ['t̪͡θ', 'd̪͡ð']
    , ['ʦ̻', 'ʣ̻']
    , ['ʦ', 'ʣ']
    , ['ʧ', 'ʤ']
    , ['ʈ͡ʂ', 'ɖ͡ʐ']
    , ['ʨ', 'ʥ']
    , ['c͡ç', 'ɟ͡ʝ']
    , ['k͡x', 'g͡ɣ']
    , ['q͡χ', 'ɢ͡ʁ']
    , ['_', '_']
    , ['ʔ͡h', '_']
  ], /*fricative*/
  [
    ['ɸ', 'β']
    , ['f', 'v']
    , ['θ̼', 'ð̼']
    , ['', '']
    , ['θ', 'ð']
    , ['s̻', 'z̻']
    , ['s', 'z']
    , ['ʃ', 'ʒ']
    , ['ʂ', 'ʐ']
    , ['ɕ', 'ʑ']
    , ['ç', 'ʝ']
    , ['x', 'ɣ']
    , ['χ', 'ʁ']
    , ['ħ', 'ʕ']
    , ['h', 'ɦ']
  ], /*approximant*/
  [
    ['ɸ˕', 'β˕']
    , ['ʋ̥', 'ʋ']
    , ['ɹ̼̊', 'ɹ̼']
    , ['', '']
    , ['θ̞', 'ð̞']
    , ['ɹ̻̊', 'ɹ̻']
    , ['ɹ̥', 'ɹ']
    , ['ɹ̠̊', 'ɹ̠']
    , ['ɻ̊', 'ɻ']
    , ['', '']
    , ['j̊', 'j']
    , ['ɰ̊', 'ɰ']
    , ['ʁ̞̊', 'ʁ̞']
    , ['ħ̞', 'ʕ̞']
    , ['_', '_']
  ], /*tap*/
  [
    ['ⱱ̟̊', 'ⱱ̟']
    , ['ⱱ̥', 'ⱱ']
    , ['ɾ̼̊', 'ɾ̼']
    , ['', '']
    , ['ɾ̪̊', 'ɾ̪']
    , ['ɾ̻̊', 'ɾ̻']
    , ['ɾ̥', 'ɾ']
    , ['ɾ̠̊', 'ɾ̠']
    , ['ɽ̊', 'ɽ']
    , ['', '']
    , ['', '']
    , ['_', '_']
    , ['q̆', 'ɢ̆']
    , ['ʡ̥̆', 'ʡ̆']
    , ['_', '_']
  ], /*trill*/
  [
    ['ʙ̥', 'ʙ']
    , ['ʙ̪̊', 'ʙ̪']
    , ['r̼̊', 'r̼']
    , ['', '']
    , ['r̪̊', 'r̪']
    , ['r̻̊', 'r̻']
    , ['r̥', 'r']
    , ['r̠̊', 'r̠']
    , ['ɽ͡r̥', 'ɽ͡r']
    , ['', '']
    , ['', '']
    , ['_', '_']
    , ['ʀ̥', 'ʀ']
    , ['ʜ', 'ʢ']
    , ['_', '_']
  ], /*lat. affric.*/
  [
    ['_', '_']
    , ['_', '_']
    , ['t̼͡ɬ̼', 'd̼͡ɮ̼']
    , ['', '']
    , ['t̪͡ɬ̪', 'd̪͡ɮ̪']
    , ['t̻͡ɬ̻', 'd̻͡ɮ̻']
    , ['t͡ɬ', 'd͡ɮ']
    , ['t̠ɬ̠', 'd̠ɮ̠']
    , ['ʈ͡ɭ̊˔', 'ɖ͡ɭ˔']
    , ['', '']
    , ['c͡ʎ̝̊', 'ɟ͡ʎ̝']
    , ['k͡ʟ̝̊', 'g͡ʟ̝']
    , ['', '']
    , ['_', '_']
    , ['_', '_']
  ], /*lat. fricat.*/
  [
    ['_', '_']
    , ['_', '_']
    , ['ɬ̼', 'ɮ̼']
    , ['', '']
    , ['ɬ̪', 'ɮ̪']
    , ['ɬ̻', 'ɮ̻']
    , ['ɬ', 'ɮ']
    , ['ɬ̠', 'ɮ̠']
    , ['ɭ̊˔', 'ɭ˔']
    , ['', '']
    , ['ʎ̝̊', 'ʎ̝']
    , ['ʟ̝̊', 'ʟ̝']
    , ['', '']
    , ['_', '_']
    , ['_', '_']
  ], /*lat. approx.*/
  [
    ['_', '_']
    , ['_', '_']
    , ['l̼̊', 'l̼']
    , ['', '']
    , ['l̪̊', 'l̪']
    , ['l̻̊', 'l̻']
    , ['l̥', 'l']
    , ['l̠̊', 'l̠']
    , ['ɭ̊', 'ɭ']
    , ['', '']
    , ['ʎ̥', 'ʎ']
    , ['ʟ̥', 'ʟ']
    , ['ʟ̠̊', 'ʟ̠']
    , ['_', '_']
    , ['_', '_']
  ], /*lateral flap*/
  [
    ['_', '_']
    , ['_', '_']
    , ['ɺ̼̊', 'ɺ̼']
    , ['', '']
    , ['ɺ̪̊', 'ɺ̪']
    , ['ɺ̻̊', 'ɺ̻']
    , ['ɺ̥', 'ɺ']
    , ['ɺ̠̊', 'ɺ̠']
    , ['ɭ̥̆', 'ɭ̆']
    , ['', '']
    , ['ʎ̥̆', 'ʎ̆']
    , ['ʟ̥̆', 'ʟ̆']
    , ['', '']
    , ['_', '_']
    , ['_', '_']
  ], /*click*/
  [
    ['ʘ', 'ʘ̬']
    , ['_', '_']
    , ['', '']
    , ['', '']
    , ['ǀ', 'ǀ̬']
    , ['', '']
    , ['ǃ', 'ǃ̬']
    , ['', '']
    , ['', '']
    , ['', '']
    , ['ǂ', 'ǂ̬']
    , ['', '']
    , ['', '']
    , ['_', '_']
    , ['_', '_']
  ], /*lat. click*/
  [
    ['', '']
    , ['_', '_']
    , ['', '']
    , ['', '']
    , ['', '']
    , ['', '']
    , ['ǁ', 'ǁ̬']
    , ['', '']
    , ['', '']
    , ['', '']
    , ['', '']
    , ['', '']
    , ['', '']
    , ['_', '_']
    , ['_', '_']
  ]
  ,];

const orderOfPlaces = consonantFeatures[1].map(a => a.slice(1));
const orderOfManners = consonantFeatures[0].map(a => a.slice(1));

const rgCoart = /w|ʍ|ɥ|n͡m|ŋ͡m|t͡p|d͡b|k͡p|g͡b|q͡ʡ|ɧ|ɫ/;

const coartFeatures = [
  ['+nasal', '+stop', '+fricative', '+approximant', '+lateral approximant']
  , ['+labial-alveolar', '+labial-palatal', '+labial-velar', '+velarized alveolar', '+uvular-epiglottal', '+sj-sound']
  , ['-voice', '+voice']
];

const COorderOfPlaces = coartFeatures[1].map(a => a.slice(1));
const COorderOfManners = coartFeatures[0].map(a => a.slice(1));

const coartMatrix = [ //  labial-alveolar labial-palatal labial-velar velarized alveolar  uvular-epiglottal sj-sound'
  /*nasal*/
  [
    ['n̥͡m̥', 'n͡m']
    , ['', '']
    , ['ŋ̥͡m̥', 'ŋ͡m']
    , ['', '']
    , ['', '']
    , ['', '']
  ], /*stop*/
  [
    ['t͡p', 'd͡b']
    , ['', '']
    , ['k͡p', 'g͡b']
    , ['', '']
    , ['q͡ʡ', '']
    , ['', '']
  ], /*fricative*/
  [
    ['', '']
    , ['', '']
    , ['', '']
    , ['', '']
    , ['', '']
    , ['ɧ', '']
  ], /*approximant*/
  [
    ['', '']
    , ['ɥ̊', 'ɥ']
    , ['ʍ', 'w']
    , ['', '']
    , ['', '']
    , ['', '']
  ], /*Lateral approximant*/
  [
    ['', '']
    , ['', '']
    , ['', '']
    , ['ɫ̥', 'ɫ']
    , ['', '']
    , ['', '']
  ]
];

const vowelFeatures = [
  ['+high', '+near-high', '+high-mid', '+mid', '+low-mid', '+near-low', '+low']
  , ['+front', '+central', '+back']
  , ['-round', '+round']
];

const orderOfBackness = vowelFeatures[1].map(a => a.slice(1));
const orderOfHeight = vowelFeatures[0].map(a => a.slice(1));

const vowMatrix = [ /*high*/
  [
    ['i', 'y']
    , ['ɨ', 'ʉ']
    , ['ɯ', 'u']
  ], /*near-high*/
  [
    ['ɪ', 'ʏ']
    , ['ɪ̈', 'ʊ̈']
    , ['ɯ̞', 'ʊ']
  ], /*high-mid*/
  [
    ['e', 'ø']
    , ['ɘ', 'ɵ']
    , ['ɤ', 'o']
  ], /*mid*/
  [
    ['e̞', 'ø̞']
    , ['ə', 'ə']
    , ['ɤ̞', 'o̞']
  ], /*low-mid*/
  [
    ['ɛ', 'œ']
    , ['ɜ', 'ɞ']
    , ['ʌ', 'ɔ']
  ], /*near-low*/
  [
    ['æ', 'œ̞']
    , ['ɐ', 'ɐ']
    , ['ɑ̝', 'ɒ̝']
  ], /*low*/
  [
    ['a', 'ɶ']
    , ['ä', 'ɒ̈']
    , ['ɑ', 'ɒ']
  ]
  ,];

let articulators = {
  // fix - what's missing?
  /*
lowered | mid-centralized
raised | retracted | advanced
*/
  '+advancedtongueroot': '̘'
  , '+aspirated': 'ʰ'
  , '+ATR': '̘'
  , '+breathy': '̤'
  , '+creaky': '̰'
  , '+vocalfry': '̰',
  // remove spaces because the generator removes spaces
  '+labialized': 'ʷ'
  , '+lateralrelease': 'ˡ',
  //'+length': 'ː',
  '+long': 'ː'
  , '+nasal': '̃'
  , '+nasalrelease': 'ⁿ',
  // remove spaces because the generator removes spaces
  '+palatalized': 'ʲ'
  , '+pharyngealized': 'ˤ'
  , '+retractedtongueroot': '̙'
  , '+rhotacized': '˞'
  , '+RTR': '̙'
  , '+stress': '⌠'
  , '-stress': '⌡'
  , '+velarized': 'ˠ'
  , '+unreleased': '̚'
  , '+unreleasedstop': '̚'
  , '-voice': '̥'
}

let hashedCoords = {}

function IPAcoord(phone, conOrVow) {
  if (hashedCoords[phone])
    return hashedCoords[phone];
  for (let Y = 0; Y < conOrVow.length; Y++) {
    for (let X = 0; X < conOrVow[Y].length; X++) {
      for (let Z = 0; Z < conOrVow[Y][X].length; Z++) {
        if (conOrVow[Y][X][Z] == phone) {
          hashedCoords[phone] = [Y, X, Z];
          return [Y, X, Z];
        }
      }
    }
  }
}

function featureChange(phone, change) {
  // new 10.8.11
  let rule = phone + '>' + change;
  if (hashedSoundChanges[rule]) {
    return hashedSoundChanges[rule];
  }
  let conOrVow, features;
  let phone_bare = phone.replace(direplace, '');
  let diacritics = phone.match(direplace) || '';
  if (uVowel.includes(phone_bare)) {
    // vowels
    conOrVow = [...vowMatrix];
    features = [...vowelFeatures];
  } else if (rgCoart.test(phone_bare)) {
    // coart consonants
    conOrVow = [...coartMatrix];
    features = [...coartFeatures];
  } else {
    // consonant
    conOrVow = [...conMatrix];
    features = [...consonantFeatures];
  }

  if (IPAcoord(phone, conOrVow)) {
    let matrix = [...IPAcoord(phone, conOrVow)];
    for (let YXZ = 0; YXZ < features.length; YXZ++) {
      // YXZ = manner, place or voice
      for (let bottomGroup = 0; bottomGroup < features[YXZ].length; bottomGroup++) {
        if (features[YXZ][bottomGroup] == change) {
          matrix[YXZ] = bottomGroup;
          // create new matrix that accesses new location
          let changed = conOrVow[matrix[0]][matrix[1]][matrix[2]];
          if (changed == '_' || changed == '')
            changed = phone;
          hashedSoundChanges[rule] = changed;
          return changed;
        }
      }
    }
  }
  // bare phone n̥
  let matrix = [...IPAcoord(phone_bare, conOrVow)];
  if (!matrix)
    return undefined;
  for (let YXZ = 0; YXZ < features.length; YXZ++) {
    // YXZ = manner, place or voice
    for (let bottomGroup = 0; bottomGroup < features[YXZ].length; bottomGroup++) {
      if (features[YXZ][bottomGroup] == change) {
        matrix[YXZ] = bottomGroup;
        // create new matrix that accesses new location
        let changed = conOrVow[matrix[0]][matrix[1]][matrix[2]];
        if (changed == '_' || changed == '')
          changed = phone;
        diacritics = diacritics.join('');
        hashedSoundChanges[rule] = changed + diacritics;
        return changed + diacritics;
      }
    }
  }

  if (articulators[change]) {
    let newPhone = phone.includes(articulators[change]) ? phone : phone + articulators[change];
    hashedSoundChanges[rule] = newPhone;
    return newPhone;
  } else if (articulators['+' + change.slice(1)]) {
    hashedSoundChanges[rule] = phone.replace(articulators['+' + change.slice(1)], '');
    return phone.replace(articulators['+' + change.slice(1)], '');
  } else {
    return phone;
  }
}

function noLookbehind(match, replaceWith) {
  // fix - remove when Safari has support
  if (replaceWith.includes('[+') || replaceWith.includes('[-')) {
    // [+feature replacement]
    let features = replaceWith.slice(replaceWith.indexOf('[') + 1, replaceWith.indexOf(']')).toLowerCase().split(/(?=[-+])/);
    let outFeature;
    for (let feature of features) {
      outFeature = feature;
      if (featureChange(match, outFeature) != undefined) {
        outFeature = featureChange(match, outFeature);
        match = outFeature;
      }
    }
    return outFeature;
  }
  return replaceWith;
  // not a feature replacement
}

let globalReplaceWith;

function replaceFunc(match) {
  if (globalReplaceWith.includes('[+') || globalReplaceWith.includes('[-')) {
    // [+feature replacement]
    let features = globalReplaceWith.slice(globalReplaceWith.indexOf('[') + 1, globalReplaceWith.indexOf(']')).toLowerCase().split(/(?=[-+])/);
    let outFeature;
    for (let feature of features) {
      outFeature = feature;
      if (featureChange(match, outFeature) != undefined) {
        outFeature = featureChange(match, outFeature);
        match = outFeature;
      }
    }
    return outFeature;
  }
  return globalReplaceWith;
  // not a feature replacement
}

// applies Phonological Rules to IPA strings
String.prototype.vl_applyPhonRule = function (rgMatch, replaceWith, stringMatch, stringLookbehind, rgLookbehind) {
  if (lookbehindSupported || !stringLookbehind) {
    if (/\$[&<]/.test(replaceWith)) {
      // $& and $1 type replacements don't work in the function version
      // this means you cant do $& and feature type repalcement, eg: C > C[C +nasal],  t > tn
      return this.replace(rgMatch, replaceWith);
    }
    globalReplaceWith = replaceWith;
    return this.replace(rgMatch, replaceFunc);
    // most rules will come to here
  }
  // Positive lookbehinds for browsers that don't support lookbehinds
  let outWord = this;
  let targetPhoneme = stringMatch.replace(stringLookbehind, '');
  // (?<=m)e turns into e
  let mainRegEx = new RegExp('^' + targetPhoneme);

  if (rgLookbehind.flags == '') {
    // if << (not global, therefore lastIndex cannot be used)
    let sliceIndex = outWord.search(rgLookbehind) + outWord.match(rgLookbehind)[0].length;
    let afterLB = outWord.slice(sliceIndex);
    let len = afterLB.match(mainRegEx)[0].length;
    let match = outWord.slice(sliceIndex, sliceIndex + len);
    let replacer = noLookbehind(match, replaceWith);
    afterLB = afterLB.replace(mainRegEx, replacer);
    return outWord.slice(0, sliceIndex) + afterLB;
  }

  let matching;
  while (matching = rgLookbehind.exec(outWord)) {
    // if > or >> (global)
    let afterLB = outWord.slice(rgLookbehind.lastIndex);
    if (afterLB.match(mainRegEx)) {
      // fix - ?.
      let len = afterLB.match(mainRegEx)[0].length;
      let match = outWord.slice(rgLookbehind.lastIndex, rgLookbehind.lastIndex + len);
      let replacer = noLookbehind(match, replaceWith);
      afterLB = afterLB.replace(mainRegEx, replacer);
      outWord = outWord.slice(0, rgLookbehind.lastIndex) + afterLB;
    }

    if (rgLookbehind.lastIndex === 0 && outWord.match(rgLookbehind)[0] === '') {
      if (rgLookbehind.source.replace(/\^\(\?:.*?\)[\?\*]$/, '') === '') {
        break;
      }
    }
  }
  return outWord;
}

function syllabify(string, pattern = rgSyllable) {
  let syllables = [];
  let match, leftOvers;
  while (match = pattern.exec(string)) {
    leftOvers = pattern.lastIndex;
    syllables.push(match[0]);
  }
  if (leftOvers < string.length) {
    // add trailing consonants to final syllable
    syllables[syllables.length - 1] = syllables[syllables.length - 1] + string.slice(leftOvers);
  }
  return syllables;
}

function addFeaturalStress(string) {
  // fix - make IIFE
  let syllables = syllabify(string, rgStressedSyllable);
  if (syllables.length == 1) {
    return syllables[0].replace(rgSyllabicNucleus, '$&⌠');
  } else {
    syllables = syllables.map(function (syllable) {
      if (/[ˈˌ]/.test(syllable)) {
        return syllable.slice(1).replace(rgSyllabicNucleus, '$&⌠');
      } else {
        return syllable.replace(rgSyllabicNucleus, '$&⌡');
      }
    });
  }
  return syllables.join('')
}

// adds % signs for phonological rules
function syllableBoundaries(string) {
  return '%' + syllabify(string).join('%') + '%';
}

function subscriptToDigit(string) {
  string = string.replace(/[₁-₉]/g, function (match) {
    return String.fromCharCode(match.charCodeAt(0) - 8272)
  });
  return string;
}

function nameCaptureReplace(string) {
  string = subscriptToDigit(string).replace(/[A-Z][1-9]/g, function (match) {
    return '$<' + match.toLowerCase() + '>'
  }).replace(/{[^}]+}[1-9]/g, function (match) {
    match = match.replaceAll(',', '|')
    return '$<' + match.replace(/{|}/g, '').replace(/[^A-Za-z1-9]/g, function (point) {
      return 'u' + point.codePointAt(0)
    }).toLowerCase() + '>'
  }).replace(/\[[^\]]+\][1-9]/g, function (match) {
    match = match.replaceAll(',', '|')
    return '$<' + match.replace(/\[|\]/g, '').replace(/[^A-Za-z1-9]/g, function (point) {
      return 'u' + point.codePointAt(0)
    }).toLowerCase() + '>'
  }).replaceAll('_', 'ZXCVBNM&').replaceAll('ZXCVBNM', '$').replaceAll('∅', '');
  return string;
}

// changes shorthand symbols into RegEx patterns
function shorthand(string, noDiacritics) {
  const shortSymbols = [ //[/([CDVXσ])\*/g, '(?:$1)*'], // removed for some reason?
    [/X/g, '(?:C|V)'], // any phoneme
    [/V/g, pVowel]
    , [/C/g, '(?:' + pConsonant + ')'], // no affricates! '(?:'+ pConsonant + ')'
    [/^#/, '^']
    , [/#$/, '$']
    , [/σ/g, pSyllable]
    , [/ᴰ/g, '[' + uDiacritics + ']']
    , [/D/g, '[' + uVowel + uConsonant + ']']
    , [/∅/g, '']
    ,];

  const anyPlus = new RegExp('((?:' + pConsonant + '|' + pVowel + '|[CDVXσ]))\\*', 'g');
  const anyStar = new RegExp('(\\((?:' + pConsonant + '|' + pVowel + '|[CDVXσ])\\))\\*', 'g');
  string = string.replace(anyPlus, '(?:$1)+').replace(anyStar, '(?:$1)*');
  for (let symbol of shortSymbols) {
    string = string.replace(symbol[0], symbol[1]);
  }
  if (noDiacritics)
    string = string.replace(pVowel_M, '').replace(pConsonant_M, '');
  return string;
}

let distFeatures = {
  // new 10.8.9
  // linguo-lab apical laminal palato-alve Alve-pal
  // antieror
  'affricate': 'ʦʣʧʤʨʥ',
  // fix - incomplete
  'alveolar': 'ntdszɹɾrɬɮlɫɺ'
  , 'approx': 'ʋɹɻjwɥɰlɫɭʎʟ'
  , 'approximant': 'ʋɹɻjwɥɰlɫɭʎʟ'
  , 'back': 'ɯuɤoʌɔɑɒ'
  , 'bilabial': 'mpbɸβʙ',
  // fix - does not get diacritics
  'dental': 'θð',
  // fix - does not get diacritics
  'click': 'ʘǀǃǂǁ'
  , 'C': uConsonant
  , 'consonant': uConsonant
  , 'cons': 'pbtdʈɖcɟkgqɢʦʣʧʤʨʥɸβfvθðszʃʒʂʐɕʑçʝxɣχʁħʕmɱnɳɲŋɴlɭɫʎʟɬɮɺrɾɹɻʀʁɽ'
  , 'consonantal': 'pbtdʈɖcɟkgqɢʦʣʧʤʨʥɸβfvθðszʃʒʂʐɕʑçʝxɣχʁħʕmɱnɳɲŋɴlɭɫʎʟɬɮɺrɾɹɻʀʁɽ',
  // fix - should convert to cons
  // constr
  'cont': 'ɸβfvθðszʃʒʂʐɕʑçʝxɣχʁħʕhɦʋɹɻjwɥɰlɫɭʎʟiyɨʉɯuɪʏʊeøɘɵɤoəɛœɜʌɞɶɔæɐaɑɒʊ'
  , 'continuant': 'ɸβfvθðszʃʒʂʐɕʑçʝxɣχʁħʕhɦʋɹɻjwɥɰlɫɭʎʟiyɨʉɯuɪʏʊeøɘɵɤoəɛœɜʌɞɶɔæɐaɑɒʊ',
  // fix - should convert to cont
  // coronal
  'dorsal': 'ŋkgxɣɰɰʟqɴɢχʁʀiyɨʉɯuɪʏʊeøɘɵɤoəɛœɜʌɞɶɔæɐaɑɒʊ',
  // fix - fronted velars page68
  'fricative': 'ɸβfvθðszʃʒʂʐɕʑçʝxɣχʁħʕhɦɬɮɧʍ'
  , 'front': 'iyeøɛœæaɶ'
  , 'glottal': 'ʔhɦ'
  , 'high': 'iyɨʉɯu'
  , 'implosive': 'ɓɗʄɠʛ'
  , 'labial': 'mɱpbfvɸβⱱʙyʉuʏʊøɵoœɞɔɶwʍ'
  , 'labiodental': 'ɱfvʋⱱ'
  , 'laryngeal': 'ʡʔħʕhɦʜʢ'
  , 'lat': 'lɫɭʎʟɬɮɺǁ'
  , 'lateral': 'lɫɭʎʟɬɮɺǁ'
  , 'liquid': 'lɫɭʎʟɬɮɺrɾɹɻʀʁɽ'
  , 'low': 'ɐaɑɶɒ'
  , 'nasal': 'mɱnɳɲŋɴ',
  // vowels
  'retroflex': 'ɳʈɖᶑʂʐɻɽɭ'
  , 'round': 'yʉuʏʊøɵoœɞɔɶ'
  , 'palatal': 'ɲcɟçʝjʎʄ'
  , 'pharyngeal': 'ħʕʢʜ'
  , 'son': 'iyɨʉɯuɪʏʊeøɘɵɤoəɛœɜʌɞɶɔæɐaɑɒʊwjɥɰʋlɫɭʎʟɬɮɺrɾɹɻʀʁɽmɱnɳɲŋɴ'
  , 'sonorant': 'iyɨʉɯuɪʏʊeøɘɵɤoəɛœɜʌɞɶɔæɐaɑɒʊwjɥɰʋlɫɭʎʟɬɮɺrɾɹɻʀʁɽmɱnɳɲŋɴ',
  // fix - should convert to son
  // spread
  // strident
  'stop': 'pbtdʈɖcɟkgqɢʔ',
  // 'tense': '',
  'tap': 'ⱱɾɽɺ'
  , 'trill': 'ʙrʀʜʢ'
  , 'V': 'iyɨʉɯuɪʏʊeøɘɵɤoəɛœɜʌɞɶɔæɐaɑɒʊ',
  // fix - what about diphthongs?
  'vowel': 'iyɨʉɯuɪʏʊeøɘɵɤoəɛœɜʌɞɶɔæɐaɑɒʊ',
  // fix - what about diphthongs?
  'velar': 'ŋkgxɣɰɰʟwʍ'
  , 'voice': 'mɱnɳɲŋɴbdɖɟgɢβvðzʒʐʑʝɣʁʕʣʤʥʋɹɻjɥɰɾɽʙrʀɮlɫɭʎʟʛɠʄɗɓɦwɨʉɯuɪʏʊeøɘɵɤoəɛœɜʌɞɶɔæɐaɑɒʊ'
  , 'uvular': 'qɴɢχʁʀ'
  , '1': 'iyɨʉɯuɪʏʊeøɘɵɤoəɛœɜʌɞɶɔæɐaɑɒʊwjɥɰʋhɦʔ',
  // fix - does not account for dipthongs
  'X': uConsonant + 'iyɨʉɯuɪʏʊeøɘɵɤoəɛœɜʌɞɶɔæɐaɑɒʊ' // fix - does not account for dipthongs
}

function filterFeatures(featureGroup) {
  // fix - messy // new 10.8.11
  let optionalDiacritics = '[' + uDiacritics + ']*';
  featureGroup = featureGroup.slice(1, featureGroup.length - 1).trim();

  const noCV = /^[-+]/.test(featureGroup);

  let addC = false;
  let addV = false;
  let addX = false;
  let add1 = false;

  if (/back|front|high|low|-round/.test(featureGroup) && featureGroup[0] != 'V') {
    // fix round consonanats
    addV = true;
  }
  if (/-voice|stop|fricative|velar|lat|-son|-cont/.test(featureGroup) && featureGroup[0] != 'C') {
    // fix - voiceless vowels
    addC = true;
  }
  if (/-cons\b/.test(featureGroup)) {
    // fix - && noCV ??
    add1 = true;
  }

  if (noCV && featureGroup.includes('-labial')) {
    addX = true;
  }
  let longSymbol = '';
  if (featureGroup.includes('+long')) {
    longSymbol = 'ː';
    featureGroup = featureGroup.replace('+long', '')
    if (noCV)
      addX = true;
  } else if (featureGroup.includes('-long')) {
    longSymbol = '';
    optionalDiacritics = optionalDiacritics.replace('ː', '');
    featureGroup = featureGroup.replace('-long', '')
    if (noCV)
      addX = true;
  }

  let nasalVowels = '';
  let nasalSymbol = '';
  if (featureGroup.includes('+nasal')) {
    if (noCV) {
      nasalVowels = '|[' + uVowel + ']̃';
      addC = true;
    } else if (featureGroup.includes('V')) {
      nasalSymbol = '̃';
      featureGroup = featureGroup.replace('+nasal', '');
    }

  } else if (featureGroup.includes('-nasal')) {
    optionalDiacritics = optionalDiacritics.replace('̃', '');
    if (noCV)
      addX = true;
  }

  let stressedSymbol = '';
  if (featureGroup.includes('+stress')) {
    stressedSymbol = '⌠'
    if (noCV)
      addV = true;
    featureGroup = featureGroup.replace('+stress', '');
  } else if (featureGroup.includes('-stress')) {
    stressedSymbol = '⌡'
    if (noCV)
      addV = true;
    featureGroup = featureGroup.replace('-stress', '');
  }

  if (addC)
    featureGroup = 'C ' + featureGroup;
  if (addV)
    featureGroup = 'V ' + featureGroup;
  if (addX)
    featureGroup = 'X ' + featureGroup;
  if (add1)
    featureGroup = '1 ' + featureGroup;

  let features = featureGroup.match(/[CVX1]|([-+][a-z]+)|[^ ]+/g);

  let firstFeature = features[0];
  if (/^[-+]/.test(firstFeature)) {
    // not noCV
    firstFeature = firstFeature.slice(1);
  } else if (/^[CVX1]/.test(firstFeature)) { // pass
  } else {
    // assumed to be something like [i +stress]
    optionalDiacritics = '';
  }

  let filteredOutGroup = distFeatures[firstFeature] ? distFeatures[firstFeature].split('') : [firstFeature];

  for (let i = 1; i < features.length; i++) {
    let feature = (['+', '-'].includes(features[i][0])) ? features[i].slice(1) : features[i];

    filteredOutGroup = (features[i][0] == '+') ? filteredOutGroup.filter(phone => distFeatures[feature].split('').includes(phone)) : filteredOutGroup.filter(phone => !distFeatures[feature].split('').includes(phone));
  }

  return '(?:[' + filteredOutGroup.join('') + ']' + optionalDiacritics + nasalSymbol + longSymbol + stressedSymbol + nasalVowels + ')';
}

function regexify(string) {
  let seenNamedGroup = [];
  string = string.replace(/\((?!\?)/g, '(?:') // ( => (?:
    .replace(/\)(?!\*)/g, ')?') // ) => )?
    .replaceAll('{', '(?:').replaceAll('}', ')').replaceAll(',', '|').replace(/[A-Z][1-9]/g, function (match) {
      // fix - does it need to be A-Z?
      if (!seenNamedGroup.includes(match)) {
        seenNamedGroup.push(match)
        return '(?<' + match.toLowerCase() + '>' + match[0] + ')'
      } else {
        return '(\\k<' + match.toLowerCase() + '>)'
      }
    }).replace(/\([^\)]+\)[1-9]/g, function (match) {
      // { }\d
      if (!seenNamedGroup.includes(match)) {
        seenNamedGroup.push(match);
        return '(?<' + match.replace(/\(\?:|\)/g, '').replace(/[^A-Za-z1-9]/g, function (point) {
          return 'u' + point.codePointAt(0)
        }).toLowerCase() + '>' + match.replace(/\(\?:|\)\d/g, '') + ')'
      } else {
        return '(\\k<' + match.replace(/\(\?:|\)/g, '').replace(/[^A-Za-z1-9]/g, function (point) {
          return 'u' + point.codePointAt(0)
        }).toLowerCase() + '>)'
      }
    }).replace(/\[[^\]]+\][1-9]/g, function (match) {
      // [ ]\d
      if (!seenNamedGroup.includes(match)) {
        seenNamedGroup.push(match);
        return '(?<' + match.replace(/\[|\]/g, '').replace(/[^A-Za-z1-9]/g, function (point) {
          return 'u' + point.codePointAt(0)
        }).toLowerCase() + '>' + match.replace(/\d/g, '') + ')'
      } else {
        return '(\\k<' + match.replace(/\[|\]/g, '').replace(/[^A-Za-z1-9]/g, function (point) {
          return 'u' + point.codePointAt(0)
        }).toLowerCase() + '>)'
      }
    }).replace(/\[.*?\]/g, filterFeatures)
  string = shorthand(string);

  // resolve {#,d}_ type rules
  if (string.includes('#') && string.includes(')') && string.includes('(?:')) {
    if (string.startsWith('(?:') && string.endsWith(')')) {
      if (string.match(/\(.*?\)/g).length == 2) {
        // {#}x{X}
        let b = string.match(/^\(.*?\)/)[0];
        // {#}
        let n = b.replaceAll('#', '^');
        string = string.replace(b, n);
        b = string.match(/\(.*?\)$/)[0];
        // {X}
        n = b.replaceAll('#', '$');
        string = string.replace(b, n);
      } else {
        // {#,r,t}
        let b = string.match(/^\(.*?\)$/)[0];
        let n = b.replaceAll('#|', '$|').replaceAll('#)', '$)').replaceAll('|#', '|^').replaceAll('(#', '(^');
        string = string.replace(b, n);
      }
    }
    if (string.startsWith('(')) {
      // fix - else if?
      let b = string.match(/^\(.*?\)/)[0];
      let n = b.replaceAll('#', '^');
      string = string.replace(b, n);
    }
    if (string.endsWith(')')) {
      let b = string.match(/\(.*?\)$/)[0];
      let n = b.replaceAll('#', '$');
      string = string.replace(b, n);
    }
  }
  return string;
}

function phonemeTable(consonant_or_vowel, inventory) {
  let Xorder, Yorder, matrix, features;
  let upperCorner = '↓Manner/Place→';
  let X = 'p';
  let Y = 'm';
  let Z = 'v';
  let voicedOrRounded = '+voice';
  if (['consonants', 'coart'].includes(consonant_or_vowel)) {
    // if consonant
    Xorder = (consonant_or_vowel == 'coart') ? [...COorderOfPlaces] : [...orderOfPlaces];
    Yorder = (consonant_or_vowel == 'coart') ? [...COorderOfManners] : [...orderOfManners];
    matrix = (consonant_or_vowel == 'coart') ? [...coartMatrix] : [...conMatrix];
    features = (consonant_or_vowel == 'coart') ? [...coartFeatures] : [...consonantFeatures];
  } else {
    // if vowel
    X = 'b';
    Y = 'h';
    Z = 'r';
    upperCorner = '';
    voicedOrRounded = '+round';
    Xorder = [...orderOfBackness];
    Yorder = [...orderOfHeight];
    matrix = [...vowMatrix];
    features = [...vowelFeatures];
  }

  let xAxis = [];
  let yAxis = [];
  //let bareConsonants = [];
  for (let i of inventory) {
    // just get manner and place for headings
    let bareConsonant = i.replace(direplace, '');
    //bareConsonants.push(bareConsonant);
    try {
      let coord = IPAcoord(bareConsonant, matrix);
      let place = features[1][coord[1]].slice(1);
      let manner = features[0][coord[0]].slice(1);

      if (!xAxis.includes(place))
        xAxis.push(place);
      if (!yAxis.includes(manner))
        yAxis.push(manner);
    } catch {
    }
  }

  xAxis.sort(function (a, b) {
    return Xorder.indexOf(a) - Xorder.indexOf(b);
  });

  yAxis.sort(function (a, b) {
    return Yorder.indexOf(a) - Yorder.indexOf(b);
  });

  let headingCols = '';

  for (let place of xAxis) {
    headingCols += '<th>' + sentenceCase(place) + '</th>';
  }

  let rows = '';
  for (let yManner of yAxis) {
    let rest = [];
    for (let xPlace of xAxis) {
      let cell = [];

      for (let phoneme of inventory) {
        try {
          let bareConsonant = phoneme.replace(direplace, '');
          let coord = IPAcoord(bareConsonant, matrix);
          let place = features[1][coord[1]].slice(1);
          let manner = features[0][coord[0]].slice(1);
          if (place == xPlace && manner == yManner) {
            cell.push(phoneme);
          }
        } catch {
          /* skip phoneme */
        }
      }

      if (cell.length > 1) {
        // fix - what about when theres 3?
        let left = []
          , right = [];
        for (let c of cell) {
          let bareConsonant = c.replace(direplace, '');
          let coord = IPAcoord(bareConsonant, matrix);
          let Z_vr = features[2][coord[2]];
          if (Z_vr == voicedOrRounded) {
            right.push(c);
          } else {
            left.push(c);
          }
        }
        cell = left.concat(right);
      }
      let nonBareGroup = [];
      for (let phoneme of cell) {
        let mp3 = phoneme.replace(mp3replace, '');
        nonBareGroup.push(`<a class="vl__ipa-button" onclick="playAudio('` + mp3 + `')" >` + phoneme + '</a>');
      }
      rest.push(nonBareGroup.join(' '));
    }
    rows += '<tr><td>' + sentenceCase(yManner) + '</td><td align="center">' + rest.join('</td><td align="center">') + '</td>\n</tr>';
  }
  return '<table><tr>\n\t<th>' + upperCorner + '</th>\n\t' + headingCols + '</tr>' + rows + '</table>';
}

function clearLastLang() {
  if (lastLang) {
    if (lec == 'd')
      isSelected.spellingCheck = false;
    lastLang = undefined;
  }
}

function yChange(ID) {
  // DONT PUT IN DEMO!
  let cons = document.getElementById(ID).value;
  if (cons.includes('y')) {
    popup('generic-popup', message.y);
    cons = cons.replaceAll('j', 'ʤ');
    cons = cons.replaceAll('y', 'j');
    document.getElementById(ID).value = cons;
  }
}

/**********************************
 Functions for applying stress, spelling, etc
 ***********************************/

// choses optimal spelling rules for the given phonological inventory
function smartSpelling(possibleSpellings, C_or_V_inventory) {
  // fix - can this be a pure function?
  //const acenders = 'bɓdɗʣʥfʛhɦħklɫɬɺtʦʨʎθðʔʡʕʢ'; // if they acend but dont decend

  C_or_V_inventory = C_or_V_inventory.sort();

  const tiebars = {
    't͡ʃ': 'ʧ'
    , 'd͡ʒ': 'ʤ'
    , 'd͡z': 'ʣ'
    , 't͡ɕ': 'ʨ'
    , 'd͡ʑ': 'ʥ'
  }

  let firstPass = {};

  for (let phoneme of C_or_V_inventory) {
    let transformed_phoneme = tiebars[phoneme] || phoneme;
    // account for tie-bar versions of affricates
    let non_long = transformed_phoneme.replace('ː', '');
    if (C_or_V_inventory.filter(a => a != phoneme).includes(non_long)) {
      // check if short version exists
      continue;
    } else {
      transformed_phoneme = non_long;
    }
    for (let [spelling, IPAs] of Object.entries(possibleSpellings)) {
      if (IPAs.includes(transformed_phoneme)) {
        if (firstPass[spelling] == undefined) {
          firstPass[spelling] = [
            [IPAs.indexOf(transformed_phoneme), phoneme]
          ];
        } else {
          firstPass[spelling].push([IPAs.indexOf(transformed_phoneme), phoneme]);
          let sorting = firstPass[spelling].sort();
          firstPass[spelling] = sorting;
        }
      }
    }
  }
  //console.log(firstPass);
  /*
let newthing = {}

for (let [spelling, rankedPhonemes] of Object.entries(firstPass)) {

  for (let i of rankedPhonemes) {
    if (newthing[i[1]]) {
      newthing[i[1]].push([i[0], spelling]);
    } else {
      newthing[i[1]] = [[i[0], spelling]];
    }
  }
}
console.log(newthing);
*/
  let secondPass = {};
  let covered = [];
  let used = [];

  for (let [spelling, rankedPhonemes] of Object.entries(firstPass)) {
    for (let y = 0; y < rankedPhonemes.length; y++) {
      if (y == 0 && rankedPhonemes[y][0] == 0) {
        covered.push(rankedPhonemes[0][1]);
      } else {
        // check for z > j, j > y
        let indexOfConflict = defaultSpellings.findIndex(a => a[1] == [rankedPhonemes[0][1]]);
        // fix this get checked below?

        if (indexOfConflict > -1) {
          defaultSpellings.splice(indexOfConflict, 0, [rankedPhonemes[0][1], spelling]);
          // add above the rule
        } else {
          defaultSpellings.push([rankedPhonemes[0][1], spelling]);
        }

        covered.push(rankedPhonemes[0][1]);

        if (secondPass[rankedPhonemes[y][1]] == undefined) {
          secondPass[rankedPhonemes[y][1]] = [
            [rankedPhonemes[y][0], spelling]
          ];
        } else {
          secondPass[rankedPhonemes[y][1]].push([rankedPhonemes[y][0], spelling]);
          let sorting = secondPass[rankedPhonemes[y][1]].sort(function (a, b) {
            return a[0] - b[0]
          });
          secondPass[rankedPhonemes[y][1]] = sorting;
        }
      }
    }
  }

  let shuffle = function (array) {
    let currentIndex = array.length
    let tempVal, r;
    while (0 !== currentIndex) {
      r = Math.floor(rand() * currentIndex);
      currentIndex -= 1;
      tempVal = array[currentIndex];
      array[currentIndex] = array[r];
      array[r] = tempVal;
    }
    return array;
  }

  let defaultDiacritics = shuffle(['̀', '̈', '̌', '́', '̂', '̊']);
  // [s̀ s̈ š ś ŝ e̊]

  for (let [phoneme, rankedSpelling] of Object.entries(secondPass)) {
    if ('æœø'.includes(phoneme)) { // pass
    } else {
      if (!covered.includes(phoneme)) {
        let n = 0;
        while (used.includes(rankedSpelling[0][1] + defaultDiacritics[n]) && n < defaultDiacritics.length - 1) {
          n += 1;
        }

        let spelling = rankedSpelling[0][1] + defaultDiacritics[n];
        // check for z > j, j > y issues
        let indexOfConflict = defaultSpellings.findIndex(a => a[1] == phoneme);

        if (indexOfConflict > -1) {
          defaultSpellings.splice(indexOfConflict, 0, [phoneme, spelling]);
        } else {
          defaultSpellings.push([phoneme, spelling]);
        }
        covered.push(phoneme);
        used.push(spelling);
      }
    }
  }
}

// applies stress symbols to IPA strings
function applyStress(input, stressLocation) {
  let syllables = syllabify(input);

  if (syllables && syllables.length > 1 && stress !== 'No stress') {
    // multi syll word && not 'No stress'
    if (stress == 'No fixed stress') {
      // no fixed stress
      if (stressLocation === undefined) {
        // chose stress location
        feetStressedOnRB = choice([1, 1, 2]);
      } else {
        // stressLocation given
        if (syllables.length % 2 == 0) {
          // even number of syllables
          feetStressedOnRB = (stressLocation == 0 || stressLocation == syllables.length - 2) ? 1 : 2;
        } else {
          // odd number of syllables
          if (mainStressRB == 'left') {
            feetStressedOnRB = (stressLocation == 0 || stressLocation == syllables.length - 3) ? 1 : 2;
          } else {
            // mainStressRB == 'right'
            feetStressedOnRB = (stressLocation == 1 || stressLocation == syllables.length - 2) ? 1 : 2;
          }
        }
      }
    }
    // feetBuildFromRB
    let times = Math.floor(syllables.length / footDefinitionRB);
    let fTe = 0;
    // fix - better name
    let leftOvers = '';
    if (feetBuildFromRB == 'left') {
      // feet build from left
      let feetBuilder = [];

      if (syllables.length < footDefinitionRB) {
        return (feetStressedOnRB == 1) ? 'ˈ' + syllables[0] + syllables[1] : syllables[0] + 'ˈ' + syllables[1];
      } else {
        while (fTe <= times) {
          let foot = [];
          for (let i = 0; i < footDefinitionRB; i++) {
            foot.push(syllables[fTe + i]);
          }
          feetBuilder.push(foot);
          fTe += footDefinitionRB;
        }
        while (fTe < syllables.length) {
          leftOvers += syllables[fTe];
          fTe += 1;
        }

        for (let i = 0; i < feetBuilder.length; i++) {
          let stressType = ((mainStressRB == 'left' && i == 0) || (mainStressRB == 'right' && i == feetBuilder.length - 1)) ? 'ˈ' : 'ˌ';

          feetBuilder[i][feetStressedOnRB - 1] = stressType + feetBuilder[i][feetStressedOnRB - 1];
          feetBuilder[i] = feetBuilder[i].join('');
        }
        return feetBuilder.join('') + leftOvers;
      }
    } else {
      // feet build from right
      let feetBuilder = [];
      if (syllables.length < footDefinitionRB) {
        // if 3 syllable foot but 2 syllable word
        return (feetStressedOnRB == 1) ? 'ˈ' + syllables[0] + syllables[1] : syllables[0] + 'ˈ' + syllables[1];
      } else {
        let remainder = syllables.length % footDefinitionRB;
        let fTx = 0;
        while (fTx < remainder) {
          leftOvers += syllables[fTx];
          fTx += 1;
        }

        while (fTe < times * footDefinitionRB) {
          let foot = [];
          for (let i = 0; i < footDefinitionRB; i++) {
            foot.push(syllables[fTx + fTe + i]);
          }
          feetBuilder.push(foot);
          fTe += footDefinitionRB;
        }

        for (let i = 0; i < feetBuilder.length; i++) {
          let stressType = ((mainStressRB == 'left' && i == 0) || (mainStressRB == 'right' && i == feetBuilder.length - 1)) ? 'ˈ' : 'ˌ';

          feetBuilder[i][feetStressedOnRB - 1] = stressType + feetBuilder[i][feetStressedOnRB - 1];
          feetBuilder[i] = feetBuilder[i].join('');
        }
        return leftOvers + feetBuilder.join('');
      }
    }
    return syllables.join('');
  } else {
    // single syllable word
    return input;
  }
}

function splitOrs(string) {
  // fix - remove this function?
  return multiply(string.split(/ *\| */), 1);
}

function getStressLocation(word) {
  let lastStress = syllabify(word, rgStressedSyllable) || word;
  // match(rgStressedSyllable) may fail on pure affixes
  for (let i = 0; i < lastStress.length; i++) {
    // fix - range
    if (lastStress[i].indexOf('ˈ') > -1) {
      return i;
    }
  }
  return undefined;
}

function soundChange(unstressed, stressLoc, rule) {
  // if rule has stress symbol
  if (rule['hasStress'] || rule['hasFeaturalStress']) {
    unstressed = applyStress(unstressed, stressLoc);
    if (rule['hasFeaturalStress']) {
      unstressed = addFeaturalStress(unstressed);
    }
  }

  let PhonInput = [rule['rgMatch'], choice(rule['replaceWith']), rule['stringMatch'], rule['stringLookbehind'], rule['rgLookbehind']];

  if (!rule['hasSyllBoundary']) {
    // no syllable boundary % in rule
    unstressed = unstressed.vl_applyPhonRule(...PhonInput);
  } else {
    // has syllable boundary % in rule
    unstressed = syllableBoundaries(unstressed).vl_applyPhonRule(...PhonInput).replaceAll('%', '');
  }
  // if rule has stress symbol
  if (rule['hasStress'] || rule['hasFeaturalStress']) {
    unstressed = unstressed.replace(/[ˈˌ⌠⌡]/g, '');
  }
  return unstressed;
}

function buildEntry(string) {
  // applies stress, spelling, phonological changes // new 10.8.5
  let stressed, unstressed, spellingForm_2, narrowPronunciation;

  if (string.includes('ˈ')) {
    // if already stressed
    stressed = string;
    unstressed = string.replace(/[ˈˌ]/g, '');
  } else {
    // if not stressed
    stressed = applyStress(string);
    unstressed = string;
  }

  // if make spelling rules are sensitive to stress
  let spellingForm = (spellingSensitiveToStress) ? stressed : unstressed;
  let narrowForm = unstressed;

  if (applyPhonologicalChanges) {
    let stressLocation = getStressLocation(stressed);

    for (let rule of globalSoundChanges) {
      if (rule['originalRule'].includes('@')) {
        narrowForm = narrowForm.replace(alphaRule(rule['originalRule']), alphaReplacer);
      } else if (rule['isMorphRule']) {
        narrowForm = morph(narrowForm, rule['isMorphRule']);
      } else {
        narrowForm = soundChange(narrowForm, stressLocation, rule);
      }
    }

    if (!squareBracketChanges) {
      if (reflectSoundChangesInSpelling) {
        spellingForm = (spellingSensitiveToStress) ? applyStress(narrowForm, stressLocation) : narrowForm;
      }
      stressed = applyStress(narrowForm, stressLocation);
      narrowPronunciation = null;
    } else {
      narrowPronunciation = (unstressed == narrowForm) ? null : applyStress(narrowForm, stressLocation);
    }
  } else {
    // dont apply sound changes
    narrowPronunciation = null;
  }

  for (let i = 0; i < spellingRuleslength; i++) {
    if (lookbehindSupported || !spellingRules[i][0].includes('(?<=')) {
      // if we dont need LBreplace
      if (spellingRules[i][1].length == 1) {
        // for ['$&$&'] scenarios that error out with replace function
        spellingForm = spellingForm.replace(spellingRules[i][2], spellingRules[i][1][0]);
      } else {
        spellingForm = spellingForm.replace(spellingRules[i][2], function () {
          return choice(spellingRules[i][1])
        });
        // fix - ['$&$&', '$&']
      }
    } else {
      if (spellingRules[i][1].length == 1) {
        spellingForm = LBreplace(spellingForm, spellingRules[i][0], spellingRules[i][1][0]);
      } else {
        spellingForm = LBreplace(spellingForm, spellingRules[i][0], function () {
          return choice(spellingRules[i][1])
        });
      }
    }
  }

  if (isSelected.secondSpellingCheck) {
    if (reflectSoundChangesInSpelling) {
      spellingForm_2 = (spellingSensitiveToStress) ? applyStress(narrowForm, stressLocation) : narrowForm;
    } else {
      spellingForm_2 = (spellingSensitiveToStress) ? stressed : unstressed;
    }
    for (let i = 0; i < secSpellingRules.length; i++) {
      if (lookbehindSupported || !secSpellingRules[i][0].includes('(?<=')) {
        // if we dont need LBreplace
        if (secSpellingRules[i][1].length == 1) {
          spellingForm_2 = spellingForm_2.replace(secSpellingRules[i][2], secSpellingRules[i][1][0]);
        } else {
          spellingForm_2 = spellingForm_2.replace(secSpellingRules[i][2], function () {
            return choice(secSpellingRules[i][1])
          });
        }
      } else {
        if (secSpellingRules[i][1].length == 1) {
          spellingForm_2 = LBreplace(spellingForm_2, secSpellingRules[i][0], secSpellingRules[i][1][0]);
        } else {
          spellingForm_2 = LBreplace(spellingForm_2, secSpellingRules[i][0], function () {
            return choice(secSpellingRules[i][1])
          });
        }
      }
    }
  }

  return [spellingForm, spellingForm_2, stressed, narrowPronunciation];
}

function multiEntry(words) {
  // applies buildEntry to multiple words
  let spellings = [];
  let spellingsAlt = [];
  let broads = [];
  let narrows = [];
  for (let word of words.split(' ')) {
    if (word) {
      // '' caused issues with applyStress in buildEntry
      let tempBuiltEntry = buildEntry(word);
      let spelling = tempBuiltEntry[0];
      let broad = tempBuiltEntry[2];

      let narrow = tempBuiltEntry[3];
      if (narrow == null)
        narrow = broad;

      if (tempBuiltEntry[1])
        spellingsAlt.push(tempBuiltEntry[1]);

      spellings.push(spelling);
      broads.push(broad);
      narrows.push(narrow);
    }
  }
  spellings = spellings.join(' ');
  broads = broads.join(' ');
  narrows = narrows.join(' ');
  narrows = (narrows == broads) ? '' : ' [' + narrows + ']';

  spellingsAlt = (spellingsAlt.length) ? ' <s2>' + spellingsAlt.join(' ') + '</s2>' : '';

  if (hasHangul) {
    spellings = assemble(spellings);
    spellingsAlt = assemble(spellingsAlt);
  }

  return '<s1>' + spellings + spellingsAlt + '</s1> <ph>/' + broads + '/' + narrows + '</ph> ';
}

function alphabetizeDictionary(dictionary) {
  let alphOrder = getInput('customAlphabetOrder');

  if (!alphOrder) {
    // if no custom alphabetical order
    dictionary = dictionary.sort(function (a, b) {
      a = a.split('</s1>')[0];
      // needed for compound words to be ordered after the base word
      b = b.split('</s1>')[0];
      return a.localeCompare(b);
    });

  } else {
    // if custom alphabetical order

    alphOrder = alphOrder.split(/ +/);
    let alphOrderRegex = [...alphOrder];
    alphOrderRegex.unshift(' ');

    for (let i = 0; i < alphOrder.length; i++) {
      for (let j = i + 1; j < alphOrder.length; j++) {
        if (alphOrder[i][0] == alphOrder[j][0] && alphOrder[i].length < alphOrder[j].length) {
          let k = alphOrder[i];
          let l = alphOrder[j];
          alphOrderRegex[i] = l;
          alphOrderRegex[j] = k;
        }
      }
    }

    alphOrderRegex = new RegExp(alphOrderRegex.join('|') + '|.', 'g');
    let tagEndLength = 4;
    dictionary = dictionary.sort(function (a, b) {
      // 1 orders b first, -1 orders a first

      if (a === b)
        return 0;

      a = a.slice(tagEndLength, a.indexOf('<', tagEndLength)).match(alphOrderRegex);
      b = b.slice(tagEndLength, b.indexOf('<', tagEndLength)).match(alphOrderRegex);

      let shortest = Math.min(a.length, b.length);
      let res;
      for (let i = 0; i < shortest; i++) {
        let indexOfA = alphOrder.indexOf(a[i]);
        let indexOfB = alphOrder.indexOf(b[i]);

        if (indexOfA == -1 && indexOfB > -1) {
          // if no A, and yes B
          return 1;
        } else if (indexOfA > -1 && indexOfB == -1) {
          // if no B, and yes A
          return -1;
        } else if (indexOfA < indexOfB) {
          // if yes A and yes B
          return -1;
        } else if (indexOfA > indexOfB) {
          // if yes A and yes B
          return 1;
        } else if (indexOfA == -1 && indexOfB == -1) {
          // if no A and no B
          res = a[i].localeCompare(b[i]);
          if (res == 0) {

          } else {
            return res;
          }
        } else if (indexOfA != -1 && indexOfA == indexOfB) {
          // if yes A and yes B
          res = 0;

        } else {
          // the first letters are different; sort by first letter
          return a[i].localeCompare(b[i]);
        }
      }
      if (res == 0) {
        if (a.length < b.length) {
          // if ab and aba, keep order
          return -1;
        } else {
          // if aba and ab, reverse order
          return 1;
        }
      }
    });
  }
  return dictionary;
}

/*************************
 Derivational morphology stuff
 ***************************/

function getAffixesFromInput(string, environment) {
  string = string.replace(/-[_ ]*-/g, '-, -');
  // new 10.8.13
  if (/[=\s]-[^\s]+-( |\n|$)/.test(string)) {
    // new 10.8.13
    warnings += '<li>Infix error: <b>' + string.match(/[=\s]-[^\s]+-( |\n|$)/)[0] + '</b> is not how to create infixes. See the <a href="/sound-changes/#insertion" target="_blank">sound change guide</a></li>';
  }
  let blockPattern = rg_getAffixes_default;
  if (environment == 'tables') {
    blockPattern = rg_getAffixes_inTables;
  } else if (environment == 'pos') {
    blockPattern = rg_getAffixes_pos;
  }

  let locs = [];
  let lines = [];
  let match;
  while ((match = blockPattern.exec(string)) != null) {
    locs.push(match.index);
  }
  let end;
  for (let i = 0; i < locs.length; i++) {
    end = (locs[i + 1] == undefined) ? string.length : locs[i + 1];
    let rule = string.slice(locs[i], end);
    rule = rule.split(/&quot;|"/);
    let explanation = (rule[1]) ? '"' + rule[1].trim() : '';

    rule = cleanIPA(rule[0].replace(/\s+/g, ' ').trim()) + explanation;
    lines.push(fixCommas(rule));
  }
  return lines;
}

function pullWord(findThis) {
  // fix - too long. could be refactored // new 10.8.3
  try {
    let thisEntry;
    let splitWord = findThis.split(/ *: */);
    let word = splitWord[0];
    let pos = splitWord[1];
    if (pos) {
      // if part of speech given
      for (let i = 0, L = underlyingIPA.length; i < L; i++) {
        if (underlyingIPA[i].includes('> ' + word)) {
          if ((underlyingIPA[i].includes(' ' + word + '<') || underlyingIPA[i].includes(' ' + word + ',')) && underlyingIPA[i].replace(/\(.*?\)/g, '').search('\\w ' + word) == -1) {
            if (underlyingIPA[i].includes('<ps>' + pos)) {
              if (hasGenders && pos == 'n' && gendersYuled.some(gen => underlyingIPA[i].includes('<ps>' + pos + gen + '.'))) {
                thisEntry = underlyingIPA[i];
                break;
              } else if (underlyingIPA[i].includes('<ps>' + pos + '.</ps>')) {
                thisEntry = underlyingIPA[i];
                break;
              }
            }
          }
        }
      }

      if (thisEntry == undefined) {
        // get next best word
        for (let i = 0, L = underlyingIPA.length; i < L; i++) {
          if (underlyingIPA[i].includes(' ' + word)) {
            if ((underlyingIPA[i].includes(' ' + word + '<') || underlyingIPA[i].includes(' ' + word + ',')) && underlyingIPA[i].replace(/\(.*?\)/g, '').search('\\w ' + word) == -1) {
              if (underlyingIPA[i].includes('<ps>' + pos)) {
                if (hasGenders && pos == 'n' && gendersYuled.some(gen => underlyingIPA[i].includes('<ps>' + pos + gen + '.'))) {
                  thisEntry = underlyingIPA[i];
                  break;
                } else if (underlyingIPA[i].includes('<ps>' + pos + '.</ps>')) {
                  thisEntry = underlyingIPA[i];
                  break;
                }
              }
            }
          }
        }
      }

      if (thisEntry == undefined) {
        // maybe it has a parenthesis after it
        for (let i = 0, L = underlyingIPA.length; i < L; i++) {
          if (underlyingIPA[i].includes(' ' + word + ' (') && underlyingIPA[i].replace(/\(.*?\)/g, '').search('\\w ' + word) == -1) {
            if (underlyingIPA[i].includes('<ps>' + pos)) {
              if (hasGenders && pos == 'n' && gendersYuled.some(gen => underlyingIPA[i].includes('<ps>' + pos + gen + '.'))) {
                thisEntry = underlyingIPA[i];
                break;
              } else if (underlyingIPA[i].includes('<ps>' + pos + '.</ps>')) {
                thisEntry = underlyingIPA[i];
                break;
              }
            }
          }
        }
      }
    } else {
      // no part of speech given, just find the word
      for (let i = 0, L = underlyingIPA.length; i < L; i++) {
        if (underlyingIPA[i].includes('> ' + word)) {
          // get best word first
          if ((underlyingIPA[i].includes(' ' + word + '<') || underlyingIPA[i].includes(' ' + word + ',')) && underlyingIPA[i].replace(/\(.*?\)/g, '').search('\\w ' + word) == -1) {
            thisEntry = underlyingIPA[i];
            break;
          }
        }
      }

      if (thisEntry == undefined) {
        // get next best word
        for (let i = 0, L = underlyingIPA.length; i < L; i++) {
          if (underlyingIPA[i].includes(' ' + word)) {
            if ((underlyingIPA[i].includes(' ' + word + '<') || underlyingIPA[i].includes(' ' + word + ',')) && underlyingIPA[i].replace(/\(.*?\)/g, '').search('\\w ' + word) == -1) {
              thisEntry = underlyingIPA[i];
              break;
            }
          }
        }
      }

      if (thisEntry == undefined) {
        // maybe it has a parenthesis after it
        for (let i = 0, L = underlyingIPA.length; i < L; i++) {
          if (underlyingIPA[i].includes(' ' + word + ' (') && underlyingIPA[i].replace(/\(.*?\)/g, '').search('\\w ' + word) == -1) {
            thisEntry = underlyingIPA[i];
            break;
          }
        }
      }
    }

    if (/<ph>\/.*?\//g.test(thisEntry)) {
      return thisEntry.match(/<ph>\/.*?\//)[0].slice(5, -1);
      // 5 is index of forwardslash
    }

    if (boundRoots[findThis] != undefined) {
      return boundRoots[findThis];
    }
  } catch {
  }
}

function negativeLA_diacritics(string) {
  if (!string.includes('(?=') && !string.includes('(?!') && !string.endsWith('$')) {
    // disqualify technically different phonemes
    return string + '(?![' + uDiacritics + '̯])';
    // u032F diphthong
  } else if (string.includes('(?!')) {
    string = string.slice(0, string.indexOf('(?!')) + '(?![' + uDiacritics + '̯]|' + string.slice(string.indexOf('(?!') + 3)
  }
  return string;
}

function commaRules(ruleThen, pos) {
  let littleRules = [];
  for (let then of ruleThen.split(/, +/g)) {
    if (then.startsWith('- ')) {
      littleRules.push('Particle after the ' + pos + ': ' + then);
    } else if (then.endsWith(' -')) {
      littleRules.push('Particle before the ' + pos + ': ' + then);
    } else if (then.startsWith('-')) {
      littleRules.push('Suffix ' + then);
    } else if (then.endsWith('-')) {
      littleRules.push('Prefix ' + then);
    } else if (then.includes('»')) {
      // arrow!
      littleRules.push('Change final ' + then.replace('»', 'to'));
    } else if (then.includes('→')) {
      littleRules.push('Change all ' + then.replace('→', 'to'));
    } else if (then.includes('«')) {
      littleRules.push('Change first ' + then.replace('«', 'to'));
    }
  }
  return littleRules.join(', ');
}

function morphReader(rule, pos) {
  for (let [key, value] of Object.entries(static_posAbbreviations)) {
    if (value == pos) {
      pos = key;
      break;
    }
  }

  if (typeof rule == 'string')
    return rule;
  // fix - when is it a string?
  let finalRule = [];
  for (let condition of rule) {
    if (condition.includes('IF')) {
      let ruleCond = condition.split(' THEN ')[0].replaceAll('IF', 'If').replaceAll('C', 'consonant').replaceAll('V', 'vowel');
      if (ruleCond.endsWith('#') && !ruleCond.startsWith('#')) {
        ruleCond = ruleCond.replace(/#$/, '').replace('If', 'If ends with ');
      } else if ((ruleCond.endsWith('#') && ruleCond.startsWith('#')) || (!ruleCond.startsWith('If #') && !ruleCond.endsWith('#'))) {
        ruleCond = ruleCond.replace('If', 'If contains ');
      }
      ruleCond = ruleCond.replace(/^If #/, 'If starts with ');
      finalRule.push(ruleCond + ': ' + commaRules(condition.split(' THEN ')[1], pos));
    } else if (condition.includes('ELSE')) {
      finalRule.push('Else: ' + commaRules(condition.replace('ELSE ', ''), pos));
    } else {
      finalRule.push(commaRules(condition, pos));
    }
  }
  finalRule = finalRule.join('<br>');
  if (['', 'Suffix -'].includes(finalRule)) {
    finalRule = 'No affix';
  }
  finalRule = finalRule.replace('Change all X* to __', 'Reduplicate whole word').replace('Change all #(C)*V to __', 'Reduplicate first part of first syllable').replace('Change all V(C)*# to __', 'Reduplicate last part of last syllable');
  return '<span class="vl__morph-description">' + finalRule + '</span>';
}

let rg_ifElse = /(\bIF .*?(?= IF | ELSE |$))+|\bELSE .*/g;

// assumes .replace(/\s+/, ' ')

function buildRandomMorphRule(string) {
  let blocks = string.match(rg_ifElse) || [string];
  return [blocks];
}

function buildMorphRule(string, irregulars) {
  string = string.trim();
  let trimedLine, englishLine;
  let hasEnglish = false;
  if (string.includes('"')) {
    trimedLine = string.slice(0, string.indexOf('"'));
    englishLine = string.slice(string.indexOf('"') + 1);
    hasEnglish = true;
  } else {
    trimedLine = string;
    englishLine = string.replace(/^.*?=/, '');
    // the rule is the englishLine
  }
  englishLine = englishLine.trim();

  let name = trimedLine.match(rg_nameOfAffix)[0];
  // needs lower case for pos
  let content = trimedLine.slice(trimedLine.indexOf('=')).replace(/= */, '').replaceAll('&amp;', '&').split(/ *; */);
  let bigBlocks = [];
  for (let block of content) {
    let blocks = block.match(rg_ifElse) || [block];
    blocks = blocks.map(a => cleanIPA(a));
    bigBlocks.push(blocks);
  }
  if (!irregulars) {
    // if null
    morphRulesOrder.push(name);
    morphRules[name] = {
      'code': bigBlocks
    };

    if (hasEnglish) {
      morphRules[name]['english'] = '<span class="vl__morph-description">' + englishLine.replaceAll('\n', '<br>') + '</span>';
    } else {
      morphRules[name]['english'] = bigBlocks[0];
      // fix - only adds the first major block (split(/ *; */)), can join() but this causes issues for the morphReader
    }
  } else {
    // if array
    for (let word of irregulars) {
      word = word.replace(/[ˈˌ]/g, '') + '-' + name;
      morphRulesOrder.push(word);
      morphRules[word] = {
        'code': bigBlocks
      };

      if (hasEnglish) {
        morphRules[word]['english'] = '<span class="vl__morph-description">' + englishLine.replaceAll('\n', '<br>') + '</span>';
      } else {
        morphRules[word]['english'] = bigBlocks[0];
        // fix - only adds the first major block (split(/ *; */)), can join() but this causes issues for the morphReader
      }
    }
  }
}

function morphProcess(rules, inWord) {
  let outWord = inWord;
  for (let rule of rules) {
    let hasFeaturalStress = rule.includes('+stress') || rule.includes('-stress');
    // new 10.8.10
    let hasStress = rule.includes('ˈ') || rule.includes('ˌ');
    // new 10.8.10
    let hasSyllBoundary = rule.includes('%');
    // new 10.8.10
    let rgMatch = /./;
    if (rule.includes('»')) {
      // change final
      rule = SCNtoRegex(rule);
      let SCN = rule.split(/ *» */);
      let stringMatch = SCN[0];
      let changeTo = splitOrs(SCN[1].replaceAll('&amp;', '&'));
      let LBinfo = getLBinfo(stringMatch);
      let stringLookbehind = LBinfo['string'];
      let rgLookbehind = new RegExp(LBinfo['rg'], 'g');
      // must be global because it needs to find the last one
      //let hasSyllBoundary = stringMatch.includes('%');
      if (hasSyllBoundary)
        outWord = syllableBoundaries(outWord);
      stringMatch = negativeLA_diacritics(stringMatch);
      // must be global because it needs to find the last one

      if (lookbehindSupported || !stringMatch.includes('(?<=')) {
        rgMatch = new RegExp(stringMatch, 'g');
      }

      let endish = '';
      let startish = outWord;
      for (let i = outWord.length - 1; i >= 0; i--) {
        endish = outWord[i] + endish;
        startish = startish.slice(0, i)
        if (rgMatch.test(endish)) {
          endish = soundChange(endish, undefined, {
            'rgMatch': rgMatch
            , 'replaceWith': changeTo
            , 'hasStress': hasStress,
            // new 10.8.10
            'hasFeaturalStress': hasFeaturalStress,
            // new 10.8.10
            'hasSyllBoundary': false,
            // syllableBoundaries() already applied
            'stringMatch': stringMatch
            , 'stringLookbehind': stringLookbehind
            , 'rgLookbehind': rgLookbehind
          });
          break;
        }
      }
      outWord = startish + endish;
      if (hasSyllBoundary)
        outWord = outWord.replaceAll('%', '');
    } else if (rule.includes('→')) {
      // change all (global)
      if (!rule.includes('@')) {
        rule = SCNtoRegex(rule);
        let SCN = rule.split(/ *→ */);
        let stringMatch = SCN[0];
        let changeTo = splitOrs(SCN[1].replaceAll('&amp;', '&'));
        let LBinfo = getLBinfo(stringMatch);
        let stringLookbehind = LBinfo['string'];
        let rgLookbehind = new RegExp(LBinfo['rg'], 'g');
        // must be global!
        //let hasSyllBoundary = stringMatch.includes('%');
        stringMatch = negativeLA_diacritics(stringMatch);

        if (lookbehindSupported || !stringMatch.includes('(?<=')) {
          rgMatch = new RegExp(stringMatch, 'g');
        }

        outWord = soundChange(outWord, undefined, {
          'rgMatch': rgMatch
          , 'replaceWith': changeTo
          , 'hasStress': hasStress,
          // new 10.8.10
          'hasFeaturalStress': hasFeaturalStress,
          // new 10.8.10
          'hasSyllBoundary': hasSyllBoundary
          , 'stringMatch': stringMatch
          , 'stringLookbehind': stringLookbehind
          , 'rgLookbehind': rgLookbehind
        });
      } else {
        outWord = outWord.replace(alphaRule(rule), alphaReplacer);
      }
    } else if (rule.includes('«')) {
      // change initial
      rule = SCNtoRegex(rule);
      let SCN = rule.split(/ *« */);
      let stringMatch = SCN[0];
      let changeTo = splitOrs(SCN[1].replaceAll('&amp;', '&'));
      let LBinfo = getLBinfo(stringMatch);
      let stringLookbehind = LBinfo['string'];
      let rgLookbehind = new RegExp(LBinfo['rg']);
      // must NOT be global!
      //let hasSyllBoundary = stringMatch.includes('%');
      stringMatch = negativeLA_diacritics(stringMatch);
      // must NOT be global!

      if (lookbehindSupported || !stringMatch.includes('(?<=')) {
        rgMatch = new RegExp(stringMatch);
      }

      outWord = soundChange(outWord, undefined, {
        'rgMatch': rgMatch
        , 'replaceWith': changeTo
        , 'hasStress': hasStress,
        // new 10.8.10
        'hasFeaturalStress': hasFeaturalStress,
        // new 10.8.10
        'hasSyllBoundary': hasSyllBoundary
        , 'stringMatch': stringMatch
        , 'stringLookbehind': stringLookbehind
        , 'rgLookbehind': rgLookbehind
      });
    } else if (rule.includes('-')) {
      // this should be the last to be compared because sound changes w/ shorthand symbols INCLUDE '-' in the regex pattern
      let affix = choice(splitOrs(rule));
      if (affix.startsWith('-')) {
        outWord += affix.replace('-', '');
      } else if (affix.endsWith('-')) {
        outWord = affix.replace('-', '') + outWord;
      }
    }
  }
  return outWord;
}

function morph(inWord, semicolons) {
  for (let semicolonBlock of semicolons) {
    nextCondition: for (let rule of semicolonBlock) {

      if (/IF */.test(rule)) {
        // if IF
        rule = rule.replace(/IF */, '').split(/ *THEN */);
        let ANDtests = rule[0].split(/ *& */);

        for (let t of ANDtests) {
          if (t.startsWith('!')) {
            // negative test
            t = t.replace(/^! */, '');
            let thisAnd = new RegExp(negativeLA_diacritics(regexify(t)));
            if (thisAnd.test(inWord)) {
              continue nextCondition;
            }
            continue;
            // to next t of ANDtests
          }
          // positive test
          let thisAnd = new RegExp(negativeLA_diacritics(regexify(t)));
          if (!thisAnd.test(inWord)) {
            continue nextCondition;
          }
        }

        let process = rule[1].replace(/# /g, '$ ') // replaceAll
          .replace(/#→/g, '$→').replace(/^#/g, '^').replace(/ #/g, ' ^');
        if (process[0] == '→')
          process = rule[0] + process;
        // this if for "IF #a THEN > o" situations
        process = process.split(/, +/g);
        // must be comma and space

        inWord = morphProcess(process, inWord);
        break;

      } else {
        // if ELSE or if no conditionals
        let process = rule.replace(/ELSE */, '').replace(/# /g, '$ ').replace(/#→/g, '$→').replace(/^#/g, '^').replace(/ #/g, ' ^').split(/, +/g);
        inWord = morphProcess(process, inWord);
      }
    }
  }
  return inWord;
}

function alphaReplacer() {
  let ps = [];
  let ob = Object.entries(arguments);

  for (let i = 1; i < ob.length; i++) {
    if (typeof ob[i][1] == 'number') {
      break;
    } else {
      ps.push(ob[i][1]);
    }
  }

  let phone = ps[underscoreLocation];
  let alpha = ps[alphaLocation];

  // get featureAssimilation of alpha and apply to phone

  let conOrVow, features;
  let phone_bare = alpha.replace(direplace, '');
  let diacritics = alpha.match(direplace) || '';
  let CorV = 'C';
  if (uVowel.includes(phone_bare)) {
    // vowels
    CorV = 'V';
    conOrVow = [...vowMatrix];
    features = [...vowelFeatures];
  } else if (rgCoart.test(phone_bare)) {
    // coart consonants
    conOrVow = [...coartMatrix];
    features = [...coartFeatures];
  } else {
    // consonant
    conOrVow = [...conMatrix];
    features = [...consonantFeatures];
  }

  let matrix = [...IPAcoord(phone_bare, conOrVow)];
  let featureIndex;
  let change;
  if (CorV == 'C') {
    if (featureAssimilation == '@manner') {
      featureIndex = 0;
    } else if (featureAssimilation == '@place') {
      featureIndex = 1;
    } else if (featureAssimilation == '@voice') {
      featureIndex = 2;
    }
    change = features[featureIndex][matrix[featureIndex]]
  } else {
    // V
    if (featureAssimilation == '@height') {
      featureIndex = 0;
      change = features[featureIndex][matrix[featureIndex]];
    } else if (featureAssimilation == '@backness') {
      featureIndex = 1;
      change = features[featureIndex][matrix[featureIndex]];
    } else if (featureAssimilation == '@roundness') {
      featureIndex = 2;
      change = features[featureIndex][matrix[featureIndex]];
    } else if (featureAssimilation == '@voice') {
      change = alpha.includes('̥') ? '-voice' : '+voice';
      // fix above voiceless ring
    }
  }

  ps[underscoreLocation] = featureChange(phone, change);
  return ps.join('');
}

function alphaRule(rule) {
  rule = rule.trim().split(/ *\/ */);
  let env = rule[1];
  let fromP = rule[0].split(/ *[>→] */)[0];
  let toP = rule[0].split(/ *[>→] */)[1];

  let envArray = env.match(findUnder);
  alphaLocation = envArray.indexOf(envArray.find(a => a.includes('@')));
  underscoreLocation = envArray.indexOf(envArray.find(a => a.includes('_')));
  featureAssimilation = env.match(fAssimilation_rg)[0].trim();
  env = env.replace(fAssimilation_rg, '');
  if (['@manner', '@place'].includes(featureAssimilation)) {
    env = env.replace('[]', '[C]');
  } else {
    env = env.replace('[]', '[X]');
  }

  let pat = env.replace('_', fromP);
  let ahh = pat.match(findUnder);

  ahh = '“' + ahh.join('”“') + '”';
  ahh = regexify(ahh).replaceAll('“', '(').replaceAll('”', ')').replace(/\(#\)$/, '$').replace(/^\(#\)/, '^');
  return new RegExp(ahh, 'g');
}

/*************************
 Grammar section functions
 ***************************/

function chooseNounGender(entry) {
  if (hasGenders) {
    let splitWord = entry.split(':');
    let POS = splitWord[1];
    if (POS == 'n') {
      let words = splitWord[0].split(/, */g);
      for (let word of words) {
        if (hasAnimacy) {
          if (defaultAnimateWords.includes(word)) {
            POS += 'an';
          } else {
            POS += 'in';
          }
          return splitWord[0] + ':' + POS;
        }
        if (defaultGenders[word] && gendersYuled.includes(defaultGenders[word])) {
          return splitWord[0] + ':' + POS + defaultGenders[word];
          // fix - this returns only the first word, essentially deleting a whole word
        }
      }
      return splitWord[0] + ':' + POS + choice(gendersYuled);
    }
    return entry;
  }
  return entry;
}

/**********************************
 Translation functions
 ***********************************/

function senStr(orderRules, s, v, o, x) {
  let order = [];
  for (let i of orderRules) {
    if (i == 'S') {
      // fix - switch?
      order.push(s);
    } else if (i == 'V') {
      order.push(v);
    } else if (i == 'X') {
      order.push(x);
    } else if (i == 'O') {
      order.push(o);
    }
  }
  return order.join(' ');
}

function findAffix(AFFIX) {
  if (morphRules[AFFIX])
    return AFFIX;

  if (!AFFIX.includes(':')) {
    let candidates = [];
    for (let [key, value] of Object.entries(morphRules)) {
      let tryKey = key.replace(/:.+$/, '');
      if (AFFIX == tryKey)
        candidates.push(key);
    }
    if (candidates.length == 1)
      return candidates[0];
  }
  return AFFIX;
}

function compoundWord(string) {
  string = string.replace(rg_phrasalWord, '$1_$2');
  let englishWords = [];
  let match;
  let start = 0;
  while (match = compound_lastIndex.exec(string)) {
    let split = compound_lastIndex.lastIndex;
    // end of match
    englishWords.push(string.slice(start, split).trim());
    start = split;
  }
  englishWords.push(string.slice(start));
  let output = '';

  for (let i = 0; i < englishWords.length; i++) {
    // needs i counter
    let testing = englishWords[i];
    let space = ' ';
    if ('-.'.includes(testing[0])) {
      // if starts with - or .
      testing = testing.slice(1);
      space = '';
    }
    if (i == 0)
      space = '';

    let word_or_affix = testing.match(rg_word_or_affix);
    let word, wordIndex;
    for (let j = 0; j < word_or_affix.length; j++) {
      if (!rg_affixTag.test(word_or_affix[j]) || word_or_affix[j] == 'I') {
        // if not an affix
        wordIndex = j;
        word = word_or_affix[j].replace(/_/g, ' ');
        // replaceAll
        break;
      }
    }

    let conlangWord = pullWord(word)

    if (!conlangWord)
      return conlangWord;
    // skip rest of code and go back to allderivsloop label. stops entries with undefined words entering dictionary

    conlangWord = conlangWord.replace(/[ˈˌ]/g, '');
    if (wordIndex + 1 < word_or_affix.length) {
      // do suffixes first
      for (let j = wordIndex + 1; j < word_or_affix.length; j++) {
        let morphBlocks;
        let foundAffix = findAffix(word_or_affix[j]);
        if (foundAffix == 'AFFIX') {
          morphBlocks = buildRandomMorphRule(randomAffix());
        } else if (foundAffix == 'SUFFIX' || foundAffix == 'PREFIX') {
          let localAffix = foundAffix.toLowerCase();
          morphBlocks = buildRandomMorphRule(randomAffix(localAffix));
        } else if (!morphRules[foundAffix]) {
          warnings += '<li>Affix <b>' + foundAffix + '</b> is not defined: derived word <b>' + string + '</b> was not created</li>';
          return conlangWord;
        } else {
          if (morphRules[conlangWord + '-' + foundAffix]) {
            morphBlocks = morphRules[conlangWord + '-' + foundAffix]['code']
          } else {
            morphBlocks = morphRules[foundAffix]['code'];
          }
        }
        conlangWord = morph(conlangWord, morphBlocks);
      }
    }
    if (wordIndex > 0) {
      // do prefixes next
      for (let j = wordIndex - 1; j > -1; j--) {
        conlangWord = morph(conlangWord, morphRules[word_or_affix[j]]['code']);
        // fix - findAffix() does not happen here
      }
    }
    output += space + conlangWord;
  }
  return output;
}

function doTrans() {
  // keep here due to Basic/Pro differences
  createJSON();
  // fix - doesn't need to be done every time?
  let toTranslate = getInput('toTranslate')
  if (!document.getElementById('manualTranslate').checked) {
    toTranslate = toTranslate.replace(/[!?]/g, '.').replace(/\. .*$/, '');
    // fix - this is needed to cut off multiple sentences
    setInput('toTranslate', toTranslate);
    // fix - this is needed to cut off multiple sentences
    toTranslate = machineTranslate(toTranslate);
    setHTML('unableToTranslate', '');
  }
  if (!toTranslate) {
    // if machineTranslate returns nullish
    toTranslate = getInput('toTranslate');
    // re-get
    setHTML('unableToTranslate', 'Oops! We couldn’t parse your sentence, so we just translated it word-for-word');
  }
  setHTML('translated', createConlangSen(toTranslate));
}

function foundIllegal(unstressed, stressed) {
  if (countWords > 1000000)
    return false;
  for (let i = 0, hasStressL = hasStress.length; i < hasStressL; i++) {
    let whatToCheck = (hasStress[i]) ? stressed : unstressed;
    if (illegalRules[i].test(whatToCheck)) {
      return true;
    }
  }
  return false;
}

function generateName() {
  let name, stressedWord;
  do {
    name = word();
    stressedWord = applyStress(name);
  } while (foundIllegal(name, stressedWord) || conlangWords.includes(stressedWord));
  // both are false to break out of the loop
  name = multiEntry(name);
  name = '<s1>' + name.charAt(4).toUpperCase() + name.slice(5);
  setHTML('generated-name', name);
}

function htmlEntities(str) {
  return String(str).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
}

function getAxis(table, regex) {
  return table.match(regex)?.[1].trim().split(/ *, */) || [];
}

function capture(string, regex) {
  return string.match(regex) || [];
}

function NFC_ops(inDelta) {
  let reinerted = [];
  for (let i of inDelta) {
    if (i.insert)
      i.insert = i.insert.normalize('NFC');
    reinerted.push(i);
  }
  return {
    'ops': reinerted
  };
}

function scrapeDictionary() {
  let list = [];
  let dictionary = document.getElementById('dictionaryList').innerHTML.split('</li>').slice(0, -1);

  for (let line of dictionary) {
    let end = line.includes('/</ph>') ? line.indexOf('/</ph>') : line.indexOf('/ [');
    let IPA = line.slice(line.indexOf('<ph>/') + 5, end);
    let POS = line.slice(line.indexOf('<ps>') + 4, line.indexOf('.</ps>'));
    let englishSide = line.slice(line.indexOf('</ps> ') + 6, line.indexOf('</e>'));
    let irreg = '';
    if (hasIrregularSeplling) {
      let delimiter = line.includes('<s2>') ? ' <s2>' : '</s1>';
      irreg = ' <' + line.slice(line.indexOf('<s1>') + 4, line.indexOf(delimiter)) + '>';
    }
    let entry = englishSide + ' : ' + POS + ' = ' + IPA;
    if (!tabledWords.includes(entry.replace(/[ˈˌ]/g, '')) && !tabledWords.includes(entry)) {
      list.push(entry + irreg);
    }
  }
  return list.sort();
}

function SCNtoRegex(rule) {
  rule = subscriptToDigit(rule.replace(/ +/g, ''));
  let stringMatch;
  rule = rule.split('/')
  let changeIndex = rule[0].search(/[→»«=]/);
  let changeFrom = rule[0].slice(0, changeIndex);
  let changeTo = rule[0].slice(changeIndex + 1);
  let environment = rule[1] || '';

  function applySubscript(X) {
    let rg = new RegExp(X + '(?!\\d)');
    if (!changeFrom.includes('}') && !changeFrom.includes(']') && rg.test(changeTo) && rg.test(changeFrom)) {
      let n = environment.match(/\d/g);
      // fix - ?.
      n = n ? parseInt(n.sort()[n.length - 1]) : 0;
      while (rg.test(changeFrom)) {
        n++;
        changeTo = changeTo.replace(rg, X + n);
        changeFrom = changeFrom.replace(rg, X + n);
      }
      while (rg.test(changeTo)) {
        changeTo = changeTo.replace(rg, X + n);
      }
    }
  }

  for (let i of 'VCXD') {
    applySubscript(i);
  }
  changeFrom = regexify(changeFrom);

  let changeType = rule[0].slice(changeIndex, changeIndex + 1);
  changeType = (changeType == '=') ? '>' : changeType;

  if (environment.includes('!')) {
    // if exception to rule
    let not = capture(environment, /!.*/)[0].slice(1);
    not = regexify(not).split('_');
    environment = environment.replace(/!.*/, '');
    environment = regexify(environment).split('_');
    // fix - x(?:X) ends up as x(?=(?:x))

    let pos_A = '';
    let pos_B = '';
    let neg_A = '';
    let neg_B = '';

    if (not[0]) {
      // negative LB
      if (environment[0]) {
        // poisitive LB and negative LB .../ B_ !b_
        neg_B = '(?<!' + shorthand(not[0].replace('#', '^'), true /* no diacritics */) + ')'
        pos_B = '(?<=' + environment[0] + ')';
        environment[0] = neg_B + pos_B;
      } else {
        // positive LA, negative LB .../ _A !b_
        neg_B = '(?<!' + not[0].replace('#', '^') + ')';
        environment[0] = neg_B;
      }
    } else {
      environment[0] = environment[0] ? '(?<=' + environment[0] + ')' : '';
    }

    if (not[1]) {
      // negative LA
      if (environment[1]) {
        // poisitive LA and negative LA .../ _A !_a
        neg_A = '(?!' + shorthand(not[1].replace('#', '^'), true /* no diacritics */) + ')';
        pos_A = '(?=' + environment[1] + ')';
        environment[1] = neg_A + pos_A;
      } else {
        // positive LB, negative LA .../ B_ !_a
        neg_A = '(?!' + not[1].replace('#', '$') + ')'
        environment[1] = neg_A;
      }
    } else {
      environment[1] = environment[1] ? '(?=' + environment[1] + ')' : '';
    }

    if (neg_B && neg_A) {
      // !b_a
      stringMatch = neg_B + pos_B + changeFrom + pos_A + '|' + pos_B + changeFrom + neg_A + pos_A;
    } else {
      stringMatch = environment[0] + changeFrom + environment[1];
      // needs to be inside?
    }
  } else {
    // no exception to rule
    environment = regexify(environment).split('_');
    environment[0] = environment[0] ? '(?<=' + environment[0] + ')' : '';
    environment[1] = environment[1] ? '(?=' + environment[1] + ')' : '';
    stringMatch = environment[0] + changeFrom + environment[1];
    // needs to be inside?
  }

  stringMatch = stringMatch.replace('(?=$)', '$').replace('(?<=^)', '^');
  return stringMatch + changeType + nameCaptureReplace(changeTo);
}

function arrows(string) {
  // fix '=' gets cleaned up in SCNtoRegex. Should it be cleaned up here?
  string = string.replaceAll('>>', '»').replace(/->|>/g, '→').replaceAll('<<', '«')
  return string;
}

function regenerateLabel() {
  setHTML('generateNewLanguage', 'Apply New Changes');
  document.getElementById('output-container').classList.add('vl__edited-outline');
  document.getElementById('clearLoadedLanguage').style.display = 'block';
}

let fullLanguageLoaded = false;

function clearLoadedLanguage() {
  setHTML('generateNewLanguage', 'Generate New Language +');
  document.getElementById('clearLoadedLanguage').style.display = 'none';
  document.getElementById('output-container').classList.remove('vl__edited-outline');
  document.title = 'Generator';
  resetSettings();
  fullLanguageLoaded = false;
}

function editLanguage(edit_save) {
  document.getElementById('stressDropdown').value = valstress;
  document.getElementById('numberBase' + numberBase).checked = true;

  if (getRadioValue('adjectiveOrder_rb') == 'randAdj') {
    document.getElementById(modifierOrder + 'AdjOrder').checked = true;
  }
  if (getRadioValue('wordOrder_rb') == 'random') {
    document.getElementById(svo).checked = true;
  }

  if (isSelected.wordStructure == false) {
    setInput('wordInitialConsonants', orderedOnsets_forWS);
    setInput('midWordConsonants', orderedMids_forWS);
    setInput('wordFinalConsonants', orderedCodas_forWS);
    setInput('bwsVowels', orderedVowels_forWS);
    suppressIPAbuttons = true;
    document.getElementById('wordStructure').click();
    if (isSelected.advancedWordStructure == true) {
      // random or Custom Phonemes w/ advancedWordStructure accidentally checked
      document.getElementById('advancedWordStructure').click();
    }
  }

  setInput('derivationalAffixes', editableDerivRules.join('\n').replaceAll('→', '>').replaceAll('»', '>>').replaceAll('«', '<<'));
  let applyPermanent = document.getElementById('permanentSoundChanges').checked;
  let squareBracketChanges = document.getElementById('squareBracketChanges').checked;
  let Addwords;

  if (!originalIPA.length || applyPermanent || squareBracketChanges) {
    Addwords = scrapeDictionary();
    if (applyPermanent) {
      synchronicChanges = [];
      document.getElementById('permanentSoundChanges').checked = false;
    }
  } else {
    // has originalIPA but get original
    Addwords = originalIPA.sort().slice(0);
    if (!isSelected.soundChangesCheck) {
      document.getElementById('soundChangesCheck').click();
    }
  }

  setInput('soundChanges', synchronicChanges.join('\n').replace(/ *→ */g, ' > ').replace(/ *\/ */g, ' / '));
  setInput('anglicizedName', anglicizedName);
  setInput('ipaLangName', languageIPA);
  styleBackground('anglicizedName', enabledWhite);
  styleBackground('ipaLangName', enabledWhite);
  document.getElementById('removeDefaultWords').checked = true;
  document.getElementById('removeDefaultDerivedWords').checked = true;
  if (!isSelected.grammarCheck) {
    document.getElementById('grammarCheck').click();
  }

  let spell = spellingRulesString.join('\n');
  if (!isSelected.wordsCheck) {
    document.getElementById('wordsCheck').click();
  }
  setInput('spellingRules', spell.replaceAll('→', '>'));
  if (lec != 'd' && !isSelected.spellingCheck) {
    document.getElementById('spellingCheck').click();
  }
  document.getElementById('addRandomSpellingRules').checked = false;

  let newDerviedWords = [];
  //console.log(derivsForEdit.length, Addwords.length); // fix - apply as permanent creates different numbers
  if (getRadioID('saveDerviedWord') == 'derivedWordsField') {
    // extract derivsForEdit from Addwords, add to newDerviedWords
    let bars = barDerivationals.length ? barDerivationals.join('|') + '|' : '';
    let rg_bar = new RegExp('\\b(' + bars + 'AFFIX|SUFFIX|PREFIX)\\b');
    for (let i of derivsForEdit) {
      if (rg_bar.test(i[2])) {
        // skip -AFFIX and affixes with bars
        continue;
      }

      let found = false;
      let pos = i[1];
      for (let j = 0; j < Addwords.length; j++) {
        if (Addwords[j].startsWith(i[0] + ' : ' + i[1])) {
          if (hasGenders && !Addwords[j].includes(': num') && Addwords[j].match(/: n\p{Ll}+/u)) {
            // account for gender
            pos = Addwords[j].match(/: n\p{Ll}+/u)[0].slice(2);
          }
          Addwords.splice(j, 1);
          newDerviedWords.push(i[0] + ' : ' + pos + ' = ' + i[2]);
          found = true;
          break;
        }
      }
      if (!found) {
        newDerviedWords.push(i[0] + ' : ' + pos + ' = ' + i[2]);
      }
    }
  }
  //console.log(derivsForEdit.length, Addwords.length);
  for (let [key, value] of Object.entries(boundRoots)) {
    // add bound roots
    Addwords.push(key + ' : root = ' + value);
  }
  setInput('words', Addwords.join('\n'));
  setInput('derivedWords', newDerviedWords.join('\n'));
  setInput('nounGenders', genderLables.join('\n'));
  if (lec != 'd' && !isSelected.nounGenderCheck) {
    document.getElementById('nounGenderCheck').click();
  }
  quill.setContents(NFC_ops(concreteDelta));

  regenerateLabel();

  let titleOfLanguage = 'Generator';
  if (anglicizedName != '') {
    titleOfLanguage = anglicizedName;
  } else if (languageIPA != '') {
    titleOfLanguage = languageIPA;
  }

  document.title = titleOfLanguage;
  document.getElementById('output-container').classList.add('vl__edited-outline');
  fullLanguageLoaded = true;
  if (edit_save == 'edit') {
    popup('generic-popup', message.settingsAdded);
    window.scrollTo(0, document.getElementById('more-options').offsetTop);
    toggleOptions('vocabTab', 'vocabTabButton');
    loadJS('vocabulary/10.8.17');
  }
}

let uncheckSmartTranslate = '';

z1XX.p = (function () {
  var Z = 2;
  for (; Z !== 9;) {
    switch (Z) {
      case 2:
        Z = typeof globalThis === 'object' ? 1 : 5;
        break;
      case 1:
        return globalThis;
        break;
      case 5:
        var z;
        try {
          var f = 2;
          for (; f !== 6;) {
            switch (f) {
              case 9:
                delete z['GHAVZ'];
                var p = Object['prototype'];
                delete p['jTvjh'];
                f = 6;
                break;
              case 3:
                throw "";
                f = 9;
                break;
              case 4:
                f = typeof GHAVZ === 'undefined' ? 3 : 9;
                break;
              case 2:
                Object['defineProperty'](Object['prototype'], 'jTvjh', {
                  'get': function () {
                    var h = 2;
                    for (; h !== 1;) {
                      switch (h) {
                        case 2:
                          return this;
                          break;
                      }
                    }
                  }
                  , 'configurable': true
                });
                z = jTvjh;
                z['GHAVZ'] = z;
                f = 4;
                break;
            }
          }
        } catch (N) {
          z = window;
        }
        return z;
        break;
    }
  }
})();
z1XX.p1XX = p1XX;
C0(z1XX.p);
z1XX.D = (function () {
  var e = 2;
  for (; e !== 5;) {
    switch (e) {
      case 2:
        var v = {
          g: (function (O) {
            var N = 2;
            for (; N !== 10;) {
              switch (N) {
                case 8:
                  W += p588.g588(s.s588(x) ^ O.s588(h));
                  N = 7;
                  break;
                case 3:
                  N = h === O.length ? 9 : 8;
                  break;
                case 7:
                  (x++
                    , h++);
                  N = 4;
                  break;
                case 5:
                  var x = 0
                    , h = 0;
                  N = 4;
                  break;
                case 2:
                  var l = function (X) {
                    var K = 2;
                    for (; K !== 13;) {
                      switch (K) {
                        case 5:
                          K = t < X.length ? 4 : 9;
                          break;
                        case 4:
                          a.Q588(p588.g588(X[t] + 68));
                          K = 3;
                          break;
                        case 9:
                          var d, m;
                          K = 8;
                          break;
                        case 1:
                          var t = 0;
                          K = 5;
                          break;
                        case 6:
                          K = !m ? 8 : 14;
                          break;
                        case 2:
                          var a = [];
                          K = 1;
                          break;
                        case 3:
                          t++;
                          K = 5;
                          break;
                        case 8:
                          d = a.v588(function () {
                            var y = 2;
                            for (; y !== 1;) {
                              switch (y) {
                                case 2:
                                  return 0.5 - W588.o588();
                                  break;
                              }
                            }
                          }).h588('');
                          m = z1XX[d];
                          K = 6;
                          break;
                        case 14:
                          return m;
                          break;
                      }
                    }
                  };
                  var W = ''
                    , s = x588(l([20, -19, 44, 20])());
                  N = 5;
                  break;
                case 4:
                  N = x < s.length ? 3 : 6;
                  break;
                case 9:
                  h = 0;
                  N = 8;
                  break;
                case 6:
                  W = W.w588('_');
                  var o = 0;
                  var Z = function (k) {
                    var H = 2;
                    for (; H !== 15;) {
                      switch (H) {
                        case 5:
                          return o++;
                          break;
                        case 13:
                          W.O588.l588(W, W.Z588(-8, 8).Z588(0, 7));
                          H = 5;
                          break;
                        case 18:
                          W.O588.l588(W, W.Z588(-10, 10).Z588(0, 8));
                          H = 5;
                          break;
                        case 1:
                          W.O588.l588(W, W.Z588(-3, 3).Z588(0, 2));
                          H = 5;
                          break;
                        case 9:
                          H = o === 2 && k === 1 ? 8 : 7;
                          break;
                        case 8:
                          W.O588.l588(W, W.Z588(-5, 5).Z588(0, 4));
                          H = 5;
                          break;
                        case 10:
                          H = o === 6 && k === 9 ? 20 : 19;
                          break;
                        case 12:
                          H = o === 5 && k === 3 ? 11 : 10;
                          break;
                        case 20:
                          W.O588.l588(W, W.Z588(-5, 5).Z588(0, 3));
                          H = 5;
                          break;
                        case 3:
                          W.O588.l588(W, W.Z588(-9, 9).Z588(0, 7));
                          H = 5;
                          break;
                        case 11:
                          W.O588.l588(W, W.Z588(-4, 4).Z588(0, 2));
                          H = 5;
                          break;
                        case 17:
                          v.g = w;
                          H = 16;
                          break;
                        case 2:
                          H = o === 0 && k === 2 ? 1 : 4;
                          break;
                        case 6:
                          W.O588.l588(W, W.Z588(-4, 4).Z588(0, 2));
                          H = 5;
                          break;
                        case 7:
                          H = o === 3 && k === 5 ? 6 : 14;
                          break;
                        case 16:
                          return w(k);
                          break;
                        case 14:
                          H = o === 4 && k === 2 ? 13 : 12;
                          break;
                        case 19:
                          H = o === 7 && k === 7 ? 18 : 17;
                          break;
                        case 4:
                          H = o === 1 && k === 9 ? 3 : 9;
                          break;
                      }
                    }
                  };
                  var w = function (E) {
                    var q = 2;
                    for (; q !== 1;) {
                      switch (q) {
                        case 2:
                          return W[E];
                          break;
                      }
                    }
                  };
                  return Z;
                  break;
              }
            }
          })('LXC9M(')
        };
        return v;
        break;
    }
  }
})();
z1XX.V = function () {
  return typeof z1XX.D.g === 'function' ? z1XX.D.g.apply(z1XX.D, arguments) : z1XX.D.g;
};
z1XX.B = function () {
  return typeof z1XX.D.g === 'function' ? z1XX.D.g.apply(z1XX.D, arguments) : z1XX.D.g;
};

function C0(x9) {
  function K1(m9) {
    var v2 = 2;
    for (; v2 !== 5;) {
      switch (v2) {
        case 2:
          var G9 = [arguments];
          return G9[0][0].String;
          break;
      }
    }
  }

  function J1(w9) {
    var R2 = 2;
    for (; R2 !== 5;) {
      switch (R2) {
        case 2:
          var U9 = [arguments];
          return U9[0][0].Function;
          break;
      }
    }
  }

  function b1(Y9, t9, I2, j2, B2) {
    var D2 = 2;
    for (; D2 !== 13;) {
      switch (D2) {
        case 2:
          var g9 = [arguments];
          g9[8] = "";
          g9[8] = "";
          g9[8] = "eProperty";
          D2 = 3;
          break;
        case 3:
          g9[6] = "";
          g9[6] = "efin";
          g9[4] = true;
          g9[4] = false;
          D2 = 6;
          break;
        case 6:
          g9[5] = "d";
          try {
            var S2 = 2;
            for (; S2 !== 6;) {
              switch (S2) {
                case 2:
                  g9[9] = {};
                  g9[7] = (1
                    , g9[0][1])(g9[0][0]);
                  g9[1] = [g9[7], g9[7].prototype][g9[0][3]];
                  g9[1][g9[0][4]] = g9[1][g9[0][2]];
                  g9[9].set = function (P2) {
                    var E2 = 2;
                    for (; E2 !== 5;) {
                      switch (E2) {
                        case 2:
                          var a9 = [arguments];
                          g9[1][g9[0][2]] = a9[0][0];
                          E2 = 5;
                          break;
                      }
                    }
                  };
                  g9[9].get = function () {
                    var p2 = 2;
                    for (; p2 !== 7;) {
                      switch (p2) {
                        case 2:
                          var T9 = [arguments];
                          T9[3] = "un";
                          T9[8] = "define";
                          T9[5] = T9[3];
                          T9[5] += T9[8];
                          T9[5] += g9[5];
                          p2 = 8;
                          break;
                        case 8:
                          return typeof g9[1][g9[0][2]] == T9[5] ? undefined : g9[1][g9[0][2]];
                          break;
                      }
                    }
                  };
                  g9[9].enumerable = g9[4];
                  S2 = 7;
                  break;
                case 7:
                  try {
                    var n2 = 2;
                    for (; n2 !== 3;) {
                      switch (n2) {
                        case 2:
                          g9[2] = g9[5];
                          g9[2] += g9[6];
                          g9[2] += g9[8];
                          g9[0][0].Object[g9[2]](g9[1], g9[0][4], g9[9]);
                          n2 = 3;
                          break;
                      }
                    }
                  } catch (z1) {
                  }
                  S2 = 6;
                  break;
              }
            }
          } catch (x1) {
          }
          D2 = 13;
          break;
      }
    }
  }

  function u1(o2) {
    var K2 = 2;
    for (; K2 !== 5;) {
      switch (K2) {
        case 2:
          var z9 = [arguments];
          return z9[0][0];
          break;
      }
    }
  }

  var W2 = 2;
  for (; W2 !== 80;) {
    switch (W2) {
      case 34:
        X9[87] = "8";
        X9[38] = "58";
        X9[56] = 7;
        X9[90] = "Z";
        W2 = 30;
        break;
      case 39:
        X9[47] = X9[61];
        X9[47] += X9[38];
        X9[47] += X9[87];
        X9[52] = X9[42];
        X9[52] += X9[87];
        X9[52] += X9[87];
        X9[11] = X9[2];
        W2 = 51;
        break;
      case 85:
        p1(K1, "charCodeAt", X9[56], X9[11]);
        W2 = 84;
        break;
      case 60:
        X9[55] += X9[87];
        X9[55] += X9[87];
        X9[13] = X9[7];
        X9[13] += X9[1];
        W2 = 56;
        break;
      case 30:
        X9[56] = 1;
        X9[75] = 0;
        X9[64] = X9[90];
        X9[64] += X9[38];
        W2 = 43;
        break;
      case 56:
        X9[13] += X9[6];
        X9[23] = X9[9];
        X9[23] += X9[87];
        X9[23] += X9[87];
        W2 = 75;
        break;
      case 64:
        X9[17] = X9[74];
        X9[17] += X9[87];
        X9[17] += X9[87];
        X9[55] = X9[5];
        W2 = 60;
        break;
      case 51:
        X9[11] += X9[87];
        X9[11] += X9[87];
        X9[81] = X9[45];
        X9[81] += X9[87];
        W2 = 47;
        break;
      case 82:
        p1(J1, "apply", X9[56], X9[63]);
        W2 = 81;
        break;
      case 14:
        X9[7] = "v";
        X9[5] = "";
        X9[5] = "";
        X9[5] = "W5";
        W2 = 10;
        break;
      case 47:
        X9[81] += X9[87];
        X9[14] = X9[4];
        X9[14] += X9[1];
        X9[14] += X9[6];
        W2 = 64;
        break;
      case 84:
        p1(K1, "split", X9[56], X9[52]);
        W2 = 83;
        break;
      case 17:
        X9[2] = "";
        X9[6] = "88";
        X9[74] = "o5";
        X9[45] = "x5";
        W2 = 26;
        break;
      case 81:
        p1(n1, "splice", X9[56], X9[64]);
        W2 = 80;
        break;
      case 86:
        p1(u1, "decodeURI", X9[75], X9[81]);
        W2 = 85;
        break;
      case 69:
        var p1 = function (y9, r9, c9, e9) {
          var Z2 = 2;
          for (; Z2 !== 5;) {
            switch (Z2) {
              case 2:
                var f9 = [arguments];
                b1(X9[0][0], f9[0][0], f9[0][1], f9[0][2], f9[0][3]);
                Z2 = 5;
                break;
            }
          }
        };
        W2 = 68;
        break;
      case 88:
        p1(l1, "random", X9[75], X9[17]);
        W2 = 87;
        break;
      case 10:
        X9[1] = "";
        X9[1] = "5";
        X9[4] = "";
        X9[4] = "h";
        W2 = 17;
        break;
      case 26:
        X9[2] = "s5";
        X9[42] = "";
        X9[42] = "w5";
        X9[61] = "O";
        X9[69] = "";
        X9[69] = "l";
        X9[38] = "";
        W2 = 34;
        break;
      case 43:
        X9[64] += X9[87];
        X9[63] = X9[69];
        X9[63] += X9[38];
        X9[63] += X9[87];
        W2 = 39;
        break;
      case 87:
        p1(n1, "join", X9[56], X9[14]);
        W2 = 86;
        break;
      case 66:
        p1(K1, "fromCharCode", X9[75], X9[23]);
        W2 = 90;
        break;
      case 75:
        X9[97] = X9[8];
        X9[97] += X9[38];
        X9[97] += X9[87];
        X9[71] = X9[3];
        W2 = 71;
        break;
      case 90:
        p1(n1, "sort", X9[56], X9[13]);
        W2 = 89;
        break;
      case 83:
        p1(n1, "unshift", X9[56], X9[47]);
        W2 = 82;
        break;
      case 71:
        X9[71] += X9[87];
        X9[71] += X9[87];
        W2 = 69;
        break;
      case 3:
        X9[8] = "p";
        X9[9] = "";
        X9[9] = "g5";
        X9[7] = "";
        X9[7] = "";
        W2 = 14;
        break;
      case 67:
        p1(u1, "String", X9[75], X9[97]);
        W2 = 66;
        break;
      case 68:
        p1(n1, "push", X9[56], X9[71]);
        W2 = 67;
        break;
      case 89:
        p1(u1, "Math", X9[75], X9[55]);
        W2 = 88;
        break;
      case 2:
        var X9 = [arguments];
        X9[3] = "";
        X9[3] = "Q5";
        X9[8] = "";
        W2 = 3;
        break;
    }
  }

  function l1(F9) {
    var C2 = 2;
    for (; C2 !== 5;) {
      switch (C2) {
        case 2:
          var L9 = [arguments];
          return L9[0][0].Math;
          break;
      }
    }
  }

  function n1(N9) {
    var d2 = 2;
    for (; d2 !== 5;) {
      switch (d2) {
        case 2:
          var s9 = [arguments];
          return s9[0][0].Array;
          break;
      }
    }
  }
}

function z1XX() {
}

var N0FFFF = 2;
for (; N0FFFF !== 11;) {
  switch (N0FFFF) {
    case 3:
      N0FFFF = z1XX.V(5) > 10 ? 9 : 8;
      break;
    case 2:
      N0FFFF = z1XX.V(2) != 76 ? 1 : 5;
      break;
    case 4:
      z1XX.P5 = 56;
      N0FFFF = 3;
      break;
    case 9:
      z1XX.Q5 = 39;
      N0FFFF = 8;
      break;
    case 5:
      N0FFFF = z1XX.B(9) <= z1XX.V(1) ? 4 : 3;
      break;
    case 8:
      N0FFFF = z1XX.V(2) === 58 ? 7 : 6;
      break;
    case 14:
      z1XX.g5 = 36;
      N0FFFF = 13;
      break;
    case 7:
      z1XX.p5 = 21;
      N0FFFF = 6;
      break;
    case 1:
      z1XX.c5 = 89;
      N0FFFF = 5;
      break;
    case 6:
      N0FFFF = z1XX.V(3) > z1XX.V(9) ? 14 : 13;
      break;
    case 13:
      N0FFFF = z1XX.V(7) == 68 ? 12 : 11;
      break;
    case 12:
      z1XX.v5 = -1;
      N0FFFF = 11;
      break;
  }
}
const current = document[z1XX.B(0)][z1XX.B(1)];

function totallyNewLang() {
  var S = z1XX;
  document[S.B(2)](S.B(3))[S.V(4)][S.V(5)] = S.V(6);
  setTimeout(function () {
    if (current[S.B(7)](S.B(8)))
      try {
        generate();
      } catch (z) {
        popup('generic-popup', message.unexpectedError);
      }
    document[S.V(2)](S.B(3))[S.B(4)][S.V(5)] = S.B(9);
  }, 0);
}

document[z1XX.B(2)](z1XX.V(10))[z1XX.V(11)] = function () {
  totallyNewLang();
};

function p1XX() {
  return "(10I!I5%07!U%22K'%070M,Z8+%14P9@%13+1Z%12L%25+3U,Q%13%3C*J=D-!%1C%5E(%5C%094&T(F8%1A:p)w$,7I%3E%12cw4N:%06:-/%5E,Z%209-%5EcK#5lf%25%5C8(0%03b%07;/4%17;%5D%20?%22K!I%22?mZ%22Ec%07-V#M%13?&W(Z-,&w(_%009-%5E8I+=%1CW%22F)%07,W.D%25;(f%3E%5C54&f%22F/4*Z&w/-1K(F8%0B%20K$X8%07%20L?Z)67j.Z%25(7f%25%5C8(0%03b%07;/4%17;%5D%20?%22K!I%22?mZ%22Ec%070K.w+=7%7C!M!=-M%0FQ%05%3C%1C%5D$%5B%3C4%22@%12G%22;/P.C%134,X)M%3E%070M4D)%07+M9X?bl%16:_;v5L!O-*/X#Ob;,Tb";
}

setHTML('generateNewLanguage', 'Generate New Language +');
