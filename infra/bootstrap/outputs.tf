output "github_deploy_role_arn" {
  description = "IAM role assumed by the main-branch GitHub Actions workflow."
  value       = aws_iam_role.github_deploy.arn
}

output "terraform_state_bucket" {
  description = "Versioned and encrypted Terraform state bucket."
  value       = aws_s3_bucket.terraform_state.id
}
