function setAboutPage() {

  const aboutDiv = createElementWrapper("div", ["card", "mb-3"])
  const topRowDiv = createElementWrapper("div", ["row", "g-0"])
  const topCardBodyDiv = createElementWrapper("div", ["card-body"])
  const h4 = createElementWrapper("h4", ["card-title"])
  h4.innerHTML = "About"
  const p1 = createElementWrapper("p", ["card-text"])
  const small = createElementWrapper("small", ["text-muted"])
  small.innerHTML = "2022-02-26"
  p1.append(small)
  const p2 = createElementWrapper("p", ["card-text"])
  p2.innerHTML = "This is an application that utilizes the crypto corencies data bases. It allows the user to explore the crypto corencies in a friendy environment. To see specific currency rates compared to selected currencies. Further more it alows a real time graphical representation of the current rates (up to five selected coins - if such have the relevant data in the D.B)"
  const h5 = createElementWrapper("h5", ["card-title"])
  h5.innerHTML = "Tecnology used:"
  const p3 = createElementWrapper("p", ["card-text"])
  p3.innerHTML = "This sample project is written in JavaScript as the project requirements."
  const p4 = createElementWrapper("p", ["card-text"])
  p4.innerHTML = "Web API access - here we utilize "
  p4.innerHTML += "<a href='https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API'>Fetch API</a>"
  p4.innerHTML += " to access the data bases (linkes below)."
  const p5 = createElementWrapper("p", ["card-text"])
  p5.innerHTML = "Styling - " + "<a href='https://getbootstrap.com/docs/5.0/getting-started/introduction/'>Bootstrap 5</a>."

  const h5Linkes = createElementWrapper("h5", ["card-title"])
  h5Linkes.innerHTML = "Database links:"
  const p6 = createElementWrapper("p", ["card-text"])
  const a1 = createElementWrapper("a", ["card-text", "me-2"])
  a1.href = "https://www.coingecko.com"
  a1.innerHTML = "Coin Gecko"
  const a2 = createElementWrapper("a", ["card-text", "me-2"])
  a2.href = "https://min-api.cryptocompare.com"
  a2.innerHTML = "Crypto Compare"
  p6.append(a1, a2)

  topCardBodyDiv.append(h4, p1, p2, h5, p3, p4, p5, h5Linkes, p6)
  topRowDiv.append(topCardBodyDiv)

  const subCard = createElementWrapper("div", ["card", "mb-3"])
  const botRowDiv = createElementWrapper("div", ["row", "g-0"])

  const bColDiv = createElementWrapper("div", ["col-md-4"])
  const img = createElementWrapper("img", ["img-fluid", "rounded-start"])
  img.src = "./image/profile.JPG"
  img.alt = "..."
  bColDiv.append(img)

  const descDiv = createElementWrapper("div", ["col-md-8"])
  const descBodyDiv = createElementWrapper("div", ["card-body"])
  const h5b = createElementWrapper("h5", ["card-title"])
  h5b.innerHTML = "About the author"
  const pb = createElementWrapper("p", ["card-text"])
  pb.innerHTML = "Israel Khanokh - A software developper at Matrix ltd."
  const a1b = createElementWrapper("a", ["card-text", "me-2"])
  a1b.href = "https://il.linkedin.com/in/israel-khanokh-a29577a0"
  a1b.innerHTML = "linkedin"
  const a2b = createElementWrapper("a", ["card-text", "me-2"])
  a2b.href = "https://github.com/user1fxn/"
  a2b.innerHTML = "github"

  descBodyDiv.append(h5b, pb, a1b, a2b)
  descDiv.append(descBodyDiv)
  botRowDiv.append(bColDiv, descDiv)
  subCard.append(botRowDiv)
  aboutDiv.append(topRowDiv, subCard)
  return aboutDiv
}
