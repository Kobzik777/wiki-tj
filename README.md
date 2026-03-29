# Wikipedia language switch — Playwright + TypeScript

Автотест для перевірки зміни мови інтерфейсу Wikipedia авторизованим користувачем.

---

## Тест-кейс TC-001

**Назва:** Зміна мови інтерфейсу авторизованим користувачем

**Передумови:** є акаунт Wikipedia, креди прописані в `.env`

**Кроки:**

1. Відкрити сторінку логіну `Special:UserLogin`
2. Ввести логін і пароль, натиснути Log in
3. Перейти до `Special:Preferences`
4. У розділі Internationalisation обрати мову — Ukrainian (uk)
5. Натиснути Save

**Очікуваний результат:** інтерфейс перемикається на українську, в шапці відображається "Налаштування"

**Postcondition:** після тесту мова автоматично повертається до англійської

---

## Структура проекту

```
wikipedia-lang-test/
├── pages/
│   ├── LoginPage.ts
│   └── PreferencesPage.ts
├── tests/
│   └── languageSwitch.spec.ts
├── .env.example
├── Dockerfile
├── docker-compose.yml
├── playwright.config.ts
└── tsconfig.json
```

---

## Як запустити

### 1. Клонувати репозиторій

```bash
git clone https://github.com/Kobzik777/wiki-tj.git
cd wiki-tj
```

### 2. Встановити залежності

```bash
npm ci
```

Браузер встановиться автоматично через `postinstall`.

### 3. Додати креди

```bash
cp .env.example .env
```

Відкрити `.env` і вписати свої дані:

```
WIKI_USERNAME=your_username
WIKI_PASSWORD=your_password
```

`.env` додано до `.gitignore` — в репозиторій не потрапить.

---

## Запуск тестів

### Локально

```bash
npm test
```

Звіт буде тут: `./playwright-report/index.html`

Відкрити звіт:

```bash
npm run test:report
```

### В Docker

```bash
docker-compose up --build
```

Після завершення звіт з'явиться в папці `./playwright-report` на хост-машині.

Відкрити вручну:

```bash
start playwright-report/index.html   # Windows
open playwright-report/index.html    # macOS
```

### Docker без compose

```bash
docker build -t wiki-lang-test .

docker run --rm \
  -e WIKI_USERNAME="your_username" \
  -e WIKI_PASSWORD="your_password" \
  -v "$(pwd)/playwright-report:/app/playwright-report" \
  wiki-lang-test
```
