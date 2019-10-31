$(document).ready(function() {
	function startAjax() {

		$('.clans').html('')
      $('.load, svg').show()

		let server = $('input[name="group2"]:checked').val()

		$.ajax({
			type:'POST',
			data: {
				server
			},
			dataType: 'json',
			url:'/clans',

			success(response) {
				$('.load, svg').hide()

				response.forEach(i => {
               
               $('.clans').append(`<div class='gamer_bord'><h4>${i.rank}. ${i.clan}</h4><h5>Лидер <span>${i.clan_leader}</span></h5><h5>Участников <span>${i.members}</span></h5><h5>Очков <span>${i.points}</span></h5></div>`);
            })
            return
			},

			error(err) {
				$('.load, svg').hide()
				console.log(err)

				$('.clans').html(`<div class='err'><h2 class='center'>Что-то пошло не так</h2>`);

            return
			}
		})
	}

	startAjax()
	
	$('.checks input:radio').change(function() {
        	startAjax()
	})
})

