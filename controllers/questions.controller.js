
const express = require('express')
const router = express.Router()
const mongoose = require('mongoose');

const Question = require('../models/questions.model') // includes our model
const Subject = require('../models/subject.model')

// get all quiz questions
exports.getAllQuestions = async (req, res) => {
    try {
        const questions = await Question.find()
        return res.status(200).json(questions)
    } catch (error) {
        return res.status(500).json({ "error": error })
    }
}

// get one quiz question
exports.getQuestionById = async (req, res) => {
    try {
        const _id = req.params.id
        const question = await (await Question.findOne({ _id })).populate("subjects").execPopulate()
        if (!question) {
            return res.status(404).json({})
        } else {
            return res.status(200).json(question)
        }
    } catch (error) {
        return res.status(500).json({ "error": error })
    }
}

// create one quiz question
exports.createQuestion = async (req, res) => {
    try {
        const { description } = req.body;
        const { alternatives } = req.body;

        const question = new Question(req.body);
        await question.save();

        // const question = await Question.create({
        //     description,
        //     alternatives
        // })

        return res.status(201).json(question)
    } catch (error) {
        return res.status(500).json({ "error": error })
    }
}

// update one quiz question
exports.updateQuestion = async (req, res) => {
    try {
        const _id = req.params.id
        const { description, image, alternatives } = req.body

        let question = await Question.findOne({ _id })

        if (!question) {
            question = await Question.create({
                description,
                alternatives
            })
            return res.status(201).json(question)
        } else {
            question.description = description
            question.alternatives = alternatives
            question.image = image
            await question.save()
            return res.status(200).json(question)
        }
    } catch (error) {
        return res.status(500).json({ "error": error })
    }
}


// delete one quiz question
exports.deleteQuestion = async (req, res) => {
    try {
        const _id = req.params.id

        const question = await Question.deleteOne({ _id })

        if (question.deletedCount === 0) {
            return res.status(404).json()
        } else {
            return res.status(204).json()
        }
    } catch (error) {
        return res.status(500).json({ "error": error })
    }
}

//creates a new subject

exports.createSubject = async (req, res) => {
    try {
        const subject = new Subject(req.body);
        await subject.save();
        return res.status(200).json(subject)
    } catch (error) {
        return res.status(500).json({ "error": error })
    }
}

//get all subjects
exports.getAllSubjects = async (req, res) => {
    try {
        const subjects = await Subject.find()
        return res.status(200).json(subjects)
    } catch (error) {
        return res.status(500).json({ "error": error })
    }
}

//get all questions from a specific subject
exports.getAllQuestionBySubject = async (req, res) => {
    try {
        const _id = req.params.id

        const questions = await Question.find({ subjects: _id });
        return res.status(200).json(questions)
    } catch (error) {
        return res.status(500).json({ "error": error })
    }
}
