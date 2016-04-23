# Sense
sudo npm -g install sails

sudo npm -g install bower

sudo npm install -g generator-angular-crud

sudo npm install -g yo

sudo npm install -g gulp nodemon

sails new HealthServer

sails generate api vitals

sails generate api patient

sails generate api doctor

sails lift
 
	
http://localhost:1337/vitals/create?minsp02=99&maxsp02=233&minbeat=83&maxbeat=122&mintemp=78&maxtemp=102&interval=23

http://localhost:1337/doctor/create?name=DrSathya&mobile=9583298535

http://localhost:1337/patient/create?name=Peter&address=Adyar&mobile=9583298535&vitals=1&supervisor=1


//client
cd HealthClient

yo angular-crud

npm install

bower install

yo angular-crud:feature patient

yo angular-crud:feature vitals

yo angular-crud:feature doctor

gulp serve-dev

