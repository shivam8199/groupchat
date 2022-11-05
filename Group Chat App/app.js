const express=require('express');
const app=express();

const dotenv=require('dotenv');
dotenv.config();

const cors=require('cors');
app.use(cors());

const bodyParsed=require('body-parser');
app.use(bodyParsed.json());

const sequelize = require('./util/dataBase.js');

const signupRouter=require('./routes/signupRouter.js');
app.use(signupRouter);

const loginRouter=require('./routes/loginRouter.js');
app.use(loginRouter);

const forgotRouter=require('./routes/forgotRouter.js');
app.use(forgotRouter);


const chatHomeRouter=require('./routes/chatHomeRouter.js');
app.use(chatHomeRouter);


const groupsRouter=require('./routes/groups.js');
app.use(groupsRouter);


const USER=require('./models/user');
const USERMESSAGES=require('./models/userMessages');

USER.hasMany(USERMESSAGES);

USERMESSAGES.belongsTo(USER);


const GROUP=require('./models/group.js');

const USERGROUPS=require('./models/usergroups.js');

USER.belongsToMany(GROUP,{through:USERGROUPS});

GROUP.belongsToMany(USER,{through:USERGROUPS});

GROUP.hasMany(USERMESSAGES);
USERMESSAGES.belongsTo(GROUP);


sequelize.sync();
app.listen(8000);