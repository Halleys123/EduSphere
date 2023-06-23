const signUp = (req, res) => {
  const { email, password, section, name } = req.body;
  const sectiwn = "c";
  try {
    mongoose.model(`${sectiwn}`, userSchema);
  } catch (e) {
    console.log(e);
  }
};