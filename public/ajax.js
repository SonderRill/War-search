$(document).ready(function(){
    $('.sidenav').sidenav();
});

function sep(x) {
    var parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    return parts.join(".");
}


// данные игрока
$('.ajax_profile').on('click', () => {

	$('.nick, .dataGamer').hide()
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
			$('.dataGamer, .nick, h6').show()

			if(!('clan_name' in response)) {
				$('#clan_name').text('Не состоит')
			}
			
			for(i in response) {
				if(response[i] == 'Rifleman') {
					response[i] = 'Штурмовик'
				}
				else if(response[i] == 'Recon') {
					response[i] = 'Снайпер'
				}
				else if(response[i] == 'Medic') {
					response[i] = 'Медик'
				}

				else if(response[i] == 'Engineer') {
					response[i] = 'Инженер'
				}

				else if(response[i] == 'Heavy') {
					response[i] = 'СЭД'
				}

				$(`#${i}`).show().text(sep(response[i]))

			}


			const dataObj = {
				// Всего убийств
				main_kills: sep(+response.kills + +response.pve_kills),
				// Всего смертей
				main_death: sep(+response.death + +response.pve_death),
				// Соотношение матчей w/l
				pvewl: sep((+response.pve_wins / +response.pve_lost).toFixed(2))

			}
			
			for(i in dataObj) {
				dataObj[i] != Infinity && dataObj[i] != null && dataObj[i] != undefined ? $(`#${i}`).text(dataObj[i]) :
				$(`#${i}`).text('Нет данных')
			}

			//данные с RegExp
			function getSetData(name, reg) {
					
				if(reg.exec(str)) {
					$(`#${name}`).text(sep(reg.exec(str)[1]))
					return reg.exec(str)[1]

				}
				
				else {
					$(`#${name}`).text('Нет данных')
					return 0
				}
				
				
			}

			// Пополнено патронов
			getSetData('player_ammo_restored', /\[stat\]player_ammo_restored\s+=\s+(\d+)/)
			// Восстановлено здоровья
			getSetData('player_heal', /\[stat\]player_heal\s+=\s+(\d+)/)
			// Реанимированно игроков
			getSetData('player_resurrect_made', /\[stat\]player_resurrect_made\s+=\s+(\d+)/)
			// Восстановлено брони
			getSetData('player_repair', /\[stat\]player_repair\s+=\s+(\d+)/)
			// Сыграно вничью
			let sessions_draw = getSetData('player_sessions_draw', /\[mode\]PVP \[stat\]player_sessions_draw\s+=\s+(\d+)/)
			// Сыграно матчей
			$('#main_pvp_all').text(sep(+response.pvp_all + +sessions_draw))
			// Исключений из боя
			getSetData('player_sessions_kicked', /\[mode\]PVP \[stat\]player_sessions_kicked\s+=\s+(\d+)/)
			// Прервано матчей
			getSetData('player_sessions_left', /\[mode\]PVP \[stat\]player_sessions_left\s+=\s+(\d+)/)
			// Убито минами
			getSetData('pvp_player_kills_claymore', /\[mode\]PVP \[stat\]player_kills_claymore\s+=\s+(\d+)/)
			// Убито в ближнем бою
			getSetData('pvp_player_kills_melee', /\[mode\]PVP \[stat\]player_kills_melee\s+=\s+(\d+)/)

			// pve
			// Убито минами
			getSetData('pve_player_kills_claymore', /\[mode\]PVE \[stat\]player_kills_claymore\s+=\s+(\d+)/)
			// Убито в ближнем бою 
			getSetData('pve_player_kills_melee', /\[mode\]PVE \[stat\]player_kills_melee\s+=\s+(\d+)/)
			// Использованно знаков
			getSetData('player_resurrected_by_coin', /\[stat\]player_resurrected_by_coin\s+=\s+(\d+)/)
			// Исключений из боя
			getSetData('pve_player_sessions_kicked', /\[mode\]PVE \[stat\]player_sessions_kicked\s+=\s+(\d+)/)
			// Прервано миссий
			getSetData('pve_player_sessions_left', /\[mode\]PVE \[stat\]player_sessions_left\s+=\s+(\d+)/)

			// штурм пвп
			// Выстрелов
			let rif_player_shots = getSetData('rif_player_shots', /\[class\]Rifleman \[mode\]PVP \[stat\]player_shots\s+=\s+(\d+)/)
			// Попаданий
			let rif_player_hits = getSetData('rif_player_hits', /\[class\]Rifleman \[mode\]PVP \[stat\]player_hits\s+=\s+(\d+)/)
			// Хэдшотов
			let rif_headshots = getSetData('rif_player_headshots', /\[class\]Rifleman \[mode\]PVP \[stat\]player_headshots\s+=\s+(\d+)/)
			// Меткость
			$('#rif_accurracy').text(Math.round(+rif_player_hits / (+rif_player_shots/100)) + '%')
			if($('#rif_accurracy').text() == 'Infinity%' || $('#rif_accurracy').text() == 'NaN%') {
				$('#rif_accurracy').text('Нет данных')
			}
			// В игре
			let rif_player_playtime = getSetData(null, /\[class\]Rifleman \[mode\]PVP \[stat\]player_playtime\s+=\s+(\d+)/)
			$('#rif_player_playtime').text(`${sep(Math.round(+rif_player_playtime/10/60/60))} h ${Math.round(+rif_player_playtime/10/60%60)} m`)

			// мед пвп
			// Выстрелов
			let med_player_shots = getSetData('med_player_shots', /\[class\]Medic \[mode\]PVP \[stat\]player_shots\s+=\s+(\d+)/)
			// Попаданий
			let med_player_hits = getSetData('med_player_hits', /\[class\]Medic \[mode\]PVP \[stat\]player_hits\s+=\s+(\d+)/)
			// Хэдшотов
			let med_headshots = getSetData('med_player_headshots', /\[class\]Medic \[mode\]PVP \[stat\]player_headshots\s+=\s+(\d+)/)
			// Меткость
			$('#med_accurracy').text(Math.round(+med_player_hits / (+med_player_shots/100)) + '%')
			if($('#med_accurracy').text() == 'Infinity%' || $('#med_accurracy').text() == 'NaN%') {
				$('#med_accurracy').text('Нет данных')
			}
			// В игре
			let med_player_playtime = getSetData(null, /\[class\]Medic \[mode\]PVP \[stat\]player_playtime\s+=\s+(\d+)/)
			$('#med_player_playtime').text(`${sep(Math.round(+med_player_playtime/10/60/60))} h ${Math.round(+med_player_playtime/10/60%60)} m`)

			// инж пвп
			// Выстрелов
			let eng_player_shots = getSetData('eng_player_shots', /\[class\]Engineer \[mode\]PVP \[stat\]player_shots\s+=\s+(\d+)/)
			// Попаданий
			let eng_player_hits = getSetData('eng_player_hits', /\[class\]Engineer \[mode\]PVP \[stat\]player_hits\s+=\s+(\d+)/)
			// Хэдшотов
			let eng_headshots = getSetData('eng_player_headshots', /\[class\]Engineer \[mode\]PVP \[stat\]player_headshots\s+=\s+(\d+)/)
			// Меткость
			$('#eng_accurracy').text(Math.round(+eng_player_hits / (+eng_player_shots/100)) + '%')
			if($('#eng_accurracy').text() == 'Infinity%' || $('#eng_accurracy').text() == 'NaN%') {
				$('#eng_accurracy').text('Нет данных')
			}
			// В игре
			let eng_player_playtime = getSetData(null, /\[class\]Engineer \[mode\]PVP \[stat\]player_playtime\s+=\s+(\d+)/)
			$('#eng_player_playtime').text(`${sep(Math.round(+eng_player_playtime/10/60/60))} h ${Math.round(eng_player_playtime/10/60%60)} m`)

			// снап пвп
			// Выстрелов
			let snap_player_shots = getSetData('snap_player_shots', /\[class\]Recon \[mode\]PVP \[stat\]player_shots\s+=\s+(\d+)/)
			// Попаданий
			let snap_player_hits = getSetData('snap_player_hits', /\[class\]Recon \[mode\]PVP \[stat\]player_hits\s+=\s+(\d+)/)
			// Хэдшотов
			let snap_headshots = getSetData('snap_player_headshots', /\[class\]Recon \[mode\]PVP \[stat\]player_headshots\s+=\s+(\d+)/)
			// Меткость
			$('#snap_accurracy').text(Math.round(+snap_player_hits / (+snap_player_shots/100)) + '%')
			if($('#snap_accurracy').text() == 'Infinity%' || $('#snap_accurracy').text() == 'NaN%') {
				$('#snap_accurracy').text('Нет данных')
			}
			// В игре
			let snap_player_playtime = getSetData(null, /\[class\]Recon \[mode\]PVP \[stat\]player_playtime\s+=\s+(\d+)/)
			$('#snap_player_playtime').text(`${sep(Math.round(+snap_player_playtime/10/60/60))} h ${Math.round(snap_player_playtime/10/60%60)} m`)

			// сэд пвп
			// Выстрелов
			let sed_player_shots = getSetData('sed_player_shots', /\[class\]Heavy \[mode\]PVP \[stat\]player_shots\s+=\s+(\d+)/)
			// Попаданий
			let sed_player_hits = getSetData('sed_player_hits', /\[class\]Heavy \[mode\]PVP \[stat\]player_hits\s+=\s+(\d+)/)
			// Хэдшотов
			let sed_headshots = getSetData('sed_player_headshots', /\[class\]Heavy \[mode\]PVP \[stat\]player_headshots\s+=\s+(\d+)/)
			// Меткость
			$('#sed_accurracy').text(Math.round(+sed_player_hits / (+sed_player_shots/100)) + '%')
			if($('#sed_accurracy').text() == 'Infinity%' || $('#sed_accurracy').text() == 'NaN%') {
				$('#sed_accurracy').text('Нет данных')
			}
			// В игре
			let sed_player_playtime = getSetData(null, /\[class\]Heavy \[mode\]PVP \[stat\]player_playtime\s+=\s+(\d+)/)
			$('#sed_player_playtime').text(`${sep(Math.round(+sed_player_playtime/10/60/60))} h ${Math.round(sed_player_playtime/10/60%60)} m`)

			// Выстрелов
			let pvp_shots = +rif_player_shots + +med_player_shots + +eng_player_shots + +snap_player_shots + +sed_player_shots
			$('#pvp_shots').text(sep(pvp_shots))
			// Попаданий
			let pvp_hits = +rif_player_hits + +med_player_hits + +eng_player_hits + +snap_player_hits + +sed_player_hits
			$('#pvp_hits').text(sep(pvp_hits))
			// Хэдшоты
			let pvp_headshots = +rif_headshots + +med_headshots + +eng_headshots + +snap_headshots + +sed_headshots
			$('#pvp_headshots').text(sep(pvp_headshots))


			// штурм пвe
			// Выстрелов
			let e_rif_player_shots = getSetData('e_rif_player_shots', /\[class\]Rifleman \[mode\]PVE \[stat\]player_shots\s+=\s+(\d+)/)
			// Попаданий
			let e_rif_player_hits = getSetData('e_rif_player_hits', /\[class\]Rifleman \[mode\]PVE \[stat\]player_hits\s+=\s+(\d+)/)
			// Хэдшотов
			let e_rif_headshots = getSetData('e_rif_player_headshots', /\[class\]Rifleman \[mode\]PVE \[stat\]player_headshots\s+=\s+(\d+)/)
			// Меткость
			$('#e_rif_accurracy').text(Math.round(+e_rif_player_hits / (+e_rif_player_shots/100)) + '%')
			if($('#e_rif_accurracy').text() == 'Infinity%' || $('#e_rif_accurracy').text() == 'NaN%') {
				$('#e_rif_accurracy').text('Нет данных')
			}
			// В игре
			let e_rif_player_playtime = getSetData(null, /\[class\]Rifleman \[mode\]PVE \[stat\]player_playtime\s+=\s+(\d+)/)
			$('#e_rif_player_playtime').text(`${sep(Math.round(+e_rif_player_playtime/10/60/60))} h ${Math.round(e_rif_player_playtime/10/60%60)} m`)

			// мед пвe
			// Выстрелов
			let e_med_player_shots = getSetData('e_med_player_shots', /\[class\]Medic \[mode\]PVE \[stat\]player_shots\s+=\s+(\d+)/)
			// Попаданий
			let e_med_player_hits = getSetData('e_med_player_hits', /\[class\]Medic \[mode\]PVE \[stat\]player_hits\s+=\s+(\d+)/)
			// Хэдшотов
			let e_med_headshots = getSetData('e_med_player_headshots', /\[class\]Medic \[mode\]PVE \[stat\]player_headshots\s+=\s+(\d+)/)
			// Меткость
			$('#e_med_accurracy').text(Math.round(+e_med_player_hits / (+e_med_player_shots/100)) + '%')
			if($('#e_med_accurracy').text() == 'Infinity%' || $('#e_med_accurracy').text() == 'NaN%') {
				$('#e_med_accurracy').text('Нет данных')
			}
			// В игре
			let e_med_player_playtime = getSetData(null, /\[class\]Medic \[mode\]PVE \[stat\]player_playtime\s+=\s+(\d+)/)
			$('#e_med_player_playtime').text(`${sep(Math.round(+e_med_player_playtime/10/60/60))} h ${Math.round(e_med_player_playtime/10/60%60)} m`)

			// инж пвe
			// Выстрелов
			let e_eng_player_shots = getSetData('e_eng_player_shots', /\[class\]Engineer \[mode\]PVE \[stat\]player_shots\s+=\s+(\d+)/)
			// Попаданий
			let e_eng_player_hits = getSetData('e_eng_player_hits', /\[class\]Engineer \[mode\]PVE \[stat\]player_hits\s+=\s+(\d+)/)
			// Хэдшотов
			let e_eng_headshots = getSetData('e_eng_player_headshots', /\[class\]Engineer \[mode\]PVE \[stat\]player_headshots\s+=\s+(\d+)/)
			// Меткость
			$('#e_eng_accurracy').text(Math.round(+e_eng_player_hits / (+e_eng_player_shots/100)) + '%')
			if($('#e_eng_accurracy').text() == 'Infinity%' || $('#e_eng_accurracy').text() == 'NaN%') {
				$('#e_eng_accurracy').text('Нет данных')
			}
			// В игре
			let e_eng_player_playtime = getSetData(null, /\[class\]Engineer \[mode\]PVE \[stat\]player_playtime\s+=\s+(\d+)/)
			$('#e_eng_player_playtime').text(`${sep(Math.round(+e_eng_player_playtime/10/60/60))} h ${Math.round(e_eng_player_playtime/10/60%60)} m`)

			// снап пве
			// Выстрелов
			let e_snap_player_shots = getSetData('e_snap_player_shots', /\[class\]Recon \[mode\]PVE \[stat\]player_shots\s+=\s+(\d+)/)
			// Попаданий
			let e_snap_player_hits = getSetData('e_snap_player_hits', /\[class\]Recon \[mode\]PVE \[stat\]player_hits\s+=\s+(\d+)/)
			// Хэдшотов
			let e_snap_headshots = getSetData('e_snap_player_headshots', /\[class\]Recon \[mode\]PVE \[stat\]player_headshots\s+=\s+(\d+)/)
			// Меткость
			$('#e_snap_accurracy').text(Math.round(+e_snap_player_hits / (+e_snap_player_shots/100)) + '%')
			if($('#e_snap_accurracy').text() == 'Infinity%' || $('#e_snap_accurracy').text() == 'NaN%') {
				$('#e_snap_accurracy').text('Нет данных')
			}
			// В игре
			let e_snap_player_playtime = getSetData(null, /\[class\]Recon \[mode\]PVE \[stat\]player_playtime\s+=\s+(\d+)/)
			$('#e_snap_player_playtime').text(`${sep(Math.round(+e_snap_player_playtime/10/60/60))} h ${Math.round(+e_snap_player_playtime/10/60%60)} m`)

			// сэд пве
			// Выстрелов
			let e_sed_player_shots = getSetData('e_sed_player_shots', /\[class\]Heavy \[mode\]PVE \[stat\]player_shots\s+=\s+(\d+)/)
			// Попаданий
			let e_sed_player_hits = getSetData('e_sed_player_hits', /\[class\]Heavy \[mode\]PVE \[stat\]player_hits\s+=\s+(\d+)/)
			// Хэдшотов
			let e_sed_headshots = getSetData('e_sed_player_headshots', /\[class\]Heavy \[mode\]PVE \[stat\]player_headshots\s+=\s+(\d+)/)
			// Меткость
			$('#e_sed_accurracy').text(Math.round(+e_sed_player_hits / (+e_sed_player_shots/100)) + '%')
			if($('#e_sed_accurracy').text() == 'Infinity%' || $('#e_sed_accurracy').text() == 'NaN%') {
				$('#e_sed_accurracy').text('Нет данных')
			}
			// В игре
			let e_sed_player_playtime = getSetData(null, /\[class\]Heavy \[mode\]PVE \[stat\]player_playtime\s+=\s+(\d+)/)
			$('#e_sed_player_playtime').text(`${sep(Math.round(+e_sed_player_playtime/10/60/60))} h ${Math.round(+e_sed_player_playtime/10/60%60)} m`)

			// Выстрелов
			let pve_shots = +e_rif_player_shots + +e_med_player_shots + +e_eng_player_shots + +e_snap_player_shots + +e_sed_player_shots
			$('#pve_shots').text(sep(pve_shots))
			// Попаданий
			let pve_hits = +e_rif_player_hits + +e_med_player_hits + +e_eng_player_hits + +e_snap_player_hits + +e_sed_player_hits
			$('#pve_hits').text(sep(pve_hits))
			// Хэдшоты
			let pve_headshots = +e_rif_headshots + +e_med_headshots + +e_eng_headshots + +e_snap_headshots + +e_sed_headshots
			$('#pve_headshots').text(sep(pve_headshots))


			// comon
			// Выстрелов
			$('#shots').text(sep(+pvp_shots + +pve_shots))
			// Попаданий
			$('#hits').text(sep(+pvp_hits + +pve_hits))
			// Хэдшоты
			$('#headshots').text(sep(+pvp_headshots + +pve_headshots))

			$('#accurracy').text(((+pvp_hits + +pve_hits) / ((+pvp_shots + +pve_shots) / 100)).toFixed(2) + '%')


		},
		error: (err) => {
			try {
					$('.nick').show()
					$('.load, svg, .dataGamer, h6').hide()
				
					$('#nickname').text(err.responseJSON.message || 'Пользователь не найден')
					console.log('323',err)
			} catch(e) {
				console.log(e)
				$('#nickname').text('Пользователь не найден')
			}

			
			
		}
	})
})


