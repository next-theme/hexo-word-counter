import os
import sys
from hashlib import sha256
import boto3
from botocore.client import Config
from botocore.exceptions import ClientError

# https://github.com/cloudflare/cloudflared/blob/135c8e6d13663d2aa2d3c9169cde0cfc1e6e2062/release_pkgs.py#L36
def upload_pkg_to_r2(account_id, secret_access_key, access_key_id, bucket_name, filename, upload_file_path):
    endpoint_url = "https://{}.r2.cloudflarestorage.com".format(account_id)

    config = Config(
        region_name="auto",
        s3={
            "addressing_style": "path",
        }
    )

    r2 = boto3.client(
        "s3",
        endpoint_url=endpoint_url,
        aws_access_key_id=access_key_id,
        aws_secret_access_key=secret_access_key,
        config=config,
    )

    print("uploading asset: {} to {} in bucket {}...".format(
        filename, upload_file_path, bucket_name))
    try:
        r2.upload_file(filename, bucket_name, upload_file_path)
    except ClientError as e:
        raise e

if __name__ == "__main__":
    if len(sys.argv) < 3:
        print("Usage: python3 upload.py <filename> <upload_file_path>")
        exit(1)
    account_id = os.environ["ACCOUNT_ID"]
    secret_access_key = os.environ["SECRET_ACCESS_KEY"]
    access_key_id = os.environ["ACCESS_KEY_ID"]
    bucket_name = "archive"
    filename = sys.argv[1]
    upload_file_path = sys.argv[2]

    upload_pkg_to_r2(account_id, secret_access_key, access_key_id, bucket_name, filename, upload_file_path)
