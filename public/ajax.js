$(document).ready(function(){
    $('.sidenav').sidenav();
});
       

$('.ajax_profile').on('click', () => {

	$('.dataGamer').css('display', 'none')
	$('.load').css('display', 'block')
	$('svg').css('display', 'block')

	let name = $('input').val()
	let server = $('input[name="group1"]:checked').val()


	const url = `http://api.warface.ru/user/stat/?name=${encodeURIComponent(name)}&server=${server}`;
	const proxyurl = "https://cors-anywhere.herokuapp.com/";
	// $('.checks p label input').on('chage', function() {
	// 	console.log($('input[name=group1]:checked').val())
	// })
	

	$('.dataGamer').css('display', 'none')
	$.ajax({
		type:'POST',
		dataType: 'json',
		url: proxyurl + url,

		success: (response) => {
			$('.dataGamer').css('display', 'block')
			$('.dataGamer h5').css('display', 'block')

			$('.load').css('display', 'none')
			$('svg').css('display', 'none')

			for(i in response) {
				$(`#${i}`).text(response[i])
			}

			
		},

		error: (err) => {
			$('.dataGamer').css('display', 'block')
			$('.dataGamer h5').css('display', 'none')

			$('.load').css('display', 'none')
			$('svg').css('display', 'none')

			$('h4').text('Игрок не найден')

			
		}
	})
})