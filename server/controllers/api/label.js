const express = require('express');

const router = express.Router();
const labelService = require('../../services/label');

router.post('/', labelService.createLabel);
router.delete('/:labelId', labelService.deleteLabel);

module.exports = router;
