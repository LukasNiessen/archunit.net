output "site_bucket_name" {
  description = "Private S3 bucket receiving the generated website."
  value       = aws_s3_bucket.site.id
}

output "cloudfront_distribution_id" {
  description = "CloudFront distribution to invalidate after deployment."
  value       = aws_cloudfront_distribution.site.id
}

output "cloudfront_domain_name" {
  description = "CloudFront hostname used as the Squarespace www CNAME target."
  value       = aws_cloudfront_distribution.site.domain_name
}

output "certificate_arn" {
  description = "ACM certificate requested in us-east-1 for CloudFront."
  value       = aws_acm_certificate.site.arn
}

output "certificate_validation_records" {
  description = "DNS records that must be present at Squarespace before enabling the custom domain."
  value = {
    for option in aws_acm_certificate.site.domain_validation_options : option.domain_name => {
      name  = option.resource_record_name
      type  = option.resource_record_type
      value = option.resource_record_value
    }
  }
}

output "public_url" {
  description = "Canonical public URL after DNS is connected."
  value       = var.enable_custom_domain ? "https://${var.domain_name}/" : "https://${aws_cloudfront_distribution.site.domain_name}/"
}
