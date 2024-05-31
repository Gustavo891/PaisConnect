setTimeout(function() {
    var loadingOverlay = document.getElementById('loading-overlay');
    loadingOverlay.style.opacity = '0';
    // Remove a tela de carregamento do DOM após a transição de opacidade
    setTimeout(function() {
        loadingOverlay.parentNode.removeChild(loadingOverlay);
    }, 500); // Tempo deve corresponder à duração da transição
}, 1000);
// Função para obter o parâmetro da URL
function obterParametroUrl(nomeParametro) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(nomeParametro);
}

// Obtém o nome do país da URL
const nomePais = obterParametroUrl('pais');
const nomePaisElemento = document.querySelector('.nomePais');
const paisTodo = document.querySelector('.paisTodo');
const paisImg = document.querySelector('.paisImg');
const conteudo = document.querySelector('.continentes');
const populacao = document.querySelector('.populacao');
const linguaDiv = document.querySelector('.linguas')
const lang = document.querySelector('.lang')
const area = document.querySelector('.area')
const coin = document.querySelector('.coin');
const moedaDiv = document.querySelector('.moedas');
const capitalDesc = document.querySelector('.capital');
const indepedente = document.querySelector('.indepedente');
const un = document.querySelector('.un');
const brasao = document.querySelector('.brasao .imageCard');
const cidadania = document.querySelector('.cidadania');
const texto = document.querySelector('.texto');
const imageinfo = document.querySelector('.imageinfo img');
let tamanho = 0;

document.title = 'Pais Connect - ' + nomePais;

fetchCountryData(nomePais)
    .then(data => {
        const countryData = data[0]; // Obtém o primeiro item do array

        if (countryData && countryData.name && countryData.name.nativeName) {
            nomePaisElemento.textContent = countryData.translations.por.common;
            paisTodo.textContent = countryData.translations.por.official;
            funCapital(countryData.capital)
            area.textContent = parseInt(countryData.area).toLocaleString('pt-BR') + ' km²';
            populacao.textContent = parseInt(countryData.population).toLocaleString('pt-BR');
            funContinente(countryData.continents)
            funMoeda(countryData.currencies)
            funLingua(countryData.languages)
            funFlag(countryData)
            if(countryData.independent) {
                indepedente.textContent = "Sim"
            } else {
                indepedente.textContent = "Não"
            }
            if(countryData.unMember) {
                un.textContent = "Membro"
            } else {
                un.textContent = "Não"
            }
        } else {
            console.error('Estrutura de dados do país inválida:', countryData);
        }
    })
    .catch(error => {
        console.error('Erro ao buscar dados do país:', error);
        // Trate o erro aqui, por exemplo, exibindo uma mensagem de erro na página
    });

function funFlag(countryData) {
    imageinfo.src = countryData.flags.png;
    paisImg.src = countryData.coatOfArms.svg;
    let translationFound = false;
    texto.textContent = countryData.flags.alt;
/*     translate(countryData.flags.alt)
        .then(traducao => {
            for (const match of traducao.matches) {
                if (countryData.flags.alt !== match.translation) {
                    texto.textContent = match.translation;
                    translationFound = true;
                    break; // Sai completamente do loop quando a condição é satisfeita
                }
            }
            if(translationFound == false) {
                texto.textContent = traducao.responseData.translatedText;
            }
        })
        .catch(error => {
            console.error('Erro ao traduzir:', error);
            texto.textContent = countryData.flags.alt; // Em caso de erro, use o nome original da moeda
        }); */
}

function fetchCountryData(nomePais) {
    return fetch(`https://restcountries.com/v3.1/name/${nomePais}?fullText=true`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao obter os dados do país');
            }
            return response.json();
        })
        .then(data => {
            // Aqui você pode salvar os dados em uma variável ou fazer o que quiser com eles
            return data; // Retorna os dados para poderem ser usados em outra parte do código
        });
}
function funCapital(capital) {
    capitalDesc.textContent = capital;
}
function funContinente(continentes) {
    tamanho = 0;
    continentes.forEach(nomeContinente => {
        tamanho++;
        // Cria os elementos HTML para cada continente
        const divContinente = document.createElement('div');
        const divImage = document.createElement('div')
        divImage.classList.add('imageCard')
        divContinente.classList.add('card3');

        const img = document.createElement('img');
        img.src = '../assets/images/' + nomeContinente + '.svg'; // Insira aqui a URL da imagem do continente
        img.alt = 'NULL'; // Insira aqui o texto alternativo da imagem
        const h2 = document.createElement('h2');
        h2.classList.add('desc')
        switch (nomeContinente) {
            case "South America":
                h2.textContent = "America do Sul";
                break;
            case "North America":
                h2.textContent = "America do Norte";
                break;
            case "Europe":
                h2.textContent = "Europa";
                break;
            case "Oceania":
                img.src = '../assets/images/' + nomeContinente + '.png';
                h2.textContent = 'Oceania';
                break;
            default:
                h2.textContent = nomeContinente;
                break;
        }
        divImage.appendChild(img);
        divContinente.appendChild(divImage);
        divContinente.appendChild(h2);

        // Adiciona a div de continente à div de conteúdo
        conteudo.appendChild(divContinente);
    });
    const cont = document.querySelector('.cont');
    cont.style.width = ((332 * tamanho) + (30 * (tamanho - 1)))+ 'px';
}
function funLingua(linguas) {
    tamanho = 0;
    for (let lingua in linguas) {
        tamanho++;
        const language = document.createElement('div')
        const divImage = document.createElement('div')
        divImage.classList.add('imageCard')
        const img = document.createElement('img')
        const h2 = document.createElement('h2')
        h2.classList.add('desc')
        h2.textContent = 'Carregando...'
        language.classList.add('card3');
        let translationFound = false;
        translate(linguas[lingua])
            .then(traducao => {
                for (const match of traducao.matches) {
                    if (linguas[lingua] !== match.translation) {
                        h2.textContent = match.translation;
                        translationFound = true;
                        break; // Sai completamente do loop quando a condição é satisfeita
                    }
                }
                if(translationFound == false) {
                    h2.textContent = traducao.responseData.translatedText;
                }
            })
            .catch(error => {
                console.error('Erro ao traduzir:', error);
                h2.textContent = linguas[lingua]; // Em caso de erro, use o nome original da moeda
            });
        img.src = '../assets/images/language.png'
        divImage.appendChild(img)
        language.appendChild(divImage)
        language.appendChild(h2)
        linguaDiv.appendChild(language)
    }
    lang.style.width = ((332 * tamanho) + (30 * (tamanho - 1)))+ 'px';
}
function funMoeda(moedas) {
    tamanho = 0;
    for (let moeda in moedas) {
        tamanho++;
        const currency = document.createElement('div');
        currency.classList.add('card3');
        const h1 = document.createElement('h1');
        const h2 = document.createElement('h2');
        h2.textContent = "Carregando..."
        const div = document.createElement('div')
        h1.textContent = moedas[moeda].symbol.toUpperCase();
        translate(moedas[moeda].name)
            .then(traducao => {
                h2.textContent = traducao.responseData.translatedText;
            })
            .catch(error => {
                console.error('Erro ao traduzir:', error);
                h2.textContent = moedas[moeda].name; // Em caso de erro, use o nome original da moeda
            });
        div.appendChild(h1)
        currency.appendChild(div);
        currency.appendChild(h2);
        moedaDiv.appendChild(currency);
    }
    coin.style.width = ((332 * tamanho) + (30 * (tamanho - 1)))+ 'px';
}
function translate(moeda) {
    return fetch(`https://api.mymemory.translated.net/get?q=${moeda}!&langpair=en-US|pt-br`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao obter a tradução');
            }

            return response.json();
        })
        .then(data => {
            return data;
        });
}


    // Esconde a tela de carregamento quando o conteúdo da página estiver totalmente carregado
