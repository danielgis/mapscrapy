var hash = {
	url: 'https://twitter.com/search?src=hash&q=%23',
	name: ['YoMeQuedoEnCasa', 'StayHome', 'Telmo']
}


_setBranding = () => {
	let template = `<strong>${nls.title}</strong>`
	hash.name.forEach((h) => {
		template = template + `<br><a href="${hash.url + h}" target=blank>#${h}</a>`
	})
	document.getElementById('TitleApp').innerHTML = template;
};


_setBranding();
