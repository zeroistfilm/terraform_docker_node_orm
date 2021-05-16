resource "aws_key_pair" "adminyd" {
  key_name = "adminyd"
  public_key = "${file("~/.ssh/adminyd.pub")}"
}

# ssh -i /Users/youngdongkim/.ssh/adminyd ubuntu@3.36.0.218