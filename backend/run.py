import os
import sys
import argparse

import uvicorn


def main(argv: list[str]) -> int | str | None:
    parser = argparse.ArgumentParser()
    parser.add_argument("-p", "--port", type=int, default=5000, help="port number")
    args = parser.parse_args()

    uvicorn.run('app:app', host="127.0.0.1", port=args.port, reload=True)

    return None


if __name__ == "__main__":
    sys.exit(main(sys.argv))
