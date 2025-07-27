export const VERIFICATION_EMAIL_TEMPLATE = `
<!DOCTYPE html>
<html lang="uk">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Підтвердіть вашу пошту</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(to right, #4f46e5, #3730a3); padding: 20px; text-align: center;">
    <h1 style="color: white; margin: 0;">🎯 Підтвердіть вашу пошту</h1>
  </div>
  <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    <p>Привіт!</p>
    <p>Дякуємо за реєстрацію на SamoGuru! Ваш код підтвердження:</p>
    <div style="text-align: center; margin: 30px 0;">
      <span style="font-size: 32px; font-weight: bold; letter-spacing: 5px; color: #4f46e5;">{verificationCode}</span>
    </div>
    <p>Введіть цей код на сторінці верифікації для завершення реєстрації.</p>
    <p>Цей код буде дійсним протягом 15 хвилин з міркувань безпеки.</p>
    <p>Якщо ви не створювали обліковий запис у нас, просто проігноруйте цей лист.</p>
    <p>З найкращими побажаннями,<br>Команда SamoGuru</p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
    <p>Це автоматичне повідомлення, будь ласка, не відповідайте на цей лист.</p>
  </div>
</body>
</html>
`;

export const PASSWORD_RESET_SUCCESS_TEMPLATE = `
<!DOCTYPE html>
<html lang="uk">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Пароль успішно скинуто</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(to right, #10b981, #059669); padding: 20px; text-align: center;">
    <h1 style="color: white; margin: 0;">✅ Пароль успішно скинуто</h1>
  </div>
  <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    <p>Привіт!</p>
    <p>Ми пишемо, щоб підтвердити, що ваш пароль було успішно скинуто.</p>
    <div style="text-align: center; margin: 30px 0;">
      <div style="background-color: #10b981; color: white; width: 50px; height: 50px; line-height: 50px; border-radius: 50%; display: inline-block; font-size: 30px;">
        ✓
      </div>
    </div>
    <p>Якщо ви не ініціювали скидання пароля, негайно зверніться до нашої служби підтримки.</p>
    <p>З міркувань безпеки ми рекомендуємо:</p>
    <ul>
      <li>Використовувати надійний, унікальний пароль</li>
      <li>Увімкнути двофакторну автентифікацію, якщо доступно</li>
      <li>Уникати використання одного пароля на кількох сайтах</li>
    </ul>
    <p>Дякуємо за допомогу у забезпеченні безпеки вашого облікового запису.</p>
    <p>З найкращими побажаннями,<br>Команда SamoGuru</p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
    <p>Це автоматичне повідомлення, будь ласка, не відповідайте на цей лист.</p>
  </div>
</body>
</html>
`;

export const PASSWORD_RESET_REQUEST_TEMPLATE = `
<!DOCTYPE html>
<html lang="uk">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Скидання пароля</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(to right, #f59e0b, #d97706); padding: 20px; text-align: center;">
    <h1 style="color: white; margin: 0;">🔑 Скидання пароля</h1>
  </div>
  <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    <p>Привіт!</p>
    <p>Ми отримали запит на скидання вашого пароля. Якщо ви не робили цього запиту, просто проігноруйте цей лист.</p>
    <p>Щоб скинути пароль, натисніть кнопку нижче:</p>
    <div style="text-align: center; margin: 30px 0;">
      <a href="{resetURL}" style="background-color: #f59e0b; color: white; padding: 12px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">Скинути пароль</a>
    </div>
    <p>Це посилання буде дійсним протягом 1 години з міркувань безпеки.</p>
    <p>З найкращими побажаннями,<br>Команда SamoGuru</p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
    <p>Це автоматичне повідомлення, будь ласка, не відповідайте на цей лист.</p>
  </div>
</body>
</html>
`;