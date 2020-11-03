const express = require('express');

const router = express.Router();
const labelService = require('../../services/label');

router.get('/', labelService.readLabelAll);
router.post('/', labelService.createLabel);
router.put('/:labelId', labelService.updateLabel);
router.delete('/:labelId', labelService.deleteLabel);

module.exports = router;
