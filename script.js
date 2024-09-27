const characterForm = document.getElementById('character-form');
const abilitiesSelect = document.getElementById('abilities');
const modifierResult = document.getElementById('modifier-result');
const raceSelect = document.getElementById('race');
const classSelect = document.getElementById('class');
const racialAbilitySelect = document.getElementById('racial-ability');
const racialAbilityReroll = document.getElementById('racial-ability-reroll');
const abilityPopup = document.getElementById('ability-popup');
const abilitysDesText = document.getElementById('abilitys-des-text');
const abilityPopupClose = document.getElementById('ability-popup-close');
// const divineCurseSelect = document.getElementById('divine-curse');



const racialAbilities = {
    "Человек": [
      {
        "name": "Адаптивность",
        "description": "Повторяет неудачный бросок один раз за бой",
        "fullDescription": "Люди могут легко адаптироваться к различным условиям, что делает их универсальными в любых ситуациях."
      },
      {
        "name": "Упорство",
        "description": "Повторяет неудачный бросок одного теста на навыки один раз за долгое время.",
        "fullDescription": "Упорные люди не сдаются даже перед лицом неудачи."
      }
    ],
    "Эльф": [
      {
        "name": "Лесной шаг",
        "description": "+2 к проверкам скрытности в лесных условиях.",
        "fullDescription": "Эльфы легко перемещаются по лесам, оставаясь незамеченными."
      },
      {
        "name": "Быстрая реакция",
        "description": "+2 к инициативе.",
        "fullDescription": "Эльфы обладают быстрой реакцией, что дает им преимущество в бою."
      }
    ],
    "Дворф": [
      {
        "name": "Скорость в работе",
        "description": "+2 к проверкам кузнечного дела и ремесел.",
        "fullDescription": "Дворфы известны своим мастерством в создании оружия и доспехов."
      },
      {
        "name": "Устойчивость",
        "description": "+1 к спасброскам от яда.",
        "fullDescription": "Дворфы крепкие и стойкие, что делает их менее уязвимыми к ядам."
      }
    ],
    "Хоббит": [
      {
        "name": "Ловкость",
        "description": "+2 к проверкам акробатики.",
        "fullDescription": "Хоббиты известны своей ловкостью, что позволяет им избегать многих опасностей."
      },
      {
        "name": "Камень за спиной",
        "description": "+1 к броскам уклонения.",
        "fullDescription": "Хоббиты умело уклоняются от опасностей, используя окружающие предметы для защиты."
      }
    ],
    "Орк": [
      {
        "name": "Неукротимая ярость",
        "description": "+1 к урону в ближнем бою.",
        "fullDescription": "Орки сражаются с неукротимой яростью, нанося сильные удары."
      },
      {
        "name": "Выносливость",
        "description": "+1 к спасброскам от усталости.",
        "fullDescription": "Орки способны выдерживать большие нагрузки и не сдаваться в бою."
      }
    ],
    "Демон": [
      {
        "name": "Темная энергия",
        "description": "Может раз в день добавить +1d6 к своему урону.",
        "fullDescription": "Темная энергия проникает в атаки демонов, увеличивая их разрушительность."
      },
      {
        "name": "Теневой шаг",
        "description": "Может раз в бой мгновенно перемещаться на короткое расстояние.",
        "fullDescription": "Демоны могут перемещаться в тенях, избегая опасностей."
      }
    ],
    "Дриада": [
      {
        "name": "Слияние с природой",
        "description": "+2 к проверкам общения с животными и растениями.",
        "fullDescription": "Дриады имеют глубокую связь с природой, что помогает им находить общий язык с ее обитателями."
      },
      {
        "name": "Лечебные силы",
        "description": "Может раз в день восстановить 1d8 здоровья союзнику.",
        "fullDescription": "Дриады могут исцелять других, используя силу природы."
      }
    ]
    
    // Добавьте свои рассовые способности
  }

// Пример способностей с функцией для вычисления модификатора
const abilities = {
    "Паладин": [
        { name: 'Сильный удар', description: 'Увеличивает урон на 1d4.', attribute: 'strength' },
        { name: 'Божественный удар', description: 'Наносит 2d6 урона с эффектом света.', attribute: 'strength' },
        { name: 'Защита от зла', description: 'Увеличивает защиту против зла.', attribute: 'wisdom' },
        { name: 'Устойчивость', description: 'Снижает урон от магии на 1d6.', attribute: 'constitution' },
        { name: 'Светлый щит', description: 'Создает магический щит, который поглощает 1d8 урона.', attribute: 'charisma' },
        { name: 'Божественное восстановление', description: 'Восстанавливает 1d10 здоровья.', attribute: 'wisdom' },
        { name: 'Меч света', description: 'Добавляет 1d4 урона от света к атаке.', attribute: 'strength' },
        { name: 'Непобедимость', description: 'На 1 раунд становится неуязвимым к урону.', attribute: 'constitution' },
        { name: 'Священный всплеск', description: 'Увеличивает урон на 1d6 против нежити.', attribute: 'strength' },
        { name: 'Героизм', description: 'Добавляет 1d4 к броскам атаки и спасброскам.', attribute: 'charisma' },
    ],
    "Воин": [
        { name: 'Сильный удар', description: 'Увеличивает урон на 1d4.', attribute: 'strength' },
        { name: 'Боевая стойка', description: 'Увеличивает защиту на 2.', attribute: 'constitution' },
        { name: 'Мощный бросок', description: 'Увеличивает урон от метательного оружия на 1d6.', attribute: 'strength' },
        { name: 'Сокрушительный удар', description: 'Увеличивает урон на 2d6 при критическом ударе.', attribute: 'strength' },
        { name: 'Провокация', description: 'Привлекает внимание врага на себя.', attribute: 'charisma' },
        { name: 'Стратегия боя', description: 'Увеличивает шансы на успех в бою.', attribute: 'intelligence' },
        { name: 'Резкая атака', description: 'Увеличивает скорость атаки на 1 раз в раунд.', attribute: 'dexterity' },
        { name: 'Защита', description: 'Снижает урон от следующей атаки на 1d6.', attribute: 'constitution' },
        { name: 'Удар в уязвимое место', description: 'Добавляет 1d8 к урону при попадании в критическое место.', attribute: 'dexterity' },
        { name: 'Командный дух', description: 'Увеличивает шансы на успех союзников на 1d4.', attribute: 'charisma' },
    ],
    "Маг": [
        { name: 'Заклинание огненного шара', description: 'Наносит 3d6 урона огнем.', attribute: 'intelligence' },
        { name: 'Ледяной шторм', description: 'Наносит 2d8 урона холодом.', attribute: 'intelligence' },
        { name: 'Магический щит', description: 'Увеличивает защиту на 2.', attribute: 'intelligence' },
        { name: 'Заклинание невидимости', description: 'Делает персонажа невидимым на 1 минуту.', attribute: 'intelligence' },
        { name: 'Энергетический взрыв', description: 'Наносит 4d6 урона электричеством.', attribute: 'intelligence' },
        { name: 'Проклятие', description: 'Уменьшает атрибут врага на 2.', attribute: 'intelligence' },
        { name: 'Восстановление', description: 'Восстанавливает 1d8 здоровья.', attribute: 'wisdom' },
        { name: 'Магическая стрела', description: 'Наносит 1d10 урона магической стрелой.', attribute: 'intelligence' },
        { name: 'Заблуждение', description: 'Снижает шанс удачи врага на 1d4.', attribute: 'intelligence' },
        { name: 'Вызов существа', description: 'Призывает существа на 1d6 раундов.', attribute: 'intelligence' },
    ],
    "Жрец": [
        { name: 'Восстановление', description: 'Восстанавливает 1d8 здоровья.', attribute: 'wisdom' },
        { name: 'Святой свет', description: 'Наносит 2d8 урона нежити.', attribute: 'wisdom' },
        { name: 'Благословение', description: 'Добавляет 1d4 к броскам атаки союзников.', attribute: 'wisdom' },
        { name: 'Проклятие', description: 'Уменьшает шансы на успех врага.', attribute: 'wisdom' },
        { name: 'Защита', description: 'Снижает урон от следующей атаки на 1d6.', attribute: 'wisdom' },
        { name: 'Божественное восстановление', description: 'Восстанавливает 1d10 здоровья.', attribute: 'wisdom' },
        { name: 'Молитва', description: 'Увеличивает защиту на 2.', attribute: 'wisdom' },
        { name: 'Заклинание огненного шара', description: 'Наносит 3d6 урона огнем.', attribute: 'wisdom' },
        { name: 'Священный удар', description: 'Наносит 2d6 урона с эффектом света.', attribute: 'wisdom' },
        { name: 'Магический щит', description: 'Увеличивает защиту на 2.', attribute: 'wisdom' },
    ],
    "Разбойник": [
        { name: 'Ловкость рук', description: 'Позволяет выполнить акробатические трюки.', attribute: 'dexterity' },
        { name: 'Теневой шаг', description: 'Позволяет мгновенно переместиться на короткое расстояние.', attribute: 'dexterity' },
        { name: 'Удар в спину', description: 'Наносит 2d6 урона при атаке с неожиданности.', attribute: 'dexterity' },
        { name: 'Скрытность', description: 'Увеличивает шансы на скрытность.', attribute: 'dexterity' },
        { name: 'Разведка', description: 'Увеличивает шансы на успех в исследовании.', attribute: 'wisdom' },
        { name: 'Стратегия', description: 'Добавляет 1d4 к броскам удачи.', attribute: 'intelligence' },
        { name: 'Смертельный укус', description: 'Наносит 3d6 урона при критическом ударе.', attribute: 'dexterity' },
        { name: 'Долгий шаг', description: 'Увеличивает скорость передвижения на 10 футов.', attribute: 'dexterity' },
        { name: 'Неуловимость', description: 'Снижает шанс поймать персонажа.', attribute: 'dexterity' },
        { name: 'Разбойничий прием', description: 'Снижает защиту противника на 2.', attribute: 'dexterity' },
    ],
    "Бард": [
        { name: 'Магическая мелодия', description: 'Увеличивает атаку союзников на 1d4.', attribute: 'charisma' },
        { name: 'Песня вдохновения', description: 'Восстанавливает 1d8 здоровья.', attribute: 'charisma' },
        { name: 'Проклятие', description: 'Снижает шансы на успех врага.', attribute: 'charisma' },
        { name: 'Звуковая волна', description: 'Наносит 2d6 урона звуком.', attribute: 'charisma' },
        { name: 'Танец призывателя', description: 'Призывает союзников на 1d4 раунда.', attribute: 'charisma' },
        { name: 'Песня покоя', description: 'Снижает боевую готовность врага.', attribute: 'charisma' },
        { name: 'Забавный трюк', description: 'Позволяет выполнить акробатические трюки.', attribute: 'charisma' },
        { name: 'Театральный момент', description: 'Увеличивает шансы на успех в дипломатии.', attribute: 'charisma' },
        { name: 'Долгожданное вдохновение', description: 'Увеличивает шансы на успех в бою.', attribute: 'charisma' },
        { name: 'Магический артефакт', description: 'Создает магический артефакт на 1d10 минут.', attribute: 'charisma' },
    ],
    "Друид": [
        { name: 'Природное исцеление', description: 'Восстанавливает 2d8 здоровья.', attribute: 'wisdom' },
        { name: 'Лесной шаг', description: 'Позволяет перемещаться в лесу без следов.', attribute: 'wisdom' },
        { name: 'Призыв природы', description: 'Призывает союзников на 1d4 раунда.', attribute: 'wisdom' },
        { name: 'Заклинание огненного шара', description: 'Наносит 3d6 урона огнем.', attribute: 'wisdom' },
        { name: 'Проклятие', description: 'Снижает шансы на успех врага.', attribute: 'wisdom' },
        { name: 'Пробуждение', description: 'Пробуждает древние силы природы.', attribute: 'wisdom' },
        { name: 'Природный щит', description: 'Увеличивает защиту на 2.', attribute: 'wisdom' },
        { name: 'Зов дикой природы', description: 'Призывает животных на 1d6 раундов.', attribute: 'wisdom' },
        { name: 'Сила земли', description: 'Увеличивает защиту на 2 и восстанавливает 1d6 здоровья.', attribute: 'wisdom' },
        { name: 'Лесной огонь', description: 'Наносит 2d6 урона огнем.' , attribute: 'wisdom' },
    ],
};

function updateAbilities() {
    const selectedClass = document.getElementById('class').value;
    const abilitiesSelect = document.getElementById('abilities');
    
    // Очищаем предыдущие опции
    abilitiesSelect.innerHTML = '';
    
    // Проверяем, выбран ли класс
    if (selectedClass && abilities[selectedClass]) {
        abilities[selectedClass].forEach(ability => {
            const option = document.createElement('option');
            option.value = ability.name;
            option.textContent = ability.name;
            abilitiesSelect.appendChild(option);
        });
    }
}

// Инициализация списка способностей при загрузке
window.onload = () => {
    updateAbilities();
};

// Функция для случайного выбора рассовой способности
    
function assignRacialAbility(reroll) {
    if(localStorage.getItem('character') && !reroll) return JSON.parse(localStorage.getItem('character')).racialAbility;

    const selectedRaceName = raceSelect.value; // Получаем имя расы из элемента выбора
    const selectedRace = racialAbilities[selectedRaceName]; // Выбор рассовых способностей по имени расы
    const randomIndex = Math.floor(Math.random() * selectedRace.length); // Получаем случайный индекс

    return {
        name: selectedRace[randomIndex].name,
        description: selectedRace[randomIndex].description,
    } // Возвращаем имя способности
}

racialAbilityReroll.addEventListener('click', ()=>{
    saveCharFunc(assignRacialAbility(true));
})

// Функция для получения модификатора на основе характеристики
function calculateModifier(attributeValue) {
    return Math.floor((attributeValue - 10) / 2);
}

// Функция для отображения описания способностей
function showAbilityDescription() {
    if (localStorage.getItem('character')) {
        let character = JSON.parse(localStorage.getItem('character'));
        
        abilityPopup.classList.add('opened');
        const selectedClass = classSelect.value;
        const selectedAbilities = Array.from(abilitiesSelect.selectedOptions).map(option => option.value);
        const descriptions = selectedAbilities.map(abilityName => {
            const ability = abilities[selectedClass].find(a => a.name === abilityName);
            const modifier = calculateModifier(parseInt(document.getElementById(ability.attribute).value));
            return `<br><br><b>${ability.name}:</b> ${ability.description} <br>(Модификатор: ${modifier})`;
        });
        abilitysDesText.innerHTML = descriptions + `<br><br><b>Рассовая способность</b> - ` + character.racialAbility.name +`<br>`+ character.racialAbility.description;
    }
    // alert(descriptions.join('\n'));
}

// Сохранение персонажа в local storage
characterForm.addEventListener('submit', (event) => {
    event.preventDefault();
    saveCharFunc();
});

function saveCharFunc(rerolled) {
    const character = {
        race: raceSelect.value,
        class: classSelect.value,
        racialAbility: rerolled ? rerolled : assignRacialAbility(), // Присваиваем рассовую способность
        // divineCurse: divineCurseSelect.value,
        attributes: {
            strength: parseInt(document.getElementById('strength').value),
            dexterity: parseInt(document.getElementById('dexterity').value),
            constitution: parseInt(document.getElementById('constitution').value),
            intelligence: parseInt(document.getElementById('intelligence').value),
            wisdom: parseInt(document.getElementById('wisdom').value),
            charisma: parseInt(document.getElementById('charisma').value)
        },
        abilities: Array.from(abilitiesSelect.selectedOptions).map(option => option.value)
    };

    localStorage.setItem('character', JSON.stringify(character));
    alert('Персонаж сохранен!');
    window.location.reload();
}

// Загрузка персонажа из local storage
window.onload = () => {
    const characterData = localStorage.getItem('character');
    if (characterData) {
        const character = JSON.parse(characterData);
        raceSelect.value = character.race;
        classSelect.value = character.class;
        racialAbilitySelect.value = character.racialAbility.name;
        // divineCurseSelect.value = character.divineCurse;

        Object.keys(character.attributes).forEach(attr => {
            document.getElementById(attr).value = character.attributes[attr];
        });

        // Функция для обновления списка способностей на основе выбранного класса
        document.getElementById('class').value = character.class;
        updateAbilities();
        
        // Выбираем способности, если они есть
        const abilitiesSelect = document.getElementById('abilities');

        character.abilities.forEach(ability => {
            const option = Array.from(abilitiesSelect.options).find(opt => opt.value === ability);
            if (option) {
                option.selected = true;
            }
        });
    }

};

// Удаление персонажа
document.getElementById('delete-character').addEventListener('click', () => {
    localStorage.removeItem('character');
    alert('Персонаж удален!');
    window.location.reload();
});

// Кнопка для показа описания способностей
document.getElementById('show-ability-description').addEventListener('click', showAbilityDescription);
document.getElementById('ability-popup-close').addEventListener('click', ()=>{abilityPopup.classList.remove('opened')});
