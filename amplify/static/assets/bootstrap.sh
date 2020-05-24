#!/bin/bash

# Cloud9 Bootstrap Script
#
# 1. Installs homebrew
# 2. Upgrades to latest AWS CLI
# 3. Upgrades AWS SAM CLI
#
# Usually takes about 8 minutes to complete

set -euxo pipefail

ACCOUNT_ID=$(aws sts get-caller-identity --query 'Account' --output text)
CURRENT_REGION=$(curl -s http://169.254.169.254/latest/meta-data/placement/availability-zone | sed 's/\(.*\)[a-z]/\1/')
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m'

export INFOPATH="/home/linuxbrew/.linuxbrew/share/info"

function _logger() {
    echo -e "$(date) ${YELLOW}[*] $@ ${NC}"
}

function upgrade_sam_cli() {
    _logger "[+] Backing up current SAM CLI"
    cp $(which sam) ~/.sam_old_backup

    _logger "[+] Installing latest SAM CLI"
    # pipx install aws-sam-cli
    # cfn-lint currently clashing with SAM CLI deps
    ## installing SAM CLI via brew instead
    brew tap aws/tap
    brew install aws-sam-cli

    _logger "[+] Updating Cloud9 SAM binary"
    # Allows for local invoke within IDE (except debug run)
    ln -sf $(which sam) ~/.c9/bin/sam
}

function upgrade_existing_packages() {
    _logger "[+] Upgrading system packages"
    sudo yum update -y

    _logger "[+] Upgrading Python pip and setuptools"
    python3 -m pip install --upgrade pip setuptools --user

    _logger "[+] Installing latest AWS CLI"
    # _logger "[+] Installing pipx, and latest AWS CLI"
    # python3 -m pip install --user pipx
    # pipx install awscli
    python3 -m pip install --upgrade --user awscli

    # _logger "[+] Upgrade Python 3.8"
    # sudo yum install libssl-dev openssl
    # wget https://www.python.org/ftp/python/3.8.3/Python-3.8.3.tgz
    # tar xzvf Python-3.8.3.tgz
    # cd Python-3.8.3
    # ./configure
    # make
    # sudo make install
    # cd ..
    # sudo rm -rf Python-3.8.3.tgz Python-3.8.3
    python3 -V

    ##
    # echo "EBS Amazon Linux 2 & CenOS"
    # echo "EBS Extending a Partition on a T2/T3 Instance"
    # sudo file -s /dev/nvme?n*
    # sudo growpart /dev/nvme0n1 1
    # lsblk
    # echo "Extend an ext2/ext3/ext4 file system"
    # sudo yum install xfsprogs
    # sudo resize2fs /dev/nvme0n1p1
    # df -h

}

function install_utility_tools() {
    _logger "[+] Installing jq"
    sudo yum install -y jq
}

function install_linuxbrew() {
    _logger "[+] Creating touch symlink"
    sudo ln -sf /bin/touch /usr/bin/touch
    _logger "[+] Installing homebrew..."
    echo | sh -c "$(curl -fsSL https://raw.githubusercontent.com/Linuxbrew/install/master/install.sh)"
    _logger "[+] Adding homebrew in PATH"
    test -d ~/.linuxbrew && eval $(~/.linuxbrew/bin/brew shellenv)
    test -d /home/linuxbrew/.linuxbrew && eval $(/home/linuxbrew/.linuxbrew/bin/brew shellenv)
    test -r ~/.bash_profile && echo "eval \$($(brew --prefix)/bin/brew shellenv)" >>~/.bash_profile
    echo "eval \$($(brew --prefix)/bin/brew shellenv)" >>~/.profile
}

function main() {
    upgrade_existing_packages
    install_linuxbrew
    install_utility_tools
    upgrade_sam_cli

    echo -e "${RED} [!!!!!!!!!] Open up a new terminal to reflect changes ${NC}"
    _logger "[+] Restarting Shell to reflect changes"
    exec ${SHELL}
}

main
