/*
 * message.js
 * This file contains your bot code
 */

const recastai = require('recastai')

// This function is the core of the bot behaviour
const replyMessage = (message) => {
  // Instantiate Recast.AI SDK, just for request service
  const request = new recastai.request(process.env.REQUEST_TOKEN, process.env.LANGUAGE)
  // Get text from message received
  const text = message.content

  console.log('I receive: ', text)

  // Get senderId to catch unique conversation_token
  const senderId = message.senderId

  // Call Recast.AI SDK, through /converse route
  request.converseText(text, { conversationToken: senderId })
  .then(result => {
    /*
    * YOUR OWN CODE
    * Here, you can add your own process.
    * Ex: You can call any external API
    * Or: Update your mongo DB
    * etc...
    */
      //var stringfr = 'Très bien si tu veux de la documentation concernant le service ';
      //var stringEn = 'Ok, if you want to have information about ';
      //var stringIt = 'Se vuoi avere informazione a proposto del servizio ';


    if (result.action) {
      console.log('The conversation action is: ', result.action.slug)
      //console.log(prod);

    if(result.action.slug == "information"){

      for(var t in result.entities){
        var string ="Très bien si tu veux de la documentation concernant le service ";
        var stringMail =""
              if(t.match(/produit-elo-sem/i)){

                
               /* if(result.language === 'fr'){
                  //string = stringfr + "sémantique alors visite cette page : ";
                }
                else if (result.language === 'it'){
                  //string = stringIt + "semantico alora fai clic qui : ";
                }
                else{
                  //string = stringEn + "semantic visit this website : ";
                }*/
                string += "sémantique alors visite ce site: https://www.eloquant.com/la-semantique/explore-analyse-semantique-automatisee";
                stringMail += "Ou alors envoyer un mail à : support-semantique@eloquant.com";

              }

               else if(t.match(/produit-elo-dial/i)){
                  /*if(result.language === 'fr'){
                    string = stringfr + "dialogue alors visite cette page : ";
                  }
                  else if (result.language === 'it'){
                    string = stringIt + "dialogo alora fai clic qui : ";
                  }
                  else{
                    string = stringEn + "dialog visit this website : ";
                  }*/

                  string += "dialogue alors visite ce site : https://www.eloquant.com/le-dialogue/contact-gestion-des-interactions-clients-multicanal";
                  stringMail += "Ou alors envoyer un mail à : support-dialogue@eloquant.com";

                }

             else if(t.match(/produit-elo-ec/i)){

              //console.log("j'entre ici !")

               /* if(result.language === 'fr'){
                  string = stringfr + "écoute alors visite cette page : ";
                }
                else if (result.language === 'it'){
                  string = stringIt + "écoute alora fai clic qui : ";
                }
                else{
                  string = stringEn + "écoute visit this website : ";
                }*/

                string += "écoute alors visite ce site : https://www.eloquant.com/l-ecoute/interview-solution-de-recueil-de-feedback-multicanal";
                stringMail += "Ou alors envoyer un mail à : support-ecoute@eloquant.com";

              }

             else if(t.match(/produit-elo-pil/i)){

              //console.log("j'entre ici !")

               /* if(result.language === 'fr'){
                  string = stringfr + "écoute alors visite cette page : ";
                }
                else if (result.language === 'it'){
                  string = stringIt + "écoute alora fai clic qui : ";
                }
                else{
                  string = stringEn + "écoute visit this website : ";
                }*/

                string += "écoute alors visite ce site : https://www.eloquant.com/le-pilotage/app-cockpit-pilotage-de-l-experience-client-depuis-un-smartphone";
                  stringMail += "Ou alors envoyer un mail à : support-cockpit@eloquant.com";

              }

                // prod = true;
                // nameEntities.push(t);
                // for(var i = 0 ; i<result.entities[t].length;i++){
                //   neValue.push(result.entities[t][i].raw)
                // }
      }


      if(stringMail!=''){
        message.addReply([{ type: 'text', content: string },{ type: 'text', content: stringMail },{ type: 'text', content: "De quoi d'autre souhaiteriez vous discuter ?" }])
      }
                    else{
                   message.addReply([{ type: 'text', content: "Très bien, vous souhaitez être documenté, quel service vous intéresse? (Ecoute, dialogue, sémantique, pilotage)" }])
              }

      /*if(string===''){
          if(result.language === 'fr'){
              string = 'De quoi voulez-vous parler ?';
          }
          else if (result.language === 'it'){
             string = 'Di che cosa vuoi parlare ?';
          }
          else{
             string ='What do you want to talk about?';
          }
         message.addReply([{ type: 'text', content: string }])        
      }*/
      //else{
      //}
    }


        if(result.action.slug == "exportation"){
                    console.log("exportation")
          //message.addReply([{ type: 'text', content: "Avez-vous d'autres questions ?" }])

          //message.addReply([{ type: 'text', content: "Voici un lien vers la documentation : https://www.eloquant.com/pages/les-manuels-utilisateurs" },{ type: 'text', content: "Avez-vous d'autres questions ?" }])
        }


        if(result.action.slug == "appeloperateur"){
          //console.log("APPELOPERATEUR")
          //message.addReply([{ type: 'text', content: "Vous allez être mis en relation avec un de nos conseillers..." }])
          const call = {
            type: 'quickReplies',
            content: {
              title: 'Cliquez pour appeler',
              buttons: [
                {
                  title: 'Appeler',
                  value: 'Merci',
                },
              ]
            }
          }

          message.addReply(call)
        }

        if(result.action.slug == "questionnaire"){
          //console.log("QUESTIONNAIRE")

          message.addReply([{ type: 'text', content: "Merci de bien vouloir répondre à l'enquête de satisfaction suivante : https://interview.eloquant.cloud/m4/itw/answer/s/UZPRwf57Sj/k/679D66U" }])
          message.addReply([{ type: 'picture', content: 'https://i.pinimg.com/236x/e1/38/a1/e138a174c33a48931521dcc5639d4a03--happy-pictures-smiley-faces.jpg' }, {type:'text', content:'A une prochaine !'}])
        }


        if(result.action.slug == "greetings"){          
      
          const dialogue = {
            type: 'quickReplies',
            content: {
              title: 'Bonjour en quoi puis-je vous aider ?',
              buttons: [
                {
                  title: 'Aide Dialogue',
                  value: 'Aide Dialogue',
                },              {
                  title: 'Aide Ecoute',
                  value: 'Aide Ecoute',
                },
                {
                  title: 'Autres questions',
                  value: 'Autres questions',
                },
              ]
            }
          }
        message.addReply(dialogue)
       }

    }

    // If there is not any message return by Recast.AI for this current conversation
    if (!result.replies.length) {
      //message.addReply({ type: 'text', content: 'I don\'t have the reply to this yet :)' })
    } else {
      // Add each reply received from API to replies stack
      result.replies.forEach(replyContent => message.addReply({ type: 'text', content: replyContent }))
    }

    // Send all replies
    message.reply()
    .then(() => {
      // Do some code after sending messages
    })
    .catch(err => {
      console.error('Error while sending message to channel', err)
    })
  })
  .catch(err => {
    console.error('Error while sending message to Recast.AI', err)
  })
}

module.exports = replyMessage
