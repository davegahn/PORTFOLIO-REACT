const express = require('express')
const router = express.Router()
const Portfolio = require('../models/portfolio')
// const authService = require('./services/auth')

// const portfolioCtrl  = require('../controllers/Portfolio'); doesnt works

// router.post('', authService.checkJWT, authService.checkRole('siteOwner'), portfolioCtrl.savePortfolio)
// router.get('', authService.checkJWT, authService.checkRole('siteOwner'), portfolioCtrl.savePortfolio)

router.get('', (req, res) => {
    Portfolio.find({}, (err, allPortfolios) => {
        if(err) {
            return res.status(422).send(err);
        }
        const body = res.json(allPortfolios)
        return body
    })
});

// удаляем значения __v которые пишет mongo так как они не проходят валидацию
router.get('/:id', (req, res) => {
    const portfolioId = req.params.id
    Portfolio.findById(portfolioId)
        .select('-__v')
        .exec((err, foundPortfolio) => {
            if(err) {
                return res.status(422).send(err)
            }
            return res.json(foundPortfolio)
        })
})

router.post('', (req, res) => {
    const portfolioData = req.body
    // const userId = req.user && req.user.sub
    const portfolio = new Portfolio(portfolioData)
    // portfolio.userId = userId; TODO
    portfolio.userId = 'someID'

    portfolio.save((err, createdPortfolio) => {
        if(err) {
            return res.status(422).send(err)
        }
        return res.json(createdPortfolio)
    })
});

router.patch('/:id', (req, res) => {
    const portfolioId = req.params.id
    const portfolioData = req.body

    Portfolio.findById(portfolioId, (err, foundPortfolio) => {
        if(err) {
            return res.status(422).send(err)
        }
        foundPortfolio.set(portfolioData)
        foundPortfolio.save((err, savedPortfolio) => {
        if(err) {
            return res.status(422).send(err)
        }
        })
        return res.json(foundPortfolio)
    })
});

router.delete('/:id', (req, res) => {
    const portfolioId = req.params.id
    Portfolio.deleteOne({_id: portfolioId}, (err, deletedPortfolio) => {
        if(err) {
            return res.status(422).send(err)
        }
        return res.json({status: "DELETED"})
    })
});

module.exports = router