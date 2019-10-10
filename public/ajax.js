$(document).ready(function(){
    $('.sidenav').sidenav();
});

function sep(x) {
    var parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    return parts.join(".");
}


$('.ajax_profile').on('click', () => {

	$('#nickname, .dataGamer').hide()
	$('.load, svg').show()

	let name = $('input').val()
	let server = $('input[name="group1"]:checked').val()
	
	$.ajax({
		type:'POST',
		data:{
			name,
			server
		},
		dataType: 'json',
		url: '/',

		success: (response) => {
			let str = response.full_response;

			$('.load, svg').hide()
			$('.dataGamer').show()

			if(!('clan_name' in response)) {
				$('#clan_name').text('Не состоит')
			}
			
			for(i in response) {
				if(response[i] == 'Rifleman') {
					response[i] = 'Штурмовик'
				}
				$(`#${i}`).show().text(sep(response[i]))

			}



			$('#main_kills').text(sep(+response.kills + +response.pve_kills))
			$('#main_death').text(sep(+response.death + +response.pve_death))

			// data from full_response	
			let reg_player_ammo_restored = /\[stat\]player_ammo_restored\s+=\s+(\d+)/
			$('#player_ammo_restored').text(sep(reg_player_ammo_restored.exec(str)[1]))

			let player_heal = /\[stat\]player_heal\s+=\s+(\d+)/
			$('#player_heal').text(sep(player_heal.exec(str)[1]))
			
			let player_resurrect_made = /\[stat\]player_resurrect_made\s+=\s+(\d+)/
			$('#player_resurrect_made').text(sep(player_resurrect_made.exec(str)[1]))

			let player_repair = /\[stat\]player_repair\s+=\s+(\d+)/
			$('#player_repair').text(sep(player_repair.exec(str)[1]))

			let player_sessions_draw = /\[mode\]PVP \[stat\]player_sessions_draw\s+=\s+(\d+)/
			$('#player_sessions_draw').text(sep(player_sessions_draw.exec(str)[1]))
			$('#main_pvp_all').text(sep(+response.pvp_all + +player_sessions_draw.exec(str)[1]))

			let player_sessions_kicked = /\[mode\]PVP \[stat\]player_sessions_kicked\s+=\s+(\d+)/
			$('#player_sessions_kicked').text(sep(player_sessions_kicked.exec(str)[1]))

			let player_sessions_left = /\[mode\]PVP \[stat\]player_sessions_left\s+=\s+(\d+)/
			$('#player_sessions_left').text(sep(player_sessions_left.exec(str)[1]))
		},
		error: (err) => {
			$('.load, svg, .dataGamer').hide()
			$('#nickname').show().text('Игрок не найден')
			console.log(err.statusText)
			
		}
	})
})