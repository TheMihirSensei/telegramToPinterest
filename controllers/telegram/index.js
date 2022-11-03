const { Api } = require("telegram");
const { responseHandler } = require("../../common");

// const { responseHandler } = require("../../common");
const getContentOfTelegramGroup = async (req, res) => {
  try {
    const { group_name } = req.params;
    console.log("group_name: ", group_name);

    const result = await client.invoke(
      new Api.channels.GetFullChannel({
        channel: "AnimeLibrary_Wallpapers",
      })
    );
    responseHandler({
      res,
      data: result,
      message: "Testing",
      status_code: 200,
    });
  } catch (err) {}
};

module.exports = {
  getContentOfTelegramGroup,
};
