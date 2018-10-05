##READ THIS! 
## see how would  a sample articl looks like 
## change the length of the fields on the subtitle and posts
## ads code 
## change the slider images 


from flask import Flask, render_template , redirect ,  url_for, request

from flask_sqlalchemy import SQLAlchemy
from wtforms import Form, BooleanField, StringField, PasswordField, validators, validators, ValidationError, TextAreaField, TextField
from wtforms.validators import InputRequired, Email, Length, URL
from flask_wtf import Form
from flask_wtf import FlaskForm

from flask_bootstrap import Bootstrap
from datetime import datetime
import random, string
from sqlalchemy import desc


app = Flask(__name__)

Bootstrap(app)

#SQLALCHEMY_DATABASE_URI='mysql://username:password@server/databasename'

#id= 100@gmail

app.config['SQLALCHEMY_DATABASE_URI']= 'mysql://database311:Gq9T?s5PtTM!@den1.mysql4.gear.host/database311'
#app.config['SQLALCHEMY_DATABASE_URI']= 'mysql://database32:Ya29~Z1iY~36@den1.mysql1.gear.host/database32'
#app.config['SQLALCHEMY_DATABASE_URI']= 'mysql://root:azad9210037200google98@9210037200@localhost:5557/database32'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

app.config['SECRET_KEY'] = "google98@9210037200"

#3 creating the mysql table!
class posts(db.Model):
    __tablename__ = 'posts'
    id = db.Column(db.Integer, primary_key=True)
    url = db.Column(db.String(80))
    title = db.Column(db.String(80))
    author = db.Column(db.String(30))
    description = db.Column(db.String(200))
    post= db.Column(db.String(5000))
    AuthorDescription= db.Column(db.String(1000))
    email = db.Column(db.String(100))
    date_posted = db.Column(db.String(20))
    random = db.Column(db.String(5))


class Post_Form(Form):
    #link = TextField('Link', [validators.Length(min=3, max=20), validators.URL()])
    title = TextField('Title',validators=[InputRequired(), Length(min=5, max=60, message="The field must be between 5 and 60 characters long")],render_kw={"placeholder": "Title of your Post"})
    url= TextField("Website's Link",render_kw={"placeholder": "Your Blog's Link If You Have Any"})
    author = TextField("Author's Name",validators=[InputRequired(), Length(min=3, max=30, message="The field must be between 5 and 30 characters long")],render_kw={"placeholder": "Author's Name"}) # name of the author
    description = TextField('Subtitle', validators=[InputRequired(), Length(min=5, max=200, message="The field must be between 5 and 380 characters long")] ,render_kw={"placeholder": "Subtitle Of Your Post"})
    post = TextAreaField('Post', validators=[InputRequired(), Length(min=5, max=5000, message="The field must be between 5 and 3000 characters long")], render_kw={"rows": 30, "cols": 50})
    AuthorDescription = TextAreaField("Author's Description",validators=[InputRequired(), Length(min=30, max=1000, message="The field must be between 30 and 600 characters long")], render_kw={"rows": 5, "cols": 50})
    email = TextField("Email Address",validators=[InputRequired(),Email(message='Enter a valid email'), Length(min=10, max=100)],render_kw={"placeholder": "Your Email Address"}) 
    

    

def randomword(length):
   letters = string.ascii_lowercase
   return ''.join(random.choice(letters) for i in range(length))


@app.route('/form', methods = ['GET','POST'])
def form():
    form = Post_Form(request.form)   # earlier this code was both under if statement and elif statement, see if it doesn't lead to some error! 
    if request.method == "GET":
        
        return render_template('post.html', form=form)
    elif request.method == "POST":
        if form.validate_on_submit():
            url_genrator = randomword(5)
            postedDate = datetime.utcnow().strftime("%d-%m-%y")
            Data = posts(title= form.title.data, url= form.url.data, author=form.author.data, description=form.description.data,post=form.post.data,AuthorDescription=form.AuthorDescription.data,email=form.email.data, date_posted = postedDate, random=url_genrator)
            db.session.add(Data)
            db.session.commit()

            return redirect(url_for('submitted_posts'))
        else : 
            return render_template("post.html",form=form)

##just to clarify few thing, in this code-  'lol = posts(title= form.title.data, url= form.url.data, author=form.author.data, description=form.description.data,post=form.post.data,AuthorDescription=form.AuthorDescription.data,email=form.email.data)'
## 'title' in the left is reffered to the 'title' in the class 'posts', i.e the one resposnible for SQLdb. 
## And the 'form.title.data' refers to the info that we passout in the form. 
## And 'title' in 'form.title.data' refers to variable in the class 'Post_Form'. 



##This endpoint will show the list of all the guest posts
@app.route('/posts', methods= ['GET'])
def submitted_posts():
    try:

        dbData = posts.query.order_by(posts.id.desc()).all()  
        return render_template('post_submitted.html', dbData= dbData  )
    except Exception as e:
        return(str(e))
        



#this endpoint will the specific post and the post will have a randon endpoint
@app.route('/guest-post/<random_id>')
def guest_post(random_id):
    article = posts.query.filter_by(random=random_id ).one()
    return render_template ('guest_post.html', post = article)
    


















@app.route('/a', methods=["GET", "POST"])
def index():
    return render_template("index.html")


@app.route('/header', methods=["GET", "POST"])
def header():
    return render_template("header_footer.html")


@app.route('/headers', methods=["GET", "POST"])
def header_posts():
    return render_template("header_and_footer_posts.html")
@app.route('/posts')
def post():
    return render_template("posts.html")

####################################################################################################################################################################################

@app.route('/tech-news')
def news():
    return render_template('news_api.html')





@app.route("/Disclamer")
def disclamer():
   return render_template("disclamer.html") 


@app.route("/private-policy")
def private_policy():
    return render_template("privacypolicy.htm")


@app.route('/BingSiteAuth.xml')
def sitemap_bing():
    return render_template("sitemap.xml")


@app.route('/sitemap.xml')
def sitemap():
    return render_template("sitemap.xml")


@app.route('/google0277eef5bdadace6.html')
def google_webmasters():
    return render_template('google0277eef5bdadace6.html')


@app.errorhandler(500)
def error(e) :
    return render_template("404.html")


@app.errorhandler(404)
def page_not_found(e) :
    return render_template("404.html")
######################################################################################################

'''@app.route("/is-android-rooting-popularity-going-down" , methods=["GET","POST"] )
def rooting_popularity_down():
    return render_template("rooting_popularity_down.html")
'''

@app.route('/end-to-end-encryption' , methods=["GET","POST"] )
def end_to_end_encryption():
    return render_template("end_to_end_encryption.html" , title="Boot Up the Geek")



@app.route("/do-I-really-need-8gb-of-ram" , methods=["GET","POST"] )
def GB_RAM_needed():
    return render_template("8gb_ram_needed.html", title="do I really need 8gb of ram")


@app.route("/How-to-check-if-you-cards-supports-monitor-mode" , methods=["GET","POST"] )
def check_the_support_for_monitor_mode():
    return render_template("check_the_support_for_monitor_mode.html" , title= 'How to check if you cards supports monitor mode')


@app.route("/what-are-cookies-on-internet" , methods=["GET","POST"] )
def cookies_part1():
    return render_template("cookies_part1.html" , title= 'what are cookies on internet?browser cookies |boot up the geek')


@app.route("/trackinig-cookies-how-does-cookies-tracking-work?" , methods=["GET","POST"] )
def cookies_part2():
    return render_template("cookies_part2.html", title= 'trackinig cookies- how does cookies tracking work? |boot up the geek')


@app.route("/third-part-cookies-vs-first-party-cookies-the-difference" , methods=["GET","POST"] )
def cookies_part3():
    return render_template("cookies_part3.html", title= 'third part cookies vs first party cookies- the difference |boot up the geek ')


@app.route("/Experience-with-different-Desktop-Environment" , methods=["GET","POST"] )
def different_de_experience ():
    return render_template("different_de_experience.html", title= 'Experience with different Desktop Environment |boot up the geek')


@app.route("/what-distro should-i-use-after-ubuntu" , methods=["GET","POST"] )
def distro_you_should_choose_after_ubuntu():
    return render_template("distro_you_should_choose_after_ubuntu.html", title= 'what distro should i use after ubuntu |boot up the geek')


@app.route("/how-to-enable-monitor-mode" , methods=["GET","POST"] )
def enable_monitor_mode():
    return render_template("enable_monitor_mode.html", title= 'how to enable monitor mode |what is monitor mode |boot up the geek')



@app.route("/Quick-Charging-How-to-enable-on your-phone" , methods=["GET","POST"] )
def fast_charging():
    return render_template("fast_charging.html", title= 'Quick Charging- How to enable on your phone |boot up the geek')


@app.route("/Shoud-I-game-on-linux" , methods=["GET","POST"] )
def gaming_on_linux():
    return render_template("gaming_on_linux.html", title= 'Shoud I game on linux | does gaming on linux sucks? |Boot Up the Geek')


@app.route("/Android-vs-Linux-differences" , methods=["GET","POST"] )
def is_Android_Linux ():
    return render_template("is_Android_Linux.html", title= 'Android vs Linux differences |boot up the geek')


@app.route("/How-to-tell-if-your-phones-is-hacked" , methods=["GET","POST"] )
def is_your_prone_to_hacking():
    return render_template("is_your_prone_to_hacking.html", title= 'How to tell if your phones is hacked |boot up the geek')


@app.route("/switching-from-windows-to-linux-my-experience" , methods=["GET","POST"] )
def journey_from_windows_10_to_linux():
    return render_template("journey_from_windows_10_to_linux.html", title= 'Switching from windows to linux -my experience |boot up the geek')


@app.route("/android-phone-safety-tips" , methods=["GET","POST"] )
def keep_android_safe():
    return render_template("keep_android_safe.html", title= 'android phone safety tips|boot up the geek')


@app.route("/asymmetric-encryption-algorithms" , methods=["GET","POST"] )
def public_key_encryption():
    return render_template("public_key_encryption.html", title= 'asymmetric encryption algorithms| public key cryptography')


@app.route("/root-android-phone-in-2017" , methods=["GET","POST"] )
def reasons_to_root_your_Android_phone():
    return render_template("reasons_to_root_your_Android_phone.html", title= 'root android phone in 2017 |boot up the geek')


@app.route("/is-android-rooting-popularity-going-down" , methods=["GET","POST"] )
def rooting_popularity_down():
    return render_template("rooting_popularity_down.html", title= 'is android rooting popularity going down? ')


@app.route("/best-way-to-install-kali-linux" , methods=["GET","POST"] )
def Should_You_Install_Kali_Linux_as_a_Beginner():
    return render_template("Should_You_Install_Kali_Linux_as_a_Beginner.html", title= 'best way to install kali linux | Kali virtualbox vs dualboot |boot up the geek ')



@app.route("/tcp-3-way-handshake-in-detail" , methods=["GET","POST"] )
def three_way_handshake_part1():
    return render_template("three_way_handshake_part1.html", title= 'tcp 3 way handshake in detail |boot up the geek')




@app.route("/Capturing-three-way-handshake-using-Wireshark" , methods=["GET","POST"] )
def three_way_handshake_part2():
    return render_template("three_way_handshake_part2.html", title= 'three way handshake wireshark |Capturing three way handshake using Wireshark')


@app.route("/installing-linux-virtualbox-or-dualboot" , methods=["GET","POST"] )
def VB_or_dualboot():
    return render_template("VB_or_dualboot.html", title= 'installing linux - virtualbox or dual boot |boot up the geek')


@app.route("/http-vs-https-security-the-introduction" , methods=["GET","POST"] )
def Introduction_to_HTTP_and_HTTPS():
    return render_template("Introduction_to_HTTP_and_HTTPS.html", title= 'http vs https security - the introduction |boot up the geek')


@app.route("/How-does-HTTPS-actually-work?" , methods=["GET","POST"] )
def How_HTTPS_work():
    return render_template("How_HTTPS_work.html", title= 'How does HTTPS actually work? |boot up the geek ')


@app.route("/ICMP-Message-types" , methods=["GET","POST"] )
def ICMP_Part_2 ():
    return render_template("ICMP_Part_2.html", title= 'ICMP Message types |boot up the geek')




@app.route("/ICMP-Ping-command" , methods=["GET","POST"] )
def ICMP_Part_3 ():
    return render_template("ICMP_Part_3.html", title= 'ICMP Ping command |boot up the geek ')



@app.route("/icmp-basics" , methods=["GET","POST"] )
def ICMP_Part_1 ():
    return render_template("ICMP_Part_1.html", title= 'icmp basics | what is ICMP? |boot up the geek')


@app.route("/icmp-traceroute" , methods=["GET","POST"] )
def ICMP_Part_4():
    return render_template("ICMP_Part_4.html", title= 'icmp traceroute |boot up the geek')



@app.route('/android' , methods=["GET","POST"] )
def android1():
    return render_template("android1.html", title= 'android|boot up the geek')



@app.route('/linux' , methods=["GET","POST"] )
def linux():
    return render_template("linux.html", title= 'Linux|boot up the geek')



@app.route('/hacking-tutorials' , methods=["GET","POST"] )
def hacking_tutorials():
    return render_template("hacking_tips.html", title= 'hacking-tutorials|boot up the geek')




@app.route('/networking' , methods=["GET","POST"] )
def networking1():
    return render_template("networking1.html", title= 'networking |boot up the geek')



@app.route('/phones' , methods=["GET","POST"] )
def phones():
    return render_template("phones.html", title= 'phones')


@app.route('/will-cryptocurrency-ultimately-fall' , methods=["GET" ,"POST"] )
def cryptocurrency_fall():
    return render_template("crypto_will_crash1.html" , title = "how-cryptocurrency-will-fall | boot-up-the-geek ")


@app.route('/crunch-wordlist-generator' , methods=["GET" ,"POST"] )
def crunch_wordlist_generator():
    return render_template("crunch.html" , title = "crunch-wordlist-generator | boot-up-the-geek ")

@app.route('/wifi-password-crack' , methods=["GET" ,"POST"] )
def wifi_password_crack():
    return render_template("wifi_hacking.html" , title = "wifi-password-crack| boot-up-the-geek ")


if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0', port=5000)


