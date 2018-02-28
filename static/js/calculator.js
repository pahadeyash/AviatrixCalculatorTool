function dx_last_mile_calculations(bandwidth){
  if (bandwidth<=1000){
    return 2500;
  }
  else {
    return 10000;
  }
}

function dx_last_mile(f){
    f.dx_last_mile.value = dx_last_mile_calculations(f.bandwidth.value);
    f.dx_last_mile_year.value = f.dx_last_mile.value * 12;
}

function dx_port_calculations(regions_selected,bandwidth){
  switch (bandwidth){
    case "50":
      return (0.03 * 24 * 30 * regions_selected).toFixed(2);;
      break;
    case "100":
      return (0.06 * 24 * 30 * regions_selected).toFixed(2);
      break;
    case "200":
      return (0.12 * 24 * 30 * regions_selected).toFixed(2);
      break;
    case "300":
      return (0.18 * 24 * 30 * regions_selected).toFixed(2);
      break;
    case "400":
      return (0.24 * 24 * 30 * regions_selected).toFixed(2);
      break;
    case "500":
      return (0.30 * 24 * 30 * regions_selected).toFixed(2);
      break;
    case "1000":
      return (0.30 * 24 * 30 * regions_selected).toFixed(2);
      break;
    case "10000":
      return (2.25 * 24 * 30 * regions_selected).toFixed(2);
  }
}

function dx_port(f){
  var regions_selected = document.querySelectorAll('input[name=regions]:checked').length
  f.dx_port.value = dx_port_calculations(regions_selected,f.bandwidth.value)
  f.dx_port_year.value = (f.dx_port.value * 12).toFixed(2);
}

function dx_encryption_calculations(checked){
  if (checked){
    return 2000
  }
  else {
    return 0
  }
}

function dx_encryption(f){
  f.dx_encryption.value=dx_encryption_calculations(f.dx_encryption_input.checked)
  f.dx_encryption_year.value = f.dx_encryption.value * 12;
}

function dx_out_calculations(bandwidth,utilization){
  return (((bandwidth * 60 * 60 * 24 * 30 * 0.03) / (8 * 1024)) * (utilization/100)).toFixed(2);
}

function dx_out(f){
    f.dx_out.value = dx_out_calculations(f.bandwidth.value,f.utilization.value);
    f.dx_out_year.value = (f.dx_out.value * 12).toFixed(2);
}

function avx_out_calculations(bandwidth_GB){ 
  if (bandwidth_GB<=1){
      return 0;
  }
  else if (bandwidth_GB > 1 && bandwidth_GB <= 10000){
    return (bandwidth_GB * 0.09).toFixed(2);
  }
  else if (bandwidth_GB > 10000 && bandwidth_GB <= 40000){
    return (((bandwidth_GB - (10000 + 1)) * 0.085) + (0.09 * 10000)).toFixed(2);
  }
  else if (bandwidth_GB > 40000 && bandwidth_GB <= 100000){
    return (((bandwidth_GB - (40000 + 10000 + 1)) * 0.07) + (40000 * 0.085) + (0.09 * 10000)).toFixed(2);
  }
  else if (bandwidth_GB > 100000 && bandwidth_GB <= 350000){
    return (((bandwidth_GB - (100000 + 40000 + 10000 + 1)) * 0.05) + (100000 * 0.07) + (40000 * 0.085) + (0.09 * 10000)).toFixed(2);
  }
  else if (bandwidth_GB > 350000){
    return (((bandwidth_GB - (350000 + 100000 + 40000 + 10000 + 1)) * 0.05) + (350000 * 0.05) + (100000 * 0.07) + (40000 * 0.085) + (0.09 * 10000)).toFixed(2);
  }
}

function avx_out(f){
  f.avx_out.value = avx_out_calculations(f.avx_bandwidth_GB.value);
  f.avx_out_year.value = (f.avx_out.value * 12).toFixed(2);
}

function avx_instance_calculations(bandwidth,tunnels){
  switch (bandwidth){
    case "50":
    case "100":
      return { instance: "t2.micro", value: (0.012 * 24 * 30 * tunnels).toFixed(2) };
      break;
    case "200":
    case "300":
    case "400":
    case "500":
      return { instance: "m4.xlarge", value: (0.2 * 24 * 30 * tunnels).toFixed(2) };
      break;
    case "1000":
      return { instance: "m4.4xlarge", value: (0.8 * 24 * 30 * tunnels).toFixed(2) };
      break;
    case "10000":
      return { instance: "m4.4xlarge", value: (0.8 * 24 * 30 * 10 * tunnels).toFixed(2)};
      break;
  }
}

function avx_instance(f){
  var result = avx_instance_calculations(f.bandwidth.value,f.number_tunnels.value)
  f.avx_instance_type_output.value = result.instance;
  f.avx_instance.value = result.value;
  f.avx_instance_year.value =   f.avx_instance.value * 12;
}

function avx_dia_calculations(bandwidth,tunnels){
  if (Math.floor(bandwidth/1000)==0){
    return 300 * tunnels;
  }
  else {
    return Math.floor(bandwidth/1000) * 300 * tunnels;
  }
}

function avx_dia(f){
  f.avx_dia.value = avx_dia_calculations(f.bandwidth.value,f.number_tunnels.value);
  f.avx_dia_year.value = f.avx_dia.value * 12;
  }

function gbps_to_GB_calculations(bandwidth,utilization){
  return ((bandwidth * 60 * 60 * 24 * 30 * utilization) / (8 * 1000 * 100)).toFixed(2);
}

function gbps_to_GB(f){
  f.avx_bandwidth_GB.value = gbps_to_GB_calculations(f.bandwidth.value, f.utilization.value);
  f.dx_bandwidth_GB.value = f.avx_bandwidth_GB.value;
}

function regions_output(f){
  f.number_tunnels.value = document.querySelectorAll('input[name=regions]:checked').length * f.number_vpc.value;
  f.avx_licensing.value = f.number_tunnels.value * 300;
  f.avx_licensing_year.value = f.avx_licensing.value * 12;
}

function calculate_total(last_mile,port,out,encryption,instance,licensing,dia){
  return (last_mile + port + out + encryption + instance + licensing + dia).toFixed(2);
}

function dx_calculate_total(f){
  f.dx_total.value = calculate_total(Number(f.dx_last_mile.value), Number(f.dx_port.value),Number(f.dx_out.value), Number(f.dx_encryption.value),0,0,0);
  f.dx_total_year.value = calculate_total(Number(f.dx_last_mile_year.value), Number(f.dx_port_year.value), Number(f.dx_out_year.value), Number(f.dx_encryption_year.value),0,0,0);
}

function avx_calculate_total(f){
  f.avx_total.value = calculate_total(0,0,0,Number(f.avx_out.value),0,Number(f.avx_instance.value),Number(f.avx_licensing.value),Number(f.avx_dia.value));
  f.avx_total_year.value = calculate_total(0,0,0,Number(f.avx_out_year.value),0,Number(f.avx_instance_year.value),Number(f.avx_licensing_year.value),Number(f.avx_dia_year.value));
}

function graph_totals(f){
    var ctx = document.getElementById("myChart").getContext('2d');
    var myChart = new Chart(ctx, {
    type: 'horizontalBar',
    data: {
        labels: ["Direct Connect", "Aviatrix"],
        datasets: [{
            label: 'Cost',
            data: [f.dx_total_year.value, f.avx_total_year.value],
            backgroundColor: [ 'rgba(4, 182, 243, 0.2)', 'rgba(239, 66, 10, 0.2)']
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        }
    }
  })
}


function recalculate(f){
  gbps_to_GB(f)
  regions_output(f);

  dx_last_mile(f);
  dx_port(f);
  dx_out(f);
  dx_encryption(f);

  avx_out(f);
  avx_dia(f)
  avx_instance(f);
  avx_dia(f);

  dx_calculate_total(f);
  avx_calculate_total(f);
  graph_totals(f);


}
