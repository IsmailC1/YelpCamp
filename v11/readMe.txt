
 FIRSTLY !!
// for running the mongo-DB you first have to run these codes:
// -->   sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 2930ADAE8CAF5059EE73BB4B58712A2291FA4AD5
// -->   echo "deb [ arch=amd64 ] https://repo.mongodb.org/apt/ubuntu trusty/mongodb-org/3.6 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.6.list
// -->   sudo apt-get update
// -->   sudo apt-get install -y mongodb-org
// -->   mkdir data
// -->   echo "mongod --dbpath=data --nojournal" > mongod
// -->   chmod a+x mongod
// and finely --> ./mongod
SECONDLY!!
//after that ... this one code should be typed for running moongoose :)
// -->   npm install mongoose@5.1.7 --save