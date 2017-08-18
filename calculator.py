from flask import render_template

@app.route('/calculator/')
@app.route('/calculator/<name>')
def calculator():
    return render_template('calculator.html')
