function dx_last_mile_year_script(f){
  if (f.bandwidth.value<=1000){
    f.dx_last_mile.value = 2500;
    f.dx_last_mile_year.value = f.dx_last_mile.value * 12;
  }
  else {
    f.dx_last_mile.value = 10000;
    f.dx_last_mile_year.value = f.dx_last_mile.value * 12;
  }
}

function dx_port_output_script(f){
  switch (f.bandwidth.value){
    case "50":
      f.dx_port.value = (0.03 * 24 * 30).toFixed(2);
      f.dx_port_year.value = (0.03 * 24 * 365).toFixed(2);
      break;
    case "100":
      f.dx_port.value = (0.06 * 24 * 30).toFixed(2);
      f.dx_port_year.value = (0.06 * 24 * 365).toFixed(2);
      break;
    case "200":
      f.dx_port.value = (0.12 * 24 * 30).toFixed(2);
      f.dx_port_year.value = (0.12 * 24 * 365).toFixed(2);
      break;
    case "300":
      f.dx_port.value = (0.18 * 24 * 30).toFixed(2);
      f.dx_port_year.value = (0.18 * 24 * 365).toFixed(2);
      break;
    case "400":
      f.dx_port.value = (0.24 * 24 * 30).toFixed(2);
      f.dx_port_year.value = (0.24 * 24 * 365).toFixed(2);
      break;
    case "500":
      f.dx_port.value = (0.30 * 24 * 30).toFixed(2);
      f.dx_port_year.value = (0.30 * 24 * 365).toFixed(2);
      break;
    case "1000":
      f.dx_port.value = (0.30 * 24 * 30).toFixed(2);
      f.dx_port_year.value = (0.30 * 24 * 365).toFixed(2);
      break;
    case "10000":
      f.dx_port.value = (2.25 * 24 * 30).toFixed(2);
      f.dx_port_year.value = (2.25 * 24 * 365).toFixed(2);
  }
}

function dx_encryption_output_script(f){
  if (f.dx_encryption_input.checked){
      f.dx_encryption.value = 20000;
      f.dx_encryption_year.value = 20000 * 12;
  }
  else {
    f.dx_encryption.value = 0;
    f.dx_encryption_year.value = 0;
  }

}

function dx_out_output_script(f){
    f.dx_out.value = (f.bandwidth.value * 60 * 60 * 24 * 365 * 0.03) / (12 * 8);
    f.dx_out_year.value = (f.bandwidth.value * 60 * 60 * 24 * 365 * 0.03) /  8;
}

function avx_out_output_script(f){
  var bandwidth_GBm = (f.bandwidth.value * 60 * 60 * 24 * 365) / (12 * 8);
  if (bandwidth_GBm<=1){
      f.avx_out_output.value = 0;
  }
  else if (bandwidth_GBm > 1 && bandwidth_GBm <= 10000){
    f.avx_out_output.value = (bandwidth_GBm * 0.09).toFixed(2);
  }
  else if (bandwidth_GBm > 10000 && bandwidth_GBm <= 40000){
    f.avx_out_output.value = (((bandwidth_GBm - (10000 + 1)) * 0.085) + (0.09 * 10000)).toFixed(2);
  }
  else if (bandwidth_GBm > 40000 && bandwidth_GBm <= 100000){
    f.avx_out_output.value = (((bandwidth_GBm - (40000 + 10000 + 1)) * 0.07) + (40000 * 0.085) + (0.09 * 10000)).toFixed(2);
  }
  else if (bandwidth_GBm > 100000 && bandwidth_GBm <= 350000){
    f.avx_out_output.value = (((bandwidth_GBm - (100000 + 40000 + 10000 + 1)) * 0.05) + (100000 * 0.07) + (40000 * 0.085) + (0.09 * 10000)).toFixed(2);
  }
  else if (bandwidth_GBm > 350000){
    f.avx_out_output.value = (((bandwidth_GBm - (350000 + 100000 + 40000 + 10000 + 1)) * 0.05) + (350000 * 0.05) + (100000 * 0.07) + (40000 * 0.085) + (0.09 * 10000)).toFixed(2);
  }
}

function avx_instance_output_script(f){
  switch (f.bandwidth.value){
    case "50":
      f.avx_instance_type_output.value = "t2.micro";
      f.avx_instance_output.value = (0.012 * 24 * 365 * f.number_tunnels.value).toFixed(2);
      break;
    case "100":
      f.avx_instance_type_output.value = "t2.micro";
      f.avx_instance_output.value = (0.012 * 24 * 365 * f.number_tunnels.value).toFixed(2);
      break;
    case "200":
      f.avx_instance_type_output.value = "m4.xlarge";
      f.avx_instance_output.value = (0.2 * 24 * 365 * f.number_tunnels.value).toFixed(2);
      break;
    case "300":
      f.avx_instance_type_output.value = "m4.xlarge";
      f.avx_instance_output.value = (0.2 * 24 * 365 * f.number_tunnels.value).toFixed(2);
      break;
    case "400":
      f.avx_instance_type_output.value = "m4.xlarge";
      f.avx_instance_output.value = (0.2 * 24 * 365 * f.number_tunnels.value).toFixed(2);
      break;
    case "500":
      f.avx_instance_type_output.value = "m4.xlarge";
      f.avx_instance_output.value = (0.2 * 24 * 365 * f.number_tunnels.value).toFixed(2);
      break;
    case "1000":
      f.avx_instance_type_output.value = "m4.4xlarge";
      f.avx_instance_output.value = (0.8 * 24 * 365 * f.number_tunnels.value).toFixed(2);
      break;
    case "10000":
      f.avx_instance_type_output.value = "m4.4xlarge";
      f.avx_instance_output.value = (0.8 * 24 * 365 * 10 * f.number_tunnels.value).toFixed(2);
      break;
  }
}

function avx_dia_output_script(f){
    if (Math.floor(f.bandwidth.value/1000)==0){
      f.avx_dia_output.value = 300 * document.querySelectorAll('input[name=regions]:checked').length;
    }
    else {
      f.avx_dia_output.value = Math.floor(f.bandwidth.value/1000) * 300 * document.querySelectorAll('input[name=regions]:checked').length;
    }
  }

function gbps_to_GB(f){
  f.avx_bandwidth_GB.value = (f.bandwidth.value * 60 * 60 * 24 * 365 * f.utilization.value) / (12 * 8 * 100);
  f.dx_bandwidth_GB.value = (f.bandwidth.value * 60 * 60 * 24 * 365 * f.utilization.value) / (12 * 8 * 100);
  recalculate(f);
}

function regions_output_script(f){
  f.number_tunnels.value = document.querySelectorAll('input[name=regions]:checked').length;
  f.avx_licensing_output.value = f.number_tunnels.value * 300 * 12;
  avx_dia_output_script(f);
  recalculate(f);
}

function dx_calculate_total(f){
  f.dx_total.value = Number(f.dx_last_mile.value) + Number(f.dx_port.value) + Number(f.dx_out.value) + Number(f.dx_encryption.value);
  f.dx_total_year.value = Number(f.dx_last_mile_year.value) + Number(f.dx_port_year.value) + Number(f.dx_out_year.value) + Number(f.dx_encryption_year.value);
}

function recalculate(f){
  dx_last_mile_year_script(f);
  dx_port_output_script(f);
  dx_out_output_script(f);
  avx_out_output_script(f);
  avx_dia_output_script(f)
  avx_instance_output_script(f);
  dx_calculate_total(f);

}
