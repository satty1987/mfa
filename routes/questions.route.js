const express = require('express');
const questionController = require('../controllers/questions.controller');
const questionsRoute = express.Router();
questionsRoute.get('/questions', questionController.getAllQuestions);
questionsRoute.post('/questions', questionController.createQuestion);
questionsRoute.get('/questions/:id', questionController.getQuestionById);
questionsRoute.put('/questions/:id',  questionController.updateQuestion);
questionsRoute.delete('/questions/:id',questionController.deleteQuestion)
questionsRoute.post('/subject',  questionController.createSubject);
questionsRoute.get('/subject',  questionController.getAllSubjects);
questionsRoute.get('/question/subject/:id',  questionController.getAllQuestionBySubject);

module.exports = questionsRoute;