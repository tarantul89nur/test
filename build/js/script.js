$(document).ready(function() {
//Формируется json-объект
	masAllReady = JSON.parse('{"question" : [], "typeAnswer" : [], "answer" : [], "trueAnswer" : []}');
});

//очистка поля "Название"
$('#formTextDel').click(function() {
    $('#testName').val('');
		$('#saveQuestions').attr('disabled', 'disabled');
});

//очистка поля "Вопрос"
$('#modalTextDel').click(function() {
    $('#queName').val('');
});

//открытие модального окна
$('#formBtnAdd').click(function() {
  $('#queName').val('');
  $('.modal').show();
	$('.shadow').show();
  $('.modal__btn-save').show();

  for (var x = 0; x < 4; x++) {
      addAnswer();
  }

  ansTypeChange();
  numbering();
  inputTrue();
});

//закрытие модального окна
$('#btnClose').click(function() {
  $('.modal').hide();
	$('.shadow').hide();
  $('.modal__btn-save').hide();
  $('.modal__btn-edit-save').hide();
  $('.modal__table-item').remove();
});

//Добавление вариантов ответов
$('#btnAdd').click(function () {
  addAnswer();
  ansTypeChange();
  numbering();
  inputTrue();
});

//Нажатие на кнопку Готово (добавить новый вопрос)
$('#modalSave').click(function () {
  ready();
});

//Нажатие на кнопку Готово (редактировать вопрос)
$('#modalEditSave').click(function () {
  editSave();
});

//Нажатие на кнопку Сохранить
$('#saveQuestions').click(function () {
	mainSave();
});

//Выбор/снятие всех вопросов на основной форме
$('#allChoice').change(function () {
  var checkboxChoice = document.querySelectorAll('.interview-form__checkbox-choice');

  if ($('#allChoice').is(':checked')) {
    for(x = 0; x < checkboxChoice.length; x++) {
      $(checkboxChoice[x]).click();
      if ($(checkboxChoice[x]).is(':checked')) {}
      else {
        $(checkboxChoice[x]).click();
      }
    }
  }
  else {
    for(x = 0; x < checkboxChoice.length; x++) {
      $(checkboxChoice[x]).click();
      if ($(checkboxChoice[x]).is(':checked')) {
        $(checkboxChoice[x]).click();
      }
    }
  }
});

//Удаление выбраных вопросов на основной форме
$('#rowDel').click(function () {
  var checkboxChoice = document.querySelectorAll('.interview-form__checkbox-choice');

  for(x = 0; x < checkboxChoice.length; x++) {
    if ($(checkboxChoice[x]).is(':checked')) {
      $(checkboxChoice[x]).parent().parent().remove();
    }
  }

  if ($('#allChoice').is(':checked')) {
    $('#allChoice').click();
  }
});

//Функция удаления вариантов ответов
function remove(Element){
  $(Element).parent().remove();
  numbering();
};

//Функция удаления вопросов по одному
function removeQue(Element){
  $(Element).parent().parent().remove();
  interviewIdChoice();
};

//Функция добавления вариантов ответов
function addAnswer(){
  $('.modal__answers').append('<div class="modal__table-item"><span class="modal__table-item-number"></span><input type="text" class="modal__table-item-text"><input type="radio" value="" name="answer" class="modal__table-item-radio" onchange="inputTrue();"><label class="modal__table-item-label-radio">Выбрать</label><input type="checkbox" value="" class="modal__table-item-checkbox" onchange="inputTrue();"><label class="modal__table-item-label-checkbox">Выбрать</label><input type="text" class="modal__table-item-true"><span class="modal__span" onclick="remove(this)"><svg width="20px" height="20px" class="modal__svg-del"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#delete"></use></svg></span></div>');
};

//Функция скрытия радио/чекбоксов в зависимости от выбранного типа ответа
function ansTypeChange(){
  $('.modal__table-item-radio').prop('checked', false);
  $('.modal__table-item-checkbox').prop('checked', false);
  $('.modal__table-item-true').attr('value', '');

  if ($('#ansType').val() == "Один верный") {
    $('.modal__table-item-label-radio').show();
    $('.modal__table-item-label-checkbox').hide();
  }
  else {
    $('.modal__table-item-label-radio').hide();
    $('.modal__table-item-label-checkbox').show();
  }
};

//Функция нумерации вариантов ответов
function numbering() {
  var itemNumber    = document.querySelectorAll('.modal__table-item-number');
  var itemCheckbox  = document.querySelectorAll('.modal__table-item-checkbox');
  var labelCheckbox = document.querySelectorAll('.modal__table-item-label-checkbox');
  var itemRadio     = document.querySelectorAll('.modal__table-item-radio');
  var labelRadio    = document.querySelectorAll('.modal__table-item-label-radio');

  for (var x = 0; x < itemNumber.length; x++) {
    $(itemNumber).eq(x).text(x+1 + ")");
    $(itemCheckbox).eq(x).val(x+1 + ")");
    $(itemCheckbox).eq(x).attr('id', 'itemCheckbox' + x);
    $(labelCheckbox).eq(x).attr('for', 'itemCheckbox' + x);
    $(itemRadio).eq(x).val(x+1 + ")");
    $(itemRadio).eq(x).attr('id', 'itemRadio' + x);
    $(labelRadio).eq(x).attr('for', 'itemRadio' + x);
  }
};

//Функция нумерации айдишников для чекбоксов в таблице на основной форме
function interviewIdChoice() {
  var idCheckbox   = document.querySelectorAll('.interview-form__checkbox-choice');
  var forLabel     = document.querySelectorAll('.interview-form__label-choice');
  var idEdit       = document.querySelectorAll('.interview-form__svg-choices-edit');

  for (var x = 0; x < idCheckbox.length; x++) {
    $(idCheckbox).eq(x).attr('id', 'choiceQue' + x);
    $(forLabel).eq(x).attr('for', 'choiceQue' + x);
    $(idEdit).eq(x).attr('id', 'choiceQue' + x);
  }
};

//Функция по внесению текста в input-true
function inputTrue() {
  $('.modal__table-item-true').attr('value', '');

  var itemInputTrue = document.querySelectorAll('.modal__table-item-true');
  var itemCheckbox  = document.querySelectorAll('.modal__table-item-checkbox');
  var itemRadio     = document.querySelectorAll('.modal__table-item-radio');

  for (var x = 0; x < itemInputTrue.length; x++) {
    if ($(itemCheckbox[x]).is(':checked') || $(itemRadio[x]).is(':checked')) {
      $(itemInputTrue[x]).attr('value', 'Верный');
    }
  }
};

//Функция по проверке заполнения поля Название
function checkSaveBtn() {
	var testName = $('#testName').val();
	if (testName.length != 0) {
		$('#saveQuestions').removeAttr('disabled');
	}
	else {
		$('#saveQuestions').attr('disabled', 'disabled');
	}
};

//Функция по сохранению вопросов при нажатии на кнопку Готово
function ready(){
//обнуление json-объекта
	masAllReady.question = [];
	masAllReady.typeAnswer = [];
	masAllReady.answer = [];
	masAllReady.trueAnswer = [];

//Объявление массивов
    var modalQues = document.querySelector('#queName');
	  var modalType = document.querySelector('#ansType');
	  var modalAnsw = document.querySelectorAll('.modal__table-item-text');
	  var modalTrue = document.querySelectorAll('.modal__table-item-true');

//Наполнение общего массива
    masAllReady.question.push(modalQues.value);
    masAllReady.typeAnswer.push(modalType.value);

	  for (var i = 0; i < modalAnsw.length; i++) {
  	  masAllReady.answer.push(modalAnsw[i].value);
  	  masAllReady.trueAnswer.push(modalTrue[i].value);
    }

    $('.modal').hide();
  	$('.shadow').hide();
    $('.modal__btn-save').hide();
    $('.modal__table-item').remove();

//Добавление нового вопроса в основную таблицу
    $('.interview-form__table tbody').append('<tr class="interview-form__table-row"><td class="interview-form__td-choice"><input type="checkbox" class="interview-form__checkbox-choice"><label class="interview-form__label-choice">Выбрать</label></td><td class="interview-form__td-issue"></td><td  class="interview-form__issue-info"><input type="text" class="interview-form__issue-info-input"></td><td class="interview-form__td-edit"><svg width="20px" height="20px" class="interview-form__svg-choices-edit" onclick="edit(this);"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#pencil"></use></svg></td><td class="interview-form__td-del"><svg width="20px" height="20px" class="interview-form__svg-choice-del" onclick="removeQue(this)"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#delete"></use></svg></td></tr>');

    interviewIdChoice();

    $('.interview-form__table-row:last-child .interview-form__td-issue').text(modalQues.value);
    $('.interview-form__table-row:last-child .interview-form__issue-info-input').text(JSON.stringify(masAllReady));
}

//Функция по редактированию вопросов
function edit(Element){
  editId = $(Element).attr('id');
  var infoInput = $(Element).parent().parent().find('.interview-form__issue-info').find('.interview-form__issue-info-input');
  var masEdit   = JSON.parse(infoInput.text());

//Открытие модального окна
  $('#queName').val('');
  $('.modal').show();
	$('.shadow').show();
  $('.modal__btn-edit-save').show();

  for (var x = 0; x < masEdit.answer.length; x++) {
      addAnswer();
  }

  numbering();

//Объявление массивов
  var modalQues = document.querySelector('#queName');
  var modalType = document.querySelector('#ansType');
  var modalAnsw = document.querySelectorAll('.modal__table-item-text');
  var modalTrue = document.querySelectorAll('.modal__table-item-true');

//Заполнение инпутов значениями json-объекта
  modalQues.value = masEdit.question;
  modalType.value = masEdit.typeAnswer;

  ansTypeChange();
	inputTrue();

  var mainL = masEdit.answer.length;

	for (var x = 0; x < mainL; x++) {
		modalAnsw[x].value = masEdit.answer[x];
		modalTrue[x].value = masEdit.trueAnswer[x];
	}

  var itemCheckbox  = document.querySelectorAll('.modal__table-item-checkbox');
  var itemRadio     = document.querySelectorAll('.modal__table-item-radio');

  if (modalType.value == "Один верный") {
    for (var x = 0; x < modalTrue.length; x++) {
      if (modalTrue[x].value == 'Верный') {
        $(itemRadio[x]).click();
      }
    }
  }
  else {
    for (var x = 0; x < modalTrue.length; x++) {
      if (modalTrue[x].value == 'Верный') {
        $(itemCheckbox[x]).click();
      }
    }
  }
}

//Функция по сохранению вопросов при редактировании
function editSave(){
//обнуление json-объекта
	masAllReady.question = [];
	masAllReady.typeAnswer = [];
	masAllReady.answer = [];
	masAllReady.trueAnswer = [];

//Объявление массивов
  var modalQues = document.querySelector('#queName');
  var modalType = document.querySelector('#ansType');
  var modalAnsw = document.querySelectorAll('.modal__table-item-text');
  var modalTrue = document.querySelectorAll('.modal__table-item-true');

//Наполнение общего массива
  masAllReady.question.push(modalQues.value);
  masAllReady.typeAnswer.push(modalType.value);

  for (var i = 0; i < modalAnsw.length; i++) {
	  masAllReady.answer.push(modalAnsw[i].value);
	  masAllReady.trueAnswer.push(modalTrue[i].value);
  }

  $('.modal').hide();
	$('.shadow').hide();
  $('.modal__btn-edit-save').hide();
  $('.modal__table-item').remove();

//Сохранение изменений в вопросе
  $('#'+editId).parent().parent().find('.interview-form__td-issue').text(modalQues.value);
  $('#'+editId).parent().parent().find('.interview-form__issue-info-input').text(JSON.stringify(masAllReady));
}

//Функция сохранения вопросов в объект
function mainSave() {
//Объявление json-объекта
	formSave = JSON.parse('{"nameTest" : [], "category" : [], "infoIssue" : []}');

//обнуление json-объекта
	formSave.nameTest = [];
	formSave.category = [];
	formSave.infoIssue = [];

//Объявление массивов
  var nameTest = document.querySelector('#testName');
  var category = document.querySelector('#testCategory');
  var infoIssue = document.querySelectorAll('.interview-form__issue-info-input');

//Наполнение общего массива
  formSave.nameTest.push(nameTest.value);
  formSave.category.push(category.value);

  for (var i = 0; i < infoIssue.length; i++) {
		infoIssue[i].value = $('.interview-form__issue-info-input').text();
	  formSave.infoIssue.push(infoIssue[i].value);
  }

	alert('Данные занесены в объект');
}
