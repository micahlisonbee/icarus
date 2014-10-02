/**
 * Allow any authenticated user.
 */
module.exports = function(req, res, ok) {

  // User is allowed, proceed to controller
  if (req.session.User) {
    return ok();
  }

  // User is not allowed
  else {

    res.redirect('/session/new?msg=You must sign in to view this page.');

    return;

    //res.send(403); // forbidden
  }
};