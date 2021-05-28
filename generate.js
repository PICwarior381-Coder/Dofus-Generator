//Made BY PICwarior381#2018

const fs = require('fs');
const delay = require('delay');
const hrefs = require('get-hrefs');
const axios = require('axios').default;
const config = require('./config');
const faker = require('faker/locale/fr');
const HTMLParser = require('node-html-parser');
const { firefox } = require('playwright-firefox');

module.exports = async function(message, number, database) {
    const { ip, port, username, password, proxyAPI } = database
    for (let index = 0; index < number; index++) {
        const promise = new Promise(async (resolver, refus) => {
            const browser = await firefox.launch({
                headless: false,
                proxy: {
                    server: ip + ':' + port,
                    username: username,
                    password: password
                }
            });
            try {
                if (index !== 0 && index % 2 == 0) {
                    await axios.get(config.proxy.urlchangeip);
                }

                const api = axios.create({
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json;charset=utf-8'
                    },
                    httpsOverHttp: ({
                        proxy: {
                            host: config.proxy.ip,
                            port: config.proxy.port,
                            proxyAuth: config.proxy.username + ':' + config.proxy.password
                        }
                    })
                });
            
                const dominiosdemail = await api.get('https://api.mail.tm/domains');
                const dominioemail = dominiosdemail.data[0].domain;
            
                const username = faker.internet.userName().toLowerCase().replace(/[^\w\s!?]/g,'').replace(/_/g, '').substring(0, 14) + Math.floor(Math.random() * ('1000' - '100') + '100');
                const email = username + '@' + dominioemail;
                const password = config.password;
                console.log('[+] Création du compte: ' + username);
            
                await api.post('https://api.mail.tm/accounts', JSON.stringify({
                    address: email,
                    password: password
                }));
            
                const tokenemailrequest = await api.post('https://api.mail.tm/token', JSON.stringify({
                    address: email,
                    password: password
                }));
                const tokenemail = tokenemailrequest.data.token;
                
                const context = await browser.newContext();
                const tab = await context.newPage();
                await tab.goto('https://www.dofus.com/fr/mmorpg/jouer');
                await delay(Math.random() * 7500);

                // Cookies
                await delay(Math.random() * 2500);
                await tab.waitForSelector('[action="accept-all"]', { visible: true });
                await tab.click('[action="accept-all"]',{ delay: 25 });
                await delay(Math.random() * 2500);
                
                // Username
                await tab.waitForSelector('#userlogin', { visible: true });
                await tab.type('#userlogin', username, { delay: 40 });
                await delay(Math.random() * 2500);
            
                // Mot de passe
                await tab.waitForSelector('#user_password', { visible: true });
                await tab.type('#user_password', password, { delay: 40 });
                await delay(2012);
            
                // Mot de passe Confirmation
                await tab.waitForSelector('#user_password_confirm', { visible: true });
                await tab.type('#user_password_confirm', password, { delay: 40 });
                await delay(Math.random() * 2500);
            
                // E-mail
                await tab.waitForSelector('#user_mail', { visible: true });
                await tab.type('#user_mail', email, { delay: 40 });
                await delay(Math.random() * 2500);
            
                // Date de Naissance
                await tab.selectOption('#ak_field_1', { index: 16 });
                await tab.selectOption('#ak_field_2', { index: 5 });
                await tab.selectOption('#ak_field_3', { value: '1998' });
                await delay(Math.random() * 2500);

                // Finir enregistrement
                await tab.waitForSelector('#ak_field_4', { visible: true });
                await tab.click('#ak_field_4',{ delay: 25 });
                await delay(Math.random() * 2500);

                await tab.waitForSelector('.ak-register-email-validate');
                
                var emaildofusid = undefined
                do {
                    const emailrequest = await api.get('https://api.mail.tm/messages', {
                        headers: {
                            'Authorization': 'Bearer ' + tokenemail
                        }
                    });
                    const emaildofus = emailrequest.data[0];

                    emaildofusid = (emaildofus == undefined ? undefined : emaildofus.id)
                } while (emaildofusid == undefined);
                
                var urls = undefined
                do {
                    const emaildofusrequest = await api.get('https://api.mail.tm/messages/' + emaildofusid, {
                        headers: {
                            'Authorization': 'Bearer ' + tokenemail
                        }
                    });
                    const emaildofus = emaildofusrequest.data;
                    
                    urls = (emaildofus ? emaildofus.html : undefined)
                } while (urls == undefined);
                
                const urlativacao = hrefs(urls.toString())[1];

                await tab.goto(urlativacao);
                await tab.goto('https://account.ankama.com/fr/securite/ankama-shield');
                
                // Cookies
                await delay(Math.random() * 2500);
                await tab.waitForSelector('[action="accept-all"]', { visible: true });
                await tab.click('[action="accept-all"]',{ delay: 25 });
                await delay(Math.random() * 2500);

                // Username
                await tab.waitForSelector('#userlogin', { visible: true });
                await tab.type('#userlogin', username, { delay: 40 });
                await delay(Math.random() * 2500);
            
                // Mot de passe
                await tab.waitForSelector('#userpass', { visible: true });
                await tab.type('#userpass', password, { delay: 40 });
                await delay(Math.random() * 2500);

                await tab.waitForSelector('#login_sub', { visible: true });
                await tab.click('#login_sub',{ delay: 25 });
                await delay(Math.random() * 2500);

                await tab.waitForSelector('.ak-form-account input[type="submit"]', { visible: true });
                await tab.click('.ak-form-account input[type="submit"]',{ delay: 25 });
                await delay(Math.random() * 2500);

                var emailankamaid = undefined;

                do {
                    await delay(1500);

                    const emailrequest = await api.get('https://api.mail.tm/messages', {
                        headers: {
                            'Authorization': 'Bearer ' + tokenemail
                        }
                    });
                    const emailankama = emailrequest.data[0];
                    
                    emailankamaid = (emailrequest.data.lenght < 3 == undefined ? undefined : emailankama.id);
                } while (emailankamaid == undefined);
                
                await delay(1500);
                
                const emailankamarequest = await api.get('https://api.mail.tm/messages/' + emailankamaid, {
                    headers: {
                        'Authorization': 'Bearer ' + tokenemail
                    }
                });
                const emailankama = emailankamarequest.data;
                
                const html = HTMLParser.parse(emailankama.html);

                const code = html.querySelectorAll('span[style="display:inline-block;background:#ddd;border:1px solid #aaa;padding:10px;"]')[0].childNodes[0].rawText;

                await tab.waitForSelector('#ak_field_1', { visible: true });
                await tab.type('#ak_field_1', code, { delay: 40 });
                await delay(Math.random() * 2500);

                await tab.waitForSelector('.ak-block-button-form input[type="submit"]', { visible: true });
                await tab.click('.ak-block-button-form input[type="submit"]',{ delay: 25 });
                await delay(Math.random() * 2500);
                await tab.waitForLoadState();
                await tab.goto('https://account.ankama.com/fr/securite/ankama-shield/desactiver');
                
                var emailankamashieldid = undefined;

                do {
                    await delay(1500);

                    const emailrequest = await api.get('https://api.mail.tm/messages', {
                        headers: {
                            'Authorization': 'Bearer ' + tokenemail
                        }
                    });
                    const emailankamashield = emailrequest.data[0];
                    
                    emailankamashieldid = (emailrequest.data.lenght < 4 == undefined ? undefined : emailankamashield.id);
                } while (emailankamashieldid == undefined);
                
                await delay(1500);
                
                const emailankamashieldrequest = await api.get('https://api.mail.tm/messages/' + emailankamashieldid, {
                    headers: {
                        'Authorization': 'Bearer ' + tokenemail
                    }
                });
                const emailankamashield = emailankamashieldrequest.data;
                
                const htmlshield = HTMLParser.parse(emailankamashield.html);

                const codeshield = htmlshield.querySelectorAll('span[style="display:inline-block;background:#ddd;border:1px solid #aaa;padding:10px;"]')[0].childNodes[0].rawText;

                await tab.waitForSelector('#security_security', { visible: true });
                await tab.type('#security_security', codeshield, { delay: 40 });
                await delay(Math.random() * 2500);

                await tab.waitForSelector('.ak-block-button-form input[type="submit"]', { visible: true });
                await tab.click('.ak-block-button-form input[type="submit"]',{ delay: 25 });
                await delay(Math.random() * 2500);

                await tab.waitForSelector('.ak-btn-home', { visible: true });
                await delay(Math.random() * 2500);

                await context.clearCookies();
                await context.clearPermissions();
                await browser.close();

                fs.appendFileSync(`${message.author.id}.txt`, username + ':' + password + '\n');
                console.log('[+] Compte Généré.');

                resolver();
            } catch (erro) {
                index = index - 1

                await browser.close();

                if (erro.response && erro.response.data && JSON.stringify(erro.response.data)) {
                    console.log('[-] Erreur lors de la création du compte: ' + JSON.stringify(erro.response.data));
                    fs.appendFileSync('errors.txt', JSON.stringify(erro.response.data) + '\n');
                } else {
                    console.log('[-] Erreur lors de la création du compte: ' + erro.name);
                    fs.appendFileSync('errors.txt', erro + '\n');
                }

                resolver();
            }
        })
        await promise;
    }
}