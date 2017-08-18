from flask import Flask, url_for, render_template, send_from_directory

app = Flask(__name__)

@app.route('/')
def calculator():
    return render_template('calculator.html')
    
if __name__ == '__main__':
    app.run()
