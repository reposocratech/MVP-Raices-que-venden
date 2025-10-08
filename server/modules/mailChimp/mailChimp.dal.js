import mailchimp from '@mailchimp/mailchimp_marketing';
import dotenv from 'dotenv';
dotenv.config();

mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY,
  server: process.env.MAILCHIMP_SERVER_PREFIX,
});

class MailChimpDal {
  subscribe = async ({email, name}) => {
    try {
      console.log(email, name);
      const result = await mailchimp.lists.addListMember(
        process.env.MAILCHIMP_AUDIENCE_ID,
        {
          email_address: email,
          status: 'subscribed',
          merge_fields: {FNAME: name}
        }
      );

      return result;

    } catch (error) {
      const detail = error.response?.body?.detail || error.message;
      console.log('ahiiiii');
      throw new Error(detail);
    }
  }
}

export default new MailChimpDal();