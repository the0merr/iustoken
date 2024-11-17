from telegram import Update, InlineKeyboardButton, InlineKeyboardMarkup
from telegram.ext import ApplicationBuilder, CommandHandler, CallbackContext

# Bot tokeninizi buraya ekleyin
BOT_TOKEN = 'TELEGRAM_BOT_TOKEN'

# GitHub sayfanızın URL'si
GITHUB_URL = 'https://github.com/sizin-projeniz'

# /start komutu
async def start(update: Update, context: CallbackContext):
    user = update.message.from_user

    # Kullanıcıya mesaj gönder
    await update.message.reply_text(f"Merhaba {user.first_name}! Hoş geldin.\n\nPlay",
                                    reply_markup=create_launch_button())

# Launch butonu oluşturma
def create_launch_button():
    button = InlineKeyboardButton(text="Launch", url=GITHUB_URL)
    keyboard = [[button]]
    return InlineKeyboardMarkup(keyboard)

# Bot uygulamasını başlatma
if __name__ == '__main__':
    app = ApplicationBuilder().token(BOT_TOKEN).build()
    
    # /start komutunu ekle
    app.add_handler(CommandHandler("start", start))
    
    # Botu çalıştır
    app.run_polling()
