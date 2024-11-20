```txt
http://localhost/api/migrate
```

```json
{
  // Объект create содержит массив описаний таблиц для создания
  "create": [
    {
      // Описание первой таблицы "products"
      "table": "products",
      // Поля таблицы "products"
      "fields": {
        "id": "string", // Строковое поле "id"
        "title": "string", // Строковое поле "title"
        "description": "string", // Строковое поле "description"
        "cost": "integer", // Поле "cost" целочисленного типа
        "discounted_price": "integer", // Поле "discounted_price" целочисленного типа
        "article_number": "integer", // Поле "article_number" целочисленного типа
        "id.id.products_photos": "foreign" // Внешний ключ, ссылающийся на поле "id" таблицы "products_photos"
      }
    },
    {
      // Описание второй таблицы "photos"
      "table": "photos",
      // Поля таблицы "photos"
      "fields": {
        "id": "string", // Строковое поле "id"
        "src": "string", // Строковое поле "src"
        "alt": "string" // Строковое поле "alt"
      }
    },
    {
      // Описание третьей таблицы "products_photos"
      "table": "products_photos",
      // Поля таблицы "products_photos"
      "fields": {
        "id": "string", // Строковое поле "id"
        "products_id": "string", // Строковое поле "products_id"
        "photos_id": "string", // Строковое поле "photos_id"
        "products_id.id.products": "foreign", // Внешний ключ, ссылающийся на поле "id" таблицы "products"
        "photos_id.id.photos": "foreign" // Внешний ключ, ссылающийся на поле "id" таблицы "photos"
      }
    }
  ]
}
```

```txt
http://localhost/api/drop
```

обращает внимание только на поле "delete" и "table" игнорируя все остальные данные

```json
{
  // Объект delete содержит массив описаний таблиц для удаления
  "delete": [
    {
      // Описание первой таблицы "products"
      "table": "products",
      // Поля таблицы "products" (игнорируются при удалении)
      "fields": {
        "id": "string", // Строковое поле "id"
        "title": "string", // Строковое поле "title"
        "description": "string", // Строковое поле "description"
        "cost": "integer", // Поле "cost" целочисленного типа
        "discounted_price": "integer", // Поле "discounted_price" целочисленного типа
        "article_number": "integer", // Поле "article_number" целочисленного типа
        "id.id.products_photos": "foreign" // Внешний ключ, ссылающийся на поле "id" таблицы "products_photos"
      }
    },
    {
      // Описание второй таблицы "photos"
      "table": "photos",
      // Поля таблицы "photos" (игнорируются при удалении)
      "fields": {
        "id": "string", // Строковое поле "id"
        "src": "string", // Строковое поле "src"
        "alt": "string" // Строковое поле "alt"
      }
    },
    {
      // Описание третьей таблицы "products_photos"
      "table": "products_photos",
      // Поля таблицы "products_photos" (игнорируются при удалении)
      "fields": {
        "id": "string", // Строковое поле "id"
        "products_id": "string", // Строковое поле "products_id"
        "photos_id": "string", // Строковое поле "photos_id"
        "products_id.id.products": "foreign", // Внешний ключ, ссылающийся на поле "id" таблицы "products"
        "photos_id.id.photos": "foreign" // Внешний ключ, ссылающийся на поле "id" таблицы "photos"
      }
    }
  ]
}
```
