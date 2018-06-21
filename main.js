class Form {

  constructor(params) {
    this.form = document.createElement('FORM', params);
    // this.form.style.width = params.css.width;
    // this.form.style.height = params.css.height;
    // this.form.style.backgroundColor = params.css.backgroundColor;
    // this.form.style.borderRadius = params.css.borderRadius;
    // this.form.style.padding = params.css.padding;

  }

  createFormFromJson(root, formJson) {
    let fieldsStructure = formJson.fieldsGroups;
    let fieldsParams = formJson.fields;

    let step = 1; //Глубина рекурсивной вложенности групп

    function createDivColumn(current_step) {
      let divColumn = document.createElement('DIV');
      divColumn.className = 'column' + current_step;

      return divColumn;
    }

    function createDivCell(step) {
      let cell = document.createElement('DIV');
      cell.className = 'cell' + step;
      return cell;
    }

    function createInputAndLabel(fieldProps) {
      let label = document.createElement('LABEL');
      label.className = 'input-label ';
      label.innerText = fieldProps.title;
      label.for = fieldProps.id;

      let field = document.createElement('INPUT');
      field.id = fieldProps.id;
      field.type = fieldProps.type;
      field.value = fieldProps.value;
      field.placeholder = fieldProps.placeholder;
      field.id = fieldProps.id;
      field.name = fieldProps.id;

      return {
        field,
        label,
      };
    }

    function createSelectAndLabel(fieldProps) {
      let label = document.createElement('LABEL');
      label.className = 'label-input';
      label.innerText = fieldProps.title;
      label.for = fieldProps.id;

      let field = document.createElement('SELECT');
      field.id = fieldProps.id;
      field.name = fieldProps.id;

      let placeholderOption = document.createElement('OPTION');
      placeholderOption.disabled = true;
      placeholderOption.innerHTML = 'Выберите Ваш пол';
      placeholderOption.value = '';
      field.appendChild(placeholderOption);

      fieldProps.options.forEach(options => {
        let optionElement = document.createElement('OPTION');
        optionElement.innerHTML = options.value;
        optionElement.value = options.key;
        field.appendChild(optionElement);
      });

      return {
        field,
        label,
      };
    }

    function createButton(fieldProps) {
      let field = document.createElement('BUTTON');
      field.id = fieldProps.id;
      field.name = fieldProps.id;
      field.type = fieldProps.type;
      field.innerHTML = fieldProps.title;
      field.onclick = fieldProps.action;
      field.className = 'enter-button';

      return field;
    }

    function createLink(fieldProps) {
      let field = document.createElement('A');
      field.href = fieldProps.href;
      field.id = fieldProps.id;
      field.innerHTML = fieldProps.title;

      if (fieldProps.id === 'reg') {
        field.className = 'register-button';
      } else if (fieldProps.id === 'remember') {
        field.className = 'remember';
      }

      return field;
    }

    function createCheckbox(fieldProps) {
      let label = document.createElement('LABEL');
      label.className = 'label-input';
      label.innerText = fieldProps.title;
      label.for = fieldProps.id;

      let field = document.createElement('INPUT');
      field.id = fieldProps.id;
      field.name = fieldProps.id;
      field.type = fieldProps.type;
      field.checked = fieldProps.checked;

      return {
        field,
        label,
      };
    }

    function createCell(fieldID, current_step) {
      let cell = createDivCell(current_step);

      let fieldProps = fieldsParams.find(props => props.id === fieldID);

      if (fieldProps.type === 'text' || fieldProps.type === 'password') {
        let elements = createInputAndLabel(fieldProps);
        cell.appendChild(elements.label);
        cell.appendChild(elements.field);

      } else if (fieldProps.type === 'select') {
        let elements = createSelectAndLabel(fieldProps);
        cell.appendChild(elements.label);
        cell.appendChild(elements.field);

      } else if (fieldProps.type === 'button') {
        cell.appendChild(createButton(fieldProps));

      } else if (fieldProps.type === 'link') {
        cell.appendChild(createLink(fieldProps));

      } else if (fieldProps.type === 'checkbox') {
        let elements = createCheckbox(fieldProps);
        cell.appendChild(elements.field);
        cell.appendChild(elements.label);
      }

      return cell;
    }

    function createColumn(fields, recursive_lvl) {
      let divColumn = createDivColumn(recursive_lvl);

      if (!Array.isArray(fields)) {
        fields = [fields];
      }

      fields.forEach(field => {
        if (field.type === 'field') {
          divColumn.appendChild(createCell(field.code, recursive_lvl));
        } else if (field.type === 'group') {
          let cell = createDivCell(recursive_lvl);
          field.fields.forEach(field => {
            cell.appendChild(createColumn(field, recursive_lvl + 1));
          });

          // cell.appendChild(createColumn(field.fields, recursive_lvl + 1, cell));
          divColumn.appendChild(cell);
        }
      });

      return divColumn;
    }

    fieldsStructure.forEach(fields => {
      root.appendChild(createColumn(fields.fields, step));
    });

    // todo: убрать эти костыли
    root.getElementsByTagName('input')[3].parentNode.parentNode.parentNode.classList.add('crutch');
    root.getElementsByTagName('input')[7].parentNode.parentNode.parentNode.classList.add('crutch');
    root.getElementsByTagName('button')[0].parentNode.parentNode.parentNode.classList.add('buttons');
    root.getElementsByTagName('a')[0].parentNode.classList.add('reg');
    root.getElementsByTagName('a')[1].parentNode.parentNode.classList.add('remember');

    return root;
  }
}

let registerForm = new Form({
  name: 'registration-form',
  action: '#',
  method: 'POST',
});

let form_json_gl = {
  fieldsGroups: [
    {
      "fields": [
        {
          type: 'field',
          code: 'lastname',
        },
        {
          type: 'field',
          code: 'firstname',
        },
        {
          type: 'field',
          code: 'secondname',
        },
        {
          type: 'field',
          code: 'sex',
        },
        {
          type: 'group',
          fields: [
            {
              type: 'field',
              code: 'submit',
            },
            {
              type: 'field',
              code: 'reg',
            },
          ],
        },
      ],
    },
    {
      "fields": [
        {
          type: 'group',
          fields: [
            {
              type: 'field',
              code: 'checkbox1',
            },
            {
              type: 'field',
              code: 'checkbox2',
            },
          ],
        },
        {
          type: 'field',
          code: 'password',
        },
        {
          type: 'field',
          code: 'email',
        },
        {
          type: 'group',
          fields: [
            {
              type: 'field',
              code: 'checkbox3',
            },
            {
              type: 'field',
              code: 'remember',
            },
          ],
        },
      ],
    },
  ],
  fields: [
    {
      id: 'lastname',
      type: 'text',
      title: 'Фамилия',
      value: 'Иванов',
      placeholder: 'Введите Вашу Фамилию',
    },
    {
      id: 'firstname',
      type: 'text',
      title: 'Имя',
      value: 'Иван',
      placeholder: 'Введите Ваше Имя',
    },
    {
      id: 'secondname',
      type: 'text',
      title: 'Отчество',
      value: 'Иванович',
      placeholder: 'Введите Ваше Отчество',
    },
    {
      id: 'sex',
      type: 'select',
      title: 'Пол',
      value: 'male',
      placeholder: 'Выберите Ваш пол',
      options: [
        {
          key: 'woman',
          value: 'Женщина',
        },
        {
          key: 'male',
          value: 'Мужчина',
        },
      ],
    },
    {
      id: 'checkbox1',
      type: 'checkbox',
      title: 'Признак 1',
      checked: true,
    },
    {
      id: 'checkbox2',
      type: 'checkbox',
      title: 'Признак 2',
      checked: false,
    },
    {
      id: 'password',
      type: 'password',
      title: 'Пароль',
      value: '',
      placeholder: 'Введите Ваш пароль',
    },
    {
      id: 'email',
      type: 'text',
      title: 'Email',
      value: '',
      placeholder: 'Введите Ваш e-mail',
    },
    {
      id: 'checkbox3',
      type: 'checkbox',
      title: 'Запомните меня',
      checked: true,
    },
    {
      id: 'remember',
      type: 'link',
      title: 'Я забыл свой пароль',
      href: 'http://yandex.com/',
    },
    {
      id: 'submit',
      type: 'button',
      action: 'submit',
      title: 'Войти',
    },
    {
      id: 'reg',
      type: 'link',
      title: 'Зарегистрироваться',
      href: 'http://yandex.ru',
    },
  ],
};

let form = registerForm.createFormFromJson(registerForm.form, form_json_gl);

let divMain = document.getElementById('main');
divMain.appendChild(form);








