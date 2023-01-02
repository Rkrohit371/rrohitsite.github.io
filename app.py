from flask import Flask, render_template, redirect

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/projects')
def home():
    return render_template('home.html')

@app.route('/Expense-Tracker')
def expense():
    return render_template('expense_tracker.html')

@app.route('/The-Hangman-Game')
def hangman():
    return render_template('hangman_game.html')

@app.route('/Random-People-Finder')
def random():
    return render_template('random_people.html')


@app.route('/The-Meal-Finder')
def meal():
    return render_template('meal_finder.html')


@app.route('/Exchange-Rate-Converter')
def exchange():
    return render_template('exchange_rate.html')


@app.route('/Typing-Game')
def typing():
    return render_template('typing.html')

@app.route('/Speech-Text-Reader')
def speech():
    return render_template('speech.html')

@app.route('/Sort-The-List')
def list():
    return render_template('list.html')


@app.route('/Relax-App')
def relax():
    return render_template('relax.html')


@app.route('/Number-Guessing-Game')
def guess():
    return render_template('guess.html')


@app.route('/New-Year-Countdown')
def newyear():
    return render_template('newyear.html')

@app.route('/Lyrics-Search-App')
def lyrics():
    return render_template('lyrics.html')

@app.route('/Flip-Cards')
def memory():
    return render_template('memory.html')


@app.route('/The-Breakout-Game')
def breakout():
    return render_template('breakout.html')


@app.route('/Infinite-Scroller')
def blog_loader():
    return render_template('blog_loader.html')



if __name__ == '__main__':
    app.run(debug=True)