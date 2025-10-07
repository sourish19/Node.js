import { nanoid } from 'nanoid';
import normalizeUrl from 'normalize-url';
import { UrlShortner } from '../models/urlModel.js';
import mongoose from 'mongoose';

export const requestedURL = async (req, res) => {
  const { url } = req.body;
  const userId = req.session.user.userId;

  const normalizedURL = normalizeUrl(url, {
    forceHttps: true,
    stripWWW: false,
    removeTrailingSlash: false,
  });

  const shortID = nanoid(6);
  const createdURL = `http://127.0.0.1:8000/api/url/${shortID}`;

  try {
    const findUser = await UrlShortner.findOne({
      createdby: new mongoose.Types.ObjectId(userId),
    });
    if (findUser) {
      const urlExists = findUser.originalURL === normalizedURL ? true : false;
      if (urlExists) {
        return res.status(200).json('URL already Exists');
      }
      findUser.shortID = shortID;
      findUser.originalURL = normalizedURL;
      findUser.createdURL = createdURL;
      await findUser.save();
    } else {
      await UrlShortner.create({
        createdby: userId,
        shortID: shortID,
        originalURL: normalizedURL,
        createdURL: createdURL,
      });
    }

    return res.render('displayURL', {
      shorten_URL: `${createdURL}`,
    });
  } catch (error) {
    res.status(400).json({ err: `Error occured - ${error}` });
  }
};

export const redirectUrl = async (req, res) => {
  const { shortID } = req.params;

  if (!shortID) {
    return res.status(400).json({ err: 'Please provie the short URL' });
  }

  try {
    const url = await UrlShortner.findOneAndUpdate(
      { shortID },
      {
        $inc: { visits: 1 },
        $push: {
          visitHistory: {
            timestamps: Date.now(),
          },
        },
      }
    );

    res.redirect(url.originalURL);
  } catch (error) {
    res.status(400).json({ err: `Error occured - ${error}` });
  }
};

export const visitHistory = async (req, res) => {
  const { shortID } = req.params;

  if (!shortID) {
    return res.status(400).json({ err: 'Please provie the short URL' });
  }

  const url = await UrlShortner.findOne({ shortID });

  const visits = url.visits;

  return res.render('displayURL_visits', { visits, shortID });
};
