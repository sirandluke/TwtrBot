const twit = require('twit');

/** @module TwitterBot */
/** @class */
class TwitterBot {
  /**
   * Creates new twit object.
   * @constructor
   * 
   * @param  { string } consumer_key - Application's (bot) consumer key.
   * @param  { string } consumer_secret - Application's consumer secret.
   * @param  { string } access_token - Application's access token.
   * @param  { string } access_token_secret - Application's token secret.
   */
  constructor(consumer_key, consumer_secret, access_token, access_token_secret) {
    this.twit = new twit({
      consumer_key: consumer_key,
      consumer_secret: consumer_secret,
      access_token: access_token,
      access_token_secret: access_token_secret,
    });
  }

  /**
   * Updates the authenticating user's current status, also known as Tweeting.
   * 
   * @link  https://developer.twitter.com/en/docs/twitter-api/v1/tweets/post-and-engage/api-reference/post-statuses-update
   * 
   * @param  { string } status - The text of the status update. URL encode as necessary. t.co link wrapping will affect character counts.	
   * @param  { JSON }   params - Additional optional parameters.
   * 
   * @return  { Promise } Returns response data or an error.
   */
  postTweet(status, params=null) {
    return new Promise((resolve, reject) => {
      if (params === null) {
        params = {
          status: status,
        };
      } else {
        try {
          params.status = status;
        } catch(e) {
          reject(e);
        }
      }
      this.twit.post('statuses/update', params, (err, data) => {
        if (err) {
          return reject(err);
        }
        return resolve(data);
      });
    });
  }


  /**
   * Post a Tweet containing a URL.
   * 
   * @link  https://developer.twitter.com/en/docs/twitter-api/v1/tweets/post-and-engage/api-reference/post-statuses-update
   * 
   * @param  { string } url -
   * @param  { string | null } status -
   * @param  { JSON | null } params -
   * 
   * @return { Promise } Returns response data or an error.
   */
  _postLink(url, status=null, params=null) {

  }

  /**
   * (In development) Reply as a comment to a particular Tweet. Can omit in_reply_to_status_id in params.
   * 
   * @link  https://developer.twitter.com/en/docs/twitter-api/v1/tweets/post-and-engage/api-reference/post-statuses-update
   * 
   * @param  { string } status
   * @param  { string } id
   * @param  { JSON }   params
   * 
   * @return  { Promise } Returns response data or an error.
   */
  _replyToTweet(status, id, params=null) {
    return new Promise((resolve, reject) => {

    });
  }

  /**
   * Returns a collection of relevant Tweets matching a specified query.
   * 
   * @link  https://developer.twitter.com/en/docs/twitter-api/v1/tweets/search/api-reference/get-search-tweets
   * 
   * @param  { string } q - A UTF-8, URL-encoded search query of 500 characters maximum, including operators. Queries may additionally be limited by complexity.
   * @param  { JSON }   params - Additional optional parameters.
   * 
   * @return  { Promise } Returns a list of statuses or an error.
   */
  searchTweets(q, params=null) {
    return new Promise((resolve, reject) => {
      if (params === null) {
        params = {
          q: q,
        };
      } else {
        try {
          params.q = q;
        } catch(e) {
          return reject(e);
        }
      }
      this.twit.get('search/tweets', params, (err, data) => {
        if (err) {
          return reject(err);
        }
        return resolve(data);
      });
    });
  }

  
  /**
   * Provides a simple, relevance-based search interface to public user accounts on Twitter.
   * 
   * @link  https://developer.twitter.com/en/docs/twitter-api/v1/accounts-and-users/follow-search-get-users/api-reference/get-users-search
   * 
   * @param  { string } q - The search query to run against people search.
   * @param  { JSON }   params - Additional optional parameters
   * 
   * @returns  {Promise } Returns a list of users or an error.
   */
  searchUsers(q, params=null) {
    return new Promise((resolve, reject) => {
      if (params === null) {
        params = {
          q: q,
        };
      } else {
        try {
          params.q = q;
        } catch(e) {
          return reject(e);
        }
      }
      this.twit.get('users/search', params, (err, data) => {
        if (err) {
          return reject(err);
        }
        return resolve(data);
      });
    });
  }

  /**
   * Retweets a tweet. Returns the original Tweet with Retweet details embedded (https://developer.twitter.com/en/docs/twitter-api/v1/tweets/post-and-engage/api-reference/post-statuses-retweet-id).
   * @param  { string } id - The numerical ID of the desired status (see https://developer.twitter.com/en/docs/twitter-api/v1/tweets/post-and-engage/api-reference/post-statuses-retweet-id).
   * @return  { Promise } Returns response data or an error.
   */
  postRetweet(id) {
    return new Promise((resolve, reject) => {
      twit.post('statuses/retweet/:id', id, (err, data) => {
        if (err) {
          return reject(err);
        }
        return resolve(data);
      });
    });
  }
}

module.exports = TwitterBot;
