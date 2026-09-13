variable "aws_region" {
  description = "Region for the private content and access-log buckets."
  type        = string
  default     = "eu-central-1"
}

variable "domain_name" {
  description = "Canonical hostname served by CloudFront."
  type        = string
  default     = "www.archunit.net"
}

variable "enable_custom_domain" {
  description = "Attach the validated ACM certificate and canonical hostname to CloudFront."
  type        = bool
  default     = true
}
