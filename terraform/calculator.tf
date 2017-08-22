provider "aws" {
  profile = "demo"
}

module "calculator-server" {
  region  = "us-west-2"
  source = "./server"
  vpc = "${module.vpc-west.vpc_id}"
  subnet = "${module.vpc-west.public_subnet_id}"
  keypair = "AviatrixDemo"
  userdata = "${file("./iperf/iperf_userdata.txt")}"
}
