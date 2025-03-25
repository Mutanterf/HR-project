# HR Project with Docker and PostgreSQL

## Установка и запуск
### 1. Установите Docker и Docker Compose
- Скачайте и установите Docker
- Убедитесь, что Docker работает командой:

  -docker --version

  -docker-compose --version

---

### 2. Клонируйте репозиторий
Выполните команды в терминале:
  - git clone https://github.com/Mutanterf/HR-Project.git
  - cd HR-Project

---

### 3. Сборка и запуск проекта
- **Остановить и удалить старые контейнеры и volume:**  
  docker-compose down -v
- **Собрать образы:**  
  docker-compose build
- **Запустить проект:**  
  docker-compose up

---

### 4. Подключение к базе данных PostgreSQL
Чтобы войти в PostgreSQL через Docker, выполните команду:

- docker exec -it hr-project-db-1 psql -U postgres -d HR

---

### 5. Проверка таблиц и данных
Внутри PostgreSQL консоли выполните следующие команды:

- **Посмотреть список всех таблиц:**  
  \dt

- **Посмотреть содержимое таблицы `countries`:**  
  SELECT * FROM countries;

