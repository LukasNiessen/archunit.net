terraform {
  required_version = "= 1.15.5"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "6.65.0"
    }
  }

  backend "s3" {
    bucket       = "archunit-net-terraform-state-333053099282"
    key          = "bootstrap/terraform.tfstate"
    region       = "eu-central-1"
    encrypt      = true
    use_lockfile = true
  }
}

provider "aws" {
  region = "eu-central-1"

  default_tags {
    tags = {
      Project   = "archunit.net"
      ManagedBy = "Terraform"
    }
  }
}
