import {Router} from 'express'

import {
    getData,
    getDataByWingName,
    getDataByWingiesOrNot,

    getroomies
} from '../controllers/user.controller.js'

const router = Router()

// Create a Server and serve your whole saved data when someone tries to access \

router.route("/").get(getData);
// pass hall name and wingname to get data
router.route("/wingName").post(getDataByWingName);
router.route("/WingiesOrNot").post(getDataByWingiesOrNot);
router.route("/getroomies").post(getroomies);

export default router