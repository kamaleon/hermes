class TokenVerifierController {
  async index(req, res) {
    return res.json({ message: 'OK' });
  }
}

export default new TokenVerifierController();
