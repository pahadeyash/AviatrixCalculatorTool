variable "vpc" {}
variable "subnet" {}
variable "keypair" {}
variable "region" {}
variable "userdata" {}


variable "images" {
  type = "map"
  default = {
    us-east-2 = "ami-cab091af"
    us-west-2 = "ami-5b849822"
  }
}

#Define the region
provider "aws" {
  region     = "${var.region}"
}

resource "aws_security_group" "calculator-sg" {
  vpc_id = "${var.vpc}"
  name        = "calculator-sg"
  description = "calculator - Security Group"
  ingress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
  egress {
    from_port       = 0
    to_port         = 0
    protocol        = "-1"
    cidr_blocks     = ["0.0.0.0/0"]
  }
  tags {
    Name = "calculator-SG"
  }
}

resource "aws_eip" "calculator_eip" {
  vpc = true
}

resource "aws_eip_association" "eip_assoc" {
  instance_id   = "${aws_instance.calculator.id}"
  allocation_id = "${aws_eip.calculator_eip.id}"
}

resource "aws_network_interface" "eni-controller" {
  subnet_id = "${var.subnet}"
  security_groups = [
    "${aws_security_group.calculator-sg.id}"
  ]
  tags {
    Name = " calculator interface"
  }
}

resource "aws_instance" "calculator" {
  ami           = "${lookup(var.images, var.region)}"
  instance_type = "t2.micro"
  key_name = "${var.keypair}"
  network_interface {
     network_interface_id = "${aws_network_interface.eni-controller.id}"
     device_index = 0
  }
  user_data = "${var.userdata}"
  tags {
    Name = "calculator"
  }
}

output "private-ip" {
    value = "${aws_instance.calculator.private_ip}"
}

output "public-ip" {
    value = "${aws_instance.calculator.public_ip}"
}
